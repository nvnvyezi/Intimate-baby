import axios from 'axios'
const qs = require('qs');

let cancel, reqArr = {};

const CancelToken = axios.CancelToken;

// 请求拦截器
axios.interceptors.request.use(config => {
  // 发起请求时，取消当前正在进行相同的请求
  if (config.url.includes('http://')) {
    axios.defaults.withCredentials = false;
  }
  if (config.url.includes('https://')) {
    axios.defaults.withCredentials = true;
  }
  if (reqArr[config.url]) {
    reqArr[config.url]('操作取消');
    reqArr[config.url] = cancel;
  } else {
    reqArr[config.url] = cancel;
  }
  return config;
}, err => {
  return Promise.reject(err);
})

axios.interceptors.response.use(res => {
  return res;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break;
      case 401:
        err.message = '未授权，请重新登录'
        break;
      case 403:
        err.message = '拒绝访问'
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        break;
      case 405:
        err.message = '请求方法未允许'
        break;
      case 408:
        err.message = '请求超时'
        break;
      case 500:
        err.message = '服务器端出错'
        break;
      case 501:
        err.message = '网络未实现'
        break;
      case 502:
        err.message = '网络错误'
        break;
      case 503:
        err.message = '服务不可用'
        break;
      case 504:
        err.message = '网络超时'
        break;
      case 505:
        err.message = 'http版本不支持该请求'
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = "连接到服务器失败"
  }
  // message.err(err.message)
    return Promise.resolve(err.response)
})

// axios.defaults.headers = {
//   'X-Requested-With': 'XMLHttpRequest'
// }

axios.defaults.timeout = 10000;

export default {
  get (url, params, headers) {
    return new Promise((resolve, reject) => {
      axios({
        url,
        params,
        // headers,
        // withCredentials: true,          //    表示跨域请求时是否需要使用凭证
        responseType: 'json',           //    服务器相应的数据类型
        method: 'get',
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  post (url, data, headers) {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data: qs.stringify(data),
        headers,
        method: 'post',
        // withCredentials: true,
        responseType: 'json',           //    服务器相应的数据类型
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
}