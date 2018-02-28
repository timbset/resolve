import nodeExternals from 'webpack-node-externals'
import path from 'path'
import babelConfig from '../../../../.babelrc'

export default {
  name: 'server',
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
          path.join(__dirname, '../../node_modules'),
          path.join(process.cwd(), '/node_modules')
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
    })
  ],
  externals: [nodeExternals()],
  performance: {
    hints: false
  }
}
