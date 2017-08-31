module.exports = {
    entry: {
        'main': './src/main.js',
        'script': './src/script.js',
        'options': './src/options.js'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader',
            include: /src/,
        }, {
            test: /\.css$/,
            loader: 'css-loader',
            include: /src/,
            query: {
                modules: true,
                localIdentName: '[name]-[local]--[hash:base64:5]'
            }
        }]
    }
}