$(function(){
	$(".takeBack").click(function(){
		var ScheduleID=$(this).attr("data-ScheduleID");
		var tr=$(this).parents("tr");
		var forTip=tr.find(".forTip");
		var forPost=tr.find(".forPost");
		layer.confirm('您确定将<font color=red>'+ forTip[0].innerText +'&nbsp;&nbsp;'
											  + forTip[1].innerText +'&nbsp;&nbsp;'
											  + forTip[2].innerText +'</font><br>剩余的<font color=red>'
											  + forTip[3].innerText +'</font>个号源收回和归零吗？',{
			  btn: ['确认','取消'] //按钮
			}, function(){
				$.ajax({
					type:'POST',
					url:'nhManagement/takeBackConsultNumber',
					dataType:'json',
					data:{ScheduleID:ScheduleID,
						  BasicConsultCount:forPost[0].innerText,
						  ExtraConsultCount:forPost[1].innerText,
						  OccupyConsultCount:forPost[2].innerText
					},
					success:function(data){
						if(data.Status == 200){
							layer.msg('成功收回', {icon: 1});
							setTimeout(function(){
								location.reload();
							},1500);
						}else{
							layer.msg(data.Message, {icon: 2});
						}					
					},
					error:function(){
						layer.msg('操作失败', {icon: 2});
					}				
				});//ajax		  
			});//layer
	});//click
});	


function showPageData(pageNum){				
	$("#netHospital_form").attr("action","nhManagement/getRemainedConsultNumberList?PageIndex="+pageNum);
	$("#netHospital_form").submit();
}	