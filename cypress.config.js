module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.preferences.default.intl = {
            accept_languages: "en-US,en",
            selected_languages: "en-US,en",
          };
          return launchOptions;
        }
      });
    },
    baseUrl: 'https://trello.com',
    watchForFileChanges: false
  },
};
