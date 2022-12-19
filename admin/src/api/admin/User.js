import Request from "@/api";

export default class User extends Request {
    constructor() {
        super("/user");
    }
    async getDashLink(jBId) {
        return this.execute(`user/${jBId}/assign`, "GET", false, res => res, err => err)
    }
}
