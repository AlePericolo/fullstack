"use strict";

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    return [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.s[ac]ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: false
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                },
                'postcss-loader',
                {
                    loader: 'sass-loader',
                }
            ]
        }
    ]
};
