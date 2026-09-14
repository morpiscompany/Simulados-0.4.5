/* ============================================================
   SIMULADO DE ESTUDOS — ARQUITETURA FINAL
   Fluxo: idioma → matéria → fase → JSON → questões
   ============================================================ */

const estado = {
    idioma: "pt",
    materiaId: null,
    faseNumero: null,
    bancoAtual: [],
    perguntas: [],
    perguntaAtual: 0,
    pontos: 0,
    acertos: 0,
    erros: 0,
    carregamentoId: 0,
    dadosSemiologia: null
};

const textos = {
    pt: {
        tituloDocumento: "Simulados de Medicina",
        idiomaTitulo: "Simulados de Medicina",
        idiomaSubtitulo: "Semiologia e Farmacologia",
        idiomaPergunta: "Escolha o idioma",
        materiasTitulo: "Selecione a matéria",
        materiasSubtitulo: "Escolha a matéria que deseja estudar.",
        fasesTitulo: "Selecione a fase",
        fasesSubtitulo: "Escolha a fase que deseja estudar.",
        voltarIdioma: "Voltar ao idioma",
        voltarMaterias: "Voltar às matérias",
        escolherFase: "Escolher outra fase",
        carregando: "Carregando banco de questões...",
        carregandoPerguntas: "Carregando perguntas...",
        erro404: "Arquivo do banco não encontrado.",
        erroRede: "Não foi possível acessar o arquivo do banco. Verifique o caminho e o ambiente de execução.",
        erroJson: "O arquivo do banco não contém um JSON válido.",
        erroEstrutura: "O arquivo do banco não possui a estrutura esperada (questions).",
        erroVazio: "O banco de questões está vazio.",
        erroInesperado: "Ocorreu um erro inesperado ao carregar o banco.",
        erroRuntime: "Não foi possível carregar os dados desta fase localmente.",
        correto: "✅ Correto!",
        incorreto: "❌ Incorreto.",
        resposta: "A resposta é",
        respostaCorreta: "A resposta correta é",
        descricao: "Descrição:",
        alvo: "Alvo:",
        tipo: "Questão",
        proxima: "Próxima questão →",
        final: "🏆 Simulado finalizado!",
        suaPontuacao: "Sua pontuação",
        acertos: "Acertos",
        erros: "Erros",
        aproveitamento: "Aproveitamento",
        novamente: "🔄 Fazer novamente",
        excelente: "Excelente desempenho! Você demonstrou ótimo domínio do conteúdo.",
        muitoBom: "Muito bom! Você teve um bom desempenho, mas ainda pode revisar alguns pontos.",
        bomComeco: "Bom começo. Vale a pena revisar os pontos que você errou.",
        continueEstudando: "Continue estudando. Refazer o simulado pode ajudar a fixar o conteúdo.",
        configuracoes: "Configurações",
        configuracoesSubtitulo: "Personalize a aparência do aplicativo.",
        aparencia: "Aparência",
        aparenciaDescricao: "Escolha o modo de visualização.",
        tamanhoFonte: "Tamanho da fonte",
        tamanhoFonteDescricao: "Ajuste a leitura para seu conforto.",
        idiomaConfig: "Idioma",
        idiomaConfigDescricao: "Idioma atualmente selecionado.",
        fontePequena: "Pequena", fonteNormal: "Normal", fonteGrande: "Grande", fonteMuitoGrande: "Muito grande",
        modoClaro: "Modo claro", modoEscuro: "Modo escuro", voltar: "Voltar",
        sair: "Sair",
        acessoSubtitulo: "Acesso à plataforma de estudos",
        rotuloEmailAcesso: "E-mail",
        placeholderEmailAcesso: "seu@email.com",
        entrar: "Entrar",
        rotuloQuestao: "Questão",
        rotuloPontos: "Pontos",
        rotuloGrupo: "Grupo",
        alternativas: "Alternativas",
        carregandoPergunta: "Carregando pergunta...",
        suaPontuacao: "Sua pontuação",
        desempenho: "Desempenho"

    },
    es: {
        tituloDocumento: "Simulados de Medicina",
        idiomaTitulo: "Simulados de Medicina",
        idiomaSubtitulo: "Semiología y Farmacología",
        idiomaPergunta: "Elige el idioma",
        materiasTitulo: "Selecciona la materia",
        materiasSubtitulo: "Elige la materia que deseas estudiar.",
        fasesTitulo: "Selecciona la fase",
        fasesSubtitulo: "Elige la fase que deseas estudiar.",
        voltarIdioma: "Volver al idioma",
        voltarMaterias: "Volver a las materias",
        escolherFase: "Elegir otra fase",
        carregando: "Cargando banco de preguntas...",
        carregandoPerguntas: "Cargando preguntas...",
        erro404: "No se encontró el archivo del banco.",
        erroRede: "No se pudo acceder al archivo del banco. Verifica la ruta y el entorno de ejecución.",
        erroJson: "El archivo del banco no contiene un JSON válido.",
        erroEstrutura: "El archivo del banco no tiene la estructura esperada (questions).",
        erroVazio: "El banco de preguntas está vacío.",
        erroInesperado: "Ocurrió un error inesperado al cargar el banco.",
        erroRuntime: "No fue posible cargar localmente los datos de esta fase.",
        correto: "✅ ¡Correcto!",
        incorreto: "❌ Incorrecto.",
        resposta: "La respuesta es",
        respostaCorreta: "La respuesta correcta es",
        descricao: "Descripción:",
        alvo: "Objetivo:",
        tipo: "Pregunta",
        proxima: "Siguiente pregunta →",
        final: "🏆 ¡Simulado finalizado!",
        suaPontuacao: "Tu puntuación",
        acertos: "Aciertos",
        erros: "Errores",
        aproveitamento: "Rendimiento",
        novamente: "🔄 Hacer de nuevo",
        excelente: "¡Excelente desempeño! Demostraste un excelente dominio del contenido.",
        muitoBom: "¡Muy bien! Tuviste un buen desempeño, pero todavía puedes repasar algunos puntos.",
        bomComeco: "Buen comienzo. Vale la pena repasar los puntos que fallaste.",
        continueEstudando: "Continúa estudiando. Repetir el simulado puede ayudarte a fijar el contenido.",
        configuracoes: "Configuraciones",
        configuracoesSubtitulo: "Personaliza la apariencia de la aplicación.",
        aparencia: "Apariencia",
        aparenciaDescricao: "Elige el modo de visualización.",
        tamanhoFonte: "Tamaño de fuente",
        tamanhoFonteDescricao: "Ajusta la lectura a tu comodidad.",
        idiomaConfig: "Idioma",
        idiomaConfigDescricao: "Idioma actualmente seleccionado.",
        fontePequena: "Pequeña", fonteNormal: "Normal", fonteGrande: "Grande", fonteMuitoGrande: "Muy grande",
        modoClaro: "Modo claro", modoEscuro: "Modo oscuro", voltar: "Volver",
        sair: "Salir",
        acessoSubtitulo: "Acceso a la plataforma de estudios",
        rotuloEmailAcesso: "Correo electrónico",
        placeholderEmailAcesso: "tu@correo.com",
        entrar: "Entrar",
        rotuloQuestao: "Pregunta",
        rotuloPontos: "Puntos",
        rotuloGrupo: "Grupo",
        alternativas: "Alternativas",
        carregandoPergunta: "Cargando pregunta...",
        suaPontuacao: "Tu puntuación",
        desempenho: "Rendimiento"

    }
};

