'use strict'
const config = require('../configuration')
const boom = require('boom')

exports.checkTeamId = checkTeamId
function checkTeamId (req, reply) {
  if (config.get('slack:teamIds').indexOf(req.payload.team_id) < 0) {
    return reply(boom.unauthorized('invalid team Id'))
  }
  return reply.continue()
}

exports.checkCommandToken = checkCommandToken
function checkCommandToken (req, reply, commandName) {
  if (config.get('slack:commands:' + commandName + ':tokens').indexOf(req.payload.token) < 0) {
    return reply(boom.unauthorized('invalid command token'))
  }
  return reply.continue()
}
