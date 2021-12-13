const { join, resolve } = require('path');

const plugins = require('./webpack/plugins');
const rules = require('./webpack/rules');
const optimization = require('./webpack/optimization');

module.exports = async (env, argv) => {

    const isDevelopment = argv.mode === 'development';
    const HOST = isDevelopment ? 'localhost' : env.HOST
    const PORT = isDevelopment ? 3001 : env.PORT
    const API_ENDPOINT = process.env.API_ENDPOINT || '';
    const BASE_URL = process.env.BASE_URL || '';

    return {
        mode: argv.mode,
        cache: false,
        context: resolve(__dirname),
        devServer: {
            compress: true,
            historyApiFallback: true,
            host: HOST,
            open: true,
            port: PORT,
            static: [
                {
                    publicPath: '/'
                }
            ]
        },
        entry: resolve(__dirname, "src/index.js"),
        output: {
            path: join(__dirname, '/dist'),
            publicPath: '/',
            filename: '[name].bundle.js'
        },
        plugins: plugins(isDevelopment, API_ENDPOINT, BASE_URL),
        module: {
            rules: rules()
        },
        optimization: optimization(isDevelopment),
        stats: {
            builtAt: true,
            colors: true,
            entrypoints: false,
            modules: false
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@': resolve(__dirname, 'src/')
            },
        },
    }
}