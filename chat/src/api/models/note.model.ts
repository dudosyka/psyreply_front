import {BaseModel} from "@/api/models/base.model";
import {NoteModelDto} from "@/api/dto/note-model.dto";

export class NoteModel extends BaseModel {
  constructor() {
    super('chat');
  }

  async createNote(botUserId: number, data: Record<string, any>): Promise<NoteModelDto> {
    const note: { body: NoteModelDto } = await this.apiResolver.request("POST", `${botUserId}/note`, data)

    return note.body;
  }
}
