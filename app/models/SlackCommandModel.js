'use strict'
const joi = require('joi')

module.exports = joi.object({
  token: joi.string().required().example('gIkuvaNzQIHg97ATvDxqgjtO'),
  team_id: joi.string().required().example('T0001'),
  team_domain: joi.string().required().example('example'),
  channel_id: joi.string().required().example('C2147483705'),
  channel_name: joi.string().required().example('test'),
  user_id: joi.string().required().example('U2147483697'),
  user_name: joi.string().required().example('Steve'),
  command: joi.string().required().example('/weather'),
  text: joi.string().required().example('94070'),
  response_url: joi.string().required().example('https://hooks.slack.com/commands/1234/5678')
})
