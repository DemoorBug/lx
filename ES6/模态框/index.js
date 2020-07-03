(function(window, document) {
  'use strict';
  let cur = false
  function Msg(options) {
    this._init(options)
  }
  Msg.prototype._init = function({
    content = '',
    success = null,
    off = null,
    conHtml = false
  }) {
    this.success = success;
    this.off = off;
    this.conHtml = conHtml;

    this.content = content;

    this._str(this.content);

    this._bind([this.el, this.overlay]);
    this._append([this.el, this.overlay]);

  }

  Msg.prototype._bind = function([dom, overlay]) {
    let msg = null;
    const hideMsg = function() {
      dom.style.transform = 'scale(0, 0)';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
      dom.removeEventListener('transitionend', msg)
      dom.addEventListener('transitionend', msg = function() {
        document.body.removeChild(dom)
        document.body.removeChild(overlay)
      })
    }

    const cancel = (e) => {
      this.off && this.off.call(this, e)
      hideMsg();
    }
    const success = (e) => {
      this.success && this.success.call(this, e)
      hideMsg();
    }
    dom.querySelector('#x').addEventListener('click', cancel)
    dom.querySelector('.off').addEventListener('click', cancel)
    dom.querySelector('.success').addEventListener('click', success)
  } 

  Msg.prototype._str = function(content) {
      let dom = document.createElement('div');
      dom.className= 'modal';
      dom.innerHTML = `<div class="modal-tit">
        <span class="title-on">确认删除</span>
        <span id='x'>X</span>
      </div>
      <div class="focus">
        <span class="wu">误</span>
        <span id="c"></span>
      </div>
      <div class="button">
        <button class="success">好的</button>
        <button class="off">算了吧</button>
      </div>`
      let overlay = document.createElement('div');
      overlay.className = 'shade';
      let env = dom.querySelector('#c');
      if (this.conHtml) {
        env.innerHTML = content;
      } else {
        env.innerText = content;
      }

      this.el = dom;
      this.overlay = overlay;
    
  }
  Msg.prototype._append = function([dom, overlay]) {

    document.body.appendChild(dom);
    document.body.appendChild(overlay);
    
    setTimeout(function() { //为什么要加异步呢，是因为插入dom不是立即修改，而是等待同步代码执行完毕后，一起插入页面，同步执行完之后才会重新渲染dom
      dom.style.transform = 'scale(1, 1)';
      overlay.style.backgroundColor = 'rgba(0,0,0,.3)'
    })
  }

  window.$Msg = Msg

})(window, document)