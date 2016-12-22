import '../css/main.scss';

const width = 640; //设计稿尺寸
let Tool = {
  px2em: function(px){
    return px*10/width;
  },

  setTransform: function(selector, content){
    selector.style.transform = content;
    selector.style.webkitTransform = content;
  },

  setTransition: function(selector, content){
    selector.style.transition = content;
    selector.style.webkitTransition = content;
  },

  clearTransition: function(selector){
    selector.style.transition = '';
    selector.style.webkitTransition = '';
  },

  getPxFromStyle: function (dom){
    return isNaN(parseInt(dom.style.transform.split('(')[1])) 
            ? parseInt(dom.style.transform.split('(')[1]) : 
            parseInt(dom.style.webkitTransform.split('(')[1]);
  }
};

class Mslider {
  constructor(selector, w = '0px', h = '0px'){
    this.ele = document.querySelector(selector),
    this._sl = this.ele.getElementsByTagName('ul')[0],
    this._slLi = this._sl.getElementsByTagName('li'),
    this._slBar = this.ele.getElementsByTagName('ul')[1],
    this._slBarLi = this._slBar.getElementsByTagName('li'),
    this._liWidth = this._slLi[0].offsetWidth,
    this._liTotal = this._slLi.length;

    w = Tool.px2em(parseInt(w)) + 'rem';
    h = Tool.px2em(parseInt(h)) + 'rem';
    

    this.ele.style.width = w;
    this.ele.style.height = h;
    Tool.setTransform(this._sl, 'translateX(0)');
    this._sl.style.width = this._liTotal + "00%";
    this.disable = true;
    this.attachEvents();
  }

  attachEvents(){
    let _this = this;
    this._sl.addEventListener('touchstart', function(e){
      _this.once = true;
      _this.dire = 1;
      this.addEventListener('touchmove', _this.slTouchmove, false);
      this.addEventListener('touchend', _this.slTouchend, false);
      Tool.clearTransition(this);
      this.startX = e.touches[0].pageX;
      this.sstartX = e.touches[0].pageX;
      this.mmoveX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    }, false);

    this.bdTouchmove = function(e){
      e.preventDefault();
    };

    this.slTouchmove = function(e){
      if( _this.once ){
        // 判断横竖滑动，确定是否禁用页面默认滚动
        var _dy = e.touches[0].pageY - this.startY >= 0 ? (e.touches[0].pageY - this.startY) : (this.startY - e.touches[0].pageY),
              _dx = e.touches[0].pageX - this.sstartX >= 0 ? (e.touches[0].pageX - this.sstartX) : (this.sstartX - e.touches[0].pageX);
              this.startY = e.touches[0].pageY;
        if( _dy > _dx ){
          _this.dire = 1;
          this.removeEventListener('touchmove', _this.slTouchmove, false);
          this.removeEventListener('touchend', _this.slTouchend, false);
          document.body.removeEventListener('touchmove', _this.bdTouchmove, false);
        }else{
          _this.dire = 2;
          document.body.addEventListener('touchmove', _this.bdTouchmove, false);
        }
        _this.once = false;
      }
      if(_this.dire == 2){
        var crtX = Tool.getPxFromStyle(this);
        Tool.setTransform(this, 'translateX(' + (e.touches[0].pageX - this.sstartX + crtX) + 'px)');
        this.sstartX = e.touches[0].pageX;
        this.mmoveX = e.touches[0].pageX;
      }
    };

    this.slTouchend = function(e){
      let crtX = Tool.getPxFromStyle(this);
      Tool.setTransition(this, 'all ease-out .3s');
      if(crtX >= 0){
        Tool.setTransform(this, 'translateX(0px)');
      }else{
        var pos1 = parseInt( -crtX / _this._liWidth ),
        pos2 = -crtX % _this._liWidth;
        if(pos2 >= (_this._liWidth/4) && pos1 < _this._liTotal - 1){
          if(this.startX <= this.mmoveX){
          }else{
            pos1 += 1;
          }
        }
        // 设置导航点
        for (var i = 0; i <= _this._slBarLi.length-1; i++) {
          _this._slBarLi[i].className = '';
        }
        _this._slBarLi[pos1].className = 'mslide_ac';
        // 设置吸附位置
        Tool.setTransform(this, 'translateX(-'+pos1*_this._liWidth+'px)');
      }
    };

    this._sl.addEventListener('touchmove', this.slTouchmove, false);

    this._sl.addEventListener('touchend', this.slTouchend, false);

    this._sl.addEventListener('webkitTransitionEnd', function(e){
      Tool.clearTransition(this);
    });

    this._sl.addEventListener('transitionend', function(e){
      Tool.clearTransition(this);
    });
  }
}

let ms = new Mslider('.mslide', '640px', '900px');