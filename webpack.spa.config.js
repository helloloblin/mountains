const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = {
  entry: {
    admin: path.resolve(__dirname, "src/admin/main.js")
  },
  output: {
    path: path.resolve(__dirname, "dist/admin"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"]
      },
      {
        enforce: "pre",
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: ["vue-style-loader", "css-loader", "postcss-loader"]
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Admin Vue App",
      filename: "index.html",
      template: path.resolve(__dirname, "src/admin/index.html")
    })
  ]
};

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    config.devtool = "";
    config.plugins = (config.plugins || []).concat([
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ]);
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false
          }
        })
      ]
    };
  }
  return config;
};