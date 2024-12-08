const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
   entry: { main: './src/components/index.js' },  // Corrected path
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.[contenthash].js',
      publicPath: '',
   },
   mode: 'development',
   devServer: {
      static: path.resolve(__dirname, './dist'),
      compress: true,
      port: 8080,
      open: true,
   },
   module: {
      rules: [
         // Process JS with Babel
         {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
         },
         // Process CSS
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
         },
         // Process images
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
         // Process fonts
         {
            test: /\.(woff(2)?|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },
      ],
   },
   plugins: [
      // Generate HTML
      new HtmlWebpackPlugin({
         template: './src/index.html',
      }),
      // Clean the dist folder before building
      new CleanWebpackPlugin(),
      // Extract CSS into a separate file
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css',
      }),
   ],
   optimization: {
      minimize: true, // Minification
      minimizer: [
         new CssMinimizerPlugin(), // CSS minification
      ],
   },
};
