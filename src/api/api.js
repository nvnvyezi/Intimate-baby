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
export function categoryList (body, cb) {
  fetch('http://walden1.shuqireader.com/qswebapi/rank/classrelation?_=1526888329390', {
    method: 'post',
    mode: 'cors',
    body: `type=2&timestamp=1526888329390&sign=65f91a08bec31eb3709d9c5d84e51d2f&cid=${body}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res) => {
    // console.log(res, '')
    if (res.status === 200 && res.ok) {
      res.json().then((data) => {
        // console.log(data)
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
    console.log(data)
    cb(data.data);
  });
}

// 获取排行都有什么榜
export function seniorityHome(cb) {
  const options = {
    appId: 11,
    pageId: 95,
    channelId: '',
    versionId: '',
    ver: '',
    shuqi_h5: '',
    md5key: '',
    userId: 8000000,
    timestamp: 1526986624,
    type: 2,
    resetcache: '',
    sign: '5F3DCF4CF446B7427D365F41E110B773',
    key: 'shuqiapi',
    _: 1526986624449
  }
  fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/stencil/query', options, 'get', (data) => {
    cb(data.data.module);
  })
}

// 获取每个榜单都有什么内容
export function seniorityList(page, gender, type, cb) {
  const options = {
    do: 'is_novelrank',
    p: 1,
    page,
    size: 10,
    onlyCpBooks: 1,
    gender,
    type,
    shuqi_h5: '',
    _: 1526989227013
  }
  fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
    // console.log(data.data);
    cb(data.data);
  })
}