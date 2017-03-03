getHospitalList();//获取医院列表

$("#HospitalID").on("change",function(){//根据医院ID获取诊室信息
	var HospitalID=this.value;
	if(!HospitalID){
		$("#ConsultRoomID").html("<option value=''>---请选择---</option>");
		$("#DoctorID").html("<option value=''>---请选择---</option>");
		return;
	}
	$.ajax({
		url: 'nhManagement/getNHConsultRoomList',
		type: 'POST',
		dataType: 'json',
		data: {HospitalID: HospitalID},
		success:function(data){
			if(data.Status == 200){
				var option = "<option value=''>---请选择---</option>";
				data.ListInfo.forEach(function(item){
					option += "<option class='hospital' value='" + item.ConsultRoomID + "'>" + item.ConsultRoomName + "</option>";
				});
				
				var ConsultRoomID=$("#ConsultRoomID");
				var select=ConsultRoomID.empty().append(option).prev().val();
				if(!!select){
					ConsultRoomID.val(select);
				}
			}else{
				layer.msg(data.Message,{icon:2});
			}
		},
		error:function(){
			layer.msg("获取医院详细信息失败",{icon:2});
		}
	})
})


//	获取医院列表
function getHospitalList(){
	$.ajax({
		url:"nhdoctor/getHospitalListAjax",
		type:"post",
		dataType:"json",
		data:{r:Math.random()},
		success:function(data){
			if(data.Status==200){
				var option = "<option value=''>---请选择---</option>";
				data.ListInfo.HospitalList.forEach(function(item){
					option += "<option value='" + item.HospitalID + "'>" + item.HospitalName + "</option>";
				});
				$("#HospitalID").empty().append(option);
				var saveID=$("#saveID").val();
				if(!!saveID){
					$("#HospitalID").val(saveID).change();					
				}
			}else{
				layer.msg("获取医院信息失败",{icon:2});
			}
		},
		error:function(){
			layer.msg("获取医院信息失败",{icon:2});
		}
	})
}
//	根据医院ID获取医生列表
function getDoctorListByHospitalID(HospitalID){
	$.ajax({
		url: 'nhdoctor/getNHDoctorListAjax',
		type: 'POST',
		dataType: 'json',
		data: {HospitalID: HospitalID},
		success:function(data){
			if(data.Status == 200){
				var option = "<option value=''>---请选择---</option>";
				data.ListInfo.forEach(function(item){
					option += "<option value='" + item.DoctorID + "'>" + item.DoctorName + "</option>";
				});	
				
				var doctorID=$("#DoctorID");
				var select=doctorID.empty().append(option).prev().val();
				if(!!select){
					doctorID.val(select);
				}
			}else{
				layer.msg(data.Message,{icon:2});
			}
		},
		error:function(){
			layer.msg("获取医院详细信息失败",{icon:2});
		}			
	});
}

function showPageData(pageNum){				
	$("#netHospital_form").attr("action","nhManagement/getConsultRoomQueueList?PageIndex="+pageNum);
	$("#netHospital_form").submit();
}	