function checkBox(event){
	$(event).toggleClass('checked');
	$(event).prev().click();	
}
function radioBox(event){
	$(event).parent().find("span").removeClass('selected');
	$(event).addClass('selected');
	$(event).prev().click();
}

//纯消息弹窗，小弹窗自动消失，大弹窗手动关闭
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

//显示不合格理由
function showReason(event){
	createPopWindow($(event).attr("reason"),0,true);
}

$(function(){
	$(document).keydown(function (e) {
	    var doPrevent;
	    if (e.keyCode == 8) {
	        var d = e.srcElement || e.target;
	        if (d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA') {
	            doPrevent = d.readOnly || d.disabled;
	        }
	        else
	            doPrevent = true;
	    }
	    else
	        doPrevent = false;

	    if (doPrevent)
	        e.preventDefault();
	});	
});