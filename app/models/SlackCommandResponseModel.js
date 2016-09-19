'use strict'
const joi = require('joi')

module.exports = joi.object({
  response_type: joi.string().required().example('in_channel'),
  text: joi.string().optional().example('Optional text'),
  attachments: joi.array().optional().items({
    fallback: joi.string().required().example('Required plain-text summary of the attachment.'),
    color: joi.string().example('#36a64f'),
    pretext: joi.string().example('Optional text that appears above the attachment block'),
    author_link: joi.string().example('http://flickr.com/bobby/'),
    author_name: joi.string().example('Steve'),
    author_icon: joi.string().example('http://flickr.com/icons/bobby.jpg'),
    title: joi.string().required().example('Slack API Documentation'),
    title_link: joi.string().example('https://api.slack.com/'),
    text: joi.string().example('Optional text that appears within the attachment'),
    fields: joi.array().items({
      title: joi.string().example('Priority'),
      value: joi.string().example('High'),
      short: joi.boolean().example(false)
    }),
    image_url: joi.string().example('http://my-website.com/path/to/image.jpg'),
    thumb_url: joi.string().example('http://my-website.com/path/to/image.jpg'),
    footer: joi.string().example('Slack API'),
    footer_icon: joi.string().example('https://platform.slack-edge.com/img/default_application_icon.png'),
    ts: joi.number().example(123456789)
  })
})
