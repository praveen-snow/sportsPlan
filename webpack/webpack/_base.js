import webpack				from 'webpack';
import config				from '../config';
import HtmlWebpackPlugin	from 'html-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
var browserSync = require('browser-sync');

const paths = config.get('utils_paths');
var fs = require('fs');
var babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));

try {
	let babelCacheDir = 'cache';
	if (!fs.existsSync(babelCacheDir)){
		console.log('Cache directory not found, attempting to create.');
		fs.mkdirSync(babelCacheDir);
		console.log('Cache directory created.');
	}
	babelrc.cacheDirectory = babelCacheDir;
} catch(e) {
	console.log('Unable to create cache directory, babel cache disabled.');
}

var babelLoader = {
	test: /\.(js|jsx)?$/,
	exclude: /(node_modules)/,
	loader: 'babel?' + JSON.stringify(babelrc)
};

console.log('Creating WebPack configuration...');

const webpackConfig = {
  babelLoader: babelLoader,
  name    : 'client',
  entry   : {
    vendor : config.get('vendor_dependencies'),
    app : [
      paths.project(config.get('dir_src')) + '/index.js'
    ]
  },
  output : {
    filename		: '[name].js',
		chunkFilename	: '[id].[name].[chunkhash].js',
    path			: paths.project(config.get('dir_dist'))
  },
  plugins : [
    new webpack.DefinePlugin(config.get('globals')),
    new HtmlWebpackPlugin({
      template : paths.src('index.html'),
      hash     : true,
      filename : 'index.html',
      inject   : 'body',
	  	minify   : {},
    }),
	new webpack.optimize.CommonsChunkPlugin({
		name: "vendor",
		chunks: ["vendor", "app"],
	}),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new BrowserSyncPlugin({
      host: 'localhost',
      port: 3030,
      browsers: [],
      server: { baseDir: [ paths.project(config.get('dir_dist')) ] }
    })
  ],
  resolve : {
    extensions : ["", ".web.js", ".js", ".jsx"],
    alias      : config.get('utils_aliases')
  },
  module : {
    loaders : [
	  babelLoader,
	  {
		test: /\.json$/,
		loader: 'json'
	  },
      {
        test    : /\.scss$/,
        loaders : [
          'style/useable',
          'css-loader?minimize',
          'autoprefixer?{browsers:["ie >= 10","last 2 Chrome versions","last 2 Firefox versions","iOS >= 7.1.2"]}',
          'sass-loader?includePaths[]=' + paths.src('styles')
        ]
      },
      {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
      },
      { test: /\.woff(\?.*)?$/,     loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*)?$/,    loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.*)?$/,      loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*)?$/,      loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      { test: /\.svg(\?.*)?$/,      loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" }
    ]
  }
};
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: ['vendor']
});
commonChunkPlugin.__KARMA_IGNORE__ = true;
webpackConfig.plugins.push(commonChunkPlugin);

console.log('Exporting WebPack base configuration...');

export default webpackConfig;
