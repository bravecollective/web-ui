const devMode = process.env.NODE_ENV !== 'production'
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = [{
    entry: './sass/brave.scss',
    output: {
        // This is necessary for webpack to compile
        // But we never use style-bundle.js
        filename: 'style-bundle.js',
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'css/brave.css',
                    },
                },
                { loader: 'extract-loader' },
                { loader: 'css-loader' },
                { 
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            ['node_modules']
                        ]
                    }
                },
            ]
        }]
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
}];
