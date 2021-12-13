"use strict";

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (isDevelopment) => {
    return {
        minimize: !isDevelopment,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: ['default']
                }
            }),
            new TerserPlugin()
        ]
    };
};
