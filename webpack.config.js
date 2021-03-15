/************************************
 * Webpack config file
 * Updated to use many standards and I use across all my projects.
 * I will document stuff that many not be obvious for evaluations purposes.
 */

const path                 = require('path');
const HappyPack            = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const HtmlWebPackPlugin    = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack              = require('webpack');

// Used as environment variables to aid in development, debugging, and building.
const NODEENV  = process.env.NODEENV || 'development';	// can 'production' or 'development'. Defaults to development
const BUILDING = process.env.BUILDING || false;	// Boolean to tell webpack if this is a build operation or not.

const isProduction = NODEENV === 'production';							// Sets a flag if we are in production mode
const buildPath    = path.join(__dirname, 'client/build');	// This projec
const sourcePath   = path.join(__dirname, 'client/src');

// Common rules
const rules = [
	{
		// Test for js and jsx files and load them using happypack
		test   : /\.(js|jsx)$/,
		exclude: /node_modules/,
		use    : [
			'happypack/loader?cacheDirectory',
		],
	}, {
		// test for css files and if in production, use the plugin otherwise just use the style loader
		test   : /\.css$/,
		use    : [{
			loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
		}, {
			loader: 'css-loader', // translates CSS into CommonJS
		}],
	}, {
		// Test for less files, if in production, use the plugin otherwise use the style loader
		test   : /\.less$/,
		use    : [
			{
				// creates style nodes from JS strings
				loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
			}, {
				// translates CSS into CommonJS
				loader: 'css-loader',
			}, {
				// compiles Less to CSS
				loader: 'less-loader',
			},
		],
	},
];

// Common plugins
const plugins = [
	// Happypack is a plug that I found a log time ago - it's purpose is to GREATLY speed up compile and update times
	// and for me, when running on an old laptop, this makes a HUGE difference.
	new HappyPack(
		{
			loaders: [
				{
					// This is were we define our babel loaders and settings.
					loader   : 'babel-loader',
					'test'   : /\.(js|jsx)$/,
					exclude  : /node_modules/,
					'options': {
						cacheDirectory: true,
						'plugins'     : [
							'lodash',
							// "@babel/plugin-syntax-dynamic-import",
							// "@babel/plugin-transform-runtime",
							['@babel/plugin-proposal-decorators', {'legacy': true}],
							// ["@babel/plugin-proposal-class-properties", {"loose": true}],
							// ["@babel/plugin-syntax-decorators", {"legacy": true}],
							// "@babel/plugin-proposal-object-rest-spread",
							// "@babel/plugin-transform-object-assign",
							// "@babel/plugin-transform-react-jsx",
							// "@babel/plugin-proposal-export-default-from"
						],
						'presets'     : [
							["@babel/preset-env", {"targets": {"esmodules": false, "node": "current"}, "useBuiltIns": "usage", "corejs": 3}],
							'@babel/preset-react',
						],
					},
				},
			],
			threads: 4,
		}),
	new webpack.DefinePlugin({'NODEENV': JSON.stringify(NODEENV)}), // Pass the node environment variable into the app
	new CleanWebpackPlugin(), // This plugin will clean the build folder before starting a build. Very useful for non-bundled assets that are copied manually.
	new HtmlWebPackPlugin(
		{
			template: path.join(sourcePath, 'index.html'),
			path    : '/',
			filename: 'index.html',
		}),
	new MiniCssExtractPlugin( // CSS minification plugin
		{
			filename     : isProduction ? '[name].[fullhash].css' : '[name].css',
			chunkFilename: isProduction ? '[id].[fullhash].css' : '[id].css',
		}),
];

if (BUILDING === 'true') {
	// If we are doing a build, then we want to optimize the build files into chunks.
	plugins.push(new webpack.optimize.SplitChunksPlugin(
		{
			chunks            : 'all',
			minSize           : 10000,
			maxSize           : 200000,
			maxAsyncSize      : 150000,
			maxInitialSize    : 100000,
			minChunks         : 2,
			maxAsyncRequests  : 5,
			maxInitialRequests: 3,
			name              : true,
			cacheGroups       : {
				default     : {
					chunks            : 'async',
					minChunks         : 2,
					reuseExistingChunk: true,
				},
				node_vendors: {
					test  : /[\\/]node_modules[\\/]/,
					chunks: 'all',
				},
			},
		}));
	// If we are building, some files do not get bundled into the build, for example, the app browser icon
	// so this is where we can webpack to manually copy certain files to the build folder.
	plugins.push(new CopyWebpackPlugin(
		[
			{from: path.join(sourcePath, '.htaccess'), to: './'},
			{from: path.join(sourcePath, 'favicon.ico'), to: './'},
		]));
}

module.exports = {
	mode   : isProduction ? 'production' : 'development',
	devtool: isProduction ? undefined : 'eval-source-map',
	context: sourcePath,
	entry : path.join(sourcePath, 'index.js'),
	output: {
		path                  : buildPath,
		publicPath            : '/',
		filename              : 'app-[fullhash].js',
		hotUpdateChunkFilename: 'hot/hot-update.js',
		hotUpdateMainFilename : 'hot/hot-update.json',
	},
	module : {
		rules,
	},
	plugins,
	resolve: {
		extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
		// webpack alias' let use tell the app to use a specific version of a node module or to setup shortcut to common folders
		alias     : {
			'react$'      : path.join(__dirname, '/node_modules/react'),
			'react-dom$'  : path.join(__dirname, '/node_modules/react-dom'),
			'react-redux$': path.join(__dirname, '/node_modules/react-redux'),
			'core-js$'    : path.join(__dirname, '/node_modules/core-js'),
			'lodash'      : path.join(__dirname, '/node_modules/lodash'),
			'assets'      : path.join(__dirname, '/assets'),
		},
		modules   : [
			'./node_modules',
			sourcePath,
		],
	},
};
