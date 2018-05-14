//自定义图片懒加载指令v-lazyLoad
let onListenScroll;

export default (Vue, options = {}) => {
  let init = {
    default: 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'
  }

  if (!Array.prototype.remove) {
    Array.prototype.remove = function (item) {
      if (!this.length) {
        return;
      }
      let index = this.indexOf(item);
      if (index > -1) {
        this.splice(index, 1);
        return this;
      }
    }
  }

  let listenList = [];
  let imgCacheList = [];

  // 图片是否加载过
  const isAlreadyLoad = (item) => {
    if (imgCacheList.indexOf(item) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  const isCanShow = (item, screenHeight) => {
    let el = item.el;
    let src = item.src;
    let top = el.getBoundingClientRect().top;
    if (top + 10 < screenHeight) {
      let img = new Image();
      img.onload = function () {
        el.src = src;
        imgCacheList.push(src);
        listenList.remove(item);
      }
      img.src = src;
      return true;
    } else {
      return false;
    }
  }

  onListenScroll = () => {
    let screenHeight = window.innerHeight;
    for (let i = 0, len = listenList.length; i < len; i++) {
      isCanShow(listenList[i], screenHeight);
    }
      // window.onscroll = onListenScroll;
    // window.addEventListener('scroll', function () {
    //   let screenHeight = window.innerHeight;
    //   for (let i = 0, len = listenList.length; i < len; i++) {
    //     isCanShow(listenList[i], screenHeight);
    //   }
    // }, true)
  }
  // document.addEventListener('touchmove', function() {
  //   onListenScroll();
  // })
  // document.addEventListener('touchstart', function() {
  //   onListenScroll();
  // })
  // document.addEventListener('touchend', function() {
  //   onListenScroll();
  // })

  const addListener = (el, binding) => {
    let imgUrl = binding.value;

    if (isAlreadyLoad(imgUrl)) {
      el.src = imgUrl;
      return false;
    }

    let item = {
      el,
      src: imgUrl
    }

    el.src = init.default;

    if (isCanShow(item)) {
      return ;
    }

    listenList.push(item);
    onListenScroll();
  }

  Vue.directive('lazyLoad', {
    //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted: addListener,
    //所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
    update: addListener
  })
}

export function init() {
  onListenScroll();
}