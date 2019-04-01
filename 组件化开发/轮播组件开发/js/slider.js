(function ($) {
  'use strict';
  function Slider($elem, options) {
    this.$elem = $elem;
    this.options = options;
    this.$items = this.$elem.find('.slider-item')
    this.$indicators = this.$elem.find('.slider-indicator')

    this.$left = this.$elem.find('.slider-control-left')
    this.$right = this.$elem.find('.slider-control-right')

    this.indicator = this.options.activeIndex;

    this._init()
  }
  Slider.prototype = {
    constructor: Slider,
    _init: function () {
      var _this = this
      this.$items.eq(this.indicator).show();
      this.$indicators.eq(this.indicator).addClass('slider-indicator-active').siblings().removeClass('slider-indicator-active');

      if (this.options.animation === 'slide') {

      } else { //fade
        this.to = this._fade
      }
      this.$right.on('click', function () {
        _this.to(_this.indicator + 1)
      })
    },
    _fade: function (index) {
      console.log(this.indicator, index);
      this.$items.eq(this.indicator).hide();
      this.$items.eq(index).show();

      this.$indicators.eq(this.indicator).removeClass('slider-indicator-active');
      this.$indicators.eq(index).addClass('slider-indicator-active');
      this.indicator = index
    }
  }
  Slider.DEFAULTS = {
    css: true,
    js: true,
    activeIndex: 0,
    animation: 'fade',
    interval: 500
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
