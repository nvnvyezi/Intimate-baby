import fetchGet from '../wheel/fetchGet'

// 获取分类都有什么
export function categoryHome (cb) {
  fetch('http://walden1.shuqireader.com/qswebapi/rank/classrelation?_=1526884403617', {
    method: 'post',
    mode: 'cors',
    body: 'type=1&timestamp=1526884403615&sign=2ee179009ad107ada1d7db1f01646587&cid=1',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then((res) => {
    if (res.status === 200 && res.ok) {
      res.json().then((data) => {
        cb(data.data);
      })
    } else {
      console.error('Error', res);
    }
  }).catch((error) => {
    console.error('Error: ', error)
  })
}

// 获取每个分类都有什么分类
export function categoryList (cb) {
  fetch('http://walden1.shuqireader.com/qswebapi/rank/classrelation?_=1526888329390', {
    method: 'post',
    mode: 'cors',
    body: 'type=2&timestamp=1526888329390&sign=65f91a08bec31eb3709d9c5d84e51d2f&cid=51',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    // console.log(res, '')
    if (res.status === 200 && res.ok) {
      res.json().then((data) => {
        cb(data.data);
      })
    } else {
      console.error('Error', res);
    }
  }).catch((error) => {
    console.error('Error: ', error)
  })
}

// 获取每个分类的内容都有什么
export function categoryContent (page, words, firstCate, secondCate, sort, cb) {
  const options = {
    do: 'is_caterank',
    p: 1,
    page,
    words,
    shuqi_h5: '',
    onlyCpBooks: 1,
    firstCate,
    secondCate,
    sort,
    _: 1526888329617
  }
  fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
    cb(data.data);
  });
}