$(function(){
	$(".modify").on("click",function(){
		$(".choice").hide();
		var isEdit=$(this).attr("isEdit");
		if(isEdit=="false"){//切换到修改状态
			$(".read").hide();
			$(".edit").show();
			$(this).val("保存");
			$(this).attr("isEdit",true);
			UM.getEditor('UMeditor').setEnabled();
			$(".choice").eq($("input[name=areaType]:checked").val()-1).show();
//			省市区/药店回显
			getInitIsCityCondData();
		}else{
			submitData();
		}
	})
	//地区药店切换
	$(".searchType input.radio").on("click",function(){
		$(".choice").hide();
		$(".choice").eq(($(this).index()-2)/2).show();
	})
	
})
var NameOnoff=true;
function getInitIsCityCondData(json){
	json=JSON.parse($("#articleDetail").val());
//	json.AreaType:1-省市/2-药店/3-全国
	if(json.AreaType==1){//省市区回显
		NameOnoff = false;
		for(var i=0;i<json.TargetNameList.length;i++){
			var province = json.TargetNameList[i].split("/");
			var provinceID=json.TargetIDList[i];
			if(!province[1]){
				province[1]="";
			}
			if(!province[2]){
				province[2]="";
			}
			addAreaLocation(province[0],province[1],province[2],provinceID);
		}
	}else if(json.AreaType==2){//药店回显
		var InsCond=json.TargetNameList;
		for(var i=0;i<json.TargetNameList.length;i++){
			addInstitution();
			$(".list2").find(".listLi2").eq(i).attr("SelectState","true");
			var insID=json.TargetIDList[i];
			var insName=json.TargetNameList[i];
			$(".list2 .listLi2 .pharmacy").eq(i).val(insName);
			$(".list2 .listLi2 .pharmacy").eq(i).attr({
				"data-instName":insName,
				"data-instID":insID
			});
		}
		$(".list2 .listLi2").last().remove();
	}
}
function addAreaLocation(addProvince,addCity,addCounty,addProvinceID){ //添加所在地
	var city = '';
	var county='';
	var isAdd=true;
	var loc_ID=$("#loc_province").val();
	if($("#select2-chosen-2").html()!="地级市"){
		city = $("#select2-chosen-2").html();
		loc_ID=$('#loc_city').val();
	}
	if($("#select2-chosen-3").html()!="市、县、区"){
		county = $("#select2-chosen-3").html();
		loc_ID=$('#loc_town').val();
	}
	$(".list li").each(function(index,item){
		if(loc_ID==$(item).attr("data-id")){
			layer.msg("不能重复添加",{icon:2,offset: 't'});
			isAdd=false;
		}
	})
	if(isAdd){
		if(NameOnoff){
			var seatOf = $('<li class="region" data-id="'+loc_ID+'"><div style="width:300px;display:inline-block;"><span>'+$("#select2-chosen-1").html()+'</span><span>'+city+'</span><span>'+county+'</span></div><span class="delete" style="margin-left:50px;" onclick="deleteList(this)">删除</span></li>');
		}else{
			var seatOf = $('<li class="region" data-id="'+addProvinceID+'"><div style="width:300px;display:inline-block;"><span>'+addProvince+'</span><span>'+addCity+'</span><span>'+addCounty+'</span></div><span class="delete" style="margin-left:50px;"  onclick="deleteList(this)">删除</span></li>');
		}
		$(".list").append(seatOf);
	}
}
function addInstitution(){ //添加药店
	var pharmacy = $('<li class="listLi2" SelectState="false"><span>选药店：</span><input type="text" class="pharmacy" oninput="fuzzySearchInstitution(this)" placeholder="输入药店名称，选择药店进行搜索" /><span class="delete2">删除</span><ul class="dropDown" style="display:none"></ul></li>');
	$(".list2").append(pharmacy);
	$(pharmacy).attr("SelectState","false"); //添加开关
	$(".delete2").on("click",function(){//删除添加的药店，只有一个时不能删除
		if ($(".list2 .delete2").length == 1) {
			return;
		}
		$(this).parent().remove();
	});
}