const $ = (id) => document.getElementById(id);

const telaAcesso = $("tela-acesso");
const telaIdioma = $("tela-idioma");
const telaMaterias = $("tela-materias");
const telaFases = $("tela-fases");
const telaJogo = $("tela-jogo");
const telaConfiguracoes = $("tela-configuracoes");
const listaMaterias = $("lista-materias");
const listaFases = $("lista-fases");
const mensagemFases = $("mensagem-fases");
const card = document.querySelector(".card");
const resultadoFinal = $("resultado-final");

function t() {
    return textos[estado.idioma] || textos.pt;
}

function escaparHTML(valor) {
    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function mostrarTela(tela) {
    [telaAcesso, telaIdioma, telaMaterias, telaFases, telaJogo, telaConfiguracoes].forEach((item) => {
        const ativa = item === tela;
        item.classList.toggle("escondido", !ativa);
        item.classList.toggle("tela-visivel", ativa);
    });
}

function atualizarIdiomaDaPagina() {
    document.documentElement.lang = estado.idioma === "es" ? "es" : "pt-BR";
    document.title = t().tituloDocumento;
}

const CHAVE_TEMA = "simulados-medicina-theme";

function temaAtual() {
    return document.documentElement.dataset.tema === "escuro" ? "escuro" : "claro";
}

function aplicarTema(tema, persistir = true) {
    const novoTema = tema === "escuro" ? "escuro" : "claro";
    document.documentElement.dataset.tema = novoTema;
    const escuro = novoTema === "escuro";

    document.querySelectorAll(".botao-tema").forEach((botao) => {
        botao.setAttribute("aria-pressed", String(escuro));
        const icone = botao.querySelector(".tema-icone");
        const texto = botao.querySelector(".tema-texto");
        if (icone) icone.textContent = escuro ? "☀" : "☾";
        if (texto) texto.textContent = escuro ? t().modoClaro : t().modoEscuro;
        botao.setAttribute("aria-label", escuro ? t().modoClaro : t().modoEscuro);
        botao.title = escuro ? t().modoClaro : t().modoEscuro;
    });

    if (persistir) {
        try { localStorage.setItem(CHAVE_TEMA, novoTema); } catch (erro) {
            console.warn("Não foi possível persistir a preferência de tema.", erro);
        }
    }
}

function alternarTema() {
    aplicarTema(temaAtual() === "escuro" ? "claro" : "escuro");
}

function carregarTemaSalvo() {
    let salvo = "claro";
    try {
        salvo = localStorage.getItem(CHAVE_TEMA) === "escuro" ? "escuro" : "claro";
    } catch (erro) {
        console.warn("Não foi possível ler a preferência de tema.", erro);
    }
    aplicarTema(salvo, false);
}

const CHAVE_FONTE = "simulados-medicina-font-size";
const NIVEIS_FONTE = ["pequena", "normal", "grande", "muito-grande"];

function fonteAtual() {
    const valor = document.documentElement.dataset.fonte;
    return NIVEIS_FONTE.includes(valor) ? valor : "normal";
}

function aplicarFonte(nivel, persistir = true) {
    const novoNivel = NIVEIS_FONTE.includes(nivel) ? nivel : "normal";
    document.documentElement.dataset.fonte = novoNivel;
    document.querySelectorAll(".botao-fonte").forEach((botao) => {
        const ativo = botao.dataset.fonte === novoNivel;
        botao.classList.toggle("ativo", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
    });
    if (persistir) {
        try { localStorage.setItem(CHAVE_FONTE, novoNivel); } catch (erro) {
            console.warn("Não foi possível persistir a preferência de fonte.", erro);
        }
    }
}

function carregarFonteSalva() {
    let salvo = "normal";
    try {
        const valor = localStorage.getItem(CHAVE_FONTE);
        if (NIVEIS_FONTE.includes(valor)) salvo = valor;
    } catch (erro) {
        console.warn("Não foi possível ler a preferência de fonte.", erro);
    }
    aplicarFonte(salvo, false);
}

function atualizarConfiguracoes() {
    const escuro = temaAtual() === "escuro";
    const botao = $("alternar-tema-config");
    if (botao) {
        botao.textContent = escuro ? t().modoClaro : t().modoEscuro;
        botao.setAttribute("aria-pressed", String(escuro));
    }
    $("titulo-configuracoes").textContent = t().configuracoes;
    $("subtitulo-configuracoes").textContent = t().configuracoesSubtitulo;
    $("rotulo-aparencia").textContent = t().aparencia;
    $("descricao-aparencia").textContent = t().aparenciaDescricao;
    $("rotulo-fonte").textContent = t().tamanhoFonte;
    $("descricao-fonte").textContent = t().tamanhoFonteDescricao;
    $("rotulo-idioma-config").textContent = t().idiomaConfig;
    $("descricao-idioma-config").textContent = t().idiomaConfigDescricao;
    $("idioma-atual-config").textContent = estado.idioma === "es" ? "Español" : "Português";
    $("voltar-configuracoes").textContent = t().voltar;
    $("sair-conta").textContent = t().sair;
    document.querySelectorAll(".botao-fonte").forEach((botao) => {
        const nomes = { pequena: t().fontePequena, normal: t().fonteNormal, grande: t().fonteGrande, "muito-grande": t().fonteMuitoGrande };
        botao.title = nomes[botao.dataset.fonte];
    });
}

function atualizarTextosDeAcesso() {
    $("titulo-acesso").textContent = t().idiomaTitulo;
    $("subtitulo-acesso").textContent = t().acessoSubtitulo;
    $("rotulo-email-acesso").textContent = t().rotuloEmailAcesso;
    $("email-acesso").placeholder = t().placeholderEmailAcesso;
    $("botao-entrar").textContent = t().entrar;
    $("alternar-tema-acesso")?.setAttribute("aria-label", temaAtual() === "escuro" ? t().modoClaro : t().modoEscuro);
}

function mostrarMensagemDeAcesso(codigo) {
    const mensagem = $("mensagem-acesso");
    if (!mensagem) return;
    const mensagens = {
        pt: {
            empty: "Digite seu e-mail.",
            invalid: "Digite um e-mail válido.",
            "not-found": "E-mail não autorizado.",
            inactive: "Acesso não autorizado.",
            expired: "Seu acesso expirou.",
            "load-error": "Não foi possível verificar o acesso. Tente novamente."
        },
        es: {
            empty: "Introduce tu correo electrónico.",
            invalid: "Introduce un correo electrónico válido.",
            "not-found": "Correo electrónico no autorizado.",
            inactive: "Acceso no autorizado.",
            expired: "Tu acceso ha expirado.",
            "load-error": "No fue posible verificar el acceso. Inténtalo de nuevo."
        }
    };
    const idiomaMensagens = mensagens[estado.idioma] || mensagens.pt;
    mensagem.textContent = idiomaMensagens[codigo] || idiomaMensagens["load-error"];
    mensagem.dataset.tipo = codigo || "erro";
}

async function processarAcesso(event) {
    event.preventDefault();
    const campo = $("email-acesso");
    const botao = $("botao-entrar");
    const email = campo.value;
    mostrarMensagemDeAcesso("");
    botao.disabled = true;
    campo.disabled = true;

    const resultado = await Auth.authenticate(email);
    if (resultado.ok) {
        $("mensagem-acesso").textContent = "";
        $("mensagem-acesso").dataset.tipo = "";
        campo.value = "";
        estado.materiaId = null;
        limparEstadoDoQuestionario();
        mostrarTela(telaIdioma);
    } else {
        mostrarMensagemDeAcesso(resultado.code);
    }

    botao.disabled = false;
    campo.disabled = false;
}

async function inicializarAplicacaoComAcesso() {
    const resultado = await Auth.initializeSession();
    if (resultado.ok) {
        mostrarTela(telaIdioma);
        return;
    }
    mostrarTela(telaAcesso);
    if (resultado.code === "load-error") mostrarMensagemDeAcesso("load-error");
}

function limparEstadoDoQuestionario() {
    estado.faseNumero = null;
    estado.bancoAtual = [];
    estado.perguntas = [];
    estado.perguntaAtual = 0;
    estado.pontos = 0;
    estado.acertos = 0;
    estado.erros = 0;
    estado.carregamentoId++;
}

function selecionarIdioma(novoIdioma) {
    estado.idioma = novoIdioma === "es" ? "es" : "pt";
    estado.materiaId = null;
    limparEstadoDoQuestionario();
    atualizarIdiomaDaPagina();
    atualizarTextosDeAcesso();
    atualizarTextosDaSelecao();
    mostrarMaterias();
}

function atualizarTextosDaSelecao() {
    $("titulo-idioma").textContent = t().idiomaTitulo;
    $("subtitulo-idioma").textContent = t().idiomaSubtitulo;
    $("pergunta-idioma").textContent = t().idiomaPergunta;
    $("titulo-materias").textContent = t().materiasTitulo;
    $("subtitulo-materias").textContent = t().materiasSubtitulo;
    $("titulo-fases").textContent = t().fasesTitulo;
    $("subtitulo-fases").textContent = t().fasesSubtitulo;
    $("voltar-idioma").textContent = t().voltarIdioma;
    $("voltar-materias").textContent = t().voltarMaterias;
    $("voltar-fases").textContent = t().escolherFase;
    $("voltar-fases-resultado").textContent = t().escolherFase;
    $("proxima").textContent = t().proxima;
    $("reiniciar").textContent = t().novamente;
    $("status-questionario").setAttribute("aria-label", estado.idioma === "es" ? "Estado de la pregunta" : "Status do questionário");
    $("lista-materias").setAttribute("aria-label", estado.idioma === "es" ? "Materias" : "Matérias");
    $("lista-fases").setAttribute("aria-label", estado.idioma === "es" ? "Fases" : "Fases");
    $("abrir-configuracoes").setAttribute("aria-label", t().configuracoes);
    $("abrir-configuracoes").title = t().configuracoes;
    document.querySelectorAll(".botao-fonte").forEach((botao) => {
        const nomesAria = { pequena: t().fontePequena, normal: t().fonteNormal, grande: t().fonteGrande, "muito-grande": t().fonteMuitoGrande };
        botao.setAttribute("aria-label", nomesAria[botao.dataset.fonte]);
    });
    atualizarConfiguracoes();
}

function mostrarMaterias() {
    mostrarTela(telaMaterias);
    listaMaterias.innerHTML = "";

    Object.entries(materias).forEach(([materiaId, materia]) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao-selecao botao-materia";
        const nomeMateria = estado.idioma === "es" ? (materia.nomeES || materia.nome) : materia.nome;
        botao.innerHTML = `<span class="botao-icone" aria-hidden="true">${materia.icone}</span><span>${escaparHTML(nomeMateria)}</span>`;
        botao.addEventListener("click", () => selecionarMateria(materiaId));
        listaMaterias.appendChild(botao);
    });
}

function selecionarMateria(materiaId) {
    if (!materias[materiaId]) {
        console.error("Matéria inválida:", materiaId);
        return;
    }

    estado.materiaId = materiaId;
    limparEstadoDoQuestionario();
    mostrarFases();
}

function mostrarFases() {
    const materia = materias[estado.materiaId];
    if (!materia) {
        mostrarMaterias();
        return;
    }

    mostrarTela(telaFases);
    $("icone-fases").textContent = materia.icone;
    $("titulo-fases").textContent = estado.idioma === "es" ? (materia.nomeES || materia.nome) : materia.nome;
    $("subtitulo-fases").textContent = estado.idioma === "es"
        ? "Selecciona la fase que deseas estudiar."
        : "Selecione a fase que deseja estudar.";
    listaFases.innerHTML = "";
    mensagemFases.textContent = "";

    Object.entries(materia.fases).forEach(([numero, fase]) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao-selecao botao-fase";
        const nomeFase = fase.nome;
        const temaFase = estado.idioma === "es" ? (fase.temaES || fase.tema) : fase.tema;
        botao.innerHTML = `
            <span class="fase-numero">${escaparHTML(nomeFase)}</span>
            <span class="fase-tema">${escaparHTML(temaFase)}</span>
        `;
        botao.addEventListener("click", () => selecionarFase(Number(numero)));
        listaFases.appendChild(botao);
    });
}

