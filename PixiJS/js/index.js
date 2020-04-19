let timeline = new TimelineMax({
  paused: true
});
let alloyTouch;
let max = (w>h)?w:h;
function initTouch(vertical,val){
  let scrollDis = app.stage.width - max
  console.log(app.stage.width, max, scrollDis)
  alloyTouch = new AlloyTouch({
    touch:"body",//反馈触摸的dom
    vertical: vertical,//不必需，默认是true代表监听竖直方向touch
    min: -scrollDis, //不必需,运动属性的最小值
    maxSpeed: 1,
    max: 0, //不必需,滚动属性的最大值
    bindSelf: false,
    initialValue: 0,
    change:function(value){
      app.stage.position[val] = value;
      let progress = -value / scrollDis;
      console.log(-value, progress)
      progress = progress < 0 ? 0 : progress;
      progress = progress > 1 ? 1 : progress;
      timeline.seek(progress);
    }
 })
}
