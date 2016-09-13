'use strict'
const Page = require('./Page')

class FbLoginPage extends Page {

  constructor (client) {
    super(client, 'https://www.facebook.com', 'login.php', 'Log into Facebook | Facebook')
  }

  login (email, password) {
    return this.client.setValue('input#email', email)
      .then(() => this.client.setValue('input#pass', password))
      .then(() => this.client.click('button#loginbutton'))
  }

}

module.exports = FbLoginPage
