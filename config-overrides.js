/*
 * @Description: 覆盖webpack原有配置项
 * @Author: TSY
 * @Date: 2020-09-27 23:16:18
 * @LastEditTime: 2020-09-27 23:33:34
 */
const { override } = require('customize-cra')

const stylus = () => config => {
  const stylusLoader = {
    test: /\.styl$/,
    use: [
      {
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
      }, {
        loader: 'stylus-loader'
      }
    ]
  }
  const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf
  oneOf.unshift(stylusLoader)
  return config
}


module.exports = override(
  stylus()
)