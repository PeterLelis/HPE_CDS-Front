try {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
} catch (e) {
}

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
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter') // <--- AÑADIR ESTA LÍNEA
    ],
    client: {
      clearContext: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/its-app-frontend'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    // Modificar la línea de reporters para incluir 'junit'
    reporters: ['progress', 'kjhtml', 'junit'], // <--- MODIFICAR ESTA LÍNEA
    
    // AÑADIR LA SECCIÓN DE CONFIGURACIÓN PARA JUNIT REPORTER
    junitReporter: {
      outputDir: '', // Directorio donde se generará el reporte. Vacío significa el basePath.
      outputFile: 'report.xml', // Nombre del archivo de reporte.
      useBrowserName: false, // Opcional: si quieres incluir el nombre del navegador en el nombre del archivo.
      properties: {}
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};