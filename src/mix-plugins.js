const { isString, findIndex } = require('lodash')
const pathResolve = require('aneka/src/fs/path-resolve')
const requireDeep = require('aneka/src/loader/require-deep')

module.exports = function (plugins = [], config = {}, deep = false) {
  for (let p of plugins) {
    if (isString(p)) p = { name: p }
    if (p.name[0] === '.') p.name = pathResolve(p.name)
    if (!p.disabled) {
      if (!p.module) p.module = deep ? requireDeep(p.name) : require(p.name)
    }
    const idx = findIndex(config.plugins, { name: p.name })
    if (idx > -1) {
      p.options = config.plugins[idx].options || p.options
      config.plugins[idx] = p
    }
    else config.plugins.push(p)
  }
}
