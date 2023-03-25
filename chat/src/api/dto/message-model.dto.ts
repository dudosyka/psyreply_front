export type MessageContentDto = {
  attachments: any[],
  text: string
}

export type MessageModelDto = {
  id: number,
  user_id: number,
  message_id: number,
  recipient_id: number | null,
  createdAt: string,
  updatedAt: string,
  message: {
    id: number,
    bot_message_id: number,
    type_id: number,
    content: MessageContentDto,
    createdAt: string,
    updatedAt: string
  }
}
