// 负责管理所有的自定义指令

export const imageerror = {
  // 指令对象
  inserted(dom, options) {
    // 当图片有地址但是报错时会触发图片事件 onerror
    // dom.src = dom.src || options.value
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
