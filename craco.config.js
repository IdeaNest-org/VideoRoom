const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
    webpack: {
        alias: {
            '@': resolve('src'),
        },
        configure: (webpackConfig, { env, paths }) => {
            // 增加ts支持
            webpackConfig.entry = {
                main: webpackConfig.entry,
                background: resolve('./src/background.js'),
            };
            webpackConfig.output.filename = 'static/[name].js';
            return webpackConfig;
        },
        plugins: {
            remove: ['HtmlWebpackPlugin'],
            add: [
                new HtmlWebpackPlugin({
                    inject: true,
                    chunks: ['main'],
                    template: './public/index.html',
                    filename: 'index.html',
                }),
            ],
        },
    },
};
