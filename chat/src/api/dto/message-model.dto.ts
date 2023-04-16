export type MessageContentDto = {
  attachments: any[],
  text: string
}

export type MessageModelDto = {
  id: number;
  chat_id: number;
  direction: number;
  type_id: number;
  content: any;
  createdAt: string;
  updatedAt: string;
}
