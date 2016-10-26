import webpack			from 'webpack';
import webpackConfig	from './_base';

webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
  return loader;
});


/*
 * Converts the babel loader into a chained loader with preprocess.
 * This allows ifdef flags for debug to be used.
 */
var babelLoader = webpackConfig.babelLoader;
babelLoader.loader += '!preprocess';

webpackConfig.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
		compress : {
			'unused'		: true,
			'dead_code'		: true,
			'warnings'		: false,
			'conditionals'	: true,
			'evaluate'		: true,
			'booleans'		: true,
			'if_return'		: true,
			'join_vars'		: true,
			'drop_console'	: true,
			'sequences'		: true,
			'properties'	: true,
			'loops'			: true,
			'screw_ie8'		: true,
			'pure_getters'	: true,
			'negate_iife'	: true,
			//'collapse_vars'	: true,
			'global_defs'	: {'DEBUG': false}
		},
		mangle: {
			'screw_ie8'		: true
		},
		output: {
			comments: false
		}
	})
);

var InjectBuildInfo = require('./InjectBuildInfo');

webpackConfig.plugins.push(
	new InjectBuildInfo()
);

export default webpackConfig;
