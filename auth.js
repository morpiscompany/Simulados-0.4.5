/* ============================================================
   CONTROLE DE ACESSO — camada independente do questionário
   ============================================================ */
(function () {
    const SESSION_KEY = "simulados-medicina-access-session";
    const USERS_JSON = "./authorized-users.json";
    const USERS_RUNTIME = "./dados/runtime/authorized-users.js";
    const USERS_RUNTIME_ID = "authorized-users";
    let usersData = null;

    function normalizeEmail(value) {
        return typeof value === "string" ? value.trim().toLowerCase() : "";
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function parseCalendarDate(value) {
        if (value === null || value === undefined || value === "") return null;
        if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
        const [year, month, day] = value.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
        return year * 10000 + month * 100 + day;
    }

    function todayNumber() {
        const now = new Date();
        return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    }

    function validateUsersData(data) {
        if (!data || typeof data !== "object" || !Array.isArray(data.users)) {
            throw new Error("Estrutura inválida do banco de usuários.");
        }
        return data.users;
    }

    function findUser(email) {
        const normalized = normalizeEmail(email);
        return usersData.find((user) => user && typeof user === "object" && normalizeEmail(user.email) === normalized) || null;
    }

    async function loadRuntime() {
        const existing = document.querySelector(`script[data-auth-runtime="${USERS_RUNTIME_ID}"]`);
        if (existing) {
            const bank = window.__AUTHORIZED_USERS__?.[USERS_RUNTIME_ID];
            if (bank) return bank;
        }
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = USERS_RUNTIME;
            script.dataset.authRuntime = USERS_RUNTIME_ID;
            script.onload = () => {
                const bank = window.__AUTHORIZED_USERS__?.[USERS_RUNTIME_ID];
                if (!bank) reject(new Error("Runtime de usuários não registrou dados."));
                else resolve(bank);
            };
            script.onerror = () => reject(new Error("Runtime de usuários não pôde ser carregado."));
            document.head.appendChild(script);
        });
    }

    async function loadUsers() {
        if (usersData) return usersData;
        let data;
        if (window.location.protocol === "file:") {
            data = await loadRuntime();
        } else if (window.location.protocol === "http:" || window.location.protocol === "https:") {
            const url = `${USERS_JSON}?_t=${Date.now()}`;
            const response = await fetch(url, { cache: "no-store", headers: { "Accept": "application/json" } });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            data = await response.json();
        } else {
            throw new Error("Protocolo não suportado.");
        }
        usersData = validateUsersData(data);
        console.info("Controle de acesso: banco de usuários carregado.");
        return usersData;
    }

    function saveSession(email) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email: normalizeEmail(email) }));
    }

    function readSession() {
        try {
            const raw = sessionStorage.getItem(SESSION_KEY);
            if (!raw) return null;
            const data = JSON.parse(raw);
            return data && typeof data.email === "string" ? normalizeEmail(data.email) : null;
        } catch (error) {
            console.warn("Sessão de acesso inválida.");
            return null;
        }
    }

    function clearSession() {
        try { sessionStorage.removeItem(SESSION_KEY); } catch (error) { console.warn("Não foi possível encerrar a sessão."); }
    }

    function isExpired(user) {
        if (user.expiresAt === null || user.expiresAt === undefined || user.expiresAt === "") return false;
        const expires = parseCalendarDate(user.expiresAt);
        return expires === null || todayNumber() > expires;
    }

    async function authenticate(email) {
        const normalized = normalizeEmail(email);
        if (!normalized) return { ok: false, code: "empty" };
        if (!isValidEmail(normalized)) return { ok: false, code: "invalid" };

        try { await loadUsers(); }
        catch (error) {
            console.error("Falha ao carregar authorized-users.json:", error);
            return { ok: false, code: "load-error" };
        }

        const user = findUser(normalized);
        if (!user) return { ok: false, code: "not-found" };
        if (user.active !== true) return { ok: false, code: "inactive" };
        if (isExpired(user)) return { ok: false, code: "expired" };

        try { saveSession(normalized); }
        catch (error) {
            console.error("Falha ao criar sessão de acesso:", error);
            return { ok: false, code: "load-error" };
        }
        return { ok: true, email: normalized, plan: user.plan ?? null };
    }

    async function initializeSession() {
        const email = readSession();
        if (!email) return { ok: false, code: "no-session" };
        const result = await authenticate(email);
        if (!result.ok) clearSession();
        return result;
    }

    window.Auth = Object.freeze({ authenticate, initializeSession, logout: clearSession, normalizeEmail, isValidEmail });
})();
