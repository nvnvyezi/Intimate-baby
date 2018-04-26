let fetchGet = (url, params, method, callback) => {
  let data = null;
  if (method === 'post') {
    fetch(url, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(params),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => {
      // console.log(res, '')
      if (res.status === 200 && res.ok) {
        res.json().then((data) => {
          data = data;
          callback(data);
          // console.log('post', data);
        })
      } else {
        console.error('Error', res);
      }
    }).catch((error) => {
      console.error('Error: ', error)
    })
  } else {
    if (params) {
      // console.log('tag', params)
      let paramsArr = [];
      Object
        .keys(params)
        .forEach((key) => {
          paramsArr.push(key + '=' + params[key])
        })
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArr.join('&');
      } else {
        url += '&' + paramsArr.join('&');
      }
      // console.log('url', url)
      fetch(url, {
        method: 'get',
        mode: 'cors'
      }).then((res) => {
        // console.log(res, '')
        if (res.status === 200 && res.ok) {
          res.json().then((data) => {
            data = data;
            callback(data);
          // console.log('post', data);
          })
        } else {
          console.error('Error', res);
        }
      }).catch((error) => {
        console.error('Error: ', error);
      })
    }
  }
  // return data;
}

export default fetchGet;