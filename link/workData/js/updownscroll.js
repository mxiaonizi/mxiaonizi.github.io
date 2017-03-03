/*
**attention：本类依赖jQuery
*@filereview 基本类baseGC的拓展方法实现上下滑动屏幕切换页面，效果为一
*@Class baseGC 类名 
**@fn {function} init 初始化函数 初始化样式及touchstart的绑定 默认绑定在body上
**@fn {function} updownStyle  初始化上下滑动样式布局
*@fn {function} addEvent 获取touch的纵横坐标并绑定move和end事件
*@fn {function} moveEvent 获取touchmove纵横坐标和滑动距离
*@fn {function} moveUpEvent 滑动时当前元素的下一个元素display:block
*@fn {function} moveDownEvent 滑动时当前元素的上一个元素display:block
*@fn {function} endEvent 根据滑动距离的正负来执行动作
*@fn {function} endUpEvent 根据滑动距离的负来执行动作 可传入自定义函数
*@fn {function} endDownEvent 根据滑动距离的正来执行动作 可传入自定义函数
*@author gaochong<276688721@qq.com>
*@data 2015.8.21
*@version 0.1 
 */
/*
*带有参数callback的函数皆可传入自定义函数 
*调用方法
*
*$(function(){
*	baseGC.init($("#cover section"),$("#cover"));//类初始化
*	baseGC.speed=400;//滑动间隔时间
*})
*
* 
 */
baseGC.addEvent=function(event){
		baseGC.preventDefaults(event);
		document.body.addEventListener("touchstart",function(event){
			event.preventDefault();
		})
		if(!event.touches.length)return;
		var touch=event.touches[0];	
		baseGC.getDistance.px=touch.pageX;
		baseGC.getDistance.py=touch.pageY;	
		
		 if(baseGC.canbind){
			// baseGC.moveSections[baseGC.stepNum].addEventListener("touchmove",baseGC.moveEvent,false);
			 //baseGC.moveSections[baseGC.stepNum].addEventListener("touchend",baseGC.endEvent,false);
			 document.body.addEventListener("touchmove",baseGC.moveEvent,false);
			 document.body.addEventListener("touchend",baseGC.endEvent,false);
		 }
		
	};
baseGC.moveEvent=function(event){
		baseGC.preventDefaults(event);
		if(!event.touches.length)return;
		var touch=event.touches[0];	
		var mx=touch.pageX;
		var my=touch.pageY;

		if(baseGC.defaults.isleft==false){
			var x=baseGC.getDistance.plusResult=my-baseGC.getDistance.py;
			
			if(x<0){
				baseGC.moveUpEvent();
			}
			if(x>0){
				baseGC.moveDownEvent();
			}
			if(ifmove!=undefined){ifmove();}
		}else{
			baseGC.getDistance.plusResult=mx-baseGC.getDistance.px;
			
		}
		
	};
baseGC.moveUpEvent=function(){
	if(baseGC.stepNum>baseGC.moveSections.length-2){baseGC.canbind=false;return;}else{
		baseGC.canbind=true;
		baseGC.moveSections.eq(baseGC.stepNum+1).css({"display":"block"});
	 }
	};
baseGC.moveDownEvent=function(){
	if(baseGC.stepNum<=0){baseGC.canbind=false;return;}else{
		     baseGC.canbind=true;
		baseGC.moveSections.eq(baseGC.stepNum-1).css({"display":"block"});
	 }
	};
baseGC.endEvent=function(event){
		baseGC.preventDefaults(event);
		if(baseGC.getDistance.plusResult==0){
			return;
		}
		if(baseGC.getDistance.plusResult>0){
			baseGC.endDownEvent();
		}
		if(baseGC.getDistance.plusResult<0){
			baseGC.endUpEvent();
		}
		baseGC.getDistance.plusResult=0;
		document.body.removeEventListener("touchstart",baseGC.addEvent,false);
		document.body.removeEventListener("touchmove",baseGC.moveEvent,false);
		document.body.removeEventListener("touchend",baseGC.endEvent,false);
		if(ifpie!=undefined){ifpie();}
        setTimeout(function(){
        	
        	document.body.addEventListener("touchstart",baseGC.addEvent,false);
        	baseGC.canbind=true;
        },baseGC.speed)
	};
baseGC.updownStyle=function(){

		baseGC.moveSections.parent().css({"height":"100%","height":baseGC.defaults.deviceHeight+"px","overflow":"hidden","position":"relative"});
		baseGC.moveSections.css({"display":"none","height":baseGC.defaults.deviceHeight+"px","width":baseGC.defaults.deviceWidth+"px","position":"absolute"});
		baseGC.moveSections.eq(0).css({"display":"block","transform":"translate(0,0)","-webkit-transform":"translate(0,0)"});
		for(var i=1;i<baseGC.moveSections.length;i++){

			baseGC.moveSections.eq(i).css({"transform":"translate(0,100%)","-webkit-transform":"translate(0,100%)",})
		}
	};
baseGC.endUpEvent=function(callback){
		if(baseGC.stepNum>baseGC.moveSections.length-2){baseGC.canbind=false;return;}else{
			baseGC.canbind=true;
			baseGC.moveSections.eq(baseGC.stepNum).css({"z-index":1,"transform":"translate(0,-100%)","-webkit-transform":"translate(0,-100%)","transition":"transform .6s","-webkit-transition":"-webkit-transform .6s"});
			baseGC.moveSections.eq(baseGC.stepNum+1).css({"z-index":1,"transform":"translate(0,0)","-webkit-transform":"translate(0,0)","transition":"transform .6s","-webkit-transition":"-webkit-transform .6s"});
			baseGC.whichTransitionEvent()&&baseGC.moveSections[baseGC.stepNum].addEventListener(baseGC.whichTransitionEvent(), function(){
				baseGC.moveSections.eq(baseGC.stepNum-1).css({"display":"none"});
		    },false);
			baseGC.stepNum++;
		}
		
	};
baseGC.endDownEvent=function(callback){

		 if(baseGC.stepNum<=0){baseGC.canbind=false;return;}else{
		     baseGC.canbind=true;
			 baseGC.moveSections.eq(baseGC.stepNum).css({"z-index":1,"transform":"translate(0,100%)","-webkit-transform":"translate(0,100%)"});
	         baseGC.whichTransitionEvent()&&baseGC.moveSections[baseGC.stepNum].addEventListener(baseGC.whichTransitionEvent(), function(){
				baseGC.moveSections.eq(baseGC.stepNum+1).css({"display":"none"});
		    },false);
	         baseGC.stepNum--; 
	         baseGC.moveSections.eq(baseGC.stepNum).css({"z-index":1,"transform":"translate(0,0)","-webkit-transform":"translate(0,0)"});
         }
     
	};
	
baseGC.init=function(elements,obj){
		baseGC.moveSections=elements;
		obj.css({"position":"relative","height":baseGC.defaults.deviceHeight+"px","width":baseGC.defaults.deviceWidth+"px"});
		baseGC.updownStyle();
	   document.body.addEventListener("touchstart",baseGC.addEvent,false);
	}
//$(function){} 内部即为需要初始化传入的参数前者为要执行动作的元素的集合，后者为集合的父标签
$(function(){
	///baseGC.ifpie=null;
	baseGC.init($("#cover section"),$("#cover"));//类初始化
	baseGC.speed=400;//滑动间隔时间
})