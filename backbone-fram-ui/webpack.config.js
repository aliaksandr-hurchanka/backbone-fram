'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var ENV_DEV = true;

module.exports = {
    context: __dirname,
    entry: {
        tasksys: path.resolve(__dirname, './app/task-system-app/taskSysApp'),
        vendor: [
            'underscore',
            'backbone',
            'jquery',
            'bootstrap-sass!./bootstrap-sass.config.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, './build/scripts'),
        filename: '[name].bundle.js'
    },
    resolve: {
        root: path.resolve(__dirname, './build'),
        extensions: ['', '.js', '.tpl', '.less', '.sass']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { 
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            { 
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    watch: ENV_DEV,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: (ENV_DEV ? 'source-map' : null)
};

if (!ENV_DEV) {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: false,
        exclude: /.\.min\.js$/i
    }));
}
