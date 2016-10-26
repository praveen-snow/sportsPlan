import webpack       from 'webpack';
import config        from '../config';
import webpackConfig from './development';

webpackConfig.entry.app.push(
  `webpack-dev-server/client?${config.get('webpack_public_path')}`,
  `webpack/hot/dev-server`
);

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

export default webpackConfig;
