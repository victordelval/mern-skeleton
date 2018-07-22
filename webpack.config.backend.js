const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const CURRENT_WORKING_DIR = process.cwd()

const config = {
  name: "server",
  entry: [path.join(CURRENT_WORKING_DIR, './backend/server.js')],
  target: "node",
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/'),
    filename: "backend.generated.js",
    publicPath: '/dist/',
    libraryTarget: "commonjs2"
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  }
}

module.exports = config
