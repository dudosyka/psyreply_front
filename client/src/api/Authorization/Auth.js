import axios from "axios";
import apiConf from "@/api/api.conf";
import ApiResolver from "@/api/ApiResolver";
import {Greetings} from "@/api/Greetings/Greetings";

const greet = new Greetings();

export class Auth {
    async signUp(formData, tgId, botId) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiConf.endpoint}/auth/client/signup/${tgId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(async (res) => {
                await localStorage.setItem("token", res.data.body.token);
                resolve(true);
                await greet.sendGreeting(tgId, botId)
            }).catch(err => {
                reject(err);

                if (err.response.status === 409)
                    console.log('err 409');
                else
                    console.log('err', err.toJSON());
            });
        });
    }

    checkAuth() {
        const token = localStorage.getItem('token')
        return token !== null
    }
}

export class SignIn extends ApiResolver {
    constructor() {
        super('auth');
    }

    async login(email, password){
        return await this.request('client', 'POST', {email, password})
            .then(res => {
                localStorage.setItem("token", res.token);
            })
    }
}
