$(function(){
	$(".addHospital").click(function(){		
		layer.prompt({
		  title: '输入医院名称，并确认',
		  formType: 0 //prompt风格，支持0-2
		}, function(pass){
			$.ajax({
				type:'POST',
				url:'netHospital/addNetHospital',
				dataType:'json',
				data:{HospitalName:pass},
				success:function(data){
					if(data.Status == 200){
						layer.msg('添加医院成功', {icon: 1});						
						setTimeout(function(){
							location.reload();
						},1500);
					}else{
						layer.msg('添加医院失败,'+ data.Message, {icon: 2});
					}					
				},
				error:function(){
					layer.msg('添加医院失败', {icon: 2});
				}		  
			});//ajax
		});//layer
	});//click
	
	$(".sortIndex").click(function(){
		var HospitalID=$(this).parents("tr").find(".HospitalID").text();
		layer.prompt({
		  title: '输入医院序号，并确认',
		  formType: 0 //prompt风格，支持0-2
		}, function(pass){
			$.ajax({
				type:'POST',
				url:'netHospital/changeNetHospitalSortIndex',
				dataType:'json',
				data:{HospitalID:HospitalID,SortIndex:pass},
				success:function(data){
					if(data.Status == 200){
						layer.msg('更新排序成功', {icon: 1});						
						setTimeout(function(){
							location.reload();
						},1500);
					}else{
						layer.msg('更新排序失败,'+ data.Message, {icon: 2});
					}					
				},
				error:function(){
					layer.msg('更新排序失败', {icon: 2});
				}		  
			});//ajax
		});//layer
	});//click
	
});

function deleteHospital(element){
	var HospitalID=$(element).parents("tr").find(".HospitalID").text();
	layer.confirm('您确定要删除<font color=red>'+$(element).parents("tr").find(".HospitalName").text()+'</font>嘛？', {
		  btn: ['删除','取消'] //按钮
		}, function(){
			$.ajax({
				type:'POST',
				url:'netHospital/deleteNetHospital',
				dataType:'json',
				data:{HospitalID:HospitalID},
				success:function(data){
					if(data.Status == 200){
						layer.msg('删除成功', {icon: 1});
						setTimeout(function(){
							location.reload();
						},1500);
					}else{
						layer.msg(data.Message, {icon: 2});
					}					
				},
				error:function(){
					layer.msg('删除失败', {icon: 2});
				}				
			});//ajax		  
		});//layer
}

function showPageData(pageNum){				
	$("#netHospital_form").attr("action","netHospital/getNetHospitalList?PageIndex="+pageNum);
	$("#netHospital_form").submit();
}	