const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => ({
    entry: path.resolve(__dirname, '../src/index.js'),
    mode: env.NODE_ENV,
    output: {
        filename: 'ch.js',
        path: path.resolve(__dirname, '../assets'),
    },
    module: {
        rules: [{
                test: /\.s?css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('postcss-import')(),
                                require('postcss-preset-env')(),
                                // require('postcss-liquid-variables')(),
                                // require('cssnano')()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'ch.css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ]
});