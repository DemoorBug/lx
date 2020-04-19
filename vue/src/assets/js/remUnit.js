(function () {
  'use strict'

  // 获取dpr
  var docEl = document.documentElement
  var maxWidth = 640
  var minWidth = 320

  setRemUnit()
  window.addEventListener('resize', setRemUnit)
  // window.addEventListener('resize', setRemUnit) 都可以

  function setRemUnit () {
    // var docEl = document.documentElement
    var ratio = 18.75
    var viewWidth = docEl.getBoundingClientRect().width || window.innerWidth // 兼容处理

    // 设置最大最小值，页面过大后不设置fontSize
    if (maxWidth && (viewWidth > maxWidth)) {
      viewWidth = maxWidth
    } else if (maxWidth && (viewWidth < minWidth)) {
      viewWidth = minWidth
    }

    docEl.style.fontSize = viewWidth / ratio + 'px'
  }
})()
