'use strict'

exports.formatTextToFbPost = formatTextToFbPost
function formatTextToFbPost (channelName, author, text) {
  // Empty string at start, otherwise post is missing characters between ~ index 4 and 8
  return '          ' + text + ' - par ' + author + ' (' + channelName + ')'
}

exports.formatSimpleResponseBeforeFbPost = formatSimpleResponseBeforeFbPost
function formatSimpleResponseBeforeFbPost () {
  return {
    'response_type': 'Ephemeral',
    'text': 'Votre post est en cours'
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
