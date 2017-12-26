const path = require('path');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.vue',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    modules: ['node_modules']
  },
  eslint: false,
  compilers: {
    less: {
      compress: true,
      plugins: [new LessPluginAutoPrefix({browsers: ['Android >= 2.3', 'Chrome > 20', 'iOS >= 6']})]
    },
    /*sass: {
      outputStyle: 'compressed'
    },*/
    babel: {
      sourceMap: false,
      presets: [
        //'env',
        "es2015",
        "stage-1"
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
        "syntax-export-extensions"
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {

  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {compress: true}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
        compress: {
          warning: false,
          drop_console: true
        }
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 60
        },
        png: {
          quality: 60
        }
      }
    }
  }
}
