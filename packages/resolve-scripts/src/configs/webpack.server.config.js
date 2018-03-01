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
  resolve: {
    modules: [
      'node_modules',
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(__dirname, '../../node_modules')
    ]
  },
  output: {
    filename: 'server.js',
    devtoolModuleFilenameTemplate: '[resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[resource-path]?[hash]'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: babelConfig
          }
        ],
        exclude: [
          'node_modules',
          path.resolve(process.cwd(), 'node_modules'),
          path.resolve(__dirname, '../../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
    })
  ],
  externals: [
    nodeExternals(),
    nodeExternals({ modulesDir: path.resolve(process.cwd(), 'node_modules') }),
    nodeExternals({ modulesDir: path.resolve(__dirname, '../../node_modules') })
  ]
}
