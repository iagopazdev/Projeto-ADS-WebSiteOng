# ONG Esperança

Site institucional fictício desenvolvido como projeto acadêmico do curso de **Análise e Desenvolvimento de Sistemas (ADS) EAD**, na disciplina de **Front End**. A proposta é apresentar uma organização do terceiro setor e seus projetos sociais, além de oferecer um formulário demonstrativo de contato e apoio.

> **Projeto fictício:** nomes, números, contatos e informações apresentados no site são ilustrativos e não representam uma organização real.

## Informações acadêmicas

- **Instituição:** [preencher]
- **Curso:** Análise e Desenvolvimento de Sistemas (ADS) EAD
- **Disciplina:** Front End
- **Aluno(a):** [preencher]
- **Professor(a):** [preencher]
- **Semestre/período:** [preencher]
- **Repositório:** [adicionar o link do GitHub]

## Fluxo de branches (GitFlow)

- `main` contém apenas versões estáveis e publicáveis. Alterações chegam por integração revisada; cada lançamento recebe uma tag de versão.
- `develop` é a linha de integração do desenvolvimento e serve de base para novas funcionalidades.
- `feature/<nome>` nasce de `develop`; ao concluir e validar a funcionalidade, integra-se de volta a `develop`. A branch de trabalho desta consolidação segue esse padrão.
- `release/<versão>` é criada de `develop` quando uma entrega está pronta para estabilização. Após a validação, integra-se a `main` com uma tag e retorna a `develop`.
- `hotfix/<descrição>` nasce de `main` para corrigir uma falha urgente em produção; após a correção, integra-se tanto a `main` quanto a `develop`.

Branches `release/*` e `hotfix/*` são abertas sob demanda, não mantidas vazias permanentemente. Em trabalho individual, o mesmo fluxo pode ser seguido localmente e publicado no GitHub por *pull requests* quando houver revisão colaborativa disponível.

## Issues, milestones e pull requests

Os formulários de bug e melhoria ficam em `.github/ISSUE_TEMPLATE/`; o checklist de revisão fica em `.github/PULL_REQUEST_TEMPLATE.md`. O processo de triagem, os critérios da milestone inicial e as regras para branches e PRs estão em [CONTRIBUTING.md](CONTRIBUTING.md). A milestone `v0.1.0 - Consolidação frontend` está proposta na documentação, mas ainda precisa ser cadastrada na área Issues/Milestones do GitHub.

## Commits e releases

As mensagens de commit seguem Conventional Commits: `tipo(escopo): resumo curto`, com verbo no presente e sem ponto final. Tipos adotados: `feat` (funcionalidade), `fix` (correção), `docs` (documentação), `style` (formatação visual sem mudança de lógica), `refactor` (reorganização interna), `test` (testes) e `chore` (manutenção). Mudanças incompatíveis são marcadas com `!` após o tipo ou descritas no rodapé `BREAKING CHANGE:`.

Exemplos: `feat(navigation): adiciona histórico SPA`, `fix(form): rejeita nome composto por espaços` e `docs(readme): documenta fluxo GitFlow`.

As versões públicas seguem SemVer no formato `MAJOR.MINOR.PATCH`: MAJOR para incompatibilidades, MINOR para funcionalidades compatíveis e PATCH para correções compatíveis. O fluxo de release é: estabilizar em `release/<versão>`, validar a aplicação, atualizar `CHANGELOG.md`, integrar em `main`, criar uma tag anotada (`vMAJOR.MINOR.PATCH`) e publicar a GitHub Release com as notas; depois integrar a release de volta em `develop`. Hotfixes incrementam PATCH e também são integrados em `develop`.

Este projeto ainda não possui tags ou releases; a primeira versão só deve ser marcada após integrar e validar as alterações atuais.

## Sobre o projeto

A página da ONG Esperança reúne uma apresentação institucional, indicadores ilustrativos, projetos sociais e uma área de contato com formulário. O objetivo acadêmico é praticar estruturação em HTML e estilização responsiva com CSS, aplicando um Design System simples e reutilizável.

## Tecnologias

