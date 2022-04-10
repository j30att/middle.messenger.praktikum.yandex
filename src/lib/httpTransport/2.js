const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const data = {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]};

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
    }
  }).reduce((acc, curr) => {
    return acc += `${curr}${separator}`;
  }, '?').slice(0, -1);
}

function isEmpty(value) {
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


class HTTPTransport {
  get = (url, options = {timeout: 5000}) => {
    if (options.data) {
      url = `${url}${queryStringify(options.data)}`;
    }
    if (!options.retries) {
      options.retries = 1;
    }
    return this.fetchWitRetry(url, {...options, method: METHODS.GET});
  }

  post = (url, options = {timeout: 5000}) => {
    if (!options.retries) {
      options.retries = 5;
    }
    return this.fetchWitRetry(url, {...options, method: METHODS.POST});
  }

  put = (url, options = {timeout: 5000}) => {
    if (!options.retries) {
      options.retries = 1;
    }
    return this.fetchWitRetry(url, {...options, method: METHODS.PUT});
  }

  delete = (url, options = {timeout: 5000}) => {
    if (!options.retries) {
      options.retries = 1;
    }
    return this.fetchWitRetry(url, {...options, method: METHODS.DELETE});
  }

  request = (url, options) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = options.timeout;
      xhr.open(options.method, url);

      if (options.headers) {
        if (!Array.isArray(options.headers)) {
          if (!isEmpty(options.headers)) {
            Object.entries(options.headers).forEach(header => header.forEach((value, key) => {
                xhr.setRequestHeader(key, value);
              }
            ));
          }
          if (Array.isArray(options.headers)) {
            options.headers.forEach((item, key) => xhr.setRequestHeader(item, key));
          }
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

      if (options.method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(options.data);
      }
    })
  }
}

http = new HTTPTransport()
http.post('http://localhost:1234', {data: data});
