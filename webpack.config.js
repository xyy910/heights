const path = require('path');
const proxy = require('http-proxy-middleware')

var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin();
var plugins = process.env.ENV === 'prod' ? [
    assetsPluginInstance,
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
] : [];

module.exports = {
    entry: __dirname + '/src/index.js', //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    output: {
        path: __dirname,
        filename: 'bundle.js'  // 打包后文件
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: [
                            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }], // `style: true` 会加载 less 文件
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
        ]
    },

    plugins: plugins,

    devServer: {
        contentBase: './dist',
        hot: true,
        host: "0.0.0.0",
        port: 12121,
        disableHostCheck: true,
        proxy: {
            '/api/*':{
                target:"http://xyybendi.corp.elong.com:3000",
                secure:false,
                changeOrigin: true
            }
        }
    }
}