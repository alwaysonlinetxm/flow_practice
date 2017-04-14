var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function makeWebpackConfig(env) {
	var distPath = path.join(__dirname, '/dist'); // 打包路径

	return {
	  entry: [
			'./containers',
			'webpack-dev-server/client?http://localhost:5004/'
		],
	  output: {
	    path: distPath,
	    filename: 'js/index-[hash].js'
	  },
	  devtool: 'source-map',
	  module: {
	    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
	    }, {
	      test: /\.css$/,
	      exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader'
				]
	    }, {
	      test: /\.(png|jpg|gif)$/,
	      exclude: /node_modules/,
	      use: 'url-loader?limit=8192&name=images/[name]-[hash:8].[ext]'
	    }]
	  },
		devServer: {
			port: 5004,
			inline: true,
			historyApiFallback: false,
			stats: 'normal',
			contentBase: distPath,
			host: '0.0.0.0',
			hot: true
		},
	  plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new CleanWebpackPlugin(distPath, {
	      root: __dirname,
	      verbose: true,
	      dry: false
	    }),
			new HtmlWebpackPlugin({
				template: './index.html',
				filename: 'index.html',
				minify: {
					minifyJS: true,
					collapseWhitespace: true,
					removeComments: true
				}
			}),
	  ]
	};
}
