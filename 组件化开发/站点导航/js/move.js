(function ($) {
  var transition = window.mt.transiton;
  var init = function ($elem) {
    this.$elem = $elem;
    this.curX = this.$elem.css('left')
    this.curY = this.$elem.css('top')
  }
  var to = function (x, y, callback) {
    x = (typeof x === 'number') ? x : this.curX;
    y = (typeof y === 'number') ? y : this.curY;
    if (this.curX === x && this.curY === y) return;

    if (typeof callback === 'function') {
      callback()
    }

    this.curX = x
    this.curY = y
  }

  var Slider = function ($elem) {
    init.call(this, $elem)
  }
  Slider.prototype = {
    constructor: Slider,
    to: function (x, y) {
      var self = this
      to.call(this, x, y, function () {
        self.$elem.trigger('move', [self.$elem])
        self.$elem.css({
          left: x,
          top: y
        })
        self.$elem.trigger('moved', [self.$elem])

      })
    }
  }

  var Css3 = function ($elem) {
    init.call(this, $elem)
    this.$elem.addClass('transition')
  }
  Css3.prototype = {
    constructor: Css3,
    to: function (x, y) {
      var self = this
      to.call(this, x, y, function () {
        self.$elem.trigger('move', [self.$elem])
        self.$elem.css({
          left: x,
          top: y
        })
        self.$elem.off(transition.end).one(transition.end, function () {
          self.$elem.trigger('moved', [self.$elem])
        })
      })
    }
  }

  var Js = function ($elem) {
    init.call(this, $elem)
  }
  Js.prototype = {
    constructor: Js,
    to: function (x, y) {
      var self = this
      to.call(this, x, y, function () {
        self.$elem.trigger('move', [self.$elem])
        self.$elem.stop().animate({
          left: x,
          top: y
        }, function () {
          self.$elem.trigger('moved', [self.$elem])
        })
      })
    }
  }

  var defaults = {
    css3: true,
    js: true
  }

  var move = function ($elem, options) {
    var mode = null;
    if (options.css3 && transition.isSupport) {
      mode = new Css3($elem)
    } else if (options.js) {
      mode = new Js($elem)
    } else {
      mode = new Slider($elem)
    }

    return {
      to: $.proxy(mode.to, mode)
    }
  }

  $.fn.extend({
    move: function(option, x, y) {

      return this.each(function() {
        var $this = $(this),
          mode = $(this).data('move'),
          options = $.extend({}, defaults, typeof option === 'object' && option);
        if (!mode) {
          $this.data('move', mode = move($this, options))
        }

        if (typeof mode[option] === 'function') {
          mode[option](x, y);
        }
      })
    }
  });
  // var $left = $('.left'),
  // $right = $('.right'),
  // $slider = $('.slider');
  //
  // var slider = new Css3($slider)
  // $left.on('click', function () {
  //   slider.to(700, '0%')
  // })
  // $right.on('click', function () {
  //   slider.to(600, '0%')
  // })
})(jQuery)
