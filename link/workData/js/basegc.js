/*
**attention：本类依赖jQuery
*@filereview 一个基本类baseGC 服务移动端滑屏的事件，定义了常用变量和方法
*@Class baseGC 类名  本类依赖jquery
*@param {object} defaults: 默认参数集合可添加包含deviceWith,deviceHeight,isleft三个变量	   
*@param {array} moveSections 执行滑动的元素的集合如li,div,section等
*@param {int} stepNum 滑动计数，默认0等
*@param {object} getDistance 滑屏时存储touchstart的纵横坐标以及touchmove时的滑动距离等
*@param {int} speed 滑动间隔时间
*@fn {function} preventdefauts 阻止默认滑屏事件防止屏幕滑动
*@fn {function} whichTransitionEvent transition事件的执行判断
*@fn {function} getStyle 获取元素的当前样式根据返回值进行parseInt()
*@author gaochong<276688721@qq.com>
*@data 2015.8.21
*@version 0.1 
 */

var baseGC={//类baseGC的字面量初始化
	defaults:{
		"deviceWidth":parseInt($(window).width())||parseInt(document.body.width),//int屏幕可用宽
		"deviceHeight":parseInt($(window).height())||parseInt(document.body.clientHeight),//int屏幕可用高
		"isleft":false,//boolean 是否为左右划屏 默认false
	},
	moveSections:null,
	stepNum:0,
	getDistance:{
		"px":0,//touchstart横坐标
		"py":0,//touchstart纵坐标
		"plusResult":0,//滑动距离
	},
	speed:0,//滑屏间隔时间
	canbind:true,//绑定事件是否可用 默认可用
	preventDefaults:function(event){
		event.preventDefault()
	},
	whichTransitionEvent:function (){  //transitionend 兼容函数返回浏览器支持的写法
	    var t;  
	    var el = document.createElement('li');  
	    var transitions = {  
	      'transition':'transitionend',  
	      'OTransition':'oTransitionEnd',  
	      'MozTransition':'transitionend',  
	      'WebkitTransition':'webkitTransitionEnd',  
	      'MsTransition':'msTransitionEnd'  
	    }  
	  
	    for(t in transitions){  
	        if( el.style[t] !== undefined ){  
	            return transitions[t];  
	        }  
	    }  
	},
	getStyle:function (obj, attr){  //获取currestyle ， obj 对象，attr 属性名
	    if(obj.currentStyle)  
             {  
                 return obj.currentStyle[attr];  
             }  
             else  
             {  
                 return getComputedStyle(obj,false)[attr];  
             }  
	}
}