async function carregarBancoDaFase(materiaId, faseNumero, token) {
    const materia = materias[materiaId];
    const fase = materia?.fases?.[faseNumero];

    if (!fase) {
        throw criarErroCarregamento("configuracao", estado.idioma === "es" ? "Materia/fase no encontrada en la configuración central." : "Matéria/fase não encontrada na configuração central.");
    }

    const protocolo = window.location.protocol;
    console.info("[Banco] Solicitação", {
        materia: materia.nome,
        fase: faseNumero,
        arquivoJSON: fase.arquivo,
        arquivoRuntime: fase.runtime,
        protocolo
    });

    let dados;

    // file:// não deve depender de fetch() de JSON: navegadores podem
    // bloquear essa operação por políticas de segurança/CORS. Nesse
    // ambiente usamos a representação JS gerada do MESMO JSON.
    if (protocolo === "file:") {
        dados = await carregarBancoRuntime(fase, materiaId, faseNumero, token);
    } else if (protocolo === "http:" || protocolo === "https:") {
        // Em servidor/GitHub Pages, o JSON original é a fonte efetivamente
        // carregada. Não há fallback para outro arquivo se ele falhar.
        dados = await carregarBancoJSON(fase, materiaId, faseNumero);
    } else {
        throw criarErroCarregamento(
            "protocolo",
            estado.idioma === "es"
                ? `Protocolo de ejecución no compatible: ${protocolo || "desconocido"}.`
                : `Protocolo de execução não suportado: ${protocolo || "desconhecido"}.`
        );
    }

    validarDadosDoBanco(dados, materiaId, faseNumero, fase);

    if (token !== estado.carregamentoId) {
        throw criarErroCarregamento("cancelado", "Carregamento substituído por outra seleção.");
    }

    console.info("[Banco] OK", {
        materia: materia.nome,
        fase: faseNumero,
        total: dados.questions.length,
        origem: dados.__origem || (protocolo === "file:" ? "runtime" : "json")
    });

    if (materiaId === "semiologia") {
        estado.dadosSemiologia = dados;
    }

    return dados.questions;
}

