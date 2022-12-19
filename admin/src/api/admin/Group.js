import Request from "@/api";

export default class Group extends Request {
    constructor() {
        super('group');
    }

    async create(company_id, data) {
        return await this.execute(`company/${company_id}/group`, 'POST', data, res => res.json(), err => err);
    }

    async update(group_id, data) {
        return await this.execute(`company/group/${group_id}`, 'PATCH', data, res => res.json(), err => err);
    }

    async removeUsers(group_id, users) {
        return await this.execute(`company/group/${group_id}/user`, 'DELETE', {
            users: users
        }, res => res.json(), err => err);
    }

    async remove(group_id) {
        return await this.execute(`company/group/${group_id}`, 'DELETE', {}, res => res.json(), err => err)
    }
}
