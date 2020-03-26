// homebridge-ambientws/lib/WsService.js
// Copyright © 2020 Mark Klein. All rights reserved.
//
// Homebridge plugin for Ambient weather station.

'use strict'

const homebridgeLib = require('homebridge-lib')
const moment = require('moment')

class WsService extends homebridgeLib.ServiceDelegate {
  static get Temperature () { return Temperature }

  static get Humidity () { return Humidity }
}

class Temperature extends WsService {
  constructor (wsAccessory, params = {}) {
    params.name = wsAccessory.name + ' Temperature'
    params.Service = wsAccessory.Services.eve.TemperatureSensor
    super(wsAccessory, params)
    this.addCharacteristicDelegate({
      key: 'temperature',
      Characteristic: this.Characteristics.eve.CurrentTemperature,
      unit: '°C'
    })
    this.addCharacteristicDelegate({
      key: 'temperatureUnit',
      Characteristic: this.Characteristics.hap.TemperatureDisplayUnits,
      value: this.Characteristics.hap.TemperatureDisplayUnits.CELSIUS
    })
    this.addCharacteristicDelegate({
      key: 'lastupdated',
      Characteristic: this.Characteristics.my.LastUpdated,
      value: 'n/a'
    })
    this.addCharacteristicDelegate({
      key: 'heartrate',
      Characteristic: this.Characteristics.my.Heartrate,
      props: { unit: 'min', minValue: 10, maxValue: 120, minStep: 10 },
      value: 10
    })
  }

  checkObservation (observation) {
    this.values.temperature = Math.round(observation.main.temp * 10) / 10
    this.values.lastupdated = String(new Date(moment.unix(observation.dt)))
      .slice(0, 24)
  }
}

class Humidity extends WsService {
  constructor (wsAccessory, params = {}) {
    params.name = wsAccessory.name + ' Humidity'
    params.Service = wsAccessory.Services.hap.HumiditySensor
    super(wsAccessory, params)
    this.addCharacteristicDelegate({
      key: 'humidity',
      Characteristic: this.Characteristics.hap.CurrentRelativeHumidity,
      unit: '%'
    })
  }

  checkObservation (observation) {
    this.values.humidity = observation.main.humidity
  }
}

module.exports = WsService