function carregarBancoRuntime(fase, materiaId, faseNumero, token) {
    return new Promise((resolve, reject) => {
        if (token !== estado.carregamentoId) {
            reject(criarErroCarregamento("cancelado", "Carregamento substituído por outra seleção."));
            return;
        }

        window.__QUESTION_BANKS__ = window.__QUESTION_BANKS__ || Object.create(null);

        if (window.__QUESTION_BANKS__[fase.runtimeId]) {
            resolve(window.__QUESTION_BANKS__[fase.runtimeId]);
            return;
        }

        const script = document.createElement("script");
        script.src = new URL(fase.runtime, document.baseURI).href;
        script.async = true;
        script.dataset.bancoRuntime = fase.runtimeId;

        const limpar = () => {
            script.onload = null;
            script.onerror = null;
        };

        script.onload = () => {
            limpar();
            const dados = window.__QUESTION_BANKS__[fase.runtimeId];
            if (!dados) {
                console.error("[Banco] Runtime carregado, mas não registrou o banco esperado.", {
                    materia: materiaId,
                    fase: faseNumero,
                    runtime: fase.runtime,
                    runtimeId: fase.runtimeId
                });
                reject(criarErroCarregamento("runtime-estrutura", "O arquivo de dados de execução não registrou o banco esperado."));
                return;
            }
            dados.__origem = "runtime";
            resolve(dados);
        };

        script.onerror = (evento) => {
            limpar();
            console.error("[Banco] Falha ao carregar runtime", {
                materia: materiaId,
                fase: faseNumero,
                runtime: fase.runtime,
                url: script.src,
                protocolo: window.location.protocol,
                evento
            });
            reject(criarErroCarregamento("runtime-acesso", "Não foi possível carregar a representação local do banco.", evento));
        };

        document.head.appendChild(script);
    });
}

