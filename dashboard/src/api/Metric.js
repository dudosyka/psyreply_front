import ApiResolver from "@/api/ApiResolver";

export class Metric extends ApiResolver {
    constructor() {
        super('metric');
    }

    getAll() {
        return this.request('', 'get');
    }
}