export default class Client {
  origin = 'https://api.beta.psyreply.com'

  execute(url, init) {
    return new Promise(resolve => {
      fetch(`${this.origin}${url}`, init)
        .then(res => resolve(res.json().then(res => res.body)))
        .catch(err => resolve(err))
    })
  }

  getBlock(token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    return this.execute(`/block/user`, {
      method: 'GET',
      headers,
    })
  }

  passBlock(data, token) {
    data = JSON.stringify(data)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    return this.execute(`/result/block/pass`, {
      method: 'POST',
      headers,
      body: data
    })
  }

  changeTokenToUserToken(blockToken) {
    const headers = {
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${blockToken}`
    }

    return this.execute(`/user/assign`,{ headers })
  }

  getResults(token, userId) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    return this.execute(`/result/user/all`, { headers })
  }

  getCurResults(token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    return this.execute(`/result/all/last`, {
      method: 'POST',
      headers
    })
  }
}
