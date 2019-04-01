(function($) {
  'use strict'

  function Dropdown(elem, option) {
    this.$elem = $(elem)
    //这里我本来写的$($('.dropdown-layer')) 直接获取所有了，自己还没找到。。
    this.$layer = this.$elem.find('.'+ option.layer)
    this.activeClass = option.active + '-active'
    this.option = option

    this.init()
  }
  Dropdown.prototype = {
    init: function() {
      var _this = this
      this.$layer.showHide(this.option)
      if (this.option.event === 'click') {
        this.$elem.on('click', function(e) {
          _this.$allelem = _this.$elem.siblings().find('.'+ this.option.layer+':visible')
          if (_this.$allelem) {
            //哈哈哈，很不错，这个呢就是根据打开元素关闭标签
            _this.Allhide()
          }
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
        $(document).on('click', function() {
          _this.hide()
        })
      } else {
        //hover 方式的动画
        this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this))
      }
    },
    show: function() {
      var _this = this
      if (this.option.delay) {
        this.time = setTimeout(function() {
          _this.$elem.addClass(_this.activeClass);
          _this.$layer.showHide('show')
        }, this.option.delay)
      } else {
        this.$elem.addClass(this.activeClass);
        this.$layer.showHide('show')
      }
    },
    hide: function() {
      if (this.option.delay) {
        clearTimeout(this.time)
      }
      this.$elem.removeClass(this.activeClass);
      this.$layer.showHide('hide')
    },
    Allhide: function() {
      this.$elem.siblings().removeClass(this.activeClass);
      this.$allelem.showHide('hide')
    }
  }
  //function 就是对象，所以可以这么写
  Dropdown.DEFAULTS = {
    event: 'hover',
    css3: true,
    js: true,
    animate: 'slideUpDown',
    active: 'menu',
    delay: 0,
    layer: 'dropdown-layer'
  }
  // window.mt.Dropdown = Dropdown
  $.fn.extend({
    dropdown: function(option) {
      return this.each(function() {
        var dropdown = $(this).data('dropdown'),
          options = $.extend({}, Dropdown.DEFAULTS, typeof option === 'object' && option);
        if (!dropdown) {
          $(this).data('dropdown', dropdown = new Dropdown(this, options))
        }
        // var mode = new Dropdown(this, option)

        if (typeof dropdown[option] === 'function') {
          dropdown[option]()
        }
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
