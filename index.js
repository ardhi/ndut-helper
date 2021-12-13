const _ = require('lodash')
const fastGlob = require('fast-glob')
const luxon = require('luxon')
const fs = require('fs-extra')
const aneka = require('aneka')
const fp = require('fastify-plugin')
const scramjet = require('scramjet')
const JSONStream = require('JSONStream')

const mod = { _, fastGlob, fs, aneka, fp, scramjet, JSONStream, luxon }

mod.mixPlugins = require('./lib/mix-plugins')
mod.scanForRoutes = require('./lib/scan-for-routes')
mod.importFixture = require('./lib/import-fixture')
mod.getNdutConfig = require('./lib/get-ndut-config')
mod.bind = require('./lib/bind')

module.exports = mod