async function carregarBancoJSON(fase, materiaId, faseNumero) {
    const url = new URL(fase.arquivo, document.baseURI).href;
    let resposta;

    try {
        resposta = await fetch(url, {
            method: "GET",
            cache: "no-store",
            headers: { Accept: "application/json" }
        });
    } catch (erro) {
        console.error("[Banco] Falha de rede/acesso ao JSON", {
            materia: materiaId,
            fase: faseNumero,
            arquivo: fase.arquivo,
            url,
            protocolo: window.location.protocol,
            erro
        });
        throw criarErroCarregamento("rede", t().erroRede, erro);
    }

    if (!resposta.ok) {
        console.error("[Banco] HTTP", {
            materia: materiaId,
            fase: faseNumero,
            arquivo: fase.arquivo,
            status: resposta.status,
            statusText: resposta.statusText,
            url
        });
        if (resposta.status === 404) {
            throw criarErroCarregamento("404", `${t().erro404} (${resposta.status}).`);
        }
        throw criarErroCarregamento("http", `HTTP ${resposta.status} ${resposta.statusText || ""}`.trim());
    }

    try {
        const dados = await resposta.json();
        dados.__origem = "json";
        return dados;
    } catch (erro) {
        console.error("[Banco] JSON inválido", {
            materia: materiaId,
            fase: faseNumero,
            arquivo: fase.arquivo,
            url,
            erro
        });
        throw criarErroCarregamento("json", t().erroJson, erro);
    }
}

