const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/main.jsx',
  
  devServer: {
	host: 'localhost',
	port: 3000,
	contentBase: './build'
  },
  
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      },
	  {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
	  {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
	  filename: "./index.html"
    })
  ]

};