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
export function categoryContent (flag, page, words, firstCate, secondCate, tag, sort, cb) {
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
  const options1 = {
    do: 'is_caterank',
    p: 1,
    page,
    words,
    shuqi_h5: '',
    onlyCpBooks: 1,
    tag,
    sort,
    _: 1526888329617
  }
  const options2 = {
    do: 'is_caterank',
    p: 1,
    page,
    words,
    shuqi_h5: '',
    onlyCpBooks: 1,
    firstCate,
    sort,
    _: 1526888329617
  }
  const options3 = {
    do: 'is_caterank',
    p: 1,
    page,
    words,
    shuqi_h5: '',
    onlyCpBooks: 1,
    secondCate,
    sort,
    _: 1526888329617
  }
  if (flag == 0) {
    fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
      // console.log(data)
      cb(data.data);
    });
  }
  if (flag == 1) {
    fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options1, 'get', (data) => {
      // console.log(data)
      cb(data.data);
    });
  }
  if (flag == 2) {
    fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options2, 'get', (data) => {
      // console.log(data)
      cb(data.data);
    });
  }
  if (flag == 3) {
    fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options3, 'get', (data) => {
      // console.log(data)
      cb(data.data);
    });
  }
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

// 获取每本书的详细内容
export function bookInfo(bookId, user_id, sign, timestamp,cb) {
  fetch('http://walden1.shuqireader.com/qswebapi/book/info/?_=1526653320306', {
    method: 'post',
    mode: 'cors',
    body: `bookId=${ bookId}&user_id=${ user_id}&sign=${ sign }&timestamp=${ timestamp}&shuqi_h5=`,
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
  fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
    cb(data.data);
  })
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
  fetchGet('http://bookapi.shuqiapi.com/', options, 'get', (data) => {
    cb(data.data.dk.bookinfo);
  })
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
  fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
    cb(data.data);
  })
}

// 获取每本书的目录
export function bookCatelog (bookId, user_id, sign, timestamp, cb) {
  fetch('http://walden1.shuqireader.com/qswebapi/book/chapterlist?_=1526644058478', {
    method: 'post',
    mode: 'cors',
    body: `bookId=${ bookId }&user_id=${ user_id }&sign=${ sign }&timestamp=${ timestamp}`,
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
  fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
    cb(data.data);
  })
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
  fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
    cb(data.data.module[0].content);
  })
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
  if (window.fetch) {        
    fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
      cb(data.data);
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
  if (window.fetch) {        
    fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
      cb(data.data.module[0].content);
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
  if (window.fetch) {        
    fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
      cb(data.data);
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
  if (window.fetch) {        
    fetchGet('http://novelapi.sm.cn/eva_bookstore/v1/module/query', options, 'get', (data) => {
      cb(data.data);
    })
  }
}

// 搜索书本
export function getBookSearch (value, cb) {
  if (window.fetch) {
    fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php?do=is_pay_sugs&q', {q: value}, 'get', (data) => {
      cb(data);
    })
  }
}

// 获取搜索推荐的书
export function getBookSearchRecom (cb) {
  if (window.fetch) {
    const options = {
      do: 'is_payreco',
      id: '8000000',
      qtf: 'shuqiApp',
      qtn: 'cpSearchReplace_sug',
      nums: 9,
      shuqi_h5: '',
      _: '1526306009274'
    }
    fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
      cb(data.data);
    })
  }
}

// 获取搜索出来的书
export function getBookSearchData (searchData, page, cb) {
  if (window.fetch) {
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
    fetchGet('http://read.xiaoshuo1-sm.com/novel/i.php', options, 'get', (data) => {
      cb(data.data);
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
  fetchGet(`https://127.0.0.1:3000/chapter`, options, 'get', (data) => {
    // console.log(data)
    cb(data);
  })
}