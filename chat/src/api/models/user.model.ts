import {BaseModel} from "@/api/models/base.model";
import {UserModelDto} from "@/api/dto/user-model.dto";

export class UserModel extends BaseModel {
  constructor() {
    super('user');
  }

  async getLink(jbId: number) {
    const res: { body: any } = await this.apiResolver.request("GET", `${jbId}/assign`)

    console.log(res);

    return res.body;
  }

}
