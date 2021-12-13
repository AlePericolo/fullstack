"use strict";

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (isDevelopment, API_ENDPOINT, BASE_URL) => {
    return [
        new HtmlWebpackPlugin({
            template: "src/index.ejs",
            filename: 'index.html',
            minify: !isDevelopment,
            favicon: './src/assets/icons/favicon.ico',
            window: {
                endpoint: {
                    api: API_ENDPOINT,
                    base: BASE_URL
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/assets/images", to: "assets/images" },
                { from: "src/assets/icons", to: "assets/icons" }
            ],
        }),
        ...cleareDist(isDevelopment)
    ];
};

const cleareDist = (isDevelopment) => {
    return isDevelopment ? [] : [new CleanWebpackPlugin()];
};