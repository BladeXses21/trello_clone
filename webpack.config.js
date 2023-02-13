var webpack = require('webpack');
const path = require('path');

module.exports = {
    plugins: [
      new webpack.ProvidePlugin({
             process: 'process/browser',
      }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            },
        ]
    },
};