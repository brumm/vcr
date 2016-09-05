const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');
const ComponentResolverPlugin = require('component-resolver-webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

const cssConfig = {
  query: {
    modules: true,
    localIdentName: '[local]-[hash:base64:10]'
  }
}

var options = {
  type: 'react-app',

  webpack: {
    extra: {
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

options.webpack.extra.target = webpackTargetElectronRenderer(options.webpack.extra);

module.exports = options;
