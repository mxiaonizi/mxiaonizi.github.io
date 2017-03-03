/*
	妙味课堂 移动端事件工具函数集合
*/
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
function css(element, attr , val){
	if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'|| attr=='rotateY'|| attr=='rotateZ'|| attr=='scaleX'|| attr=='scaleY'|| attr=='translateY'|| attr=='translateX'|| attr=='translateZ' || attr=='skewX' || attr=='skewY'||attr=='skewZ'){
		return setTransform(element, attr , val);
	}
	if(arguments.length == 2){
		var val = element.currentStyle?element.currentStyle[attr]:getComputedStyle(element)[attr];
		if(attr=='opacity'){
			val = Math.round(val*100);
		}
		return parseFloat(val);
	} else {
		switch(attr){
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
			case 'borderWidth':
			case 'borderLeftWidth':
			case 'borderRightWidth':
			case 'borderTopWidth':
			case 'borderBottomWidth':
				val = val < 0 ? 0 : val;
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				element.style[attr] = val +"px";
				break;
			case 'opacity':
				element.style.filter= "alpha(opacity:"+val+")";
				element.style.opacity= val/100;
				break;	
			default:
				element.style[attr]=val;	
		}
	}
}
function setTransform(element,attr,val){
	if(!element["transform"]){
		element["transform"] = {};
	}
	if(typeof val == "undefined"){
		val = element["transform"][attr];
		if(typeof val == "undefined"){
			val = 0;
			element["transform"][attr] = 0;
		}
		return parseFloat(val);
	} else {
		var str = "";
		element["transform"][attr] = val;
		for(var s in element["transform"])	 {
			switch(s){
				case 'skewX':
				case 'skewY':
				case 'skewZ':
				case 'rotate':
				case 'rotateX':
				case 'rotateY':
				case 'rotateZ':
					str += s+"("+element["transform"][s]+"deg) ";
					break;
				case 'translateX':
				case 'translateY':
				case 'translateZ':	
					str += s+"("+element["transform"][s]+"px) ";
					break;
				default:
					str += s+"("+element["transform"][s]/100+") ";
			}
		}
		element.style.MozTransform = element.style.msTransform  = element.style.WebkitTransform = element.style.transform = str;
	}
}
function MTween(el, target, time, type, callBack){
	var t = 0;
	var b = {};
	var c = {};
	var d = time / 20;
	for(var s in target){ 
		b[s] = css(el, s); 
		c[s] = target[s] - b[s];
	}
	clearInterval(el.timer); 
	el.timer = setInterval(
		function(){
			t++;
			if(t>=d){
				clearInterval(el.timer);
				callBack&&callBack.call(el);
			}
			for(var s in b){
				var val = (Tween[type](t,b[s],c[s],d)).toFixed(2);
				css(el, s, val);
			}
		},
		20
	);
}
function MScroll(init){
	this.showBar = false;
	this.dir = "y";
	this.isOver = true;
	this.offMove = false;
	this.offScroll = false;
	for(var s in init){
		this[s] = init[s];
	}
	var _this = this;
	this.Scroll =  this.element.children[0]; 
	this.startPage = 0; 
	this.startTranslate = 0;
	this.iScroll = 0; 
	this.lastTime = 0; 
	this.lastTranslate = 0; 
	this.timeDis = 0;  
	this.translateDis = 0;
	this.backout = 100; 
	this.timer = 0; 
	var isMove = false; 
	this.minTranslate = this.dir == "y"?(this.element.clientHeight - this.Scroll.offsetHeight):(this.element.clientWidth - this.Scroll.offsetWidth); 
	if(this.showBar){ 
		this.scrollBar = document.createElement("div");
		if(this.dir == "y"){
			this.scale =  this.element.clientHeight  / this.Scroll.offsetHeight;
		 	this.scrollBar.style.cssText="width:4px;position:absolute;background:rgba(0,0,0,.5);right:0;top:0;border-radius:2px;min-height:4px; opacity:0; transition:.2s opacity;";
			this.scrollBar.style.height = this.element.clientHeight * this.scale +"px";
		} else {
			this.scale =   this.element.clientWidth  / this.Scroll.offsetWidth;
			this.scrollBar.style.cssText="height:4px;position:absolute;background:rgba(0,0,0,.5);left:0;bottom:0;border-radius:2px;min-width:4px;opacity:0; transition:.2s opacity;";
			this.scrollBar.style.width = this.element.clientWidth * this.scale +"px";
		}
		this.element.appendChild(this.scrollBar);
	}
	this.element.addEventListener("touchstart",
		function(e){
			isMove = false;
			_this.toStart(e);
		},
		false
	);
	this.element.addEventListener("touchmove",
		function(e){
			isMove = true;
			_this.toMove(e);
			e.preventDefault();
		},
		false
	);
	this.element.addEventListener("touchend",
		function(e){
			if(!isMove){
				return;
			}
			_this.toEnd(e);
		},
		false
	);
}
MScroll.prototype = {
	toStart: function(e){ 
		this.onscrollstart &&  this.onscrollstart();
		clearInterval(this.timer);
		var touch = e.changedTouches[0];
		this.startPage = this.dir == "y"? touch.pageY : touch.pageX;
		this.startTranslate = this.iScroll;
		this.lastTime = new Date().getTime(); 
		this.lastTranslate = this.iScroll;
		this.timeDis = 0;
		this.translateDis = 0; 
		if(this.showBar){
			this.scrollBar.style.opacity = 1;
		}
	},
	toMove: function(e){
		if(this.offScroll){
			return;
		}
		var touch = e.changedTouches[0];
		var nowPage = this.dir == "y"? touch.pageY : touch.pageX;
		var nowTime = new Date().getTime(); 
		this.iScroll = this.startTranslate + (nowPage - this.startPage);
		if(this.minTranslate -  this.backout > this.iScroll && this.isOver){
			this.iScroll = this.minTranslate - this.backout;
		}
		if(this.iScroll > this.backout  && this.isOver){
			this.iScroll = this.backout;
		}
		this.timeDis = nowTime - this.lastTime; 
		this.lastTime = nowTime;
		this.translateDis = this.iScroll - this.lastTranslate; 
		this.lastTranslate =  this.iScroll;
		this.setTranslate();
	},
	toEnd: function(e){ 
		var type = "easeOutStrong";
		var speed = this.translateDis / this.timeDis*10;
		speed = this.timeDis == 0 ? 0 : speed; 
		speed = Math.abs(speed) > 5? speed*15 : speed*5;
		var target = speed + this.iScroll;
		if( this.minTranslate > target  && this.isOver ){
			target = this.minTranslate;
			type = "backOut";
		}
		if(target > 0  && this.isOver){
			target = 0;
			type = "backOut";
		}
		this.move(target - this.iScroll,type);
		this.onscrollend &&  this.onscrollend(target);
	},
	setTranslate: function(){
		this.onscroll&&this.onscroll();
		if(this.offMove){
			return;
		}
		if(this.dir == "y"){
			this.scrollBar&&css(this.scrollBar,"translateY", -this.iScroll * this.scale);
			css(this.Scroll,"translateY",this.iScroll);
		} else {
			this.scrollBar&&css(this.scrollBar,"translateX", -this.iScroll * this.scale)
			css(this.Scroll,"translateX",this.iScroll);
		}
	},
	move: function(dis,type,time,callBack){
	var _this = this;
	var t = 0;
	var b = this.iScroll;
	var c = dis;
	var d = 0;
	if(!time){
		d = 40;
	} else {
		d = time / 20;
	}
	clearInterval(this.timer);
	this.timer = setInterval(
		function(){
			t++;
			if(t > d){
				clearInterval(_this.timer);
				callBack&&callBack();
				if(_this.showBar){
					_this.scrollBar.style.opacity = 0;
				}
			} else {
				var val = Tween[type](t,b,c,d);
				_this.iScroll = 	val;
				_this.setTranslate();
			}
		},
		20
	);
	},
	reSize: function(){
			this.minTranslate = this.dir == "y"?(this.element.clientHeight - this.Scroll.offsetHeight):(this.element.clientWidth - this.Scroll.offsetWidth);
			this.scale =  this.dir == "y"? this.element.clientHeight  / this.Scroll.offsetHeight:this.element.clientWidth  / this.Scroll.offsetWidth;
			if( this.dir == "y"){
				this.scrollBar.style.height = this.element.clientHeight * this.scale +"px";
			} else {
				this.scrollBar.style.width = this.element.clientWidth * this.scale +"px";
			}
			this.setTranslate();
	}
};
function TouchEevent(obj){
	var _this = this;
	this.obj = obj;
	for(var i=0; i<this.obj.length; i++){
		this.obj[i].touches={x:0,y:0};
		this.obj[i].isMove = false;
		this.obj[i].index = i;
		this.obj[i].addEventListener("touchstart",
			function(e){
				_this.fnStart(e,this.index);
			},
			false
		);
		this.obj[i].addEventListener("touchmove",
			function(e){
				this.isMove = true;
			},
			false
		);
		this.obj[i].addEventListener("touchend",
			function(e){
				_this.fnEnd(e,this.index);
			},
			false
		);
	}
}
TouchEevent.prototype = {
	fnStart: function(e,index){
			this.obj[index].touches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
			this.obj[index].isMove = false;
	},
	fnEnd: function(e,index){
			var nowTouches = {x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
			var disX = nowTouches.x -this.obj[index].touches.x;
			var disY = nowTouches.y - this.obj[index].touches.y;
			if(disX != 0 || disY != 0){
				if(this.swipe){
					this.swipe.call(this.obj[index]);
				}
				if(disX > 10 && this.swipeRight){
						this.swipeRight.call(this.obj[index]);
				}
				if(disX < -10 && this.swipeLeft){
					this.swipeLeft.call(this.obj[index]);
				}
				if(disY < -10 && this.swipeUp){
						this.swipeUp.call(this.obj[index]);
				}
				if(disY > 10 && this.swipeDown){
					this.swipeDown.call(this.obj[index]);
				}
			}
			if(!this.obj[index].isMove && this.tap){
				this.tap.call(this.obj[index]);
			}
	},
	tap: function(fn){
		this.tap = fn;
	},
	swipe: function(fn){
		this.swipe = fn;
	},
	swipeLeft: function(fn){
		this.swipeLeft = fn;
	},
	swipeRight: function(fn){
		this.swipeRight = fn;
	},
	swipeUp: function(fn){
		this.swipeUp = fn;
	},
	swipeDown: function(fn){
		this.swipeDown = fn;
	}
};
function MTouch(obj){
	if(typeof obj == "string"){
		obj = document.querySelectorAll(obj);
	}
	if(typeof obj.length == "number")
	{
		return new TouchEevent(obj);
	}
	return new TouchEevent([obj]);
}
function getIos()
{
      var u = navigator.userAgent;
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}
function MSetGravity(fn3){
	var mEvent={
		x:0,
		y:0,
		z:0,
		gamma:0,
		alpha:0,
		beta:0
	};
	window.addEventListener("devicemotion",fn,false);
	window.addEventListener("deviceorientation",fn2,false);
	function fn(e){
		var oMotion=e.accelerationIncludingGravity;
		if(getIos()){
			mEvent.x = oMotion.x;
			mEvent.y = oMotion.y;
			mEvent.z = oMotion.z;
		} else {
			mEvent.x = -oMotion.x;
			mEvent.y = -oMotion.y;
			mEvent.z = -oMotion.z;
		}
		fn3&&fn3(mEvent);
	}
	function fn2(e){
		mEvent.gamma = e.gamma;
		mEvent.beta = e.beta;
		mEvent.alpha = e.alpha;
	}
}
function mGravityShake(callBack,calling){
	var SHAKERANGE = 1500;
	var lastX = 0;
	var lastY = 0;
	var lastZ = 0;
	var lastTime = 0;
	var isShanke = false;
	window.addEventListener("devicemotion",fnShake,false);
	function fnShake(e){
		var acceleratio = e.accelerationIncludingGravity;
		var nowTime = new Date().getTime();
		var disTime = nowTime - lastTime; 
		if(disTime > 100){
			var x = acceleratio.x;
			var y = acceleratio.y;
			var z = acceleratio.z;
			var speed = (x+y+z - lastX - lastY - lastZ)/disTime * 5000;
			if(speed > SHAKERANGE){
				calling&&calling();
				isShanke = true;
			}
			if(isShanke&&speed<200){
				isShanke = false;
				callBack&&callBack();
			}
			lastX = x;
			lastY = y;
			lastZ = z;
			lastTime = nowTime;
		}
	}
}
function getDistance(p1, p2) {
    var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
    return Math.sqrt((x * x) + (y * y));
}
function getAngle(p1, p2) {
    var x = p1.pageX - p2.pageX,
        y = p1.pageY- p2.pageY;
    return Math.atan2(y, x) * 180 / Math.PI;
}
function MSetGesture(el){
	var obj = {};
	var isGesTure = false;
	var startPinter = [];
	el.addEventListener("touchstart",
		function(e){
			if(e.touches.length >= 2){
				isGesTure = true;
				startPinter = e.touches;
				obj.gesturestart&&obj.gesturestart.call(el);
			}
		},
		false
	);
	document.addEventListener("touchmove",
		function(e){
			if(e.touches.length >= 2&&isGesTure){
				var nowPinter = e.touches;
				var scale = getDistance(nowPinter[0], nowPinter[1]) / getDistance(startPinter[0], startPinter[1]);
				var rotate =  getAngle(nowPinter[0], nowPinter[1]) -  getAngle(startPinter[0], startPinter[1]) 
				e.scale = scale; 
				e.rotation = rotate;
				obj.gesturemove&&obj.gesturemove.call(el,e);
			}
		},
		false
	)
	document.addEventListener("touchend",
		function(){
			if(isGesTure){
				isGesTure = false
				obj.gestureend&&obj.gestureend.call(el);
			}
		},
		false
	);
	return obj;
}
