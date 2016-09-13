'use strict'
const Hapi = require('hapi')
const conf = require('./configuration')
const server = new Hapi.Server()
const HapiSwagger = require('hapi-swagger')

server.initBunyan = function initBunyan () {
  server.register({
    register: require('hapi-bunyan'),
    options: {
      logger: server.logger
    }
  }, function initBunyanCallback (err) {
    if (err) {
      server.logger.error(['error'], 'hapi-bunyan load error: ' + err)
    } else {
      server.logger.info(['start'], 'hapi-bunyan loaded')
    }
  })
}

server.init = function initServer (configuration) {
  // Logging
  server.logger = require('./logger')(configuration)

  server.connection({
    host: configuration.get('api:listeningAddress'),
    port: configuration.get('api:port'),
    routes: {
      cors: true
    },
    labels: ['api']
  })

  server.logger.info('Server configured on ', server.info.uri)
}

server.initSwagger = function initSwagger (configuration) {
  const documentationPath = '/doc'
  const swaggerOptions = {
    info: {
      title: 'Slack Fb webhook'
    },
    schemes: [configuration.get('swagger:protocol')],
    host: configuration.get('swagger:host'),
    swaggerUIPath: documentationPath + '/swaggerui/',
    basePath: '/',
    documentationPath: documentationPath,
    jsonPath: documentationPath + '/swagger.json',
    lang: 'en',
    sortTags: 'default'
  }
  server.register([
    require('inert'),
    require('vision'),
    require('blipp'),
    {
      register: HapiSwagger,
      options: swaggerOptions
    }], function callback (err) {
    server.views({
      engines: { html: require('handlebars') }
    })

    if (err) {
      server.logger.error(['error'], 'hapi-swagger load error: ' + err)
    } else {
      server.logger.info(['start'], 'hapi-swagger interface loaded')
    }
  })
}

server.loadRoutes = function loadRoutes () {
  const routes = require('./app/routes')
  routes.loadRoutes(server)
}

server.init(conf)
server.initSwagger(conf)
server.initBunyan()
server.loadRoutes()

server.start(function logStart () {
  console.log('Server started.')
})
