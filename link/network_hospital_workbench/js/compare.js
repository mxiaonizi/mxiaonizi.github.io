function setValue(strA,strB,strC,strD,strE,strF,strG,strH) {
	$("#TimeSlotS").val(strA);
	$("#TimeSlotE").val(strB);
	$("#SeatOf").val(strC);
	$("#frequency").val(strD);
	$("#sort").val(strE);
	$("#ProvinceID").val(strF);
	$("#CityID").val(strG);
	$("#TownID").val(strH);
}


//点击查询按钮
$(".analyInp").on("click",function(){
	if($("#d5221").val() == ""){
		alert("请填写开始时间");
		return
	}
	if($("#d5222").val()==""){
		alert("请填写结束时间");
		return
	}
	if($("#ChoiceNum").find("option:selected").val()==""){
		alert("请选择看诊次数");
		return false;
	}
	
	var timeDataS = "";
	timeDataS = $("#d5221").val();
	var timeDataE = "";
	timeDataE = $("#d5222").val();
	var regionData = "";
	if($("#loc_province").val()==""){
		regionData = "";
	}else{
		if($("#loc_province").val()!=""){
			regionData= $('#loc_province').val();
		}
		if($("#loc_city").val()!=""){
			regionData = $('#loc_city').val();
		}
		if($("#loc_town").val()!=""){
			regionData = $('#loc_town').val();
		}
	}
	
	var frequencyData = "";
	frequencyData = $("#ChoiceNum").find("option:selected").val();

	var sortData = "";
	sortData = $("#sortOption").find("option:selected").val();
	
	
	//回显地区数据
	var ProvinceID = "";
	ProvinceID = $('#loc_province').val();
	
	var CityID = "";
	CityID = $('#loc_city').val();
	
	var TownID = "";
	TownID = $('#loc_town').val();
	
	setValue(timeDataS,timeDataE,regionData,frequencyData,sortData,ProvinceID,CityID,TownID);
	
	$("#form1").submit();
	
});

