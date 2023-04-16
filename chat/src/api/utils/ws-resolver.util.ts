import {io, Socket} from 'socket.io-client'
import apiConf from "@/api/api.conf";

export class WsResolverUtil {
  private socket: Socket;
  constructor(
    private url: string,
    private bearer: string
  ) {
    this.socket = io(apiConf.url, {
      transportOptions: {
        polling: {
          extraHeaders: {
            "Authorization": `Bearer ${bearer}`
          }
        }
      },
    });
  }

  on(event: string, callback: { (...args: any): void }) {
    this.socket.on(event, callback)
  }

  emit(event: string, data: Record<string, any>, callback: { (...args: any): void } = () => null) {
    this.socket.emit(event, data, (res: any) => callback(res))
  }

  close() {
    this.socket.close();
  }
}
