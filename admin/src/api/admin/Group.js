import Request from "@/api";

export default class Group extends Request {
    constructor() {
        super('group');
    }

    async create(data) {
        return await this.execute(`company/create/group`, 'POST', data, res => res.json().then(data => data.body), err => err);
    }

    async update(group_id, data) {
        return await this.execute(`company/group/${group_id}`, 'PATCH', data, res => res.json().then(data => data.body), err => err);
    }

    async removeUsers(group_id, users) {
        return await this.execute(`company/group/${group_id}/user`, 'DELETE', {
            users: users
        }, res => res.json().then(data => data.body), err => err);
    }

    async remove(group_id) {
        return await this.execute(`company/group/${group_id}`, 'DELETE', {}, res => res.json().then(data => data.body), err => err)
    }
}
