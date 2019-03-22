;
(function($) {
  var Tab = function(tab) {
    var _this_ = this;
    //保存单个tab组件
    this.tab = tab;


    //默认配置参数
    this.config = {
      //用来定义鼠标的触发类型，是click还是mouseover
      //click | mouseover
      triggerType: 'click',
      //用来定义内容切换效果，是直接切换，还是淡入淡出效果
      effect: 'default',
      //默认展示第几个
      inwoke: 1,
      //用来定义tab是否自动切换，当指定了时间间隔，就表示自动切换，并且切换时间为指定时间间隔
      auto: 3000
    }
    //如果配置参数存在，就扩展掉默认的配置参数
    // console.log(this.getConfig())
    if (this.getConfig()) {
      $.extend(this.config, this.getConfig());
    }
    //保存tab标签列表，对应的内容列表
    this.tabItems = this.tab.find('ul.tab-nav li');
    this.contentItems = this.tab.find('div.content-wrap div.content-item')

    //保存配置
    var config = this.config;
    //this.ind 防止用户多次点击
    this.ind = config.inwoke - 1;
    if (config.triggerType === 'click') {
      this.tabItems.on(config.triggerType, function() {
        _this_.invoke($(this));
      })
    } else if (config.triggerType === 'mouseover') {
      this.tabItems.on(config.triggerType, function(event) {
        _this_.invoke($(this));
        //这个bug就是mouseover触发的
        event.stopPropagation();
      })
    } else {
      console.error(config.triggerType, '错误');
    }
    //自动播放
    if (config.auto) {
      //定义一个全局的定时器
      this.timer = null;
      //计数器
      this.loop = 0;
      this.autoPlay();
      //进入取消动画，移开开始动画
      this.tab.hover(function() {
        clearInterval(_this_.timer)
      }, function() {
        _this_.autoPlay()
      })
    }
    //默认第几个元素
    if (config.inwoke > 1) {
      this.invoke(this.tabItems.eq(config.inwoke - 1))
    }
  };
  Tab.prototype = {
    //auto
    autoPlay: function() {
      var _this_ = this,
        tabItems = this.tabItems,
        tabLength = tabItems.length,
        config = this.config;
      //每次清空定时器，不然多次触发会导致速度不可控
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }

      this.timer = setInterval(function() {

        _this_.loop++;

        if (_this_.loop >= tabLength) {
          _this_.loop = 0;
        }
        tabItems.eq(_this_.loop).trigger(config.triggerType)

      }, config.auto)
    },
    //s时间驱动函数
    invoke: function(currentTab) {
      var conItems = this.contentItems
      // conItems.stop(true, true)
      var _this_ = this;
      var index = currentTab.index();
      //防止用户多次点击
      if(this.ind === index) {
        return false
      }

      currentTab.addClass('actived').siblings().removeClass('actived')
      //切换对应的内容区域
      var effect = this.config.effect;
      if (effect === 'default') {
        conItems.eq(index).addClass('current').siblings().removeClass('current')
      } else if (effect === 'fade') {
        conItems.eq(index).fadeIn().stop(true, true).siblings().fadeOut().stop(true, true)
      }
      //自动播放点击后重新赋值
      if (this.config.auto) {
        _this_.loop = index;
      }
      this.ind = currentTab.index()
    },
    //获取配置参数
    getConfig: function() {
      var config = this.tab.attr("data-config");
      //确保有配置参数
      if (config && config != "") {
        return $.parseJSON(config);
      } else {
        return null;
      }
    }
  };
  //Tab.init($('.js-tab'))
  // Tab.init = function(tabs) {
  //   var _this_ = this;
  //   tabs.each(function() {
  //     new _this_($(this));
  //   })
  // }

  //$('.js-tab').tab().css('background-color', 'red')
  $.fn.extend({
    tab: function() {
      this.each(function() {
        new Tab($(this));
      });
      return this
    }
  })
  //这里不暴露接口后，只能通过jQuery的方式调用了 var tab1 = new Tab($('.js-tab').eq(0))
  // window.Tab = Tab;
})(jQuery)