function validarDadosDoBanco(dados, materiaId, faseNumero, fase) {
    if (!dados || typeof dados !== "object") {
        console.error("[Banco] Dados inválidos", { materia: materiaId, fase: faseNumero, arquivo: fase.arquivo, dados });
        throw criarErroCarregamento("estrutura", t().erroEstrutura);
    }

    if (!Array.isArray(dados.questions)) {
        console.error("[Banco] Estrutura inválida", {
            materia: materiaId,
            fase: faseNumero,
            arquivo: fase.arquivo,
            temQuestions: Object.prototype.hasOwnProperty.call(dados, "questions")
        });
        throw criarErroCarregamento("estrutura", t().erroEstrutura);
    }

    if (dados.questions.length === 0) {
        console.error("[Banco] Banco vazio", { materia: materiaId, fase: faseNumero, arquivo: fase.arquivo });
        throw criarErroCarregamento("vazio", t().erroVazio);
    }
}

function criarErroCarregamento(tipo, mensagem, causa = null) {
    const erro = new Error(mensagem);
    erro.tipoCarregamento = tipo;
    erro.causa = causa;
    return erro;
}

async function selecionarFase(faseNumero) {
    const materiaId = estado.materiaId;
    const materia = materias[materiaId];
    const fase = materia?.fases?.[faseNumero];

    if (!materia || !fase) {
        console.error("[Navegação] Fase inválida", { materiaId, faseNumero });
        return;
    }

    const token = ++estado.carregamentoId;
    estado.faseNumero = faseNumero;
    estado.bancoAtual = [];
    estado.perguntas = [];
    mensagemFases.textContent = t().carregando;

    const botoes = listaFases.querySelectorAll("button");
    botoes.forEach((botao) => { botao.disabled = true; });

    try {
        const banco = await carregarBancoDaFase(materiaId, faseNumero, token);
        if (token !== estado.carregamentoId) return;

        estado.bancoAtual = banco;
        mostrarTela(telaJogo);
        atualizarCabecalhoDaFase();
        iniciarQuestionario();
    } catch (erro) {
        if (token !== estado.carregamentoId || erro.tipoCarregamento === "cancelado") return;
        console.error("[Navegação] Falha ao abrir fase", {
            materia: materia.nome,
            fase: faseNumero,
            arquivo: fase.arquivo,
            tipo: erro.tipoCarregamento,
            mensagem: erro.message,
            causa: erro.causa
        });
        mensagemFases.textContent = `${erro.message}`;
        botoes.forEach((botao) => { botao.disabled = false; });
    }
}

function obterTraducao(item, campo) {
    if (estado.idioma === "es") {
        if (estado.materiaId === "semiologia" && estado.dadosSemiologia?.traducoesES?.[item.nome]?.[campo]) {
            return estado.dadosSemiologia.traducoesES[item.nome][campo];
        }
        return item[campo] ?? "";
    }

    if (estado.materiaId === "farmacologia") {
        return item[`${campo}PT`] ?? item[campo] ?? "";
    }

    return item[campo] ?? "";
}

function obterRespostaLocalizada(item) {
    if (estado.materiaId === "semiologia" && estado.idioma === "es" && estado.dadosSemiologia?.traducoesES?.[item.nome]?.nome) {
        return estado.dadosSemiologia.traducoesES[item.nome].nome;
    }
    if (estado.idioma === "es") {
        return item.resposta ?? item.nome ?? "";
    }
    if (estado.materiaId === "farmacologia") {
        return item.respostaPT ?? item.resposta ?? item.nomePT ?? item.nome ?? "";
    }
    return item.resposta ?? item.nome ?? "";
}

