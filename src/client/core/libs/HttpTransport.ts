
export interface HttpOptions {
  method?: HttpMethods
  timeout: number;
  data?: any ;
  headers?: any;
}

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

function queryStringify(data) {
  const separator = '&';
  return Object.keys(data).map((key) => {
    switch (typeof data[key]) {
      case 'object':
        if (data[key] instanceof Array)
          return `${key}=${data[key].map(item => item)}`
        else
          return `${key}=${(data[key])}`
      case 'boolean':
      case 'string':
      case 'number':
        return `${key}=${data[key].toString()}`
      case 'undefined':
        break;
    }
  }).reduce((acc, curr) => {
    return acc += `${curr}${separator}`;
  }, '?').slice(0, -1);
}

function isEmpty(value:any) {
  if (typeof value === 'object') {
    if (value === null) {
      return true
    } else {
      return Object.keys(value).length === 0 && value.constructor === Object;
    }
  }
  if (typeof value === 'string') {
    return value.length <= 0;
  }
  return true;
}


export default class HttpTransport {
  get = (url:string, options:HttpOptions = {timeout: 5000}) => {
    if (options.data) {
      url = `${url}${queryStringify(options.data)}`;
    }
    return this.request(url, {...options, method: HttpMethods.GET});
  }

  post = (url:string, options:HttpOptions = {timeout: 5000}) => {
    return this.request(url, {...options, method: HttpMethods.POST});
  }

  put = (url:string, options: HttpOptions = {timeout: 5000}) => {
    return this.request(url, {...options, method: HttpMethods.PUT});
  }

  delete = (url:string, options: HttpOptions = {timeout: 5000}) => {
    return this.request(url, {...options, method: HttpMethods.DELETE});
  }

  request = (url:string, options:HttpOptions) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = options.timeout;
      if (options.method){
        xhr.open(options.method, url);
      }

      if (options.headers && !Array.isArray(options.headers)) {
        if (!isEmpty(options.headers)) {
          Object.entries(options.headers).forEach(header => header.forEach((value, key) => {
              xhr.setRequestHeader(key.toString(), value.toString());
            }
          ));
        }
        if (Array.isArray(options.headers)) {
          options.headers.forEach((item, key) => xhr.setRequestHeader(item, key.toString()));
        }
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 500) {
          resolve(xhr);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };

      if (options.method === HttpMethods.GET) {
        xhr.send();
      } else {
        xhr.send(options.data);
      }
    })
  }
}
