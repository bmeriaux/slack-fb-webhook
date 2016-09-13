'use strict'

const fbGroupPostScenario = require('./scenarios/fbGroupPostScenario')
const slackUtils = require('./utils/slackUtils')
const responseUtils = require('./utils/ResponseUtils')

exports.postOnFbGroup = postOnFbGroup
function postOnFbGroup (req, reply) {
  const author = req.payload.user_name
  const contentToPost = slackUtils.formatTextToFbPost(req.payload.channel_name, author, req.payload.text)
  const fbGroupId = req.params.groupId
  return fbGroupPostScenario.postOnFbGroup(fbGroupId, contentToPost)
    .then((groupName) => responseUtils.replySuccess(reply, 200, slackUtils.formatResponseAfterFbPost(fbGroupId, groupName, contentToPost, author)))
    .catch((err) => responseUtils.replyError(reply, err, req))
}

