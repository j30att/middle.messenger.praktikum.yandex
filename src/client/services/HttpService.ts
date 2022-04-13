import HttpTransport, { HttpOptions } from '../core/libs/HttpTransport';

export default class HttpService {
  transport: HttpTransport | undefined

  constructor() {
    this.transport = new HttpTransport()
  }

  public get(url: string, options: HttpOptions) {
    this.transport?.get(url, options)
  }

  public post(url: string, options: HttpOptions) {
    this.transport?.get(url, options)
  }

  public put(url: string, options: HttpOptions) {
    this.transport?.get(url, options)
  }

  public delete(url: string, options: HttpOptions) {
    this.transport?.get(url, options)
  }
}
