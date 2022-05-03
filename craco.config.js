const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = (dir) => path.resolve(__dirname, dir);
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs-extra');

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.entry = {
                // 用于页面中控制视频播放
                controller: resolve('./src/controller.tsx'),
                // 用于弹窗的显示
                main: resolve('./src/index.tsx'),
                // 用于在后台运行
                background: resolve('./src/background.ts'),
            };
            webpackConfig.output.filename = 'static/[name].js';
            return webpackConfig;
        },
        plugins: {
            remove: ['HtmlWebpackPlugin'],
            add: [
                new HtmlWebpackPlugin({
                    inject: true,
                    chunks: [],
                    template: './public/index.html',
                    filename: 'index.html',
                }),
                new CopyPlugin({
                    patterns: [
                        {
                            from: resolve(
                                './public/(controller|manifest|logo).js'
                            ),
                            to: resolve('./dist/[name].js'),
                        },
                    ],
                }),
            ],
        },
    },
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
        return devServerConfig;
    },
};
