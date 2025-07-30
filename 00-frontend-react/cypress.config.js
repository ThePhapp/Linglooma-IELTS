import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4028',
    defaultCommandTimeout: 5000, // tăng timeout mặc định
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
