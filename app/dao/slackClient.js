'use strict'

const request = require('request-promise-native')

exports.commandAsyncResponse = commandAsyncResponse
function commandAsyncResponse (url, payload) {
  return request.post({
    uri: url,
    body: payload,
    json: true
  })
}