- HTML5
- CSS3, incluindo CSS Grid, Flexbox, variáveis customizadas, media queries e transições
- JavaScript ES Modules para menu, formulário, cartões, armazenamento e navegação SPA
- Vite 7 para desenvolvimento, bundling e minificação de produção
- WebP para a logo otimizada entregue ao navegador

O projeto é estático: não possui backend nem processamento real de doações ou envio do formulário.

## Estrutura de arquivos

```text
.
├── index.html
├── html/
│   └── projeto.html
├── css/
│   └── ONG.css
├── imagens/
│   ├── Logo-ong-esp.webp  # logo otimizada usada pela aplicação
│   ├── Logo-ong-esp.png
│   ├── alertaincorreto.jpeg
│   ├── file.jpeg
│   ├── file.png  # cópia não referenciada da logo
│   └── validação.jpeg
├── js/
│   ├── bootstrap.js
│   └── modules/
│       ├── storage.js
│       ├── project-cards.js
│       ├── form.js
│       └── navigation.js
├── package.json
├── package-lock.json
├── vite.config.js
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
└── README.md
```

`js/bootstrap.js` é o ponto de entrada e inicializa os módulos ES; `dist/` é gerado pela build e não é versionado.

## Pré-requisitos

- Node.js 22.12 ou superior e npm 10+ para instalar dependências, desenvolver e gerar a build.
- Navegador atualizado com suporte a HTML5, CSS Grid, JavaScript ES Modules e `<dialog>`.

## Dependências

O Vite é uma dependência de desenvolvimento, fixada no `package-lock.json`. Instale as dependências com `npm ci`. Elas são necessárias para desenvolvimento/build, não são carregadas pelo site publicado; a build final é estática.

## Build de produção

Vite processa as entradas HTML, agrupa os ES Modules, minifica HTML/CSS/JavaScript e gera assets com nomes versionados em `dist/`. A logo PNG de origem foi convertida para WebP; o arquivo WebP usado pela página tem cerca de 28 KB, contra cerca de 300 KB do PNG.

```bash
npm ci
npm run build
```

O diretório `dist/` é um artefato gerado e está excluído do Git.

## Execução local

Para desenvolvimento com servidor e recarga automática:

```bash
npm run dev
```

Para testar a versão minificada de produção localmente:

```bash
npm run build
npm run preview
```

Abra a URL indicada pelo Vite, normalmente `http://localhost:4173/`.

## Deploy

O workflow `.github/workflows/deploy-pages.yml` executa em pushes para `main`: instala a versão travada do Vite, constrói `dist/` e publica o artefato no GitHub Pages. Nas configurações do repositório, selecione **Settings → Pages → Build and deployment → GitHub Actions**. A publicação só ocorrerá depois de as alterações serem integradas e enviadas para `main` e Pages estar habilitado.

## Testes

Não existe ainda uma suite automatizada nem um comando `npm test`. A build verifica bundling e referências de assets; a validação funcional continua manual no navegador:

- Navegue pelas seções e cartões; teste Voltar/Avançar e acesso direto por hash.
- Envie o formulário vazio, com e-mail inválido, telefone malformado e dados válidos.
- Marque a preferência de projeto, recarregue a página e desmarque para testar restauração e remoção do `localStorage`.
- Teste menu e formulário com teclado, reduza o movimento e verifique larguras de 320 px a desktop.
- Confira console, links de assets e, antes de produção, execute uma auditoria WCAG automatizada e com leitor de tela.

Para verificar whitespace no diff antes de um commit, execute `git diff --check`; isso não substitui os testes funcionais.

## Design System

As variáveis visuais estão centralizadas em `:root` no arquivo `css/ONG.css`.

### Cores

- **Primárias:** `--color-primary-900` (`#123c64`), `--color-primary-700` (`#1d5a8a`) e `--color-primary-100` (`#dfeefb`).
- **Secundárias:** `--color-secondary-600` (`#2d9c74`) e `--color-secondary-800` (`#1f7a5a`).
- **Destaque:** `--color-accent-500` (`#e07a5f`).
- **Neutras:** `--color-neutral-900` (`#2d2f31`), `--color-neutral-700` (`#454a4f`), `--color-neutral-300` (`#dbe3ee`), `--color-neutral-200` (`#eaeef4`), `--color-neutral-50` (`#f4f7fb`) e `--color-white` (`#ffffff`).
- **Apoio:** `--color-focus` (`rgba(29, 90, 138, 0.2)`) e `--color-shadow` (`rgba(18, 60, 100, 0.12)`).

