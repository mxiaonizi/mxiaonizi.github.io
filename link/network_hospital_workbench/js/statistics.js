!function(){
	var start = {
    	    elem: '#start',
    	    format: 'YYYY/MM/DD',    	    
    	    max: '2099-06-16 23:59:59', //最大日期
    	    istime: false,
    	    istoday: false,
    	    choose: function(datas){
    	         end.min = datas; //开始日选好后，重置结束日的最小日期
    	         end.start = datas; //将结束日的初始值设定为开始日
    	    }
    	};
    	var end = {
    	    elem: '#end',
    	    format: 'YYYY/MM/DD',    	    
    	    max: '2099-06-16 23:59:59',
    	    istime: false,
    	    istoday: false,
    	    choose: function(datas){
    	        start.max = datas; //结束日选好后，重置开始日的最大日期
    	    }
    	};
    	laydate(start);
    	laydate(end);
    	laydate.skin("danlan");       
}();
$(function(){
//	$("#searchData").click(function(){
//		if(!start.value) {
//			alert("请输入就诊开始时间");
//			return;
//		}
//		if(!end.value) {
//			alert("请输入就诊结束时间");
//			return;
//		}
//		
//		$(this).attr("disabled",true).css("cursor","wait");
//		layer.load(0, {shade: false});
//		$("form").submit();
//	});
//	var hospital=$("#HospitalID");
//	$.ajax({
//		url: 'prestat/getHospitalListAjax',
//		type: 'POST',
//		dataType: 'json',
//		data: {param1: 'value1'},
//		success:function(data){
//			if(data.Status == 200){
//				var option = "<option value=''>请选择</option>";
//				data.ListInfo.HospitalList.forEach(function(item){
//					option += "<option value='" + item.HospitalID + "'>" + item.HospitalName + "</option>";
//				});
//				hospital.empty().append(option);
//				var saveID=$("#saveID").val();
//				if(!!saveID){
//					hospital.val(saveID).change();					
//				}
//				
//			}else{
//				layer.msg(data.Message,{icon:2});
//			}
//		},
//		error:function(){
//			layer.msg("获取医院信息失败",{icon:2});
//		}
//	});	
//	hospital.change(function(){
//		var HospitalID=this.value;
//		var result=!!this.value?$(this).find("option:selected").text():"";
//		$(this).next().val(result);
//		$.ajax({
//			url: 'prestat/getNHDoctorListAjax',
//			type: 'POST',
//			dataType: 'json',
//			data: {HospitalID: HospitalID},
//			success:function(data){
//				if(data.Status == 200){
//					var option = "<option value=''>请选择</option>";
//					data.ListInfo.forEach(function(item){
//						option += "<option value='" + item.DoctorID + "'>" + item.DoctorName + "</option>";
//					});	
//					
//					var doctorID=$("#DoctorID");
//					doctorID.change(function(){
//						var result=!!this.value?$(this).find("option:selected").text():"";
//						$(this).next().val(result);
//					});
//					var select=doctorID.empty().append(option).prev().val();
//					if(!!select){
//						doctorID.val(select);
//					}
//					doctorID.change();
//				}else{
//					layer.msg(data.Message,{icon:2});
//				}
//			},
//			error:function(){
//				layer.msg("获取医院详细信息失败",{icon:2});
//			},
//			beforeSend:function(){
//				if(!HospitalID){
//					$("#DoctorID").empty().append("<option value=''>请选择</option>").val("").next().val("");
//					return false;
//				}else{
//					return true;
//				}
//			}
//		});
//	});
//	
	$(".showOrder").click(function(){
		var url=this.getAttribute("data-url");
		window.parent.addTab2("处方详情",url);
	});
//	
//		
//	$.each($(".showOrder"),function(index,item){
//		var tr=$(item).parents("tr");				
//		var data=dataSet[index].value.medicineMap;			
//		var html='<tr><td colspan="6"><div class="smallTable" style="padding:0 70px 0 130px;position: relative;"><table class="table table-bordered"><thead><tr><th>药品名称</th><th>规格</th><th>数量（盒）</th><th>单价（元）</th><th>总数（盒）</th><th>总占比</th><th>分占比</th></tr></thead><tbody style="display:none" class="tbodyData">';
//		for(var key in data){
//			var rowspan=data[key].list.length;
//			data[key].list.forEach(function(item,index){
//				html += index===0?"<tr><td rowspan=" + rowspan +">" + item.medicineName +"</td>":"<tr>";
//				html +="<td>" + item.specification +"</td>"
//					 + "<td>" + item.totalCount +"</td>"
//					 + "<td>" + item.price +"</td>";
//				html += index===0?"<td rowspan=" + rowspan +">" + data[key].mTotalCount +"</td><td rowspan=" + rowspan +">" + data[key].mTotalPercent +"%</td>":"";
//				html+="<td>" + item.precent +"%</td></tr>";					
//			});			
//		}		
//		html+='</tr></tbody></table><span class="Open"></span></div></td></tr>';
//		tr.after(html);
//		
//		//显示隐藏
//		$(".Open").eq(index).attr("openonoff","true");
//		$(".Open").eq(index).click(function(){
//			if($(this).attr("openonoff")=="true"){
//				$(this).parent().find(".tbodyData").show();
//				$(this).css("background","url(images/hide.png)");
//				$(this).css("background-size","100%");
//				$(this).attr("openonoff","false");
//			}else if($(this).attr("openonoff")=="false"){
//				$(this).parent().find(".tbodyData").hide();
//				$(this).css("background","url(images/Open.png)");
//				$(this).css("background-size","100%");
//				$(this).attr("openonoff","true");
//			}
//			
//		});
//		
//		
//	});
});
