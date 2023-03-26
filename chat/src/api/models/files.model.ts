import {BaseModel} from "@/api/models/base.model";
import axios from "axios";
import {FailedRequestException} from "@/api/exceptions/failed-request.exception";
import apiConf from "@/api/api.conf";

export class FilesModel extends BaseModel {
  constructor() {
    super('files');
  }

  async upload(file: any) {
    const formData = new FormData();
    formData.append("file", file);
    const res: { body: any } = await axios({
      method: "POST",
      url: `${apiConf.url}/${this.endpoint}/import`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res: any) => res.data).catch((err: any) => {
      throw new FailedRequestException(`${apiConf.url}/${this.endpoint}/import`, this.endpoint, "POST", formData, localStorage.getItem("token"), err.response.status);
    })

    return res.body;
  }
}
