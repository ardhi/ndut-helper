const _ = require('lodash')
const fastGlob = require('fast-glob')
const fs = require('fs-extra')
const aneka = require('aneka')
const fp = require('fastify-plugin')
const scramjet = require('scramjet')
const JSONStream = require('JSONStream')

const mod = { _, fastGlob, fs, aneka, fp, scramjet, JSONStream }

mod.mixPlugins = require('./mix-plugins')
mod.scanForRoutes = require('./scan-for-routes')
mod.importFixture = require('./import-fixture')

module.exports = mod
