import Admin from '@/api/admin/Auth';
import mainConf, {ProjectState} from "../../../main.conf";
import apiConf from "@/api/api.conf";


class Error {
  message = ''
  ok = false
  err = null

  constructor(message, err) {
    this.message = message
    this.err = err
  }

  msg() {
    return `Возникла непредвиденная ошибка: ${this.message}`
  }
}

export default class Request {
  host = apiConf.endpoint
  endpoint = null
  id = null

  constructor(endpoint, id) {
    this.endpoint = endpoint
    this.id = id
  }

  execute(url, method, body, onResolve, onReject) {
    return new Promise((resolve, reject) => {

      const input = `${this.host}/${url}`
      if (mainConf.projectState === ProjectState.dev)
        console.log(input)

      let init = null

      if (body === false) {
        init = {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Authorization': `Bearer ${Admin.getToken()}`
          },
        }
      } else {
        init = {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Authorization': `Bearer ${Admin.getToken()}`
          },
          body: JSON.stringify(body)
        }
      }

      fetch(input, init)
        .then(res => {
          if (res.ok) {
            resolve(onResolve(res))
          } else {
            switch (res.status) {
              case 400: resolve(onResolve(new Error('не корректный запрос', res.json().then(data => data.body))))
                break
              case 401: resolve(onResolve(new Error('не авоторизован', res.json().then(data => data.body))))
                break
              case 404: resolve(onResolve(new Error('не найдено', res.json().then(data => data.body))))
                break
              case 409: resolve(onResolve(new Error('не удалось произвести транзакцию', res.json().then(data => data.body))))
                break
              case 500: resolve(onResolve(new Error('Сервер не отвечает. Да, всё очень плохо', res.json().then(data => data.body))))
            }
          }
        })
        .catch(err => resolve(onReject(err)))
    });
  }

  getOne(onResolve = (res) => res, onReject = (err) => err) {
    return this.execute(`${this.endpoint}`, 'GET', false, onResolve, onReject)
  }

  getAll(filters, onResolve = (res) => res, onReject = (err) => err) {
    return this.execute(`${this.endpoint}/all`, 'POST', filters, onResolve, onReject)
  }

  get(id, onResolve = (res) => res, onReject = (err) => err) {
    return this.execute(`${this.endpoint}/${id}`, 'GET', false, onResolve, onReject)
  }

  remove(id, onResolve = (res) => res, onReject = (err) => err) {
    return this.execute(`${this.endpoint}/${id}`, 'DELETE', false, onResolve, onReject)
  }

  update(id, body, onResolve = (res) => res, onReject = (err) => err) {
    return this.execute(`${this.endpoint}/${id}`, 'PATCH', body, onResolve, onReject)
  }

  create(id, body, onResolve = (res) => res, onReject = (err) => err) {
    return this.execute(`${this.endpoint}/${id}`, 'POST', body, onResolve, onReject)
  }
}
