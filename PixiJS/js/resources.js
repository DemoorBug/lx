// 创建PIXI应用
const w = document.body.clientWidth,
      h = document.body.clientHeight;
let app = new PIXI.Application({
  width:w,
  height:h
});


// 获取屏幕宽高，判断横屏还是竖屏
let min = (w<h)?w:h;
let scale = min/750;  // 根据设计稿尺寸进行缩放比例调整
console.log(w,h,min,"放大系数：",scale);


// 创建资源加载器，进行资源预加载
const loader = new PIXI.loaders.Loader();
loader.add('bg1', './imgs/bg1.png')
      .add('tv', './imgs/tv.png')
      .add('curtain','./imgs/curtain.png')
      .add('tree', './imgs/tree.png')
      .add('bg2', './imgs/bg2.jpg')
      .add('mother','./imgs/mother.png')
      .add('mother_body', './imgs/mother_body.png')
      .add('mother_left', './imgs/mother_left.png')
      .add('mother_right', './imgs/mother_right.png')
      .add('boy', './imgs/boy.png')
      .add('child','./imgs/child.png')
      .add('desk','./imgs/desk.png')
loader.on("progress", function(target, resource) {  //加载进度
  document.getElementById('percent').innerText = parseInt(target.progress)+"%";
});
loader.once('complete', function(target, resource) {  //加载完成
  document.getElementById('loading').style.display = 'none';
  document.body.appendChild(app.view);
  initScenes(); // 初始化场景
  initSprites();  // 初始化精灵
  initAnimation(); // 初始化动画
  app.stage.scale.set(scale,scale);  // 根据屏幕实际宽高放大舞台
  if (w<h) {   // 根据横屏竖屏效果旋转舞台
    app.stage.rotation = 1.57;
    app.stage.pivot.set(0.5);
    app.stage.x = w;
    initTouch(true,'y');
  }else {
    initTouch(false,'x');
  }
});
loader.load();  // 加载资源
