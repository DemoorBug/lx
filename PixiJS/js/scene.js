const scenesOptions = [ // 场景数据：定义每个场景的宽高,x/y距离
  {
    name:"scene1",
    x:0,y:0,
    width:3247,height:750
  },
  {
    name:"scene2",
    x:1620,y:0,
    width:3351,height:750
  }
];
const scenes = {};  // 场景集合 - pixi对象


function initScenes(){ // 初始化场景
  for (let i = scenesOptions.length-1; i >= 0 ; i--) {
    scenes[scenesOptions[i].name] = new PIXI.Container({
      width:scenesOptions[i].width,
      height:scenesOptions[i].height
    });
    scenes[scenesOptions[i].name].x = scenesOptions[i].x;
    app.stage.addChild(scenes[scenesOptions[i].name]);
  }
}
