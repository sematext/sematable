const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');
const webpack = require('webpack');
const path = require('path');

const bootstrapVersion = process.env.BOOTSTRAP_VERSION || '4.0.0';

module.exports = function(config, env) {
  const defaultConfig = genDefaultConfig(config, env);
  const withOldPlugin = Object.assign({}, defaultConfig, {
     plugins: defaultConfig.plugins.concat([
       new webpack.OldWatchingPlugin(),
    ]),
    resolve: Object.assign({}, defaultConfig.resolve, {
      alias: Object.assign({}, defaultConfig.resolve.alias, {
        bootstrapCss: path.join(
          __dirname,
          '../stories/bootstrap/v' + bootstrapVersion + '/css/bootstrap.min.css'
        ),
      }),
    }),
   })
  return withOldPlugin;
};
