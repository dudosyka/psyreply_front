import ApiResolver from "@/api/ApiResolver";
import axios from "axios";
import apiConf from "@/api/api.conf";

export class FilesModel extends ApiResolver {
  constructor() {
    super('files');
  }
  
  async getModel(file_id) {
    return await this.request(`model/${file_id}`, 'GET', null);
  }
  
  import(file) {
    const fd = new FormData();
    
    fd.append('file', file)
    
    return axios.post(`${apiConf.endpoint}/files/import`,
      fd,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(r => r.data.body);
  }
}
