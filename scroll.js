(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : typeof define === 'function' && define.amd
    ? define(factory)
    : (global.Scroll = factory());
})(this, function () {

  var scroll;

  function _touchStart () {

  }
  function _touchMove () {

  }
  function _touchEnd () {

  }
  function _resize () {

  }


  function initEventListener () {
    var passive = false,
        option = false;

    try {
      // 定义一个passive属性，并添加get的函数
      var opts = Object.defineProperty({}, 'passive', {
        get: function () {
          passive = true;
          option = {passive: false};
        }
      });
      // 如果第三个参数作为对象，可以被接收、读取，就表示支持passive
      window.addEventListener('test', null, opts);
    } catch (e) {}

    document.addEventListener('touchstart', _touchStart, option);
    document.addEventListener('touchmove', _touchMove, option);
    document.addEventListener('touchend', _touchEnd, option);
    document.addEventListener('touchcancel', _touchEnd, option);
    window.addEventListener('resize', _resize, option);
    window.addEventListener('orientationchange', _resize, option);
  }

  // 全局加事件监听
  initEventListener();

  scroll = function (container, options) {
    if (!container) {
      return;
    }
    if (isString(container)) {
      container = document.querySelector(container);
    }

    this.wrapper = container;
    this.scroller = wrapper.children[0];

    this._init();
  }

  function extend (target) {
    var objs = Array.prototype.slice(arguments);
    for(var i = objs.length; i >= 1; i--) {
      var obj = objs[i];
      for(var key in obj) {
        target[key] = obj[key];
      }
    }
    return target;
  }

  /**
   * 返回一个判断某种类型的函数
   * @param {string} type
   */
  function typeOf (type) {
    return function (val) {
      if (Object.prototype.toString.call(val) === '[object '+type+']') {
        return true;
      }
      return false;
    }
  }
  // 判断是否是字符串类型的函数
  var isString = typeOf('String'),
      isFunction = typeOf('Function'),
      isArray = typeOf('Array');

  return scroll;
});
