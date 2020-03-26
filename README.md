

## Homebridge plugin for Ambient weather station
Copyright © 2020 Mark Klein. All rights reserved.

This [Homebridge](https://github.com/homebridge/homebridge) plugin exposes one Ambient weather stations to Apple's [HomeKit](http://www.apple.com/ios/home/).    Temperature and Humidity are supported Apple's [Home](https://support.apple.com/en-us/HT204893) app and by Siri.  

There's many other weather station plugins out there.  I created this one for fun and for testing plugin designs.  In particular, this plugin is the launching plugin for [homebridge-lib](https://github.com/ebaauw/homebridge-lib).

### Prerequisites
You must own or have access to an Ambient Weather station with connections to ambientweather.com
You need to obtain an [API key](https://ambientweather.net) from Ambient Weather.

You need a server to run Homebridge.
This can be anything running [Node.js](https://nodejs.org): from a Raspberry Pi, a NAS system, or an always-on PC running Linux, macOS, or Windows.
See the [Homebridge Wiki](https://github.com/homebridge/homebridge/wiki) for details.
I run Homebridge on a Raspberry Pi 3.

To interact with HomeKit, you need Siri or a HomeKit app on an iPhone, Apple Watch, iPad, iPod Touch, or Apple TV (4th generation or later).
I recommend to use the latest released versions of iOS, watchOS, and tvOS.  

### Installation
To install Homebridge AmbientWS:
- Follow the instructions on the [Homebridge Wiki](https://github.com/homebridge/homebridge/wiki) to install Node.js and Homebridge;
- Install the Homebridge WS plugin through Homebridge Config UI X or manually by:
  ```
  $ sudo npm -g i homebridge-ws
  ```
- Edit `config.json` and add the `WS` platform provided by Homebridge WS, see [**Configuration**](#configuration).

### Configuration
In Homebridge's `config.json` you need to specify Homebridge AmbientWS as a platform plugin.
Furthermore, you need to specify your Ambient Weather API Key  [API key](https://abmbientweather.net)
```json
  "platforms": [
    {
      "platform": "WS",
      "name": "Weather",
      "apikey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    }
  ]
```

### Caveats
Homebridge AmbientWS is a hobby project of mine, provided as-is, with no warranty whatsoever.  

The HomeKit terminology needs some getting used to.
An _accessory_ more or less corresponds to a physical device, accessible from your iOS device over WiFi or Bluetooth.
A _bridge_ (like Homebridge) is an accessory that provides access to other, bridged, accessories.
An accessory might provide multiple _services_.
Each service corresponds to a virtual device (like a lightbulb, switch, motion sensor, ..., but also: a programmable switch button, accessory information, battery status).
Siri interacts with services, not with accessories.
A service contains one or more _characteristics_.
A characteristic is like a service attribute, which might be read or written by HomeKit apps.
You might want to checkout Apple's [HomeKit Accessory Simulator](https://developer.apple.com/documentation/homekit/testing_your_app_with_the_homekit_accessory_simulator), which is distributed as an additional tool for `Xcode`.
