/* ============================================================
   CONFIGURAÇÃO ÚNICA DE MATÉRIAS, FASES E BANCOS
   ============================================================
   `arquivo` é a fonte JSON original.
   `runtime` é uma cópia gerada automaticamente a partir do mesmo
   JSON e permite que o projeto também funcione com file://, onde
   fetch() para arquivos locais pode ser bloqueado pelo navegador.

   Não construa caminhos de banco dinamicamente no código.
*/

const materias = {
    semiologia: {
        nome: "Semiologia",
        icone: "🩺",
        fases: {
            1: {
                nome: "Fase 1",
                tema: "Manobras e sinais do exame físico",
                arquivo: "./dados/semiologia.json",
                runtime: "./dados/runtime/semiologia.js",
                runtimeId: "semiologia",
                idiomaConteudo: "pt-es"
            }
        }
    },

    farmacologia: {
        nome: "Farmacologia",
        nomeES: "Farmacología",
        icone: "💊",
        fases: {
            1: { nome: "Fase 1", tema: "Cefalosporinas", temaES: "Cefalosporinas", arquivo: "./dados/farmacologia/01_cefalosporinas.json", runtime: "./dados/runtime/farmacologia-1.js", runtimeId: "farmacologia-1", idiomaConteudo: "pt-es" },
            2: { nome: "Fase 2", tema: "Glicopeptídeos", temaES: "Glucopéptidos", arquivo: "./dados/farmacologia/02_glucopeptidos.json", runtime: "./dados/runtime/farmacologia-2.js", runtimeId: "farmacologia-2", idiomaConteudo: "pt-es" },
            3: { nome: "Fase 3", tema: "Penicilinas", temaES: "Penicilinas", arquivo: "./dados/farmacologia/03_penicilinas.json", runtime: "./dados/runtime/farmacologia-3.js", runtimeId: "farmacologia-3", idiomaConteudo: "pt-es" },
            4: { nome: "Fase 4", tema: "Aminoglicosídeos", temaES: "Aminoglucósidos", arquivo: "./dados/farmacologia/04_aminoglucosidos.json", runtime: "./dados/runtime/farmacologia-4.js", runtimeId: "farmacologia-4", idiomaConteudo: "pt-es" },
            5: { nome: "Fase 5", tema: "Macrolídeos e Cetolídeos", temaES: "Macrólidos y Cetólidos", arquivo: "./dados/farmacologia/05_macrolidos_cetolidos.json", runtime: "./dados/runtime/farmacologia-5.js", runtimeId: "farmacologia-5", idiomaConteudo: "pt-es" },
            6: { nome: "Fase 6", tema: "Fluoroquinolonas", temaES: "Fluoroquinolonas", arquivo: "./dados/farmacologia/06_fluoroquinolonas.json", runtime: "./dados/runtime/farmacologia-6.js", runtimeId: "farmacologia-6", idiomaConteudo: "pt-es" },
            7: { nome: "Fase 7", tema: "Lincosamidas", temaES: "Lincosamidas", arquivo: "./dados/farmacologia/07_lincosamidas.json", runtime: "./dados/runtime/farmacologia-7.js", runtimeId: "farmacologia-7", idiomaConteudo: "pt-es" },
            8: { nome: "Fase 8", tema: "Tetraciclinas", temaES: "Tetraciclinas", arquivo: "./dados/farmacologia/08_tetraciclinas.json", runtime: "./dados/runtime/farmacologia-8.js", runtimeId: "farmacologia-8", idiomaConteudo: "pt-es" },
            9: { nome: "Fase 9", tema: "Sulfonamidas e Trimetoprima", temaES: "Sulfonamidas y Trimetoprim", arquivo: "./dados/farmacologia/09_sulfonamidas_trimetoprim.json", runtime: "./dados/runtime/farmacologia-9.js", runtimeId: "farmacologia-9", idiomaConteudo: "pt-es" }
        }
    }
};
