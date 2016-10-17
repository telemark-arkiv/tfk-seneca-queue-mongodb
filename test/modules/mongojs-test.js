'use strict'

const tap = require('tap')
const mongojs = require('mongojs')

tap.ok(mongojs, 'mongojs loads OK')
