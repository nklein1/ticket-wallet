const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },

  resolve: {

    modules: [
      'node_modules',
      path.join('../../src', __dirname)

      // path.resolve(__dirname, 'src')
      // path.resolve(__dirname, "app")
    ],
    alias: {
      'components': path.resolve(__dirname, 'src', 'components'),
      'containers': path.resolve(__dirname, 'src', 'containers')
    }
  },

  module: {
    // loaders: [
    //   { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    //   { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    // ],

    rules: [

      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
              {
                  loader: 'css-loader',
                  options: {
                      importLoaders: 1,
                      sourceMap: false,
                      modules: true,
                      localIdentName: '[name]__[local].[hash:base64:5]'
                      // localIdentName: cssHashFormat,
                      // minimize: isProd,
                  },
              },
              // {
              //     loader: 'postcss-loader',
              //     options: {
              //         plugins: require('../postcss.config.js')
              //     }
              // },
              {
                  loader: 'sass-loader',
                  // options: {
                  //     sourceMap: isDev
                  // }
              }
          ]
      }),
        // use: [
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true,
        //       localIdentName: '[path][name]__[local]--[hash:base64:5]'
        //     }
        //   },
        //   {
        //     loader: 'sass-loader',
        //   }
        //   // 'style-loader',
        //   // 'css-loader',
        //   // 'sass-loader',
        // ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]

  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('styles.css'),
  ]
}

// module.exports = process.env.NODE_ENV !== 'production' ? 
//     '[name]__[local].[hash:base64:5]' :
//     '[local].[hash:base64:5]';