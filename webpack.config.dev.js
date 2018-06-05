const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
      index:"./src/client/index.js"
      },
    output: {
        path: path.resolve(__dirname + '/src/dist'),
        filename: '[name].[hash:8].bundle.js' //webpack --inline --hot can not use chunkhash
     },
     optimization: {
      splitChunks: {
        chunks: "initial",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
            },
          vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all"
            }
        }
      },
        runtimeChunk: {
        "name": "manifest"
     }
    },
    devtool:'source-map',
    devServer: {
        hot: true,
        inline: true,
        progress:true,
        proxy:{ 
          '/': { 
            target: 'http://localhost:3000/login' 
            }
         },
        host:"localhost",
        port: 9001
      },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
            use: [
              {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/react',['@babel/preset-stage-0',{ "decoratorsLegacy": true }]],
                plugins: [
                  ["@babel/plugin-transform-runtime", {
                    "helpers": false,
                    "polyfill": false,
                    "regenerator": true,
                    "moduleName": "@babel/runtime"
                  }]
                ]
                 }
              },
              {
                loader: "eslint-loader",
                options: {
                  // eslint options (if necessary)                
                 }
              }
           ]
          },
        ]
      },
    plugins: [
      new HtmlWebpackPlugin({
        title:"chenlan",
        template:"./src/client/index.html"
      }),
      new webpack.NamedModulesPlugin()
    ],
    resolve: {
        extensions: ['.css', '.js', '.jsx'],
    }  
}