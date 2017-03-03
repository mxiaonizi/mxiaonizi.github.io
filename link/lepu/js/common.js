$(function(){
	var nowIndex=0;
	var timer;
	
	$(".nav_detail").width($(window).width());
	
	$(".topnav li").each(function(index,item){
		$(item).on("mouseover",function(){
			clearTimeout(timer);
			nowIndex=$(this).index();
			$(".topnav li").removeClass("active");
			$(this).addClass("active");
			
			$(".nav_detail").show();
			$(".nav_detail .business").hide();
			$(".nav_detail .business").eq(nowIndex).show();
			if(nowIndex==1){
				$(".nav_detail").hide();
			}
			
		})
		$(item).on("mouseout",function(){
			$(this).removeClass("active");
			timer=setTimeout(function(){
				$(this).removeClass("active");
				$(".nav_detail").hide();
			},2000)
			$(".nav_detail").on("mouseover",function(){
				clearTimeout(timer);
				$(".nav_detail").show();
				$(".topnav li").eq(nowIndex).addClass("active");
			})
		})
		$(".nav_detail").on("mouseout",function(){
				$(".nav_detail").hide();
				$(".topnav li").eq(nowIndex).removeClass("active");
			})
	})
	
	//返回顶部
	$(window).on("scroll",function(){
		if($(this).scrollTop()>100){
			$("#toTop").fadeIn(500);
		}else{
			$("#toTop").fadeOut(500);
		}
		$(".nav_detail").hide();
		$(".topnav li").eq(nowIndex).removeClass("active");
	})
	$("#toTop").on("click",function(){
		$("body,html").animate({scrollTop:0},500);
	})
//	通栏线
//	$("#line").width($(window).width());	
})
