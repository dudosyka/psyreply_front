import apiConf from "@/api/api.conf";

export class AttachmentLoaderUtil {
  static load(attachment: any) {
    if (typeof attachment == 'object')
      return attachment[0]
    else if (typeof attachment == 'string')
      return `${apiConf.url}/files/stream/${attachment}`
  }
}
