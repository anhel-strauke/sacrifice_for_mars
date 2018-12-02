const path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'release'),
        filename: 'main.bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                }
            },
            exclude: /node_modules/
        }]
    },
    devtool: "source-map",
    devServer: {
        contentBase: "."
    }
}