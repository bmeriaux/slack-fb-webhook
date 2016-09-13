'use strict'
const Page = require('./Page')

class FbLoginPage extends Page {

  constructor (client, id) {
    super(client, 'https://www.facebook.com', 'groups/' + id, ' | Facebook')
  }

  post (contentToPost) {
    return this.client.setValue('textarea[name="xhpc_message_text"]', contentToPost)
      .then(() => this.client.click('button[data-testid="react-composer-post-button"]'))
  }

}

module.exports = FbLoginPage
