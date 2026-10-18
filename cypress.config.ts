
import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório de Automação Cypress',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
  },

  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',

    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },

  expose: {
    apiUrl: 'https://restful-booker.herokuapp.com',
  },
});
