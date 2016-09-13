'use strict'
const fbGroupPostScenario = require('../../app/scenarios/fbGroupPostScenario')

describe.skip('fbGroupPostScenario', () => {
  describe('postOnFbGroup', () => {
    before(() => {
      return fbGroupPostScenario.postOnFbGroup('1154729354565599', 'post by TU' + Date.now())
        .then((title) => console.log('post on group ' + title + ' success'))
    })
    it('should post on fb', () => {

    })
  })
})
