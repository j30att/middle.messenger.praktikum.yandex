import colors from './src/client/core/style/colors'
require('postcss-simple-vars')({ silent: true })
require('postcss-nested')({ bubble: ['phone'] }),
module.exports = {
  "modules": true,
  plugins: [
    require('postcss-simple-vars')({ variables: colors }),
    require('postcss-nested')({ bubble: ['phone'] }),
    require('autoprefixer')
  ]
}
