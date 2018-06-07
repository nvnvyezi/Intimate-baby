import tempToast from './popup'

// 实例
let instance, showToast = false, time;
const toast = {
  install(Vue, options = {}) {
    let opt = tempToast.data();
    Object.assign(opt, options);
    Vue.prototype.$toast = (message, position) => {
      if (showToast) {
        clearTimeout(time);
        instance.vm.visible = showToast = false;
        document.body.removeChild(instance.vm.$el);
      }
      if (message) {
        opt.message = message;
      }
      if (position) {
        opt.position = position;
      }
      let tempToastConstructor = Vue.extend(tempToast);
      instance = new tempToastConstructor({
        data: opt
      })
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
      instance.vm.visible = showToast = true;
      time = setTimeout(function () {
        instance.vm.visible = showToast = false;
        document.body.removeChild(instance.vm.$el);
      }, opt.duration);
    }
  }
}

export default toast;