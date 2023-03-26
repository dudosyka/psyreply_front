import apiConf from "@/api/api.conf";

export class AttachmentLoaderUtil {
  static load(attachment: any) {
    if (typeof attachment == 'string')
      return attachment
    else if (typeof attachment == 'number')
      return `${apiConf.url}/files/stream/${attachment}`
  }
}