function traduzirResposta(item) {
    return obterRespostaLocalizada(item);
}

function atualizarCabecalhoDaFase() {
    const materia = materias[estado.materiaId];
    const fase = materia?.fases?.[estado.faseNumero];
    if (!fase) return;

    const nomeMateria = estado.idioma === "es" ? (materia.nomeES || materia.nome) : materia.nome;
    const temaFase = estado.idioma === "es" ? (fase.temaES || fase.tema) : fase.tema;
    $("titulo-jogo").textContent = `${materia.icone} ${nomeMateria}`;
    $("subtitulo-jogo").textContent = `${fase.nome} — ${temaFase}`;
}

function criarAlternativas(pergunta) {
    const respostaCorreta = obterRespostaLocalizada(pergunta);
    const fornecidas = estado.idioma === "pt" && estado.materiaId === "farmacologia"
        ? (Array.isArray(pergunta.incompativeisPT) ? pergunta.incompativeisPT : [])
        : (Array.isArray(pergunta.incompativeis) ? pergunta.incompativeis : []);

    const doBanco = estado.bancoAtual
        .map((item) => obterRespostaLocalizada(item))
        .filter((item) => item && item !== respostaCorreta);

    const erradas = embaralhar([...new Set([...fornecidas, ...doBanco])]).slice(0, 3);
    return embaralhar([respostaCorreta, ...erradas]);
}

function mostrarPergunta() {
    const atual = estado.perguntas[estado.perguntaAtual];
    if (!atual) return;

    $("numero-questao").textContent = `${estado.perguntaAtual + 1}/${estado.perguntas.length}`;
    $("pontuacao").textContent = estado.pontos;
    $("rotulo-questao").textContent = t().rotuloQuestao;
    $("rotulo-pontos").textContent = t().rotuloPontos;
    $("rotulo-grupo").textContent = t().rotuloGrupo;
    $("grupo-atual").textContent = obterTraducao(atual, "grupo") || "—";
    $("tipo-questao").textContent = t().tipo;
    $("pergunta").textContent = obterTraducao(atual, "pergunta");
    $("alternativas").setAttribute("aria-label", t().alternativas);
    $("alternativas").innerHTML = "";
    $("feedback").innerHTML = "";
    $("feedback").className = "feedback vazio";
    $("proxima").disabled = true;

    const alternativas = criarAlternativas(atual);
    alternativas.forEach((alternativa) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "alternativa";
        botao.dataset.resposta = alternativa;
        botao.textContent = alternativa;
        botao.addEventListener("click", () => responder(botao, alternativa, atual));
        $("alternativas").appendChild(botao);
    });
}

function responder(botaoClicado, respostaEscolhida, pergunta) {
    const botoes = document.querySelectorAll(".alternativa");
    botoes.forEach((botao) => { botao.disabled = true; });

    const correta = obterRespostaLocalizada(pergunta);
    const feedback = $("feedback");

    if (respostaEscolhida === correta) {
        botaoClicado.classList.add("correta");
        estado.pontos += 10;
        estado.acertos++;
        feedback.className = "feedback certo";
        feedback.innerHTML = `
            <strong>${escaparHTML(t().correto)}</strong><br>
            ${escaparHTML(t().resposta)} <strong>${escaparHTML(traduzirResposta(pergunta))}</strong>.
            <br><br><strong>${escaparHTML(t().descricao)}</strong> ${escaparHTML(obterTraducao(pergunta, "descricao"))}
            <br><strong>${escaparHTML(t().alvo)}</strong> ${escaparHTML(obterTraducao(pergunta, "alvo"))}
        `;
    } else {
        botaoClicado.classList.add("errada");
        estado.erros++;
        botoes.forEach((botao) => {
            if (botao.dataset.resposta === correta) botao.classList.add("correta");
        });
        feedback.className = "feedback errado";
        feedback.innerHTML = `
            <strong>${escaparHTML(t().incorreto)}</strong><br>
            ${escaparHTML(t().respostaCorreta)} <strong>${escaparHTML(traduzirResposta(pergunta))}</strong>.
            <br><br><strong>${escaparHTML(t().descricao)}</strong> ${escaparHTML(obterTraducao(pergunta, "descricao"))}
            <br><strong>${escaparHTML(t().alvo)}</strong> ${escaparHTML(obterTraducao(pergunta, "alvo"))}
        `;
    }

    $("pontuacao").textContent = estado.pontos;
    $("proxima").disabled = false;

    const feedbackVisivel = $("feedback");
    rolarSuavementeAteFeedback(feedbackVisivel);
}

