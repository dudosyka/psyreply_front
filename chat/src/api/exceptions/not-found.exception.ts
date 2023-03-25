import {BaseException} from "@/api/exceptions/base.exception";
import {da} from "vuetify/locale";
import {BaseModel} from "@/api/models/base.model";

export class NotFoundException <T extends BaseModel> {
  constructor(
    public model: T,
  ) {}
}
