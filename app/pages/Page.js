'use strict'
class Page {

  constructor (client, domain, path, title) {
    this.path = path
    this.title = title
    this.client = client
    this.query = null
    this.domain = domain
  }

  goTo () {
    if (this.query) {
      return this.client.url(this.domain + '/' + this.path + this.query)
    }
    return this.client.url(this.domain + '/' + this.path)
  }

  getUrl () {
    return this.client.getUrl()
  }

  getTitle () {
    return this.client.getTitle()
  }

  deleteAllCookies () {
    return this.client.deleteCookie()
  }

}

module.exports = Page
