'use strict'

const request = require('request-promise-native')
const logger = require('../../logger')()

exports.commandAsyncResponse = commandAsyncResponse
function commandAsyncResponse (url, payload, reqId) {
  return request.post({
    uri: url,
    body: payload,
    json: true
  }).then((response) => {
    logger.info('async response send to slack for req', reqId)
    return response
  })
}
