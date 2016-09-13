'use strict'

// configuration
const conf = require('nconf')

conf.env('_')

// Loads any file defined via environment letiable named SLACK_FB_HOOK_CONFIG_PATH
if (conf.get('SLACK:FB:HOOK:CONFIG:PATH')) {
  conf.file('custom', conf.get('SLACK:FB:HOOK:CONFIG:PATH'))
}

// Loads all values defined in file configuration_default.json
conf.file('default', 'configuration_default.json')

module.exports = conf
