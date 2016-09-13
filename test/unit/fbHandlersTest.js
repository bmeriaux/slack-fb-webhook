'use strict'
const fbHandlers = require('../../app/fbHandlers')
const sinon = require('sinon')
const ResponseUtils = require('../../app/utils/ResponseUtils')
const fbGroupPostScenario = require('../../app/scenarios/fbGroupPostScenario')
const slackCommandPayload = require('./data/slackCommandPayload.json')
const slackCommandResponse = require('./data/slackCommandResponse.json')

const chai = require('chai')
chai.should()
let reply = (data) => {}

describe('fbHandlers', () => {
  before(() => {
    this.replySuccessStub = sinon.stub(ResponseUtils, 'replySuccess')
    this.replyErrorStub = sinon.stub(ResponseUtils, 'replyError')
  })
  after(() => {
    this.replySuccessStub.restore()
    this.replyErrorStub.restore()
  })
  describe('postOnFbGroup', () => {
    before(() => {
      this.fbGroupPostScenarioPostOnFbGroup = sinon.stub(fbGroupPostScenario, 'postOnFbGroup')
    })
    after(() => {
      this.replySuccessStub.reset()
      this.replyErrorStub.reset()
      this.fbGroupPostScenarioPostOnFbGroup.restore()
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
        return fbHandlers.postOnFbGroup(req, reply)
          .then((result) => {
            this.result = result
          })
      })
      after(() => {
        this.fbGroupPostScenarioPostOnFbGroup.reset()
      })
      it('should invoke ResponseUtils.replySuccess once', () => {
        this.replySuccessStub.callCount.should.equal(1)
      })
      it('should invoke ResponseUtils.replySuccess with the appropriate params', () => {
        this.replySuccessStub.args[ 0 ].should.deep.equal([ reply, 200, slackCommandResponse ])
      })
    })
  })
})
