const path = require('path');

module.exports = {
    entry: './frontend/src/index.jsx',
    output: {
        path: __dirname + '/public/javascripts',
        filename: 'bundle.js'
        // path: path.resolve(__dirname),
        // filename: 'public/javascripts/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react']
                    }
                },
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".jsx", "*"]
    }
};