Azuis reforçam confiança e estabilidade; verdes remetem a cuidado e ação social. Tons neutros mantêm o conteúdo legível e organizado.

### Tipografia

A família tipográfica é definida por `--font-family-sans` (`Arial, Helvetica, sans-serif`). A escala contém oito tamanhos:

| Variável | Tamanho |
| --- | ---: |
| `--font-size-xs` | `0.8rem` |
| `--font-size-sm` | `0.95rem` |
| `--font-size-base` | `1rem` |
| `--font-size-lg` | `1.05rem` |
| `--font-size-xl` | `1.5rem` |
| `--font-size-2xl` | `2rem` |
| `--font-size-3xl` | `2.5rem` |
| `--font-size-display` | `3rem` |

Títulos também usam `clamp()` para se ajustarem a diferentes larguras de tela.

### Espaçamento

A escala modular é baseada em múltiplos de 4 px e é aplicada em margens, preenchimentos e intervalos entre componentes:

| Variável | Valor |
| --- | ---: |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

## Layout responsivo

O CSS define `--grid-columns: repeat(12, minmax(0, 1fr))` e reutiliza essa grade de 12 colunas no cabeçalho, na apresentação, nos projetos e na área de contato. Os elementos ocupam spans diferentes conforme a largura disponível: em telas pequenas ficam empilhados; em telas maiores, distribuem-se em colunas.

A folha de estilos contém cinco cenários responsivos:

| Regra | Aplicação geral |
| --- | --- |
| `max-width: 479px` | Celulares estreitos; conteúdo empilhado e botões em coluna. |
| `min-width: 480px` | Projetos passam a duas colunas; cabeçalho inicia a distribuição em duas linhas. |
| `min-width: 768px` | Cabeçalho em uma linha; apresentação e contato lado a lado. |
| `min-width: 1024px` | Projetos em três colunas e mais espaço para a apresentação. |
| `min-width: 1440px` | Container ampliado e proporções ajustadas para telas panorâmicas. |
| `max-width: 767px` | Exibe o botão hambúrguer e transforma a navegação em menu recolhível. |

No desktop, o submenu de projetos aparece ao passar o cursor ou ao navegar por foco (`:hover` e `:focus-within`). Em telas menores que 768 px, o botão altera `aria-expanded` e a classe `.is-active` da navegação; os links do submenu ficam disponíveis dentro do menu aberto. A interação também permite fechar com Escape, clique fora do menu ou seleção de um link.

## Navegação SPA

Os links internos são interceptados por `js/modules/navigation.js`. A aplicação atualiza o hash e o histórico do navegador e troca a seção ativa dentro de `<main>` com `replaceChildren()`, reutilizando os nós existentes para preservar listeners e estado do formulário. A navegação também responde a URLs diretas e aos controles Voltar/Avançar; um status acessível anuncia a seção ativa.

## Organização JavaScript

- `js/modules/storage.js`: leitura, gravação e remoção da preferência no `localStorage`.
- `js/modules/project-cards.js`: dados e renderização dos cartões a partir do `<template>`.
- `js/modules/form.js`: validação, feedback e integração com a API de armazenamento.
- `js/modules/navigation.js`: menu responsivo, rotas SPA, hash e histórico.
- `js/bootstrap.js`: importa os módulos e os inicializa na ordem necessária.

Os módulos usam `import`/`export` ES e são agrupados pelo Vite. O navegador recebe arquivos estáticos minificados; dependências NPM são necessárias apenas para desenvolvimento e build. Execute a aplicação por `npm run dev` ou `npm run preview`, não diretamente por `file://`.

## Templates de conteúdo

