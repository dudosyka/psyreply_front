import axios from "axios";

import apiConf from "@/api/api.conf";

export class ApiError extends Error {
    data
    constructor(msg, data = null) {
        super(msg);
        this.data = data;
    }
}

export default class ApiResolver {
    endpoint = "";
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    unauthenticatedRequest(url, method, data = null) {
        url = `${apiConf.endpoint}/${this.endpoint}/${url}`;
        return (new Promise((resolve, reject) => axios({
            url,
            method,
            data
        }).then(res => {
            if (res.data.status === 200) {
                resolve(res.data.body);
            }
            reject(res.body)
        }).catch(err => {
            if (err.response.data.status === 403)
                reject(new ApiError('forbidden'));
            else if (err.response.data.status === 400)
                reject(new ApiError('bad', err.response.data.body));
            else if (err.response.data.status === 404)
                reject(new ApiError('not found'))
        })));
    }

    request(url, method, data) {
        url = `${apiConf.endpoint}/${this.endpoint}/${url}`;
        return (new Promise((resolve, reject) => axios({
            url,
            method,
            data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.data.status === 200) {
                resolve(res.data.body);
            }
            reject(res.body)
        }).catch(err => {
            reject(err);
        })));
    }
}