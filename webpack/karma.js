import config        from './config';
import webpackConfig from './webpack.config';

const paths = config.get('utils_paths');

const globals = config.get('globals');

let loader = {loaders : webpackConfig.module.loaders};
loader.postLoaders = [{
        test: /\.(js|jsx?)$/,
        exclude: /(test|node_modules)/,
        loader: 'istanbul-instrumenter'
    }];
function makeDefaultConfig (karmaConfig) {
  return {
    basePath: '../',
    files : [
       './test/testRunner.js',
      {pattern: 'src/assets/**/*.*', watched: false, included: false, served: true}
    ],
    proxies : {
      '/assets/': '/base/src/assets/'
    },
    singleRun  : false,
    frameworks : ['mocha', 'sinon-chai', 'phantomjs-shim'],
    preprocessors : {
      ['src/**/*.js']: ['coverage'],
      ['./test/testRunner.js'] : ['webpack'],
    },
    reporters: [
      'mocha',
      'coverage',
      'html'
    ],
    htmlReporter: {
      outputDir: 'test-result/html/result', // where to put the reports  
      templatePath: null, // set if you moved jasmine_template.html 
      focusOnFailures: true, // reports show failures on start 
      namedFiles: false, // name files instead of creating sub-directories 
      pageTitle: null, // page title for reports; browser info by default 
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs 
      reportName: 'report-summary-filename', // report summary filename; browser info by default 
      
      
      // experimental 
      preserveDescribeNesting: false, // folded suites stay folded  
      foldAll: false, // reports start folded (only with preserveDescribeNesting) 
    },
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      },
      output: 'full'
    },
    coverageReporter: {
      type : 'html',
      dir : 'test-result/html/coverage'
    },
    browsers : ['Chrome'],
    webpack : {
      devtool : 'inline-source-map',
      resolve : webpackConfig.resolve,
      plugins : webpackConfig.plugins
        .filter(p => !p.__KARMA_IGNORE__),
      module  : loader
    },
    webpackMiddleware : {
      noInfo : true
    },

    plugins : [
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-mocha'),
      require('karma-sinon-chai'),
      require('karma-phantomjs-launcher'),
      require('karma-phantomjs-shim'),
      require('karma-mocha-reporter'),
      require('karma-coverage'),
      require('karma-html-reporter'),
      require('istanbul-instrumenter-loader')
    ]
  };
}

export default (karmaConfig) => karmaConfig.set(makeDefaultConfig(karmaConfig));
