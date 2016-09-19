'use strict'
const fbHandlers = require('../../app/fbHandlers')
const sinon = require('sinon')
const ResponseUtils = require('../../app/utils/ResponseUtils')
const fbGroupPostScenario = require('../../app/scenarios/fbGroupPostScenario')
const slackCommandPayload = require('./data/slackCommandPayload.json')
const slackSimpleCommandResponse = require('./data/slackSimpleCommandResponse.json')
const slackCompleteCommandResponse = require('./data/slackCompleteCommandResponse.json')
const slackCompleteCommandFailedResponse = require('./data/slackCompleteCommandFailedResponse.json')
const slackClient = require('../../app/dao/slackClient')

const chai = require('chai')
chai.should()
let reply = (data) => {}

describe('fbHandlers', () => {
  before(() => {
    this.replySuccessStub = sinon.stub(ResponseUtils, 'replySuccess')
  })
  after(() => {
    this.replySuccessStub.restore()
  })
  describe('postOnFbGroup', () => {
    before(() => {
      this.slackClientCommandAsyncResponseStub = sinon.stub(slackClient, 'commandAsyncResponse')
      this.fbGroupPostScenarioPostOnFbGroup = sinon.stub(fbGroupPostScenario, 'postOnFbGroup')
    })
    after(() => {
      this.fbGroupPostScenarioPostOnFbGroup.restore()
      this.slackClientCommandAsyncResponseStub.restore()
    })
    describe('post on fb is successful', () => {
      const req = {
        payload: slackCommandPayload,
        params: {
          groupId: '1234'
        }

      }
      before(() => {
        this.fbGroupPostScenarioPostOnFbGroup.returns(Promise.resolve('WeekEnd'))
        this.slackClientCommandAsyncResponseStub.returns(Promise.resolve('OK'))
        return fbHandlers.postOnFbGroup(req, reply)
      })
      after(() => {
        this.replySuccessStub.reset()
        this.fbGroupPostScenarioPostOnFbGroup.reset()
        this.slackClientCommandAsyncResponseStub.reset()
      })
      it('should invoke ResponseUtils.replySuccess once', () => {
        this.replySuccessStub.callCount.should.equal(1)
      })
      it('should invoke ResponseUtils.replySuccess with the appropriate params', () => {
        this.replySuccessStub.args[ 0 ].should.deep.equal([ reply, 200, slackSimpleCommandResponse ])
      })
      it('should invoke slackClient.commandAsyncResponse with the appropriate params', () => {
        this.slackClientCommandAsyncResponseStub.args[ 0 ].should.deep.equal([ slackCommandPayload.response_url, slackCompleteCommandResponse ])
      })
    })
    describe('post on fb failed', () => {
      const req = {
        payload: slackCommandPayload,
        params: {
          groupId: '1234'
        }

      }
      before(() => {
        this.fbGroupPostScenarioPostOnFbGroup.returns(Promise.reject(new Error('post failed')))
        this.slackClientCommandAsyncResponseStub.returns(Promise.resolve('OK'))
        return fbHandlers.postOnFbGroup(req, reply)
      })
      after(() => {
        this.replySuccessStub.reset()
        this.fbGroupPostScenarioPostOnFbGroup.reset()
        this.slackClientCommandAsyncResponseStub.reset()
      })
      it('should invoke ResponseUtils.replySuccess once', () => {
        this.replySuccessStub.callCount.should.equal(1)
      })
      it('should invoke ResponseUtils.replySuccess with the appropriate params', () => {
        this.replySuccessStub.args[ 0 ].should.deep.equal([ reply, 200, slackSimpleCommandResponse ])
      })
      it('should invoke slackClient.commandAsyncResponse with the appropriate params', () => {
        this.slackClientCommandAsyncResponseStub.args[ 0 ].should.deep.equal([ slackCommandPayload.response_url, slackCompleteCommandFailedResponse ])
      })
    })
  })
})
