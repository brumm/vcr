const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');
const ComponentResolverPlugin = require('component-resolver-webpack');

const cssConfig = {
  query: {
    modules: true,
    localIdentName: '[local]-[hash:base64:10]'
  }
}

module.exports = {
  type: 'react-app',

  webpack: {
    extra: {
      entry: path.resolve('./src/index.js'),
      resolve: {
        root: [path.resolve('./src')],
        extensions: ["", ".webpack.js", ".web.js", ".js", ".scss"]
      },
      output: {
        publicPath: ''
      },
      plugins: [
        new webpack.ResolverPlugin([
          new ComponentResolverPlugin()
        ])
      ],
    },
    html: {
      template: path.resolve('./src/index.html'),
      title: package.name
    },
    loaders: {
      'css': cssConfig,
      'sass-css': cssConfig
    }
  },

  babel: {
    stage: 0
  }
}
