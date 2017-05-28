var webpack = require("webpack");
var path = require('path');
var imports = require('imports-loader');


config = {
    entry: "./src/js/App.js",
    output: {
        path: __dirname,
        filename: "main.js",
        sourceMap: true
    },
    resolve: {
        alias: {
            "src": path.resolve(__dirname, 'src/'),
            "app": path.resolve(__dirname, 'src/js/app/'),
            "external": path.resolve(__dirname, 'src/js/external'),
            "platforms": path.resolve(__dirname, 'src/js/platforms')
        }
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            }
        ]
    }
};


module.exports = config;
