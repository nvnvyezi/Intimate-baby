import fetchGet from '../wheel/fetchGet'
import axios from '../wheel/axios'
const qs = require('qs');

const jsencrypt = new JSEncrypt();
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFjtrjia4kcXabpi+U6zHBD3PC
YiWpp3SUKpsZpb8YzxE6TJBmG7OOM4xg14gYxFr6X4Rw+YuTBgHFWYzx2A1ghzmH
wi+F1Tj5UjGQWjvw80PBjruw1UhbMCM7XDam8W+tWELTGjbHkhWjpnuKf+7DYfC7
KOqjVPRIYzbFt7RTrQIDAQAB
-----END PUBLIC KEY-----
`;
jsencrypt.setPublicKey(publicKey);
// import axios from 'axios'
// 获取分类都有什么
export function categoryHome (cb) {
  const options = {
    type: 1,
    timestamp: 1526884403615,
    sign: '2ee179009ad107ada1d7db1f01646587',
    cid: 1
  }
  if (window.fetch) {  
    fetch('http://walden1.shuqireader.com/qswebapi/rank/classrelation?_=1526884403617', {
      method: 'post',
      mode: 'cors',
      body: qs.stringify(options),
      // body: 'type=1&timestamp=1526884403615&sign=2ee179009ad107ada1d7db1f01646587&cid=1',
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
  } else {
    axios.post('http://walden1.shuqireader.com/qswebapi/rank/classrelation?_=1526884403617', options, {
      'Content-Type': 'application/x-www-form-urlencoded',
    }).then(res => {
      cb(res.data.data)
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取每个分类都有什么分类
export function categoryList (body, cb) {
  const options = {
    type: 2,
    timestamp: 1526888329390,
    sign: '65f91a08bec31eb3709d9c5d84e51d2f',
    cid: `${body}`
  }
  const url = 'http://walden1.shuqireader.com/qswebapi/rank/classrelation?_=1526888329390';
  if (window.fetch) {
    fetch(url, {
      method: 'post',
      mode: 'cors',
      body: qs.stringify(options),
      // body: `type=2&timestamp=1526888329390&sign=65f91a08bec31eb3709d9c5d84e51d2f&cid=${body}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
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
  } else {
    axios.post(url, options, {'Content-Type': 'application/x-www-form-urlencoded'})
          .then(res => {
            cb(res.data.data);
          }).catch(err => {
            console.log(err);
          })
  }
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
  const url = 'http://read.xiaoshuo1-sm.com/novel/i.php';
  axios.get(url, options, {}).then(res => {
    cb(res.data.data)
  }).catch(err => {
    console.log(err);
  })
}

