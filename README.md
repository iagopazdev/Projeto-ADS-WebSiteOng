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

## Sobre o projeto

A página da ONG Esperança reúne uma apresentação institucional, indicadores ilustrativos, projetos sociais e uma área de contato com formulário. O objetivo acadêmico é praticar estruturação em HTML e estilização responsiva com CSS, aplicando um Design System simples e reutilizável.

## Tecnologias

- HTML5
- CSS3, incluindo CSS Grid, Flexbox, variáveis customizadas, media queries e transições
- JavaScript para controlar o menu hambúrguer responsivo

O projeto é estático: não possui backend nem processamento real de doações ou envio do formulário.

## Estrutura de arquivos

```text
.
├── projeto.html
├── ONG.css
└── Imagens/
    └── Logo-ong-esp.png  # arquivo referenciado pela página
```

## Design System

As variáveis visuais estão centralizadas em `:root` no arquivo `ONG.css`.

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

O JavaScript atual valida os campos no navegador. Em uma integração futura, o backend poderá atualizar essas mesmas regiões com estados de processamento, sucesso ou falha da requisição, sem alterar a estrutura visual ou anunciar uma confirmação antes da resposta real do servidor.

Capturas mobile dos estados de feedback: `alertaincorreto.jpeg`, `validação.jpeg` e `file.jpeg`.

## Como visualizar

Não é necessário instalar dependências ou ter conexão com a internet. Abra `projeto.html` diretamente no navegador ou, em Linux, execute no terminal dentro da pasta do projeto:

```bash
xdg-open projeto.html
```

Mantenha `ONG.css` na mesma pasta de `projeto.html`. A imagem da logo deve estar no caminho `Imagens/Logo-ong-esp.png`, conforme a referência no HTML.

## Acessibilidade e melhorias futuras

A paleta prioriza texto escuro sobre fundos claros, hierarquia tipográfica e espaçamentos consistentes. Como próximos passos, recomenda-se validar o contraste das cores de texto e dos estados de foco, conferir a navegação por teclado e testar o layout em navegadores e tamanhos de tela variados. O formulário é demonstrativo e não envia dados.
