import Request from '@/api';

export default class Company extends Request {
  constructor(id = 0) {
    super('company', id);
  }
  
  getAllCompanies() {
    return this.execute('company', 'GET', false, (res) => res, (err) => err)
  }
  
  async getAllUsers() {
    return (await (await this.execute('user/byCompany', 'GET', false, (res) => res, err => err)).json()).body;
  }
  
  getGroups() {
    return this.execute(`company/group`, "GET", false, res => res.json().then(data => data.body), err => err);
  }
  
  remove(company_id) {
    return this.execute(`company/${company_id}`, 'DELETE', false, res => res, err => err);
  }
}
