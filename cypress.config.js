const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,
  responseTimeout: 500,
  video: true,

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    baseUrl: 'https://commitquality.com/',
    specPattern: 'cypress/e2e/**/*.spec.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    env: {
      apiUrl: 'https://jsonplaceholder.typicode.com/',
    },
    setupNodeEvents(on, config) { },
  },
});
