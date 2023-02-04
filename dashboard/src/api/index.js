import apiConf from "@/api/api.conf";
import mainConf, {ProjectState} from "../../../main.conf";
import axios from "axios";

export default class Request{
    host = apiConf.endpoint
    endpoint = null

    constructor(message, err) {
        this.message = message
        this.err = err
    }

    msg(){
        return `возникла непридвиденная ошибка: ${this.message}`
    }
}

export default class Request{
    host = apiConf.endpoint
    endpoint = null
    id = null

    constructor(endpoint, id) {
        this.endpoint = endpoint
        this.id = id
    }

    execute(url, method, data, onResolve, onReject){
        return new Promise((resolve, reject)=>{
            const input = `${this.host}/${url}`
            let init = null
            if(data === false){
                init = {
                    url: input,
                    method: method,
                }
            }else {
                init = {
                    url: input,
                    method: method,
                    data: data
                }
            }
            axios(init)
                .then((res)=>resolve(onResolve(res))).catch(err => resolve(onReject(err)))
        })
    }
}
