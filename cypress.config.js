const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: 'http://google.com',
    specPattern: 'cypress/e2e/**/*.spec.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    env: {
      apiUrl: 'https://jsonplaceholder.typicode.com/',
    },
    setupNodeEvents(on, config) { },
  },
});
