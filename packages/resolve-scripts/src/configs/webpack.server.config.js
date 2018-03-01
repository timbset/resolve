import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import path from 'path'
import babelConfig from '../constants/babelrc'

export default {
  name: 'Server',
  devtool: 'source-map',
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  output: {
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: babelConfig
          }
        ],
        exclude: [
          path.resolve(__dirname, '../../node_modules'),
          path.resolve(process.cwd(), '/node_modules')
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
    })
  ],
  externals: [nodeExternals()]
}
