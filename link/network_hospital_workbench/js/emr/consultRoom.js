$(function(){
	$(".addConsultRoom").click(function(){		
		layer.prompt({
		  title: '输入诊室名称，并确认',
		  formType: 0 //prompt风格，支持0-2
		}, function(pass){
			$.ajax({
				type:'POST',
				url:'netHospital/addConsultRoom',
				dataType:'json',
				data:{
					ConsultRoomName:pass,
					HospitalID:$("#HospitalID").val(),
					HospitalName:$("#HospitalName").val(),
					},
				success:function(data){
					if(data.Status == 200){
						layer.msg('添加诊室成功', {icon: 1});						
						setTimeout(function(){
							location.reload();
						},1500);
					}else{
						layer.msg('添加诊室失败,'+ data.Message, {icon: 2});
					}					
				},
				error:function(){
					layer.msg('添加诊室失败', {icon: 2});
				}		  
			});//ajax
		});//layer
	});//click
	
	$(".editConsultRoom").click(function(){
		var roomID=$(this).parents("tr").find(".ConsultRoomID").text();
		layer.prompt({
		  title: '输入诊室名称，并确认',
		  formType: 0 //prompt风格，支持0-2
		}, function(pass){
			$.ajax({
				type:'POST',
				url:'netHospital/changeConsultRoomName',
				dataType:'json',
				data:{
					ConsultRoomName:pass,
					ConsultRoomID:roomID,
					HospitalID:$("#HospitalID").val(),					
					},
				success:function(data){
					if(data.Status == 200){
						layer.msg('修改诊室成功', {icon: 1});						
						setTimeout(function(){
							location.reload();
						},1500);
					}else{
						layer.msg('修改诊室失败,'+ data.Message, {icon: 2});
					}					
				},
				error:function(){
					layer.msg('修改诊室失败', {icon: 2});
				}		  
			});//ajax
		});//layer
	});//click
});

function deleteHospital(element){
	layer.confirm('您确定要删除<font color=red>'+$(element).parents("tr").find(".ConsultRoomName").text()+'</font>嘛？', {
		  btn: ['删除','取消'] //按钮
		}, function(){
			$.ajax({
				type:'POST',
				url:'netHospital/deleteConsultRoom',
				dataType:'json',
				data:{ConsultRoomID:$(element).parents("tr").find(".ConsultRoomID").text()},
				success:function(data){
					if(data.Status == 200){
						layer.msg('删除成功', {icon: 1});
						setTimeout(function(){
							location.reload();
						},1500);
					}else{
						layer.msg('删除失败,'+ data.Message, {icon: 2});
					}					
				},
				error:function(){
					layer.msg('删除失败', {icon: 2});
				}
			});		  
		});
}
function showPageData(pageNum){				
	$("#netHospital_form").attr("netHospital","coupon/getNetHospitalList?pageIndex="+pageNum);
	$("#netHospital_form").submit();
}	