export function categoryContent1 (page, words, tag, sort, cb) {
  const options = {
    do: 'is_caterank',
    p: 1,
    page,
    words,
    shuqi_h5: '',
    onlyCpBooks: 1,
    tag,
    sort,
    _: 1529748776290
  }
  const url = 'http://read.xiaoshuo1-sm.com/novel/i.php';
  // axios.get(url, options, {}).then(res => {
  //   console.log(res)
  //   cb(res.data.data)
  // }).catch(err => {
  //   console.log(err);
  // })
  fetchGet(url, options, 'get', (data) => {
    cb(data.data);
  });
}
export function categoryContent2 (page, words, secondCate, sort, cb) {
  const options = {
    do: 'is_caterank',
    p: 1,
    page,
    words,
    shuqi_h5: '',
    onlyCpBooks: 1,
    secondCate,
    sort,
    _: 1529748776290
  }
  const url = 'http://read.xiaoshuo1-sm.com/novel/i.php';
  // axios.get(url, options, {}).then(res => {
  //   console.log(res)
  //   cb(res.data.data)
  // }).catch(err => {
  //   console.log(err);
  // })
  fetchGet(url, options, 'get', (data) => {
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
  const url = 'http://novelapi.sm.cn/eva_bookstore/v1/stencil/query';
  if (window.fetch) {   
    fetchGet(url, options, 'get', (data) => {
      cb(data.data.module);
    })
  } else {
    axios.get(url, options, {}).then(res => {
            cb(res.data.data.module)
          }).catch(err => {
            console.log(err);
          })
  }
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
  const url = 'http://read.xiaoshuo1-sm.com/novel/i.php';
  if (window.fetch) {
    fetchGet(url, options, 'get', (data) => {
      // console.log(data.data);
      cb(data.data);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取每本书的详细内容
export function bookInfo(bookId, user_id, sign, timestamp,cb) {
  const options = {
    bookId: `${ bookId}`,
    user_id: `${ user_id}`,
    sign: `${ sign }`,
    timestamp: `${ timestamp}`,
    shuqi_h5: ''
  }
  const url = 'http://walden1.shuqireader.com/qswebapi/book/info/?_=1526653320306';
  if (window.fetch) {
    fetch(url, {
      method: 'post',
      mode: 'cors',
      body: qs.stringify(options),
      // body: `bookId=${ bookId}&user_id=${ user_id}&sign=${ sign }&timestamp=${ timestamp}&shuqi_h5=`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
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
  } else {
    axios.post(url, options, {'Content-Type': 'application/x-www-form-urlencoded'}).then(res => {
      cb(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取每本书的评论
export function bookComments (authorId, bookId, cb) {
  const options = {
    do: 'sp_get',
    authorId: authorId,
    bookId: bookId,
    fetch: 'merge',
    sqUid: 8000000,
    source: 'store',
    size: 3,
    page: 1,
    shuqi_h5: '', 
    _: 1526543880837
  }
  const url = 'http://read.xiaoshuo1-sm.com/novel/i.php';
  if (window.fetch) {   
    fetchGet(url, options, 'get', (data) => {
      cb(data.data);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取每本书下面推荐的书

export function bookRecom (bookName, authorName, cb) {
  const options = {
    bamp: 'sqdk',
    dataFrom: 'sm',
    bid: 7483221,
    bkName: bookName,
    authName: authorName,
    authorid: 25671,
    limit: 8,
    ver: 201802091823,
    fr_pr_id: 10002,
    tk: 'NzQ4MzIyMTQxN2FjNTllOWYyNTY3MQ%3D%3D',
    shuqi_h5: '',
    _: 1526546099262
  }
  const url = 'http://bookapi.shuqiapi.com/';
  if (window.fetch) {
    fetchGet(url, options, 'get', (data) => {
      cb(data.data.dk.bookinfo);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data.data.dk.bookinfo);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取作者的其他书
export function otherBooks (authorId, cb) {
  const options = {
    do: 'is_pay_author',
    authorId: authorId,
    p: 3,
    size: 100,
    page: 1,
    _: 1526566584638
  }
  const url = 'http://read.xiaoshuo1-sm.com/novel/i.php';
  if (window.fetch) {
    fetchGet(url, options, 'get', (data) => {
      cb(data.data);
    }) 
  } else {
    axios.get(url, options, {}).then(res => {
      // console.log(res.data.data)
      cb(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取每本书的目录
export function bookCatelog (bookId, user_id, sign, timestamp, cb) {
  const options = {
    bookId: `${ bookId }`,
    user_id: `${ user_id }`,
    sign: `${ sign }`,
    timestamp: `${ timestamp}`
  }
  const url = 'http://walden1.shuqireader.com/qswebapi/book/chapterlist?_=1526644058478';
  if (window.fetch) {
    fetch(url, {
      method: 'post',
      mode: 'cors',
      body: qs.stringify(options),
      // body: `bookId=${ bookId }&user_id=${ user_id }&sign=${ sign }&timestamp=${ timestamp}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      if (res.status === 200 && res.ok) {
        res.json().then((data) => {
          cb(data.data.chapterList);
        })
      } else {
        console.error('Error', res);
      }
    }).catch((error) => {
      console.error('Error: ', error)
    })
  } else {
    axios.post(url, options, {}).then(res => {
      cb(res.data.data.chapterList);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取轮播图以及主精品推荐的书
export function getBookData (cb) {
  const options = {
    appId: '11',
    pageId: '93',
    channelId: '',
    versionId: '',
    ver: '',
    shuqi_h5: '', 
    md5key: '',
    userId: '8000000',
    timestamp: '1525940277',
    type: '2',
    resetcache: '', 
    func_id: '20,24,11,19,33',
    orderid: '1,2,3,4,5',
    sign: '9B93AB56366DAE9AED3D183070247587',
    key: 'shuqiapi',
    _: '1525940277318'
  }
  if (window.fetch) {    
    fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
      cb(data.data);
    })
  } else {
    axios.get('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, {})
          .then(res => {
            // console.log(res)
            cb(res.data.data);
          }).catch(err => {
            console.log(err);
          })
  }
}

// 获取精品推荐的书
export function getBookRecom (cb) {
  const options = {
    appId: '11',
    pageId: '93',
    channelId: '',
    versionId: '',
    ver: '',
    shuqi_h5: '', 
    md5key: '',
    userId: '8000000',
    timestamp: '1525944067',
    type: '2',
    resetcache: '', 
    func_id: '19',
    orderid: '4',
    mid: '1388',
    lmkTxt: 'index',
    sign: 'C6FDEED1E0EC0DAD42F1BB3D660783DF',
    key: 'shuqiapi',
    _: '1525944067034'
  }
  const url = 'http://novelapi.sm.cn/eva_bookstore/v1/module/query';
  if (window.fetch) {
    fetchGet(url, options, 'get', (data) => {
      cb(data.data.module[0].content);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data.data.module[0].content);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 得到男生女生美文
export function getBookBoyGirl (cb) {
  const options = {
    appId: '11',
    pageId: '93',
    channelId: '',
    versionId: '',
    ver: '',
    shuqi_h5: '', 
    md5key: '',
    userId: '8000000',
    timestamp: '1525953643',
    type: '2',
    resetcache: '', 
    func_id: '11,33,11,19,33,11,19,33,11,19',
    orderid: '6,7,8,9,12,14,15,18,21,22',
    sign: '37A3933CC42B68590B8E534EBF7B2283',
    key: 'shuqiapi',
    _: '1525953643514'
  }
  const url = 'http://novelapi.sm.cn/eva_bookstore/v1/module/query';
  if (window.fetch) {        
    fetchGet(url, options, 'get', (data) => {
      cb(data.data);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取完结的书
export function getBookDone (cb) {
  const options = {
    appId: '11',
    pageId: '93',
    channelId: '',
    versionId: '',
    ver: '',
    shuqi_h5: '', 
    md5key: '',
    userId: '8000000',
    timestamp: '1526044743',
    type: '2',
    resetcache: '', 
    func_id: '19',
    orderid: '22',
    mid: '4188',
    lmkTxt: 'index',
    sign: '143E4F7C7E1421BF11E9B6A6543E2E54',
    key: 'shuqiapi',
    _: '1526044743832'
  }
  const url ='http://novelapi.sm.cn/eva_bookstore/v1/module/query';
  if (window.fetch) {        
    fetchGet(url, options, 'get', (data) => {
      cb(data.data.module[0].content);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data.data.module[0].content);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取精品畅销和新品专区的书
export function getBookBestSell (cb) {
  const options = {
    appId: '11',
    pageId: '93',
    channelId: '',
    versionId: '',
    ver: '',
    shuqi_h5: '', 
    md5key: '',
    userId: '8000000',
    timestamp: '1526043109',
    type: '2',
    resetcache: '', 
    func_id: '33,11,33,11,19,12,33,11,19,12',
    orderid: '23,24,25,26,27,28,29,30,31,32',
    sign: '5C251E0B84037646C22B8CCE2FEEE6B0',
    key: 'shuqiapi',
    _: '1526043109522'
  }
  const url = 'http://novelapi.sm.cn/eva_bookstore/v1/module/query';
  if (window.fetch) {        
    fetchGet(url, options, 'get', (data) => {
      cb(data.data);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取阅读兴趣推荐的书
export function getBookInterest (cb) {
  const options = {
    appId: '11',
    pageId: '93',
    channelId: '',
    versionId: '',
    ver: '',
    shuqi_h5: '', 
    md5key: '',
    userId: '8000000',
    timestamp: '1526290238',
    type: '2',
    resetcache: '', 
    func_id: '33,11,28,33,12,33,11,19,33',
    orderid: '35,36,37,38,39,40,41,42,43',
    sign: '3E26701E27A6ABD551FAE9A643AF4906',
    key: 'shuqiapi',
    _: '1526290238825'
  }
  const url = 'http://novelapi.sm.cn/eva_bookstore/v1/module/query';
  if (window.fetch) {
    fetchGet(url, options, 'get', (data) => {
      // console.log(data.data)
      cb(data.data);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      // console.log(res.data.data)
      cb(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 搜索书本
export function getBookSearch (value, cb) {
  const url = 'http://read.xiaoshuo1-sm.com/novel/i.php?do=is_pay_sugs&q';
  const options = {
    q: value
  }
  if (window.fetch) {
    fetchGet(url, options, 'get', (data) => {
      cb(data);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取搜索推荐的书
export function getBookSearchRecom (cb) {
  const options = {
    do: 'is_payreco',
    id: '8000000',
    qtf: 'shuqiApp',
    qtn: 'cpSearchReplace_sug',
    nums: 9,
    shuqi_h5: '',
    _: '1526306009274'
  }
  const url = 'http://read.xiaoshuo1-sm.com/novel/i.php';
  if (window.fetch) {
    fetchGet(url, options, 'get', (data) => {
      cb(data.data);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取搜索出来的书
export function getBookSearchData (searchData, page, cb) {
  const options = {
    do: 'is_serchpay',
    page: page,
    size: 10,
    q: searchData || '元尊',
    filterMigu: 1,
    p: 3,
    shuqi_h5: '', 
    _: '1526385291046'
  }
  const url = 'http://read.xiaoshuo1-sm.com/novel/i.php';
  if (window.fetch) {
    fetchGet(url, options, 'get', (data) => {
      cb(data.data);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取每本书的内容
export function getBookChapter (bookName, author, page, cb) {
  const options = {
    bookName,
    author,
    page
  }
  // const url = `http://127.0.0.1:3000/chapter`;
  const url = `http://${ window.location.hostname}:3001/chapter`;
  if (window.fetch) {
    fetchGet(url, options, 'get', (data) => {
      cb(data);
    })
  } else {
    axios.get(url, options, {}).then(res => {
      cb(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 音乐榜单
export function musiclist (cb) {
  const url = `http://${window.location.hostname}:3001/music`;
  // const url = `http://193.112.4.143:3001/music`;
  if (window.fetch) {
    fetchGet(url, {}, 'get', (data) => {
      cb(data);
    })
  } else {
    axios.get(url, {}, {}).then(res => {
      cb(res);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取歌曲
export function song (mid, cb) {
  const url = `http://${window.location.hostname}:3001/song`;
  // const url = `http://193.112.4.143:3001/song`;
  if (window.fetch) {
    fetchGet(url, {mid: mid}, 'get', (data) => {
      cb(data);
    })
  } else {
    axios.get(url, {mid: mid}, {}).then(res => {
      cb(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 获取歌词
export function musicLyric (mid, cb) {
  const url = `http://${window.location.hostname}:3001/lyric`;
  // const url = `http://193.112.4.143:3001/lyric`;
  if (window.fetch) {
    fetchGet(url, {mid: mid}, 'get', (data) => {
      cb(data);
    })
  } else {
    axios.get(url, {mid: mid}, {}).then(res => {
      cb(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
}

// 用户登录
export function userLoginG (cb) {
  const url = `http://${window.location.hostname}:3001/login`;
  // const url = `http://127.0.0.1:3001/login`;
  axios.get(url, {}, {}).then(res => {
    cb(res.data);
  }).catch(err => {
    console.log(err);
  })
}
export function userLoginP (id, pw, cb) {
  const url = `http://${window.location.hostname}:3001/login`;
  // const url = `http://127.0.0.1:3001/login`;
  const options = {
    id: jsencrypt.encrypt(id),
    pw: jsencrypt.encrypt(pw)
  }
  axios.post(url, options, {}).then(res => {
    cb(res.data);
  }).catch(err => {
    console.log(err);
  })
}
// 用户退出
export function userLogout (cb) {
  const url = `http://${window.location.hostname}:3001/logout`;
  axios.post(url, {}, {}).then(res => {
    cb(res.data);
  }).catch(err => {
    console.log(err);
  })
}

// 用户注册
export function userRegisterG (cb) {
  const url = `http://${window.location.hostname}:3001/register`;
  axios.get(url, {}, {}).then(res => {
    cb(res.data);
  }).catch(err => {
    console.log(err);
  })
}
export function userRegisterP (id, pw, email, cb) {
  const url = `http://${window.location.hostname}:3001/register`;
  const options = {
    id: jsencrypt.encrypt(id),
    pw: jsencrypt.encrypt(pw),
    email: jsencrypt.encrypt(email),
  }
  axios.post(url, options, {}).then(res => {
    cb(res.data);
  }).catch(err => {
    console.log(err);
  })
}

// 加书架
export function userBookShelfG (id, cb) {
  const url = `http://${window.location.hostname}:3001/shelf`;
  axios.get(url, {id}, {}).then(res => {
    cb(res.data);
  }).catch(err => {
    console.log(err);
  })
}
export function userBookShelfP (id, bookShelf, cb) {
  const url = `http://${window.location.hostname}:3001/shelf`;
  const options = {
    id,
    bookShelf: bookShelf.join(',')
  }
  axios.post(url, options, {}).then(res => {
    cb(res.data);
  }).catch(err => {
    cb('失败');
  })
}

// 音乐ｍｖ
export function musicMvList (list, tags, cb) {
  const url = `http://${window.location.hostname}:3001/mv`;
  axios.get(url, {list, tags}, {}).then(res => {
    cb(res.data)
  }).catch((err) => {
    cb({err: true, data: 'axios请求失败'})
  })
}

export function musicMList (cb) {
  const url = `http://${window.location.hostname}:3001/mvList`;
  axios.get(url, {}, {}).then(res => {
    cb(res.data)
  }).catch((err) => {
    cb({err: true, data: 'axios请求失败'})
  })
}

export function musicMvPlay (uri, cb) {
  let url = `http://${window.location.hostname}:3001/mvPlay`;
  axios.get(url, {uri}, {}).then(res => {
    cb(res.data)
  }).catch((err) => {
    cb({err: true, data: 'axios请求失败'})
  })
}

//发表评论
export function sendComments (data, cb) {
  let url = `http://${window.location.hostname}:3001/comments`;
  axios.post(url, data, {}).then(res => {
    cb(res.data)
  }).catch((err) => {
    cb({err: true, data: 'axios请求失败'})
  })
}