(function($) {
  'use strict'
  function Dropdown(elem, option) {
    this.$elem = $(elem)
    //这里我本来写的$($('.dropdown-layer')) 直接获取所有了，自己还没找到。。
    this.$layer = this.$elem.find('.dropdown-layer')
    this.activeClass = option.active + '-active'

    this.$layer.showHide(option)
    var _this = this
    if (option.event === 'click') {
      this.$elem.on('click', function(e) {
        //这里click，的点击判断，如果显示了再点击就是隐藏，老师没写，我加的，还行把
        if (_this.$layer.is(':hidden')) {
          _this.show();
        } else {
          _this.hide();
        }
        //阻止冒泡，不然会触发document的click事件
        e.stopPropagation();
      })
      //别的地方点击隐藏元素
      $(document).on('click', function () {
        _this.hide()
      })
    } else {
      //hover 方式的动画
      this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this))
    }
  }
  Dropdown.prototype = {
    show: function() {
      this.$this = $(this)
      this.$elem.addClass(this.activeClass);
      this.$layer.showHide('show')
    },
    hide: function() {
      this.$this = $(this)
      this.$elem.removeClass(this.activeClass);
      this.$layer.showHide('hide')
    }
  }
  //function 就是对象，所以可以这么写
  Dropdown.DEFAULTS = {
    event: 'hover',
    css3: true,
    js: true,
    animate: 'slideUpDown',
    active: 'default'
  }
  // window.mt.Dropdown = Dropdown
  $.fn.extend({
    dropdown: function (option) {
      return this.each(function() {
        option = $.extend({}, Dropdown.DEFAULTS, option)
        new Dropdown(this, option)
      })
    }
  })


  // function dropdown(elem, option) {
  //   var $elem = $(elem)
  //   var $layer = $('.dropdown-layer')
  //   $layer.showHide(option)
  //
  //   $elem.hover(function() {
  //     var $this = $(this)
  //     $this.addClass($this.data('dropdown')+'-active');
  //     $layer.showHide('show')
  //   }, function() {
  //     var $this = $(this)
  //     $this.removeClass($this.data('dropdown')+'-active');
  //     $layer.showHide('hide')
  //   })
  // }
  // $.fn.extend({
  //   dropdown: function(option) {
  //     this.each(function() {
  //       dropdown(this, option)
  //     })
  //     return this
  //   }
  // })
})(jQuery);
