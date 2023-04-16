import axios from 'axios';
import apiConf from "@/api/api.conf";
import {FailedRequestException} from "@/api/exceptions/failed-request.exception";

type OptionType = {
    method: string,
    url: string,
    headers: Record<string, any>
    data?: Record<string, any>
}


export class ApiResolverUtil {
    private readonly bearer: string | null = null;

    private lastAccessedUrl = ""

    constructor(private readonly endpoint = "") {
        this.endpoint = endpoint;
        const token = localStorage.getItem('token');
        if (token != null)
            this.bearer = token;
    }

    private buildOptions(method: string, path: string, data: Record<string, any> | null, needAuth: boolean = false): OptionType {
        const url = `${apiConf.url}/${this.endpoint}/${path}`
        this.lastAccessedUrl = url;
        const options: OptionType = {
            method,
            url,
            headers: {
                'Content-Type': 'application/json',
            }
        }

        if (needAuth) {
            options.headers['Authorization'] = `Bearer ${this.bearer}`
        }

        if (data != null) {
            options.data = data;
        }

        return options;
    }


    unauthorizedRequest(method: string, path: string, data: Record<string, any> | null) {
        return axios(this.buildOptions(method, path, data)).then((res: any)=> {
            return res.data;
        }).catch((err: any) => {
            throw new FailedRequestException(this.lastAccessedUrl, this.endpoint, method, data, null, err.response.status);
        })
    }

    request(method: string, path: string = "", data: Record<string, any> | null = null) {
        return axios(this.buildOptions(method, path, data, true)).then((res: any) => res.data).catch((err: any) => {
            throw new FailedRequestException(this.lastAccessedUrl, this.endpoint, method, data, this.bearer, err.response.status);
        })
    }
}