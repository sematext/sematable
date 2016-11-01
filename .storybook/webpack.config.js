const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');
const webpack = require('webpack');


module.exports = function(config, env) {
  const defaultConfig = genDefaultConfig(config, env);
  const withOldPlugin = Object.assign({}, defaultConfig, {
    plugins: defaultConfig.plugins.concat([
      new webpack.OldWatchingPlugin(),
    ])
  })
  return withOldPlugin;
};
