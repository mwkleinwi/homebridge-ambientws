// homebridge-ambientws/index.js
// Copyright © 2020 Mark Klein. All rights reserved.
//
// Homebridge plugin for Ambient weather station.

'use strict'

const ambientWsPlatform = require('./lib/ambientWsPlatform')
const packageJson = require('./package.json')

module.exports = function (homebridge) {
  ambientWsPlatform.loadPlatform(homebridge, packageJson, 'ambientWS', WsPlatform)
}
