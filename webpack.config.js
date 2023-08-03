/** @format */
const path = require("path");
const APP_DIR = path.join(__dirname, "src");
const OUTPUT_DIR = path.join(__dirname, "dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VENDOR_LIBS = ["react", "react-dom", "react-router-dom"];

module.exports = {
  entry: {
    bundle: APP_DIR + "/app.js",
    vendor: VENDOR_LIBS,
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[hash].js",
    assetModuleFilename: "images/[hash][ext][query]",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: ["@babel/preset-react", "@babel/preset-env"],
          plugins: ["@babel/plugin-syntax-dynamic-import"],
        },
        // use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\/s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
    hot: true,
    port: 9000,
    compress: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "common",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
