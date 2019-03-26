(function($) {
  var transition = window.mt.transiton

  function init($elem, hiddenCallback) {
    if ($elem.is(':hidden')) {
      $elem.data('start', 'hidden')
      if (typeof hiddenCallback === 'function') {
        hiddenCallback();
      }
    } else {
      $elem.data('start', 'shown')
    }
  }

  function show($elem, callback) {
    if ($elem.data('start') === 'show') return;
    if ($elem.data('start') === 'shown') return;
    $elem.data('start', 'show').trigger('show')
    callback()
  }

  function hide($elem, callback) {
    if ($elem.data('start') === 'hide') return;
    if ($elem.data('start') === 'hidden') return;
    $elem.data('start', 'hide').trigger('hide')
    callback()
  }

  var slide = {
    init: function($elem) {
      if ($elem.is(':hidden')) {
        $elem.data('start', 'hide')
      } else {
        $elem.data('start', 'show')
      }
    },
    show: function($elem) {
      show($elem, function() {
        $elem.show()
        $elem.trigger('shown')
      })
    },
    hide: function($elem) {
      hide($elem, function() {
        $elem.hide()
        $elem.trigger('hidden')
      })
    }
  };

  var css3 = {
    _init: function($elem, className) {
      $elem.addClass('transition')
      init($elem, function() {
        $elem.addClass(className)
      })
    },
    _show: function($elem, className) {
      show($elem, function() {
        $elem.show()
        setTimeout(function() {
          $elem.removeClass(className)
        }, 20)
        $elem.off(transition.end).one(transition.end, function() {
          $elem.data('start', 'shown').trigger('shown')
        })
      })
    },
    _hide: function($elem, className) {
      hide($elem, function() {
        $elem.addClass(className)
        $elem.off(transition.end).one(transition.end, function() {
          $elem.hide()
          $elem.data('start', 'hidden').trigger('hidden')
        })
      })
    },
    fade: {
      init: function($elem) {
        css3._init($elem, 'fadeOut')
      },
      show: function($elem) {
        css3._show($elem, 'fadeOut')
      },
      hide: function($elem) {
        css3._hide($elem, 'fadeOut')
      }
    },
    slideUpDown: {
      init: function($elem) {
        $elem.height($elem.height())
        css3._init($elem, 'slideUpDown')
      },
      show: function($elem) {
        css3._show($elem, 'slideUpDown')
      },
      hide: function($elem) {
        css3._hide($elem, 'slideUpDown')
      }
    }
  };

  var js = {
    _hide: function($elem, mode) {
      hide($elem, function() {
        $elem.stop()[mode](function() {
          $elem.data('start', 'hidden').trigger('hidden')
        })
      })
    },
    _show: function($elem, mode) {
      show($elem, function() {
        $elem.stop()[mode](function() {
          $elem.data('start', 'shown').trigger('shown')
        })
      });
    },
    _customInit: function($elem, options) {
      var style = {}
      for (var ops in options) {
        style[ops] = $elem.css(ops);
      }
      $elem.data('style', style)
      init($elem, function() {
        $elem.css(options)
      })
    },
    fade: {
      init: function($elem) {
        init($elem)
      },
      show: function($elem) {
        js._show($elem, 'fadeIn')
      },
      hide: function($elem) {
        js._hide($elem, 'fadeOut')
      }
    },
    slideUpDown: {
      init: function($elem) {
        init($elem)
      },
      show: function($elem) {
        js._show($elem, 'slideDown')
      },
      hide: function($elem) {
        js._hide($elem, 'slideUp')
      }
    },
    slideRight: {
      init: function($elem) {
        js._customInit($elem, {
          'width': 0,
          'padding-left': 0,
          'padding-right': 0
        })
      },
      show: function($elem) {
        $elem.show()
        show($elem, function() {
          $elem.stop().animate($elem.data('style'), function() {
            $elem.data('start', 'shown').trigger('shown')
          })
        })
      },
      hide: function($elem) {
        hide($elem, function() {
          $elem.stop().animate({
            'width': 0,
            'padding-left': 0,
            'padding-right': 0
          }, function() {
            $elem.hide()
            $elem.data('start', 'hidden').trigger('hidden')
          })
        })
      }
    }
  };
  var defaults = {
    css3: true,
    js: true,
    animate: 'slideUpDown'
  };

  function showhide($elem, options) {
    var mode = null;
    options = $.extend({}, defaults, options)
    if (options.css3 && transition.isSupport) {
      mode = css3[options.animate]
    } else if (options.js) {
      mode = js[options.animate]
    } else {
      mode = slide
    }
    mode.init($elem)
    return {
      show: $.proxy(mode.show, this, $elem),
      hide: $.proxy(mode.hide, this, $elem)
    }
  };

  // window.mt = window.mt || {},
  // window.mt.showhide = showhide
  // var showHide = window.mt.showhide($box, {
  // animate: 'slideUpDown'
  // })
  // showHide.show($box)
  // showHide.hide($box)

  $.fn.extend({
    showHide: function(option) {
      return this.each(function() {
        var $this = $(this),
          mode = $(this).data('showHide');
        if (!mode) {
          $this.data('showHide', mode = showhide($this, typeof option === 'object' && option))
        }

        if (typeof mode[option] === 'function') {
          mode[option]();
        }
      })
    }
  });

})(jQuery)
