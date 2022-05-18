const path = require("path");

const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const dotEnv = require("dotenv-webpack");
const copyPlugin = require("copy-webpack-plugin");


module.exports = {
   mode: "development",
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
   },

   resolve: {
      extensions: [".js"],
   },

   module: {
      rules: [
         {
            test: /\.js$/,
            use: {
               loader: "babel-loader"
            },
            exclude: /node_modules/,

         },

         {
            test: /\.css|.scss$/i,
            use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"]
         },

         {
            test: /\.png$/i,
            type: "asset/resource",
            generator: {
               filename: "assets/img/[hash][ext][query]"
            }
         },

      ]
   },

   plugins: [
      new htmlWebpackPlugin({
         inject: true,
         template: "./public/index.html",
         filename: "./index.html"
      }),

      new miniCssExtractPlugin({
         filename: '[name].[contenthash].css'
      }),

      new dotEnv(),

      new copyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, 'src', 'img/'),
               to: "src/img"
            }
         ]
      })
   ],

   devServer: {
      https: true,
      port: 3000,
      // open: true,
      hot: false,
      liveReload: true,
   },

}