let fetchGet = (url, params, method, callback) => {
  let data = null;
  if (method === 'post') {
    fetch(url, {
      method: 'post',
      mode: 'cors',
      // body: JSON.stringify(params),
      body: 'bookId=7400407&user_id=8000000&timestamp=1526459170942&sign=9d696af02e9d2a9680baddd0dbb10aa2&shuqi_h5=',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Accept': 'application/json',
        // 'Origin': 'http://xiaoshuo.uc.cn'
      }
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
      fetch(url, {
        method: 'get',
        mode: 'cors'
      }).then((res) => {
        // console.log(res, '')
        if (res.status === 200 && res.ok) {
          // console.log(res)
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