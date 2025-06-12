const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		'variations/query-slider/index': './src/variations/query-slider/index.js',
		'slide/index': './src/slide/index.js',
		'slider/index': './src/slider/index.js',
		'slider/view': './src/slider/view.js',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},
	optimization: {
		...defaultConfig.optimization,
		usedExports: true, // Enables tree shaking
		minimize: true, // Minimizes final bundle
	},
};
