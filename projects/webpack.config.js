const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, options) => {
  const isDevBuild = options.mode === 'development';
  const customPlugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false,
    }),
    new CopyPlugin([
      {
        from: './src/manifest.json',
        to: '[name].[ext]',
        force: true,
      },
      {
        from: './src/service-worker.js',
        to: '[name].[ext]',
        force: true,
      },
      {
        from: './src/assets/imgs/error.png',
        to: './assets/imgs/[name].[ext]',
        force: true,
      },
    ]),
    new WebpackAssetsManifest({
      output: 'asset-manifest.json',
    }),
    new BundleAnalyzerPlugin({
      // analyzerMode: 'server',
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false },
    }),
  ];

  if (!isDevBuild) customPlugins.push(new CleanWebpackPlugin());

  return {
    entry: './src/main.jsx',

    devServer: {
      host: 'localhost',
      port: 3030,
      contentBase: './build',
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    output: {
      filename: 'js/main.js',
      path: path.resolve(__dirname, 'build'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  return `${path.relative(path.dirname(resourcePath), context)}/`;
                },
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer()],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name(file) {
              if (isDevBuild) {
                return '[path][name].[ext]';
              }

              return '/assets/imgs/[folder]/[contenthash].[ext]';
            },
            publicPath: '../',
            useRelativePaths: true,
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
      ],
    },
    plugins: customPlugins,
  };
};
