$(function(){
	$(".fileSize").each(function(){
		var size = + $(this).text();
		var kb=Math.round((size/1024)*10)/10;
		var mb=Math.round((size/1024/1024)*10)/10;
		if(mb>=1){
			$(this).text(mb + 'M');			
		}else if(kb>=1){
			$(this).text(kb + 'K');	
		}else if(size>0){
			$(this).text(size + 'B');	
		}else{
			$(this).text('未知');
		}
	});
	
	$(".table th").click(function(e){
		if(!!this.innerText){
			if(this.className=="sortUp" || this.className==""){
				alert("降序排列");
			}else{
				alert("升序排列");
			}
			alert(this.getAttribute("data-fieldName"));//获取被点击的排序字段，然后发请求获取新排序下的页面
			//location.href="";
		}		
	});
	
	$("#uploadFile").change(function(){
		alert("我已选定上传的文件了");
	});
	
	$("#createFolder").click(function(){
		layer.prompt({
			  title: '请输入文件夹名，并确认',
			  formType: 0 
			}, function(folderName){
				$.ajax({
					url: '',
					type: 'POST',
					dataType: 'json',
					data: {folderName: folderName},
					success:function(data){
						if(data.Status == 200){									
							layer.msg("新建文件夹成功",{icon:1});							
						}else{
							layer.msg(data.Message,{icon:2});
						}
					},
					error:function(){
						layer.msg("新建文件夹失败",{icon:2});
					}
				});				  
			});
	});
	
	$(".edit").click(function(){
		layer.prompt({
			  title: '请输入新的名称，并确认',
			  formType: 0 
			}, function(fileName){
				$.ajax({
					url: '',
					type: 'POST',
					dataType: 'json',
					data: {fileName: fileName},
					success:function(data){
						if(data.Status == 200){									
							layer.msg("编辑成功",{icon:1});							
						}else{
							layer.msg(data.Message,{icon:2});
						}
					},
					error:function(){
						layer.msg("编辑失败",{icon:2});
					}
				});				  
			});
	});
	
	$(".delete").click(function(){
		var fileName=$(this).parents("tr").find(".fileName").text();
		layer.confirm('您确定要删除<font color=red>'+ fileName +'</font>吗？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
				$.ajax({
					url: '',
					type: 'POST',
					dataType: 'json',
					data: {fileName: fileName},
					success:function(data){
						if(data.Status == 200){									
							layer.msg("删除成功",{icon:1});							
						}else{
							layer.msg(data.Message,{icon:2});
						}
					},
					error:function(){
						layer.msg("删除失败",{icon:2});
					}
				});		
			});
	});
	
	
});
