'use strict'

// Log
const bunyan = require('bunyan')

const env = process.env.NODE_ENV || 'development'

/**
 * The logger is loaded as a singleton (he is hooked to the 'global' node object)
 * If there is more than one version of digital-api-common in the project,
 * only one version of the logger will be initialized and loaded (the first one !)
 */

module.exports = function createLogger (configuration) {
  if (global.apiLogger) {
    return global.apiLogger
  }

  if (env === 'test') {
    global.apiLogger = bunyan.createLogger({ name: 'test-logger' })
    global.apiLogger.info = function info () {}
    global.apiLogger.fatal = function fatal () {}
    global.apiLogger.error = function error () {}
    global.apiLogger.warn = function warn () {}
    global.apiLogger.debug = function debug () {}
    global.apiLogger.trace = function trace () {}
    return global.apiLogger
  }

  if (!configuration) {
    throw new Error('Invalid configuration during creating global.apiLogger')
  }

  let bunyan_configuration = {
    name: configuration.get('api:applicationName'),
    streams: [
      {
        level: configuration.get('log:level'),
        stream: (function getStream () {
          let streamConfig = configuration.get('log:stream')
          if (streamConfig.startsWith('process')) {
            let processStream = streamConfig.split('.')[1]
            return process[processStream]
          }
          return streamConfig
        }())
      }
    ]
  }

  if (configuration.get('log:path')) {
    bunyan_configuration.streams.push({
      type: 'rotating-file',
      level: configuration.get('log:level'),
      path: configuration.get('log:path'),
      period: configuration.get('log:period'),   // daily rotation
      count: parseInt(configuration.get('log:count'))    // keep 3 back copies
    })
  }

  global.apiLogger = bunyan.createLogger(bunyan_configuration)

  return global.apiLogger
}
