const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: true,
    entry: [
        './src/index.ts',
        './src/scss/erstiweb.scss',
        './src/scss/erstiweb.noscript.scss'
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css']
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { outputPath: 'css/', name: '[name].css' }
                    },
                    'sass-loader'
                ]
            },
            { test: /\.ts?$/, loader: 'babel-loader' },
            { test: /\.ts?$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/index.html',
                },
                {
                    from: 'favicon.ico',
                },
                {
                    //Wildcard is specified hence will copy only css files
                    from: 'src/style/*.css', //Will resolve to RepoDir/src/css and all *.css files from this directory
                    to: 'css/', //Copies all matched css files from above dest to dist/css
                    flatten: true
                }
            ]
        })
    ]
};
