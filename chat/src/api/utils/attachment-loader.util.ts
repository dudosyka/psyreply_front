import apiConf from "@/api/api.conf";

export class AttachmentLoaderUtil {
  static load(attachment: any) {
    if (typeof attachment == 'object') {
      if (typeof attachment[0] === 'number')
        return `${apiConf.url}/files/stream/${attachment}`
      else
        return attachment[0]
    }
    else if (typeof attachment == 'string')
      return `${apiConf.url}/files/stream/${attachment}`
  }
}