Os cartões de projeto usam o elemento HTML5 `<template id="project-card-template">` em `html/projeto.html`. O array `projects` em `js/modules/project-cards.js` contém IDs, títulos, descrições e estados. Para cada registro, o script clona o fragmento com `cloneNode(true)`, preenche os nós com `textContent` e anexa o cartão à grade. Os IDs também alimentam as rotas do submenu e da navegação SPA, mantendo conteúdo e navegação sincronizados sem duplicar marcação ou inserir strings de dados com `innerHTML`.

## Uso de Flexbox

O Flexbox complementa o Grid no alinhamento interno dos componentes:

- `.main-nav ul`: distribui links, centraliza e permite quebra de linha.
- `.cta-group`: organiza os botões e permite quebra; em telas estreitas, fica em coluna.
- `.hero-card`: empilha o título e a lista de indicadores.
- `.hero-card ul`: organiza os indicadores verticalmente.
- `.hero-card li`: alinha número e rótulo, permitindo quebra quando necessário.
- `.project-card`: empilha título e descrição com espaçamento uniforme.

## Componentes de feedback

- `.project-badge`: identifica projetos em andamento com uma cor semântica da paleta.
- `.form-alert[role="alert"]`: resume erros no envio e direciona o foco para o primeiro campo inválido.
- `.field-message`: apresenta feedback associado ao campo por `aria-describedby`; `aria-invalid` informa erro às tecnologias assistivas.
- `.toast[role="status"]`: confirma a validação por até seis segundos e pode ser fechada manualmente. A mensagem explicita que o protótipo não envia nem armazena dados.
- `dialog#feedback-dialog`: explica o comportamento demonstrativo do formulário; usa o elemento nativo `<dialog>`.

O módulo `js/modules/form.js` valida os campos no navegador. Em uma integração futura, o backend poderá atualizar essas mesmas regiões com estados de processamento, sucesso ou falha da requisição, sem alterar a estrutura visual ou anunciar uma confirmação antes da resposta real do servidor.

O nome obrigatório não aceita conteúdo composto apenas por espaços. O telefone é opcional, mas, quando preenchido, aceita de 8 a 15 dígitos e somente números, espaços ou os símbolos `+ ( ) . -`.

A opção “Lembrar esta escolha neste navegador” persiste somente o projeto de interesse em `localStorage`, usando JSON. A lógica fica em `js/modules/storage.js` e é consumida pelo módulo de formulário. A escolha é restaurada ao reabrir a página e removida quando a opção é desmarcada. Nome, e-mail e telefone não são gravados no armazenamento local; erros de acesso ao `localStorage` são tratados sem impedir o uso do formulário.

Capturas mobile dos estados de feedback: `imagens/alertaincorreto.jpeg`, `imagens/validação.jpeg` e `imagens/file.jpeg`.

Os caminhos relativos do HTML são `../css/ONG.css`, `../js/modules/`, `../js/bootstrap.js` e `../imagens/Logo-ong-esp.png`. Todos os scripts usam `defer` e aparecem em ordem de dependência. Mantenha `html/`, `css/`, `imagens/` e `js/` no mesmo nível.

## Acessibilidade e melhorias futuras

A página inclui idioma `pt-BR`, landmarks semânticos, link “Pular para o conteúdo principal”, foco visível em links, campos e controles, rótulos associados, mensagens de validação relacionadas aos campos e anúncios com regiões `role="alert"`/`role="status"`. `prefers-reduced-motion` reduz as animações e o scroll suave; `prefers-contrast: more` ativa uma paleta adaptativa com texto e bordas reforçados.

Na verificação manual em navegador, o texto branco no botão primário apresenta contraste aproximado de `5.26:1`, e a tag de seção apresenta `9.29:1` sobre seu fundo renderizado, ambos acima de `4.5:1`. O foco usa contorno azul opaco; os testes de teclado confirmaram o link de salto e o foco da checkbox. A paleta de alto contraste é aplicada quando o sistema operativo solicita essa preferência.

Esta revisão é manual e não representa certificação completa WCAG 2.1 AA. Antes de produção, ainda são recomendados testes com leitor de tela, ampliação/reflow a 200% e 400%, combinações adicionais de cores e ferramenta automatizada de acessibilidade. O formulário é demonstrativo e não envia dados.
