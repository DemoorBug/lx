(function ($) {
  'use strict';
  function Slider($elem, options) {
    this.$elem = $elem;
    this.options = options;
    this.$items = this.$elem.find('.slider-item')
    this.$indicators = this.$elem.find('.slider-indicator')

    this.$left = this.$elem.find('.slider-control-left')
    this.$right = this.$elem.find('.slider-control-right')

    this.curIndex = this._getCurIndex(this.options.activeIndex);
    this.$itemNumber = this.$items.length

    this._init()
  }
  Slider.prototype = {
    constructor: Slider,
    _getCurIndex: function (index) {
      if (isNaN(Number(index))) {
        return 0;
      }
      if (index < 0) {
        return this.$itemNumber -1
      }
      if (index > this.$itemNumber - 1) {
        return 0;
      }
      return index;
    },
    _init: function () {
      var _this = this
      this.$indicators.eq(this.curIndex).addClass('slider-indicator-active').siblings().removeClass('slider-indicator-active');

      if (this.options.animation === 'slide') {

      } else { //fade
        this.$items.eq(this.curIndex).show();
        this.to = this._fade
      }
      this.$items.showHide(this.options)
      this.$elem
        .on('click', '.slider-control-right',function () {
          _this.to(_this._getCurIndex(_this.curIndex + 1))
        })
        .on('click', '.slider-control-left', function () {
          _this.to(_this._getCurIndex(_this.curIndex -1))
        })
        .on('click', '.slider-indicator', function (e) {
          _this.to(_this.$indicators.index(this))
        })

      this.$elem.hover(function () {
        clearInterval(_this.autoItem)
      }, function () {
        _this.auto()
      })
      this.auto()
    },
    _fade: function (index) {
      if (this.curIndex === index) {
        return
      }

      this.$items.eq(this.curIndex).showHide('hide');
      this.$items.eq(index).showHide('show');

      this.$indicators.eq(this.curIndex).removeClass('slider-indicator-active');
      this.$indicators.eq(index).addClass('slider-indicator-active');
      this.curIndex = index
    },
    auto: function () {
      var _this = this
      this.autoItem = setInterval(function () {
        _this.to(_this._getCurIndex(_this.curIndex + 1))
      }, this.options.interval)
    }
  }
  Slider.DEFAULTS = {
    css: true,
    js: true,
    activeIndex: 0,
    animation: 'fade',
    interval: 4000
  }
  $.fn.extend({
    slider: function(option) {
      return this.each(function() {
        var slider = $(this).data('slider'),
          options = $.extend({}, Slider.DEFAULTS, typeof option === 'object' && option);
        if (!slider) {
          $(this).data('slider', slider = new Slider($(this), options))
        }
        // var mode = new Dropdown(this, option)

        if (typeof slider[option] === 'function') {
          slider[option]()
        }
      })
    }
  })
})(jQuery);
