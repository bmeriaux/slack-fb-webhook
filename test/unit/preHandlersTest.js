'use strict'
const preHandlers = require('../../app/preHandlers')
const boom = require('boom')
const sinon = require('sinon')

describe('preHandlers', () => {
  before(() => {
    this.reply = function reply () {}
    this.reply.continue = function replyContinue () {}
    this.replySpy = sinon.spy(this, 'reply')
    this.replyContinueSpy = sinon.spy(this.reply, 'continue')
  })
  after(() => {
    this.replySpy.restore()
    this.replyContinueSpy.restore()
  })
  describe('checkTeamId', () => {
    describe('on valid team Id', () => {
      before(() => {
        const req = {
          payload: {
            team_id: 'teamId'
          }
        }
        preHandlers.checkTeamId(req, this.replySpy)
      })
      after(() => {
        this.replySpy.reset()
        this.replyContinueSpy.reset()
      })
      it('should call reply.continue', () => {
        sinon.assert.calledOnce(this.replyContinueSpy)
      })
      it('should not call reply() directly', () => {
        sinon.assert.callCount(this.replySpy, 0)
      })
    })
    describe('on invalid team Id', () => {
      before(() => {
        const req = {
          payload: {
            team_id: 'invalidTeamId'
          }
        }
        preHandlers.checkTeamId(req, this.replySpy)
      })
      after(() => {
        this.replySpy.reset()
        this.replyContinueSpy.reset()
      })
      it('should not call reply.continue', () => {
        sinon.assert.callCount(this.replyContinueSpy, 0)
      })
      it('should call reply() with a boom error', () => {
        sinon.assert.calledWith(this.replySpy, boom.unauthorized('invalid team Id'))
      })
    })
  })
  describe('checkCommandToken', () => {
    describe('on valid command token', () => {
      before(() => {
        const req = {
          payload: {
            token: 'token'
          }
        }
        preHandlers.checkCommandToken(req, this.replySpy, 'postGroupFb')
      })
      after(() => {
        this.replySpy.reset()
        this.replyContinueSpy.reset()
      })
      it('should call reply.continue', () => {
        sinon.assert.calledOnce(this.replyContinueSpy)
      })
      it('should not call reply() directly', () => {
        sinon.assert.callCount(this.replySpy, 0)
      })
    })
    describe('on invalid command token', () => {
      before(() => {
        const req = {
          payload: {
            token: 'invalidToken'
          }
        }
        preHandlers.checkCommandToken(req, this.replySpy, 'postGroupFb')
      })
      after(() => {
        this.replySpy.reset()
        this.replyContinueSpy.reset()
      })
      it('should not call reply.continue', () => {
        sinon.assert.callCount(this.replyContinueSpy, 0)
      })
      it('should call reply() with a boom error', () => {
        sinon.assert.calledWith(this.replySpy, boom.unauthorized('invalid command token'))
      })
    })
  })
})
