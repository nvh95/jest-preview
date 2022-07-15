import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "nophho",
  e2e: {
    supportFile: "support/e2e.{js,jsx,ts,tsx}",
    specPattern: "e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
