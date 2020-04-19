(function ($) {
  'use strict'

  var $search = $('.search'),
      $form = $search.find('.search-form'),
      $inputbox = $search.find('.search-inputbox'),
      $btn = $search.find('.search-btn'),
      $layer = $search.find('.search-layer');
  //验证操作
  // $btn.on('click', function () {
  //   //判断是否输入为空，空则不提交
  //   if ($inputbox.val().trim() === '') {
  //     return false
  //   }
  // })

  //新的验证操作
  //比click好的地方就是可以监听layer下拉框，如果点击提交是空也不行
  $form.on('submit', function () {
    if ($inputbox.val().trim() === '') {
      //这是我自己拓展的，仿天猫的，酷
      $inputbox.addClass('background-glint')
      $inputbox.off('animationend').one('animationend', function () {
        $inputbox.removeClass('background-glint')
      })
      return false
    }
  })
  //获取焦点，显示下拉
  $inputbox.on('focus', function () {
    $layer.show()
  }).on('click', function() {
    //阻止冒泡，还可以这样？
    return false
  })
  //document绑定click事件，点击全局就隐藏菜单，用blur 加延迟也可以实现
  $(document).on('click', function () {
    $layer.hide()
  })
  //绑定input事件，内容改变就获取值，不兼容IE9 以下
  $inputbox.on('input', function () {
    var url = "https://suggest.taobao.com/sug?code=utf-8&_ksTS=1553601277970_353&callback=jsonp354&k=1&area=c2c&bucketid=12&q="+ encodeURIComponent($inputbox.val());
    $.ajax({
      //这里的接口是请求，淘宝的数据，因为我们没数据
      url: url,
      // timeout: 1, //超时
      dataType: "jsonp", //跨域
    }).done(function (data) {
      //成功回调
      var html = '',
          dataNum = data.result.length,
          numMax = 9; //自定义显示条目
      if (dataNum === 0) { //没有数据就直接退出
        $layer.hide().html('');
        return
      }
      for (var i = 0; i < dataNum; i++) { //循环遍历数据
        if (numMax <= i) { //自定义显示条目
          break
        }
        html += '<li class="search-layer-item text-ellipsis">'+data.result[i][0]+'</li>'
      }
      $layer.html(html).show() //拼接的字符串显示到DOM元素上
    }).fail(function (err) {
      $layer.hide().html('')
      console.log(err);
    }).always(function () {
      console.log('Why');
    })
  })

  //因为用的是事件委托，可以不用写到会到里面
  $layer.on('click', 'li', function() {
    $inputbox.val(removeHtmlTags($(this).html()));
    $inputbox.parent().submit()
  })
  // 这个呢就是清除字符串中的`<b>`标签
  function removeHtmlTags(str) {
    return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g, '')
  }
})(jQuery)
