(function(){
	var top_pic=document.querySelector(".top_pic");
	var wrapPic=document.querySelector(".wrapPic");
//	var dot=document.querySelector(".dot");
	var dotLi=document.querySelectorAll(".dot li");
	var dotNum=0;
	var iNum=0;
	var html=document.querySelector("html")
	var width = html.getBoundingClientRect().width;//获取屏幕宽度
	
	wrapPic.innerHTML+=wrapPic.innerHTML;
	var li=document.querySelectorAll(".wrapPic li");
	wrapPic.style.width = wrapPic.offsetWidth*2 + "px";
	var timer=null;
	
	
	var Scroll=new MScroll({
		element:top_pic,
		dir:"x"
	})
	Scroll.onscrollstart=function(){
		clearInterval(timer);//手指按下清除图片自动轮播
		if(iNum==0){
			iNum=-li.length/2;
			this.iScroll=iNum*width;
			this.setTranslate();
		}
		if(-iNum == li.length-1 ){
			iNum = -(li.length/2-1);
			this.iScroll = iNum*width;
			this.setTranslate();
		}
	}
	Scroll.onscroll=function(){
		iNum = Math.round(this.iScroll/width);
		dotNum=(-iNum%dotLi.length);
		for(var i=0;i<dotLi.length;i++){
			dotLi[i].className="";
		}
		dotLi[dotNum].className="baclor";
	}
	Scroll.onscrollend=function(){
		clearInterval(this.timer);
		var iScroll=this.iScroll;
		iNum = Math.round(iScroll/width);
		this.move(iNum*width - this.iScroll,"easeOutStrong",500,function(){
		});
		auto();
	}
	auto();
	function auto(){
		timer = setInterval(function(){
				iNum--;
				dotNum=(-iNum%dotLi.length);
				for(var i=0;i<dotLi.length;i++){
					dotLi[i].className="";
				}
				dotLi[dotNum].className="baclor";
				Scroll.move(iNum*width - Scroll.iScroll,"easeOutStrong",1000,
					function(){
						if(-iNum >= li.length-1){
							iNum = -(li.length/2-1);
							Scroll.iScroll = iNum*width;
							Scroll.setTranslate();
						}
					}
				);
				
		},2000);
	}
	
	
	
})()