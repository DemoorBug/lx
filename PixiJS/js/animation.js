const animationsOptions = {  // 精灵动画集合
  mother:[{
    delay:0,
    duration: 0.2,
    to:{x:1120, ease:Power0.easeNone}
  }],
  bg1:[
  //   {
  //   delay: 0.25,
  //   duration: 0.2,
  //   to:{x: 3200, ease:Power0.easeNone}
  // },
  {
    prop:'scale',
    delay: 0.36,
    duration: 0.28,
    to:{x:3,y:3, ease: Power0.easeNone}
  },
  {
    delay: 0.40,
    duration: 0.08,
    to:{alpha:0, ease: Power0.easeNone}
  },
],
  mother_left:[
    {
      delay:0.28,
      duration:0.25,
      to:{rotation:-1, ease:Power0.easeNone}
    }
  ],
  mother_right:[
    {
      delay:0.28,
      duration:0.2,
      to:{rotation:1, ease:Power0.easeNone}
    }
  ]
}
function initAnimation(){
  // delay=0.1 表示滚动到10%开始播放动画
  // duration=0.1 表示运动时间占滚动的百分比
  for (let key in animationsOptions) {
    if (animationsOptions.hasOwnProperty(key)) {
      let obj = animationsOptions[key];
      for (let i = 0; i < obj.length; i++) {
        let act;
        let target;
        if (obj[i].prop) {
          target = sprites[key][obj[i].prop];
        } else {
          target = sprites[key];
        }
        if(obj[i].from & obj[i].to){
          act = TweenMax.fromTo(target,obj[i].duration,obj[i].from,obj[i].to);
        } else if (obj[i].from) {
          act = TweenMax.from(target,obj[i].duration,obj[i].from);
        }else if (obj[i].to) {
          act = TweenMax.to(target,obj[i].duration,obj[i].to);
        }
        let tm = new TimelineMax({delay:obj[i].delay});
        tm.add(act,0);
        tm.play();
        timeline.add(tm,0);
      }
    }
  }
}
