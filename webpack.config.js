const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
    entry: './sass/brave.scss',
    output: {
        // This is necessary for webpack to compile
        // But we never use style-bundle.js
        filename: 'style-bundle.js',
        path: path.resolve(__dirname, './dist'),
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
    plugins: [
        new CopyWebpackPlugin([
            { from: './node_modules/daemonite-material/js/material.min.js', to: 'js/' },
            { from: './node_modules/daemonite-material/js/material.min.js.map', to: 'js/' },
            { from: './node_modules/jquery/dist/jquery.slim.min.js', to: 'js/jquery.slim.min.js' },
            { from: './node_modules/jquery/dist/jquery.slim.min.map', to: 'js/jquery.slim.min.map' },
            { from: './node_modules/jquery/dist/jquery.min.js', to: 'js/jquery.min.js' },
            { from: './node_modules/jquery/dist/jquery.min.map', to: 'js/jquery.min.map' },
            { from: './node_modules/popper.js/dist/umd/popper.min.js', to: 'js/popper.min.js' },
            { from: './node_modules/popper.js/dist/umd/popper.min.js.map', to: 'js/popper.min.js.map' },
            { from: './node_modules/pickadate/lib/compressed', to: 'pickadate' },
            { from: './node_modules/bootstrap/dist/js/bootstrap.min.js', to: 'js/bootstrap.min.js' },
            { from: './node_modules/bootstrap/dist/js/bootstrap.min.js.map', to: 'js/bootstrap.min.js.map' },
        ])
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { safe: true },
            })
        ]
    },
});
