(function ($) {
  // 抛出两个方法，end 判断浏览器支持的前缀，isSupport判断是否支持css3
  var transitionEndEventName = {
    transition: 'transitionend',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    OTransition: 'oTransitionEnd otransitionend'
  }

  var transitionEnd = '',
      isSupport = false;
  for (var name in transitionEndEventName) {
    if (document.body.style[name] !== undefined) {
      transitionEnd = transitionEndEventName[name]
      isSupport = true;
      break;
    }
  }
  window.mt = window.mt || {};
  window.mt.transiton = {
    end: transitionEnd,
    isSupport: isSupport
  }
})(jQuery);
