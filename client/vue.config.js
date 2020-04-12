const path = require('path')

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/global.scss")]
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000/'
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  }
};