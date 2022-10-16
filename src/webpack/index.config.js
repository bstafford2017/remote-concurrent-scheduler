const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../../docs'),
    publicPath: '/remote-concurrent-scheduler'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../../docs')
    }
  },
  performance: {
    hints: false
  }
}
