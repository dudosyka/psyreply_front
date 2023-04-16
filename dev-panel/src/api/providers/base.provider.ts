import {ApiResolverUtil} from "@/api/utils/api-resolver.util";

export class BaseProvider {
    endpoint = "";
    apiResolver: ApiResolverUtil;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.apiResolver = new ApiResolverUtil(endpoint);
    }

    create(data: Record<string, any>) {
        return this.apiResolver.request('POST', '', data);
    }

    getOne(id: number) {
        return this.apiResolver.request('GET', `${id}`, null);
    }

    getAll() {
        return this.apiResolver.request('GET', '', null);
    }

    update(id: number, data: Record<string, any>) {
        return this.apiResolver.request('PATCH', `${id}`, data);
    }

    delete(id: number) {
        return this.apiResolver.request('DELETE', `${id}`, null);
    }
}