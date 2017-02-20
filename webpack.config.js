const path = require('path');

const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')

};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        app: PATHS.app
    },

      // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ['*', '.js', '.jsx']
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
        },
        // Set up jsx. This accepts js too thanks to RegExp
        {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need something
        // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
        loaders: ['babel-loader?cacheDirectory'],
        // Parse only app files! Without this it will go through entire project.
        // In addition to being slow, that will most likely result in an error.
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
        ]
    });
}

if(TARGET === 'build'){
    module.exports = merge(common, {
        devtools:'eval-source-map',
    });
}
