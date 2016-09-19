'use strict'

const fbGroupPostScenario = require('./scenarios/fbGroupPostScenario')
const slackUtils = require('./utils/slackUtils')
const responseUtils = require('./utils/ResponseUtils')
const slackClient = require('./dao/slackClient')
const logger = require('../logger')()

exports.postOnFbGroup = postOnFbGroup
function postOnFbGroup (req, reply) {
  const author = req.payload.user_name
  const response_url = req.payload.response_url
  const contentToPost = slackUtils.formatTextToFbPost(req.payload.channel_name, author, req.payload.text)
  const fbGroupId = req.params.groupId
  return Promise.resolve(responseUtils.replySuccess(reply, 200, slackUtils.formatSimpleResponseAfterFbPost(author)))
    .then(() => fbGroupPostScenario.postOnFbGroup(fbGroupId, contentToPost)
      .then((groupName) => slackClient.commandAsyncResponse(response_url, slackUtils.formatCompleteResponseAfterFbPost(fbGroupId, groupName, contentToPost, author)))
      .catch((err) => {
        logger.error(err)
        slackClient.commandAsyncResponse(response_url, slackUtils.formatCompleteResponseAfterFbPost(fbGroupId, '', 'Le post a échoué', author))
          .catch((err) => logger.error(err))
      }))
}
