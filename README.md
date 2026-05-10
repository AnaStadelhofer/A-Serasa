# Teste Técnico

Esse projeto foi criado para um teste técnico criado pela empresa Meta. Nele foi automatizado uma api do jsonplaceholder e testes de funcionalidade, usando o padrão page objects.

## Tecnologias
- [Cypress](https://www.cypress.io/) — E2E e API
- [Mochawesome](https://github.com/adamgruber/mochawesome) — Relatórios

---

## Pré-requisitos
- Ter node.js instalado
- Ter git instalado

---

## Instalação
Antes de instalar é necessário fazer o clone do projeto para sua máquina local para isso abra o CMD o seguinte comando:
```
git clone https://github.com/AnaStadelhofer/A-Serasa
```

Para instalar é necessário apenas executar o comando para baixar todas depêndencias do projeto:
```bash
npm install
```

## Como executar

| Comando | Descrição |
|---|---|
| `npm run cy:open` | Abre o Cypress no modo interativo |
| `npm run cy:run` | Executa todos os testes |
| `npm run cy:run:api` | Executa apenas os testes de API |
| `npm run cy:run:e2e` | Executa apenas os testes E2E |
| `npm run reports:generate` | Executa todos os testes e gera o relatório |

---

## Relatório
Após rodar `npm run reports:generate` o relatório estará em `cypress/reports`
