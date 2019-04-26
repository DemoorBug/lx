(function(window, document) {
// 公共方法
const methods = {
  appendChild (parent, ...children) {
    children.forEach(el => {
      parent.appendChild(el)
    })
  },
  $ (select, root = document) {
    return root.querySelector(select);
  },
  $$ (select, root = document) {
    return root.querySelectorAll(select)
  }
}


//1. 对图片进行分类
//2. 生成dom元素
//3. 绑定事件
//4. 显示到页面上

  class Img {
    constructor (options) {
      this._init(options); //初始化
      this._createElement(); //生成dom元素
      this.bind(); //绑定事件
      this.show(); //显示页面
    }

    _init ({ data, initType, parasitifer }) {
      this.types = ['全部']; //默认有一个全部分类
      this.all = []; //所有图片元素
      this.classified = {'全部': []}; //按照类型分类后的图片
      this.curType = initType; //当前显示的图片分类

      this.imgContainer = null;
      this.wrap = null;
      this.typeBtnEls = null;
      this.figures = null;

      this.parasitifer = methods.$(parasitifer); //挂载点

      this._classify(data)
      // console.log(this.classified)
    }
    _classify (data) {
      let srcs = [];

      data.forEach(({title, type, alt, src}, index) => {
        //将全部分类，拿出来，应该是做标题渲染用的
        if (!this.types.includes(type)) {
          this.types.push(type);
        }
        // 通过data数据自动分类，我们也不知道有多少分类
        if (!Object.keys(this.classified).includes(type)) {
          this.classified[type] = [];
        }
        // 一开始srcs没有东西，就会执行，给srcs添加一个src
        // 第二次进入后srcs是上一次的值，所以可以继续执行
        // 依次把所有图片便利，然后添加到数组里面
        if (!srcs.includes(src)) {
          // 图片没有生成过
          // 生成图片
          // 添加到 对应的分类中
          srcs.push(src);
          let figure = document.createElement('figure');

          let img = document.createElement('img');
          let figcaption = document.createElement('figcaption');

          img.src = src;
          img.setAttribute('alt', alt);
          figcaption.innerText = title;

          methods.appendChild(figure, img, figcaption)
          this.all.push(figure)
          this.classified[type].push(this.all.length - 1)
        }
        // 主要就是处理加载过的图片， 
        else {
          // 去 all 中找到对应的图片 
          // 添加到 对应的分类中
          this.classified[type].push(srcs.findIndex(s1 => {
            return s1 === src
          }))
        }
      }) 


    }
    _getImg (type) {
      return type === '全部' ? [...this.all] : this.classified[type].map(index => this.all[index])
    }

    _createElement () {

      let typesBtn = [];

      // this.types.forEach(item=>{
      //   console.log(item)
      // })
      for (let type of this.types.values()) {
        typesBtn.push(`<li class="${type === this.curType ? "__Img__type-btn-active":''} __Img__classify__type-btn">${type}</li>`)
      }

      let htmlBtn = `
        <ul class="__Img__classify">
          ${typesBtn.join('')}
        </ul>
        <div class="__Img__img-container"></div>
      `
      let divBtn = document.createElement('div');
      divBtn.className = '__Img__container';
      divBtn.innerHTML = htmlBtn;

      this.imgContainer = methods.$('.__Img__img-container', divBtn)
      //////////////////////////////////////////////////////
      // methods.appendChild(methods.$('#wrap'), divBtn); //
      //////////////////////////////////////////////////////
      methods.appendChild(this.imgContainer, ...this._getImg(this.curType)) //
      // 绑定到全局，以后可能会用到
      this.wrap = divBtn;
      this.typeBtnEls = methods.$$('.__Img__classify__type-btn', divBtn);
      this.figures = [...methods.$$('figure', divBtn)]


      // 遮罩层
      let overlay = document.createElement('div');
      overlay.className = '__Img__overlay';

      methods.appendChild(this.wrap, overlay);
      this.overlay = overlay;
      this.previewImg = methods.$('img', overlay)
    }
    // 实现点击后相同内容查询
    _diff (prevImgs, nextImgs) {
      let diffArr = [];
      prevImgs.forEach((src1, index1) => {
        let index2 = nextImgs.findIndex(src2 => src1 === src2);
        if (index2 === -1) return;
        //为什么要push两个呢
        diffArr.push([index1, index2]);
      })
      return diffArr;
    } 
    bind() {
      methods.$('.__Img__classify', this.wrap).addEventListener('click', ({target}) => {
        if (target.nodeName !== 'LI') return;

        const type = target.innerText;
        const els = this._getImg(type);

        let prevImgs = this.figures.map(figure => methods.$('img', figure).src)

        let nextImgs = els.map(figure => methods.$('img', figure).src)

        const diffArr = this._diff(prevImgs, nextImgs);
        // 好像是用来切割this.figures 用的
        diffArr.forEach(([, i2]) => {
          this.figures.every((figure, index) => {
            let src = methods.$('img', figure).src;

            if (src === nextImgs[i2]) {
              this.figures.splice(index, 1);
              return false;
            }
            return true;
          })
        })
        //这个是设置top，left，还有元素高度的属性
        this._calcPosition(els);
        let needAppendEls = [];
        if (diffArr.length) {

          let nextElsIndex = diffArr.map(([, i2]) => i2);

          els.forEach((figure, index) => {
            if (!nextElsIndex.includes(index)) needAppendEls(figure);
          })
        } else {
          needAppendEls = els;
        }

        this.figures.forEach(el => {
          el.style.transform = 'scale(0, 0) translate(0%, 100%)';
          el.style.opacity = '0'
        })

        methods.appendChild(this.imgContainer, ...needAppendEls);
        setTimeout(() => {
          els.forEach(el => {
            
          })
        })
        
      })
    }
    //显示逻辑
    show () {
      //这个是设置top，left，还有元素高度的属性
      this._calcPosition(this.figures)
      //绑定到全局的就被创建了
      methods.appendChild(this.parasitifer, this.wrap);
      setTimeout(() => {
        this.figures.forEach(figure => {
          figure.style.transform = 'scale(1, 1) translate(0, 0)';
          figure.style.opacity = '1';
        })
      })
      
    }
    _calcPosition(figures) {
      //left计数
      let horizontalImgIndex = 0;
      // setTimeout(() => {
        figures.forEach((figure, index) => {
          figure.style.top = `${parseInt(index / 4) * 140 + parseInt(index/ 4) * 15}px`;
          figure.style.left = `${ horizontalImgIndex * 240 + horizontalImgIndex * 15 }px`;
          figure.style.transform = 'scale(0, 0) translate(0, -100%)'
          // 取余，这个值必须<= 3 所以可以这么取余
          horizontalImgIndex = (horizontalImgIndex + 1) % 4;
        // })

        // 向上取整，或者+1都可以。
        let len = Math.ceil(figures.length / 4);
        // 为什么len-1，忘记了
        this.imgContainer.style.height = len * 140 + (len - 1) * 15 +'px';
      })

    }


  }

  window.$Img = Img
})(window, document)