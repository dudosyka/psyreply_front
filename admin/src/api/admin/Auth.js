import Request from '@/api/index';
import axios from "axios";
import apiConf from "@/api/api.conf";

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
    axios.post(`${apiConf.endpoint}/auth`, {email: "shut_up_and_let_me_in", password: "123"}, { headers: { 'Content-Type': "application/json" } }).then(r => {
      localStorage.setItem("token", r.data.body.token);
      resolve(true);
    }).catch(err => {
      console.log(err);
    })
  })
}

Admin.checkAuth = function() {
  const token = localStorage.getItem('token')
  return token !== null
}

Admin.getToken = function() {
  return localStorage.getItem('token')
}

Admin.reg = function (fd) {
  return new Promise((resolve, reject) => {
    axios.post( 'https://api.beta.psyreply.com/auth/signup',
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
    ).then((res) => {
      localStorage.setItem("token", res.data.body.token);
      resolve(true);
    }).catch(err => {
      reject(err);
    });
  });
}

Admin.forgetPasswordFirst = function (login) {
  return new Promise((resolve,reject) => {
    axios.post(`${apiConf.endpoint}/auth/repass/first`, { login }).then(res => {
      resolve(true);
    }).catch(err => {
      reject(err);
    })
  })
}

Admin.forgetPasswordSecond = function (code, newPassword) {
  return new Promise((resolve,reject) => {
    axios.post(`${apiConf.endpoint}/auth/repass/second`, { code, newPassword }).then(res => {
      resolve(true)
    }).catch(err => {
      reject(err)
    })
  })
}

export default Admin
