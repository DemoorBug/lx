(function ($) {
  'use strict';
  function Slider($elem, options) {
    this.$elem = $elem;
    this.options = options;
    this.$items = this.$elem.find('.slider-item')
    this.$indicators = this.$elem.find('.slider-indicator')

    this.$left = this.$elem.find('.slider-control-left')
    this.$right = this.$elem.find('.slider-control-right')

    this.$itemNumber = this.$items.length
    this.curIndex = this._getCurIndex(this.options.activeIndex);

    this._init()
  }
  Slider.prototype = {
    constructor: Slider,
    //处理index
    _getCurIndex: function (index, maxNumber) {
      maxNumber = maxNumber || this.$itemNumber
      if (isNaN(Number(index))) {
        return 0;
      }
      if (index < 0) {
        return maxNumber -1
      }
      if (index > maxNumber - 1) {

        return 0;
      }

      return index;
    },
    _init: function () {
      var _this = this
      this.$indicators.eq(this.curIndex).addClass('slider-indicator-active').siblings().removeClass('slider-indicator-active');
      this.$elem.trigger('slider-show', [this.curIndex, this.$items[this.curIndex]])

      if (this.options.animation === 'slide') {
        this.$container = this.$elem.find('.slider-container')
        this.$container.append(this.$items.eq(0).clone())
        this.$elem.addClass('slider-slide')
        this.to = this._slide
        this.$itemWidth = this.$items.eq(0).width();
        this.$container.css('left', -1 * this.curIndex * this.$itemWidth)
        this.$container.move(this.options)
        this.$itemNumber++

      } else { //fade
        this.$elem.addClass('slider-fade')
        this.$items.eq(this.curIndex).show();
        this.to = this._fade

        this.$items.showHide(this.options)
      }
      this.$elem
      .on('click', '.slider-control-right',function () {
        _this.to(_this._getCurIndex(_this.curIndex + 1), -1)
      })
      .on('click', '.slider-control-left', function () {
        _this.to(_this._getCurIndex(_this.curIndex -1), 1)
      })
      .on('click', '.slider-indicator', function (e) {
        _this.to(_this.$indicators.index(this))
      })

      // this.$elem.hover($.proxy(this.pause, this), $.proxy(this.auto, this));
      this.$elem.on('mouseenter', $.proxy(this.pause, this))
      this.$elem.on('mouseleave', $.proxy(this.auto, this))
      this.auto()

      this.$items.on('show shown hide hidden', function (e) {
        _this.$elem.trigger('slider-' + e.type, [_this.$items.index(this), this])
      })
      this.$container.on('move', function (e) {
        var num = parseInt($(this).css('left'))  / -728;
        var index = Math.ceil(_this._getCurIndex(num-(_this.direction), _this.$itemNumber - 1))
        _this.$elem.trigger('slider-show', [index, _this.$items[index]])
      })


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
      clearInterval(this.autoItem);
      this.autoItem = setInterval(function () {
        _this.to(_this._getCurIndex(_this.curIndex + 1), -1)
      }, this.options.interval)
    },
    _slide: function (index, direction) {
      if (this.curIndex === index) {
        return
      }
      this.direction = direction
      this.$container.move('to', -1 * index * this.$itemWidth)
      this.curIndex = index
      var self = this
      if (direction) {
        if (direction < 0) {
          if (index === 0) {
            this.$container.removeClass('transition').css('left', 0)
            this.curIndex = index = 1
            setTimeout(function () {
              self.$container.addClass('transition').move('to', -1 * index * self.$itemWidth)
            }, 20)
          }
        } else {
          if (index === this.$itemNumber - 1) {
            this.$container.removeClass('transition').css('left', -1 * index * self.$itemWidth)
            this.curIndex = index = this.$itemNumber - 2
            setTimeout(function () {
              self.$container.addClass('transition').move('to', -1 * index * self.$itemWidth)
            }, 20)
          }
        }
      }
      index = this._getCurIndex(index, this.$itemNumber - 1)
      this.$indicators.removeClass('slider-indicator-active');
      this.$indicators.eq(index).addClass('slider-indicator-active');
    },
    pause: function() {
        clearInterval(this.autoItem);
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
