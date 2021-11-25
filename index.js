const _ = require('lodash')
const fastGlob = require('fast-glob')

const x = { _, fastGlob }

x.mixPlugins = require('./src/mix-plugins')
x.scanForRoutes = require('./src/scan-for-routes')

module.exports = x
