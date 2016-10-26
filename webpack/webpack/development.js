import webpackConfig from './_base';

webpackConfig.devtool = 'source-map';
//webpackConfig.eslint.emitWarning = true;

var babelLoader = webpackConfig.babelLoader;
babelLoader.loader += '!preprocess?+DEBUG';

export default webpackConfig;
