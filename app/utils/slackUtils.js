'use strict'

exports.formatTextToFbPost = formatTextToFbPost
function formatTextToFbPost (channelName, author, text) {
  return author + ' a posté dans le channel "' + channelName + '": ' + text
}

exports.formatResponseAfterFbPost = formatResponseAfterFbPost
function formatResponseAfterFbPost (groupId, groupName, contentToPost, author) {
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
