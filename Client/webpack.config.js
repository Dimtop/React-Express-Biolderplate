const path = require('path');
 module.exports = {
    // define entry file and output
    entry: ["babel-polyfill", './src/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    // define babel loader
    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                secure: false,
                changeOrigin: true
            },
            
         
            
        },
        historyApiFallback :true
    }
      
};