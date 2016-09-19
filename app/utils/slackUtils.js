'use strict'

exports.formatTextToFbPost = formatTextToFbPost
function formatTextToFbPost (channelName, author, text) {
  return text + ' - par ' + author + ' (' + channelName + ')'
}

exports.formatSimpleResponseAfterFbPost = formatSimpleResponseAfterFbPost
function formatSimpleResponseAfterFbPost (author) {
  return {
    'response_type': 'Ephemeral',
    'text': 'Le post de ' + author + ' est en cours'
  }
}

exports.formatCompleteResponseAfterFbPost = formatCompleteResponseAfterFbPost
function formatCompleteResponseAfterFbPost (groupId, groupName, contentToPost, author) {
  return {
    'response_type': 'in_channel',
    'attachments': [
      {
        'fallback': author + ' a posté sur le groupe ' + groupName,
        'author_name': author,
        'title': 'Post sur le groupe facebook ' + groupName,
        'title_link': 'https://www.facebook.com/groups/' + groupId,
        'text': contentToPost
      }
    ]
  }
}
