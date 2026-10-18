# Automação de Testes — Cypress + TypeScript

Projeto de automação de testes de API e interface desenvolvido como POC, utilizando Cypress e TypeScript.

## Tecnologias

- Cypress + TypeScript
- Restful Booker — testes de API
- Sauce Demo — testes de interface
- Page Object Model (POM)
- Mochawesome — relatórios HTML
- GitHub Actions — integração contínua

## Pré-requisitos

- Node.js 22 ou superior
- npm
- Git

## Instalação e execução

Clone o repositório:

```bash
git clone https://github.com/samara-c/automation-challenge-cypress-typescript.git
cd automation-challenge-cypress-typescript
npm install
```

Execute todos os testes:

```bash
npm test
```

Abra a interface do Cypress:

```bash
npm run cy:open
```

## Estrutura do projeto

```text
cypress/
├── api/       # Clientes HTTP
├── e2e/
│   ├── api/   # Testes de API
│   └── ui/    # Testes de interface
├── pages/     # Page Objects
└── support/   # Configurações compartilhadas
```

## Cobertura de testes

| Área | Cenários | Prioridade | Automatizado |
|---|---|---|---|
| API | Autenticação válida e inválida | Alta | Sim |
| API | Criar, consultar, atualizar e excluir reservas | Alta | Sim |
| API | Reserva inexistente | Alta | Sim |
| API | Atualização e exclusão sem token ou com token inválido | Alta | Sim |
| Interface | Exibição da tela de login e login válido | Alta | Sim |
| Interface | Credenciais inválidas e usuário bloqueado | Alta | Sim |
| Interface | Adição e conferência de produto no carrinho | Média | Sim |
| Interface | Compra completa até a confirmação | Alta | Sim |
| Interface | Validação de campo obrigatório no checkout | Alta | Sim |
| Interface | Logout | Alta | Sim |

## Decisões técnicas

- **POM na interface:** centraliza seletores e ações das páginas, facilitando a manutenção.
- **API Clients no backend:** `AuthApi` e `BookingApi` reutilizam chamadas HTTP sem aplicar Page Objects a recursos de API.
- **TypeScript:** interfaces definem os formatos dos dados e das respostas.
- **Dados dinâmicos:** IDs são obtidos durante a execução, evitando dependência de reservas preexistentes.
- **Mochawesome:** gera relatórios HTML para análise dos resultados.
- **GitHub Actions:** executa os testes em pushes e pull requests direcionados à branch `main`.

## Relatórios

Os relatórios são gerados no diretório `cypress/reports/`. Na esteira, o workflow tenta disponibilizar os relatórios e screenshots como artefatos por 14 dias.

## Limitações

- O Restful Booker é uma API pública compartilhada e pode apresentar instabilidade ou alterações nos dados.
- A execução depende da disponibilidade dos serviços externos.
- O `locked_out_user` valida o bloqueio de acesso, não uma compra completa com outro usuário autenticado.
- A cobertura do checkout pode ser ampliada com outras validações de formulário.

## Próximos passos

- Ampliar os testes negativos do checkout.
- Adicionar mais cenários de validação de payloads da API.
- Explorar outros perfis de usuário e cenários funcionais.
- Expandir a execução para outros navegadores.

## Referências

- [Cypress](https://docs.cypress.io/)
- [Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html)
- [Sauce Demo](https://www.saucedemo.com/)
- [Mochawesome Reporter](https://github.com/LironEr/cypress-mochawesome-reporter)
- [GitHub Actions](https://docs.github.com/actions)
