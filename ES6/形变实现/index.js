{
  class Transition {
    constructor (el) {
      this.el = el;
      this.dom = document.querySelector(el);
      this.dom.style.transition = `all ${Transition.config.defaultTime / 1000}s`
      this.arr = [];
      this._tsf = {
        translate: '',
        rotate: '',
        scale: ''
      }
    }

    translate (value, time) {
      return this._add('translate',value, time)
    }
    scale (value, time) {
      return this._add('scale', value, time)
    }
    rotate (value, time) {
      return this._add('rotate', value, time)
    }
    // multi (options) {
    //   return this._add('multi', options)
    // }
    done() {
      this._start()
    }

    _add (tr ,value, time) {
      this.arr.push({
        tr,
        value,
        time
      })
      return this;
    }

    _start () {
      setTimeout(() => {
        console.log()
        if (this.arr.length === 0) return ;
        let {tr, value, time} = this.arr.shift();
        this.dom.style.transition = `all ${ time/1000 }s`
        // this.dom.style.transform += `${tr}(${value}) `;
        this.dom.style.transform = this._getTransition(tr, value, time);
        Transition.config.defaultTime = time;
        this.dom.addEventListener('transitionend', () => {
          this._start()
        })

      })
    }
    _getTransition (tr, value, time) {
      const _tsf = this._tsf;
      switch (tr) {
        case 'translate':
        _tsf.translate = `translate(${value})`;
        break;
        case 'rotate':
        _tsf.rotate = `rotate(${value})`;
        break;
        case 'scale':
        _tsf.scale = `scale(${value})`;
        break;
        // case 'multi':
        // value.forEach(({type, value}) => {
        //   this._getTransition(type, value)
        // })
        // break;
      }
      // console.log(`${_tsf.translate}, ${_tsf.rotate}, ${_tsf.scale}`)
      return `${_tsf.translate} ${_tsf.rotate} ${_tsf.scale}`;
    }
  }
  Transition.config = {
    defaultTime: '300'
  }

  class Multi extends Transition {
    multi (options) {
      return this._add('multi', options)
    }
   _getTransition (tr, value, time) {
      const _tsf = this._tsf;
      switch (tr) {
        case 'translate':
        _tsf.translate = `translate(${value})`;
        break;
        case 'rotate':
        _tsf.rotate = `rotate(${value})`;
        break;
        case 'scale':
        _tsf.scale = `scale(${value})`;
        break;
        case 'multi':
        value.forEach(({type, value}) => {
          this._getTransition(type, value)
        })
        break;
      }
      // console.log(`${_tsf.translate}, ${_tsf.rotate}, ${_tsf.scale}`)
      return `${_tsf.translate} ${_tsf.rotate} ${_tsf.scale}`;
    }
  }


  let tran = new Multi('.box');
  tran.translate('100px, 100px', '1000').rotate('50deg', '2000').scale('5', '400').multi([{
    type: 'translate',
    value: '0, 0',
  },{
    type: 'rotate',
    value: '-50deg'
  },{
    type: 'scale',
    value: '1'
  }]).done()


}