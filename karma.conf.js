// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    
    browsers: ['ChromeHeadlessCI'],

    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-extensions',
          '--disable-dev-shm-usage',
          '--headless',
          '--remote-debugging-port=9222'
        ]
      }
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/its-app-frontend'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false, // Generalmente false en CI
    singleRun: true, // ¡MUY IMPORTANTE para CI/CD! Los tests se ejecutan una vez y luego Karma se cierra.
    restartOnFileChange: false, // Generalmente false en CI

    // AÑADIDO: Aumentar timeouts para ChromeHeadless en CI
    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 3,   // default 0
    browserNoActivityTimeout: 60000, // default 10000
    captureTimeout: 200000           // Aumentamos a 200 segundos (200000 ms) para dar más tiempo.
  });
};