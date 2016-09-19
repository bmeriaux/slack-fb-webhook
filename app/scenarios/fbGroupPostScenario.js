'use strict'
const webdriverio = require('webdriverio')
const options = {
  desiredCapabilities: {
    browserName: 'phantomjs', 'phantomjs.page.settings.loadImages': false
  },
  sync: false
}
const client = webdriverio.remote(options)
const config = require('../../configuration')
const logger = require('../../logger')()

const FbLoginPage = require('./../pages/FbLoginPage')
const FbGroupPage = require('./../pages/FbGroupPage')

exports.postOnFbGroup = postOnFbGroup
function postOnFbGroup (groupId, contentToPost) {
  const fbLoginPage = new FbLoginPage(client)
  const fbGroupPage = new FbGroupPage(client, groupId)
  const startDate = new Date()
  return client.init()
    .then(() => fbLoginPage.deleteAllCookies())
    .then(() => fbLoginPage.goTo())
    .then(() => fbLoginPage.login(config.get('fb:login'), config.get('fb:password')))
    .then(() => fbGroupPage.goTo())
    .then(() => fbGroupPage.post(contentToPost))
    .then(() => fbGroupPage.getTitle())
    .then((title) => {
      client.end()
      const postDuration = new Date() - startDate
      logger.info('successful post on fb group ' + groupId + ' in :' + postDuration + ' ms')
      return title
    })
    .catch((err) => {
      logger.error('error while posting on fb group' + groupId, err)
      client.end()
      throw err
    })
}
