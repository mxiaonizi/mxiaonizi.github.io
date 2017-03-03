$(function(){
	$(".approval").click(function(){
		var _this=this;
		layer.confirm('您确定要核准<font color=red>'+$(_this).parents("tr").find(".GenericName input").val()+'</font>吗？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
				$.ajax({
					url: 'nhMedicineManagement/verifyMedicine',
					type: 'POST',
					dataType: 'json',
					data: {MedicineID: _this.getAttribute("data-medicineID")},
					success:function(data){
						var scrollTop=$(window).scrollTop();
						if(data.Status == 200){
							layer.msg("核准成功",{icon:1});
							setTimeout(function(){
								if($("#VerifyStatus").val()==""){//全部
									$(_this).remove();
								}else if($("#VerifyStatus").val()==0){//待审核
									$(_this).parent().parent().remove();
								}
							},500);
						}else{
							layer.msg(data.Message,{icon:2});
						}
					},
					error:function(){
						layer.msg("核准失败",{icon:2});
					}			
				});//ajax		  
			});//layer		
	});
	
	$(".edit").click(function(){
		var tr=$(this).parents("tr");
		tr.find("input").removeAttr("readonly").removeClass("disabled").css("cursor","text");
		$(this).hide().prev().show();
	});
	
	$("table input.disabled").click(function(){
		if(this.className=="disabled"){
			layer.alert(this.value);
		}		
	});
	
	$(".save").click(function(){
		var This=this;
		var data={};
		var price=$(this).parents("tr").find("input[name=Price]").val();//验证价格
		var re=/^\d+\.?\d{0,2}$/;
		if(!re.test(price) || price<=0){
			layer.msg("请输入正确的药品价格");
			return;
		}
		$(this).parents("tr").find("input").each(function(){
			data[this.name]=this.value;
		});
		data.InstitutionID=$("input[name=InstitutionID]").val();
		$.ajax({
			url: 'nhMedicineManagement/updateMedicine',
			type: 'POST',
			dataType: 'json',
			data: data,
			success:function(data){
				if(data.Status == 200){
					layer.msg("编辑成功",{icon:1});
					$(This).parents("tr").find("input").addClass("disabled").attr("readonly","readonly").css("cursor","pointer");
					$(This).hide().next().show();
				}else{
					layer.msg(data.Message,{icon:2});
				}
			},
			error:function(){
				layer.msg("编辑失败",{icon:2});
			}			
		});//ajax	
		
	});
	
	
	
});

function showPageData(pageNum){				
	$("#netHospital_form").attr("action","nhMedicineManagement/getMedicineList?GotoSearch=1&PageIndex="+pageNum);
	$("#netHospital_form").submit();
}	