'use strict'
const handlers = require('./fbHandlers')
const preHandlers = require('./preHandlers')
const SlackCommandModel = require('./models/SlackCommandModel')
const SlackCommandResponseModel = require('./models/SlackCommandResponseModel')

exports.fbGroupRoutes = fbGroupRoutes
function fbGroupRoutes () {
  return [
    {
      method: 'POST',
      path: '/fb/group/{groupId}',
      handler: handlers.postOnFbGroup,
      config: {
        pre: [
          preHandlers.checkTeamId,
          (req, reply) => preHandlers.checkCommandToken(req, reply, 'postGroupFb')
        ],
        description: 'Post on a facebook group',
        tags: ['api', 'facebook', 'groups'],
        plugins: {
          'hapi-swagger': {
            responses: {
              200: { description: 'Ok', schema: SlackCommandResponseModel },
              401: { description: 'unauthorized' },
              500: { description: 'internal_server_error' }
            }
          }
        },
        validate: {
          payload: SlackCommandModel,
          options: {
            abortEarly: false
          }
        },
        response: { schema: SlackCommandResponseModel }
      }
    }
  ]
}

exports.loadRoutes = loadRoutes
function loadRoutes (server) {
  const routes = Array.prototype.concat.apply([], [
    fbGroupRoutes()
  ])
  server.route(routes)
}
