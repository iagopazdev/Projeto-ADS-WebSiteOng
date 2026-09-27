# Guia de contribuição

## Issues e planejamento

Abra uma Issue antes de iniciar trabalho relevante. Use o formulário de bug para comportamentos reproduzíveis e o de melhoria para uma necessidade do usuário. Inclua passos, resultado esperado, ambiente e critérios de aceitação. Não publique nomes, e-mails, telefones ou outros dados pessoais reais.

Associe cada Issue a uma milestone com escopo definido. Milestones são metadados do GitHub e precisam ser criadas no repositório remoto; a proposta inicial abaixo serve como roteiro para cadastrá-la.

### Milestone proposta: `v0.1.0 - Consolidação frontend`

Objetivo: preparar a versão demonstrativa estática para entrega acadêmica, com estrutura, acessibilidade básica, validação, documentação e publicação verificadas.

Critérios para concluir:

- [ ] Estrutura `html/`, `css/`, `imagens/` e `js/` íntegra e documentada.
- [ ] Navegação SPA, templates, módulos e persistência local testados.
- [ ] Formulário valida os dados e informa claramente que não envia dados ao servidor.
- [ ] Fluxos principais verificados por teclado e em viewports móveis e desktop.
- [ ] Contrastes e estados de foco revisados; limitações da auditoria manual registradas.
- [ ] Instruções de execução e publicação documentadas.
- [ ] Alterações integradas em `main` e changelog revisado antes de marcar a versão.

Não atribua data de vencimento ou feche a milestone enquanto esses critérios não forem revistos.

## Branches

- `main`: versões estáveis.
- `develop`: integração contínua.
- `feature/<nome>`: novas funcionalidades, criada a partir de `develop` e integrada de volta a ela.
- `release/<versão>`: estabilização antes da publicação em `main`.
- `hotfix/<descrição>`: correção urgente baseada em `main`, integrada em `main` e `develop`.

## Commits

Use Conventional Commits no formato `tipo(escopo): resumo`, por exemplo `fix(form): rejeita nome composto por espaços`. Tipos usuais: `feat`, `fix`, `docs`, `style`, `refactor`, `test` e `chore`. Para alterações incompatíveis, use `!` ou explique `BREAKING CHANGE:` no corpo.

## Pull requests

Abra PR da branch de trabalho para `develop`; para uma release, use `release/*` para `main` e sincronize de volta com `develop`. Vincule a Issue, descreva o motivo e a solução, registre testes manuais/automatizados, impacto de acessibilidade e instruções de publicação. Não faça merge antes de revisar o checklist do template e confirmar os critérios de aceitação.

Como o projeto é mantido individualmente, a revisão pode ser uma auto-revisão documentada; o PR continua servindo como registro do escopo, da validação e da integração. Não faça merge de um PR que inclua credenciais, dados pessoais reais ou arquivos temporários.
