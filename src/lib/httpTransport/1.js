function fetchWithRetry(url, options = {}) {
  const {tries = 1} = options;
  function onError(err){
    const triesLeft = tries - 1;
    if (!triesLeft){
      throw err;
    }
    return fetchWithRetry(url, {...options, tries: triesLeft});
  }
  return fetch(url, options).catch(onError);
}


function fetch(url, options = {}, timeout = 5000) {
  const {headers = {}, method, data} = options;

  return new Promise(function(resolve, reject) {
    if (!method) {
      const method = 'GET';
    }

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.onload = function() {
      resolve(xhr);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;

    xhr.timeout = timeout;
    xhr.ontimeout = reject;

    if (method === 'GET' || !data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  });
};
