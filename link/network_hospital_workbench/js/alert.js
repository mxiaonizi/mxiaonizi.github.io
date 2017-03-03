function createPopWindow(text,seconds,canClose){
	if(!seconds){seconds=2;}
	var popbox=document.createElement('div');
	$(popbox).addClass('lepu_popbox');
	$(popbox).text(text);
	if(canClose){		
		$(popbox).addClass('bigBox');
		
		var closeBtn=document.createElement('div');
		$(closeBtn).addClass('closeBtn');
		$(closeBtn).text('×');
		
		var bg=document.createElement('div');
		$(bg).addClass('bgLayer');
		$(bg).width($(window).width());
		$(bg).height($(window).height());
		
		$('body').append(popbox);
		$('body').append(bg);
		$(popbox).append(closeBtn);
		$(popbox).show();
		$(bg).show();
		
		$(".closeBtn,.bgLayer").click(function(){
			$(popbox).remove();
			$(bg).remove();
			
		});
	}
	else{		
		$(popbox).addClass('smallBox');
		$('body').append(popbox);
		$(popbox).fadeIn('slow');
		setTimeout(function(){
			$(popbox).fadeOut('slow');
			$(popbox).remove();
		},seconds*1000);		
	}
}