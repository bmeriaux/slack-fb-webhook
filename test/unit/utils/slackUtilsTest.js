'use strict'
const slackUtils = require('../../../app/utils/slackUtils')
const chai = require('chai')
chai.should()
const channelName = 'soirée'
const author = 'benoit'
const text = 'Hello, ca vous dit un bar ce soir ?'
const groupId = '121234567'
const groupName = 'Week End'

describe('slackUtils', () => {
  describe('formatTextToFbPost', () => {
    before(() => {
      this.result = slackUtils.formatTextToFbPost(channelName, author, text)
    })
    it('should correctly format params to fb post', () => {
      this.result.should.equal('Hello, ca vous dit un bar ce soir ? - par benoit (soirée)')
    })
  })
  describe('formatCompleteResponseAfterFbPost', () => {
    before(() => {
      this.result = slackUtils.formatCompleteResponseAfterFbPost(groupId, groupName, text, author)
    })
    it('should correctly format params to fb post', () => {
      this.result.should.deep.equal({
        attachments: [
          {
            author_name: 'benoit',
            fallback: 'benoit a posté sur le groupe Week End',
            text: 'Hello, ca vous dit un bar ce soir ?',
            title: 'Post sur le groupe facebook Week End',
            title_link: 'https://www.facebook.com/groups/121234567'
          }
        ],
        response_type: 'in_channel'
      })
    })
  })
  describe('formatSimpleResponseAfterFbPost', () => {
    before(() => {
      this.result = slackUtils.formatSimpleResponseAfterFbPost(author)
    })
    it('should correctly format params to fb post', () => {
      this.result.should.deep.equal({
        text: 'Le post de benoit est en cours',
        response_type: 'Ephemeral'
      })
    })
  })
})
