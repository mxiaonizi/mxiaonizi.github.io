$(function(){
	freshTable();
	$("#search").click(function(){
//		console.log($("#GenericName").val(),$("#ProductName").val())
		$.ajax({
			url: 'nhMedicineManagement/getVerifiedMedicineList',
			type: 'POST',
			dataType: 'json',
			data: {GenericName:$("#GenericName").val(),ProductName: $("#ProductName").val(),Producer:$("#Producer").val()},
			success:function(data){
				if(data.Status == 200){
					console.log(data)
					var html="";
					data.ListInfo.forEach(function(item){
						html+="<tr><td>"+item.MedicineID+"</td><td>"
										+item.FirstCategory+"</td><td>"
										+item.SecondCategory+"</td><td class='GenericName'>"
										+item.GenericName+"</td><td>"
										+item.ProductName+"</td><td>"
										+item.Producer+"</td><td>"
										+item.Packing+"</td><td>"
										+item.PackingUnit+"</td><td class='handleColumn'><a href='javascript:void(0)' onclick='merge(this)' data-TargetMedicineID='"
										+item.MedicineID+"'>合并药品</a></td></tr>";	
					});
					$("table tbody").empty().append(html);
					freshTable();
				}else{
					layer.msg(data.Message,{icon:2});
				}
			},
			error:function(){
				layer.msg("查询失败",{icon:2});
			}			
		});//ajax			
	});	
});

function merge(element){
	layer.confirm('您确定要合并<font color=red>'+$(element).parents("tr").find(".GenericName").text()+'</font>吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			$.ajax({
				url: 'nhMedicineManagement/mergeMedicine',
				type: 'POST',
				dataType: 'json',
				data: {SourceMedicineID:$("#SourceMedicineID").val(),TargetMedicineID: element.getAttribute("data-TargetMedicineID")},
				success:function(data){
					if(data.Status == 200){
						layer.msg("合并成功",{icon:1});
						setTimeout(function(){
							history.go(-1);
							/*window.location.href="nhMedicineManagement/getMedicineList?GotoSearch=1";*/
							/*console.log($("#VerifyStatus").attr("value"));
							console.log($("#GenericName").val())*/
							console.log($("input[type=button]").attr("onclick"));
							$("input[type=button]").click();
						},1000);
					}else{
						layer.msg(data.Message,{icon:2});
					}
				},
				error:function(){
					layer.msg("合并失败",{icon:2});
				}
			});//ajax
		});//layer
}

function freshTable(){
	$("table tr:odd").css("background","#fcfcfc");
	$("table tr:even").css("background","#cdf8fd");
}
	