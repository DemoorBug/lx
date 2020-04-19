const spritesOptions = [ // 精灵数据：定义每个精灵的坐标
  { // 第一个场景的精灵
    tv:{ // 电视
      position:{x:800,y:0}
    },
    curtain:{ // 窗帘
      position:{x:1220,y:36}
    },
    child:{  // 儿童
      position:{x:1090,y:400}
    },
    mother:{ // 母亲
      position:{x:1280,y:240}
    },
    bg1:{ // 背景
      position:{x:2140,y:370},
      // alpha:0,
      anchor:{x: 0.6588,y: 0.4921},
    },
    tree:{ // 数目
      position:{x:0,y:285}
    }
  },
  { // 第二个场景的精灵
    bg2:{
      position:{x:0,y:0}
    },
    desk:{
      position:{x:0,y:592}
    },
    boy:{
      position:{x:560,y:285}
    },
    mother_body:{
      position:{x:380,y:120}
    },
    mother_left:{
      position:{x:380,y:430}
    },
    mother_right:{
      position:{x:550,y:430}
    }
  }
];
const sprites = {}; // 精灵集合 - pixi对象

function initSprites(){  // new出所有精灵对象，并交给函数initSprite分别赋值
  for (let i = 0; i < spritesOptions.length; i++) {
    let obj = spritesOptions[i];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(key)
        sprites[key] = PIXI.Sprite.fromImage(key);
        initSprite(sprites[key],obj[key],i+1);
      }
    }
  }
  initSpecialProp();
}
function initSprite(sprite,prop,i){  // 初始化单个精灵的属性并加入对应的场景中
  for (let key in prop) {
    if (prop.hasOwnProperty(key)) {
      sprite[key] = prop[key];
    }
  }
  scenes['scene'+i].addChild(sprite);
}
function initSpecialProp(){  // 特殊属性
  sprites.mother_left.pivot.set(0,51);
  sprites.mother_right.pivot.set(95,50)
}
