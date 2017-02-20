const path = require('path');

const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')

};

const common = {
    entry: {
        app: PATHS.app
    },

    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
        {
            // Test expects a RegExp! Note the slashes!
            test:/\.css$/,
            loaders:['style-loader','css-loader'],
            // Include accepts either a path or an array of paths
            include: PATHS.app
        }
        ]
    }
};

const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            contentBase: PATHS.build,

            //ENable history API fallback so HTML5 HIstory API based
            //routing works. Good default comes handy in complicated setups
            historyApiFallback: true,
            hot: true,
            inline: true,
            //progress: true,

            // Display only errors to reduce amount of ouput**
            stats: 'errors-only'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
            new NpmInstallPlugin({
                save:true // --save
            })
        ]
    });
}

if(TARGET === 'build'){
    module.exports = merge(common, {});
}
