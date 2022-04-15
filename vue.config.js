// const path = require('path');

module.exports = {
    // 静态资源打包输出目录 (js, css, img, fonts)，相应的url路径也会改变
    assetsDir: 'static',

    //这里禁止使用eslint-loader
    lintOnSave: false,

    pages: {
        index: {
            entry: 'src/main.js'
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        proxy: {
            // 代理服务器设置
            '/api': {
                target: 'http://127.0.0.1:8002/', // 需要将目前的地址代理至target
                ws: true,
                changeOrigin: true,
                secure: true,
                pathRewrite: {
                    ['^' + '/api']: '' // 将'/my_test_proxy' 重写为''
                }
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    }
};
