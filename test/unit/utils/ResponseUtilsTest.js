'use strict'

const sinon = require('sinon')
const chai = require('chai')
chai.should()

const ResponseUtils = require('../../../app/utils/ResponseUtils')

class ResponseMock {

  code () {
    return this
  }

  header () {
    return this
  }
}

describe('Response Builder', () => {
  before(() => {
    this.data = {
      data: 'data'
    }
    this.code = 200
    this.error = {
      error: 'error'
    }
    let responseMock = new ResponseMock()
    this.reply = () => {
      return responseMock
    }
    this.reply.next = () => {}
    this.reply.data = {}
    this.replyCodeSpy = sinon.spy(responseMock, 'code')
    this.replyHeaderSpy = sinon.spy(responseMock, 'header')
    this.replySpy = sinon.spy(this, 'reply')
    this.replyNextSpy = sinon.spy(this.reply, 'next')
  })

  after(() => {
    this.replyCodeSpy.restore()
    this.replyHeaderSpy.restore()
    this.replySpy.restore()
    this.replyNextSpy.restore()
  })

  describe('replySuccess', () => {
    before(() => {
      ResponseUtils.replySuccess(this.reply, this.code, this.data)
    })

    after(() => {
      this.replySpy.reset()
      this.replyCodeSpy.reset()
      this.replyHeaderSpy.reset()
    })

    it('should call code with code passed in param', () => {
      return this.replyCodeSpy.calledWith(this.code).should.be.true
    })

    it('should call reply with data passed in param', () => {
      return this.replySpy.calledWith(this.data).should.be.true
    })

    it('should call header with key Content-Type and value application/json', () => {
      return this.replyHeaderSpy.calledWith('Content-Type', 'application/json').should.be.true
    })
  })

  describe('replyError', () => {
    before(() => {
      ResponseUtils.replyError(this.reply, this.error, { id: 'fakeId' })
    })

    after(() => {
      this.replySpy.reset()
    })

    it('should call ErrorUtils with error passed in param', () => {
      return this.replySpy.calledWith(this.error).should.be.true
    })
  })
})
