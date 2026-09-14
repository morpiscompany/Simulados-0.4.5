SIMULADO DE ESTUDOS — VERSÃO FINAL

Fluxo:
Idioma → Matéria → Fase → Banco → Questões

Matérias:
- Semiologia: Fase 1
- Farmacologia: Fases 1 a 9

CARREGAMENTO DOS BANCOS

Os JSONs existentes permanecem como fonte original dos dados.
Para que a aplicação também funcione quando index.html é aberto diretamente
com file://, cada JSON possui uma representação JavaScript gerada
automaticamente em dados/runtime/. O arquivo runtime é carregado somente
quando a fase correspondente é escolhida.

Em http/https, a aplicação carrega diretamente o JSON original. Em file://,
usa somente o runtime correspondente à mesma fase, pois fetch() de arquivos
locais pode ser bloqueado pelo navegador. Não existe fallback para outro banco.

PUBLICAÇÃO NO GITHUB PAGES

Coloque o conteúdo desta pasta na raiz do repositório, mantendo a estrutura:

index.html
style.css
script.js
fases.js
dados/
  semiologia.json
  farmacologia/
  runtime/

Os caminhos são relativos ao projeto e não dependem de C:/Users/... ou de
uma raiz de domínio. Isso permite publicação em um subdiretório, como:
https://usuario.github.io/repositorio/

EXECUÇÃO LOCAL

O projeto pode ser aberto diretamente pelo index.html. A camada runtime evita
a dependência de fetch() para os JSONs quando o navegador estiver usando
file://.

Para desenvolvimento, também é possível usar qualquer servidor estático,
mas isso não é obrigatório para o funcionamento da aplicação.

FONTE DOS DADOS

Os arquivos JSON são preservados. Os arquivos JavaScript em dados/runtime/
são derivados automaticamente dos respectivos JSONs e não devem ser editados
manualmente.

CONTROLE DE ACESSO
------------------
A plataforma agora possui uma camada de acesso anterior ao fluxo existente.
O cadastro editável de usuários fica em:
    authorized-users.json

Campos:
    email       e-mail do usuário
    active      true libera; false bloqueia
    plan        reservado para planos futuros; atualmente não altera permissões
    expiresAt   data YYYY-MM-DD; o próprio dia de vencimento permanece válido
                null significa acesso sem data de expiração

Para renovar um usuário, altere somente expiresAt. Para bloqueio manual, altere
active para false.

A sessão guarda somente o e-mail em sessionStorage. Ao abrir a aplicação com
uma sessão existente, o usuário é validado novamente contra o cadastro e a
data de validade; portanto uma sessão antiga não ignora um vencimento.
O menu Configurações possui a opção Sair.

Compatibilidade local:
    Em HTTP/HTTPS, auth.js lê authorized-users.json.
    Em file://, auth.js usa dados/runtime/authorized-users.js porque navegadores
    podem bloquear fetch() de arquivos locais. Esse runtime é uma representação
    derivada do JSON para permitir a execução local.

LIMITAÇÃO DE SEGURANÇA
---------------------
Este é um controle de acesso no frontend. Como o cadastro é entregue ao
navegador, ele não deve ser tratado como autenticação de alta segurança.
Para proteção real contra manipulação pelo cliente, a validação deve migrar
futuramente para uma API/backend. A interface foi separada da camada Auth para
facilitar essa migração.
