'use strict'
const logger = require('../../logger')()

function replySuccess (reply, code, data) {
  return reply(data)
    .code(code)
    .header('Content-Type', 'application/json')
}

exports.replySuccess = replySuccess

function replyError (reply, error, request) {
  if (request) error.req_id = request.id
  logger.error(error)
  return reply(error)
}

exports.replyError = replyError
