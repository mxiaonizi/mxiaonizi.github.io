	$(function(){
		$("a").on("click",function(){
			var menuid=$(this).attr("data-menu");
			var title=$(this).attr("data-tabtitle");
			var url=$(this).attr("href");
			if(menuid!=undefined){
					window.parent.addPanel_son(title,url);	
			}
			if(title!=undefined){
				return false;
			} 
		});		
		$("table tr:odd").css("background-color","#fcfcfc");
		$("table tr:even").css("background-color","#cdf8fd");
	});