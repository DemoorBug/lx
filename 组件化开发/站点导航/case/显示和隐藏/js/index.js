var transition = window.mt.transiton

function init($elem, hiddenCallback) {
  if ($elem.is(':hidden')) {
    $elem.data('start', 'hidden')
    if(typeof hiddenCallback === 'function') {
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

var anim = {
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
  },
}

var slide = {
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
  css3: {
    init: function($elem) {
      slide._init($elem, 'fadeOut')
    },
    show: function($elem) {
      slide._show($elem, 'fadeOut')
    },
    hide: function($elem) {
      slide._hide($elem, 'fadeOut')
    }
  },
  slideUpDown: {
    init: function($elem) {
      $elem.height($elem.height())
      slide._init($elem, 'slideUpDown')
    },
    show: function($elem) {
      slide._show($elem, 'slideUpDown')
    },
    hide: function($elem) {
      slide._hide($elem, 'slideUpDown')
    }
  }
}

var js = {
  _hide: function ($elem, mode) {
    hide($elem, function() {
      $elem.stop()[mode](function() {
        $elem.data('start', 'hidden').trigger('hidden')
      })
    })
  },
  _show: function ($elem, mode) {
    show($elem, function() {
      $elem.stop()[mode](function() {
        $elem.data('start', 'shown').trigger('shown')
      })
    });
  },
  _customInit: function ($elem, options) {
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
    init: function ($elem) {
      init($elem)
    },
    show: function($elem) {
      js._show($elem, 'fadeIn')
    },
    hide: function ($elem) {
      js._hide($elem, 'fadeOut')
    }
  },
  slideUpDown: {
    init: function ($elem) {
      init($elem)
    },
    show: function($elem) {
      js._show($elem, 'slideDown')
    },
    hide: function ($elem) {
      js._hide($elem, 'slideUp')
    }
  },
  slideRight: {
    init: function ($elem) {
      js._customInit($elem, {
        'width': 0,
        'padding-left': 0,
        'padding-right': 0
      })
    },
    show: function ($elem) {
      $elem.show()
      show($elem, function() {
        $elem.stop().animate($elem.data('style'), function() {
          $elem.data('start', 'shown').trigger('shown')
        })
      })
    },
    hide: function ($elem) {
      hide($elem, function () {
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
}
