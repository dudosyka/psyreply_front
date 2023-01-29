import config from '@/api/index';
import Request from '@/api/index';

const req = new Request

const Admin = {}

Admin.auth = async function(email, password) {
  return new Promise((resolve, reject) => {
    fetch(`${req.host}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(async res => {
        console.log(res);
        if (res.ok)
          resolve(res.json().then(data => data.body))
        else
          reject(await res.json().then(data => data.body))
      })
  })
}

Admin.authCode = async function(code) {
  return new Promise((resolve, reject) => {
    fetch(`${req.host}/auth/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      },
      body: JSON.stringify({
        code
      })
    })
      .then(async res => {
        const token = await res.json().then(r => {
          localStorage.setItem('token', r.body.token)
        })
        resolve(res)
      })
      .catch(err => {
        resolve(err)
      })
  })
}

Admin.fuckIn = async function() {
  return new Promise((resolve) => {
    fetch('')
      .then(async res => {
        const token = await res.json().then(r => {
          localStorage.setItem('token', r.body.token)
        })
        resolve(res)
      })
      .catch(err => resolve(err))
  })
}

Admin.checkAuth = function() {
  const token = localStorage.getItem('token')
  return token !== null
}

Admin.getToken = function() {
  return localStorage.getItem('token')
}

export default Admin
