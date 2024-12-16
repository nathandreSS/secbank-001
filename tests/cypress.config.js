import { defineConfig } from "cypress";
import { queryDb } from "./cypress/plugins/index.js"
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on('task', {
        queryDb,
      });
    },
  },
});
