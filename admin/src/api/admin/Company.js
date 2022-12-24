import Request from '@/api';

export default class Company extends Request {
  constructor(id = 0) {
    super('company', id);
  }

  getAllCompanies() {
    return this.execute('company', 'GET', false, (res) => res, (err) => err)
  }

  getGroups(company_id) {
    return this.execute(`company/${company_id}/group`, "GET", false, res => res.json(), err => err);
  }
}
