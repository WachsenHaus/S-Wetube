"use strict";

var path = require("path");

var autoprefixer = require("autoprefixer");

var ExtractCSS = require("extract-text-webpack-plugin");

var MODE = process.env.WEBPACK_ENV;
var ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
var OUTPUT_DIR = path.join(__dirname, "static"); // mode: MODE.replace(/\s/g, ""),

var config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.(scss)$/,
      use: ExtractCSS.extract([{
        loader: "css-loader"
      }, {
        loader: "postcss-loader",
        options: {
          plugins: function plugins() {
            return [autoprefixer({
              browsers: "cover 99.5%"
            })];
          }
        }
      }, {
        loader: "sass-loader"
      }])
    }]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
}; //entry는 어디서 파일이 왔는가
//output은 어디에 넣을 것인가?를 의미한다.

module.exports = config;