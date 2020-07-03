(function ($) {
  'use strict'

  //数据缓存
  var cache = {
    data: {},
    count: 0,
    addData: function (key, data) {
      if (!this.data[key]) {
        this.data[key] = data;
        this.count++
      }
    },
    readData: function (key) {
      return this.data[key]
    },
    deleteDataByKye: function (key) { //通过键删
      delete this.data[key];
      this.count--;
    },
    deleteDataByOrder: function (num) {
      var count = 0;
      for (var p in data) {
        if (count >= num) {
          break;
        }
        count++;
        this.deleteDataByKye(p)
      }
    }
  }


  function Search($elem, options) {
    this.options = options;
    this.$elem = $elem;
    this.$form = this.$elem.find('.search-form');
    this.$input = this.$elem.find('.search-inputbox');
    // this.btn = $elem.find('.search-btn')
    this.$layer = this.$elem.find('.search-layer');
    var _this = this
    //submit 也可以，click也可以
    // this.$form.on('submit', $.proxy(this.submit, this))
    this.$elem.on('click', '.search-btn',$.proxy(this.submit, this))
    if(options.autocomplete) {
      this.autocomplete()
    }
  }
  Search.DEFAULTS = {
    autocomplete: false,
    url: 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1553601277970_353&callback=jsonp354&k=1&area=c2c&bucketid=12&q=',
    css3: true,
    js: true,
    animate: 'fade'
  }
  Search.prototype = {
    autocomplete: function () {
      var time = null,
          _this = this;
      this.$input
        .on('input', function () {
          clearTimeout(time);
          //获取延迟
          time = setTimeout(function () {
            _this.getData();
          }, 200)
        })
        .on('focus', $.proxy(this.showLayer, this))
        .on('click', function () {
          return false
        })
        $(document).on('click', $.proxy(this.hideLayer, this))
      this.$layer.showHide(this.options)
    },
    submit: function () {
      var _this = this
      if (this.gitInputVal() === '') {
        //这是我自己拓展的，仿天猫的，酷
        this.$input.addClass('background-glint')
        this.$input.off('animationend').one('animationend', function () {
          _this.$input.removeClass('background-glint')
        })
        return false
      }
      this.$form.submit()
    },
    getData: function () {
      var _this = this
      var url = encodeURIComponent(this.gitInputVal());
      if (url === '') {
        return _this.$elem.trigger('errEvent', [_this.$layer]);
      }
      //如果读到缓存数据，直接返回不执行后面的了
      if (cache.readData(url)) {
        //读取缓存，并返回
        return this.$elem.trigger('successEvent', [cache.readData(url), _this.$layer]);
      }
      //如果有新的请求，就会停止以前的请求，来直接完成新的
      if (this.jqXHR) this.jqXHR.abort()
      this.jqXHR = $.ajax({
        //这里的接口是请求，淘宝的数据，因为我们没数据
        url: this.options.url + url,
        // timeout: 1, //超时
        dataType: "jsonp", //跨域
      }).done(function (data, $layer) {
        //数据缓存，添加缓存
        cache.addData(url, data)
        _this.$elem.trigger('successEvent', [data, _this.$layer]);
      }).fail(function (err) {
        _this.$elem.trigger('errEvent', [_this.$layer]);
      }).always(function () {
        _this.jqXHR = null
      })
    },
    showLayer: function () {
      // if(this.$layer.children().length === 0) { return
      //   console.log('s');
      // };
      this.$layer.showHide('show')
    },
    hideLayer: function () {
      this.$layer.showHide('hide')
    },
    gitInputVal: function () {
      return this.$input.val().trim()
    },
    setInput: function (val) {
      this.$input.val(removeHtmlTags(val))

      function removeHtmlTags(str) {
        return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g, '')
      }
    }
  }
  $.fn.extend({
    search: function(option, $layer) {
      return this.each(function() {
        var search = $(this).data('search'),
          $this = $(this),
          options = $.extend({}, Search.DEFAULTS, typeof option === 'object' && option);
        if (!search) {
          $($this).data('search', search = new Search($this, options))
        }
        // var mode = new Dropdown(this, option)

        if (typeof search[option] === 'function') {
          search[option]($layer)
        }
      })
    }
  })
})(jQuery)