function rolarSuavementeAteFeedback(elemento) {
    if (!elemento) return;

    const reduzirMovimento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alvo = elemento.getBoundingClientRect().top + window.scrollY - (window.innerHeight - elemento.offsetHeight) / 2;
    const inicio = window.scrollY;

    if (reduzirMovimento) {
        window.scrollTo(0, Math.max(0, alvo));
        return;
    }

    const distancia = alvo - inicio;
    const duracao = Math.min(650, Math.max(420, Math.abs(distancia) * 0.55));
    const inicioTempo = performance.now();

    const animar = (agora) => {
        const progresso = Math.min(1, (agora - inicioTempo) / duracao);
        const suave = 1 - Math.pow(1 - progresso, 3);
        window.scrollTo(0, inicio + distancia * suave);
        if (progresso < 1) requestAnimationFrame(animar);
    };

    requestAnimationFrame(animar);
}

function iniciarQuestionario() {
    if (!Array.isArray(estado.bancoAtual) || estado.bancoAtual.length === 0) return;

    estado.perguntas = embaralhar(estado.bancoAtual);
    estado.perguntaAtual = 0;
    estado.pontos = 0;
    estado.acertos = 0;
    estado.erros = 0;
    card.classList.remove("escondido");
    resultadoFinal.classList.add("escondido");
    mostrarPergunta();
}

function finalizar() {
    card.classList.add("escondido");
    resultadoFinal.classList.remove("escondido");

    const total = estado.perguntas.length;
    const porcentagem = total ? Math.round((estado.acertos / total) * 100) : 0;

    $("titulo-resultado").textContent = t().final;
    $("mensagem-final").textContent = porcentagem >= 90
        ? t().excelente
        : porcentagem >= 70
            ? t().muitoBom
            : porcentagem >= 50
                ? t().bomComeco
                : t().continueEstudando;
    $("rotulo-pontuacao-final").textContent = t().suaPontuacao;
    $("rotulo-acertos-final").textContent = t().acertos;
    $("rotulo-erros-final").textContent = t().erros;
    $("rotulo-aproveitamento-final").textContent = t().aproveitamento;
    $("pontuacao-final").textContent = estado.pontos;
    $("acertos-final").textContent = estado.acertos;
    $("erros-final").textContent = estado.erros;
    $("porcentagem-final").textContent = `${porcentagem}%`;
    $("reiniciar").textContent = t().novamente;
}

function voltarParaMaterias() {
    estado.materiaId = null;
    limparEstadoDoQuestionario();
    mostrarMaterias();
}

function voltarParaFases() {
    estado.carregamentoId++;
    estado.bancoAtual = [];
    estado.perguntas = [];
    estado.faseNumero = null;
    mostrarFases();
}

function reiniciarQuestionario() {
    iniciarQuestionario();
}

$("proxima").addEventListener("click", () => {
    estado.perguntaAtual++;
    if (estado.perguntaAtual < estado.perguntas.length) mostrarPergunta();
    else finalizar();
});

$("reiniciar").addEventListener("click", reiniciarQuestionario);
$("voltar-idioma").addEventListener("click", () => {
    estado.materiaId = null;
    limparEstadoDoQuestionario();
    mostrarTela(telaIdioma);
});
$("voltar-materias").addEventListener("click", voltarParaMaterias);
$("voltar-fases").addEventListener("click", voltarParaFases);
$("voltar-fases-resultado").addEventListener("click", voltarParaFases);

document.querySelectorAll("[data-idioma]").forEach((botao) => {
    botao.addEventListener("click", () => selecionarIdioma(botao.dataset.idioma));
});

document.querySelectorAll(".botao-tema").forEach((botao) => {
    botao.addEventListener("click", () => {
        alternarTema();
        atualizarConfiguracoes();
    });
});

$("alternar-tema-config").addEventListener("click", () => {
    alternarTema();
    atualizarConfiguracoes();
});

$("abrir-configuracoes").addEventListener("click", () => {
    atualizarConfiguracoes();
    mostrarTela(telaConfiguracoes);
});

$("voltar-configuracoes").addEventListener("click", () => mostrarTela(telaIdioma));

document.querySelectorAll(".botao-fonte").forEach((botao) => {
    botao.addEventListener("click", () => aplicarFonte(botao.dataset.fonte));
});

// Listeners de autenticação: registrados uma única vez, fora das funções de tema.
$("formulario-acesso").addEventListener("submit", processarAcesso);
$("sair-conta").addEventListener("click", () => {
    Auth.logout();
    estado.materiaId = null;
    limparEstadoDoQuestionario();
    $("mensagem-acesso").textContent = "";
    $("email-acesso").value = "";
    mostrarTela(telaAcesso);
});

carregarTemaSalvo();
carregarFonteSalva();
atualizarIdiomaDaPagina();
atualizarTextosDeAcesso();
atualizarTextosDaSelecao();
mostrarTela(telaAcesso);
inicializarAplicacaoComAcesso();
