$(".searchType input").on("click",function(){
	$(".choice").hide();
	$(".choice").eq(($(this).index()-1)/2).show();
})
$(".add").on("click",function(){//添加省市区
	NameOnoff = true;
	if($("#select2-chosen-1").html()=="省份"){//没有选择省市点击添加
		layer.msg("请选择省市",{icon:2});
		return;
	}
	addAreaLocation();
});
function deleteList(obj){ //删除添加的所在地
	$(obj).parent().remove();
};
function setValue(DateCond,AreaInfo,InstitutionCond){
	$("#timeSlot").val(DateCond);
	$("#AreaCond").val(AreaInfo);
	$("#InstitutionCond").val(InstitutionCond);
}
var NameOnoff = true;
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
			layer.msg("不能重复添加",{icon:2});
			isAdd=false;
		}
	})
	if(isAdd){
		if(NameOnoff){
			var seatOf = $('<li class="region" data-id="'+loc_ID+'"><span>'+$("#select2-chosen-1").html()+'</span><span>'+city+'</span><span>'+county+'</span><span class="delete" style="float:right" onclick="deleteList(this)">删除</span></li>');
		}else{
			var seatOf = $('<li class="region" data-id="'+addProvinceID+'"><span>'+addProvince+'</span><span>'+addCity+'</span><span>'+addCounty+'</span><span class="delete" style="float:right"  onclick="deleteList(this)">删除</span></li>');
		}
		$(".list").append(seatOf);
	}
}
function addInstitution(){ //添加药店
	var pharmacy = $('<li class="listLi2" SelectState="false"><span>选药店：</span><input type="text" class="pharmacy" oninput="fuzzySearchInstitution(this)" placeholder="输入药店名称，选择药店进行搜索" data-instName="" data-instID="" /><span class="delete2">删除</span><ul class="dropDown" style="display:none"></ul></li>');
	$(".list2").append(pharmacy);
	$(pharmacy).attr("SelectState","false"); //添加开关
	$(".delete2").on("click",function(){//删除添加的药店，只有一个时不能删除
		if ($(".list2 .delete2").length == 1) {
			return;
		}
		$(this).parent().remove();
	});
}
function fuzzySearchInstitution(ele){//模糊查询药店
	$.ajax({
		url:"orderScoreMgmt/fuzzySearchInstitution",
		type:"post",
		data:{"SearchName":$(ele).val()},
		success:function(data){
			$(ele).next().next(".dropDown").hide().html("");
			if(data.ListInfo && data.ListInfo.length>0){
				var str="";
				for(var i=0;i<data.ListInfo.length;i++){
					str+="<li onclick='handleInst(this)' data-instID="+data.ListInfo[i].InstitutionID+">"+data.ListInfo[i].InstitutionName+"</li>";
				}
				$(ele).next().next(".dropDown").show().html(str);
			}
		}
	})
	$("#choice2 .pharmacy").each(function(index,item){
		$(item).bind("change",function(){
			 $(".listLi2").eq(index).attr("SelectState","false");
		 });
	});
	if(isChrome=navigator.userAgent.indexOf("Chrome")!=-1){ 
		$(ele).next().next().css("margin-top",-$("#choice2").scrollTop());
	}
}
function handleInst(li){//选中搜索后药店操作
	var nowInputIndex=$(li).parent().parent().index();//当前input是第几个
	var flag=true;
	$(".list2 li .pharmacy").each(function(index,item){
		if(nowInputIndex!=index){
			if($(item).attr("data-instid")==$(li).attr("data-instid") && $(item).val()==$(li).html()){
				layer.msg("请不要重复添加",{icon:2});
				flag=false;
			}
		}
	})
	if(flag){
		$(li).parent().hide();
		$(li).parent().prev().prev().val($(li).html());
		$(li).parent().prev().prev().attr({
			"data-instName":$(li).html(),
			"data-instID":$(li).attr("data-instID")
		})
		$(li).parent().parent().attr("SelectState",true);
	}
}
function getInitIsCityCondData(){
	if($("#IsCityCond2").val() == 1 || $("#IsCityCond2").val() == ""){//省市区回显
		if($("#DetailInfo").val()){
			NameOnoff = false;
			for(var i=0;i<$("#AreaCond2").val().split("|").length;i++){
				var province = $("#AreaCond2").val().split("|")[i].split("-")[1].split("/");
				var provinceID=$("#AreaCond2").val().split("|")[i].split("-")[0].split("/");
				if(!province[1]){
					province[1]="";
				}
				if(!province[2]){
					province[2]="";
				}
				addAreaLocation(province[0],province[1],province[2],provinceID);
			}
		}
	}else if($("#IsCityCond2").val() == 0){//药店回显
		if($("#DetailInfo").val()){
			var InsCond=$("#InstitutionCond2").val().split("|");
			for(var i=0;i<InsCond.length-1;i++){
				addInstitution();
				$(".list2").find(".listLi2").eq(i).attr("SelectState","true");
				var insID=InsCond[i].substr(0,InsCond[i].indexOf("-"));
				var insName=InsCond[i].substr(InsCond[i].indexOf("-")+1);
				$(".list2 .listLi2 .pharmacy").eq(i).val(insName);
				$(".list2 .listLi2 .pharmacy").eq(i).attr({
					"data-instName":insName,
					"data-instID":insID
				});
			}
			$(".list2 .listLi2").last().remove();
		}
	}
}
getInitIsCityCondData();//省市区药店回显
$("#analyInp").on("click",function(){//查看分析结果
	if($("#check-2").is(':checked')){
		for(var i=0;i<$(".list2").find(".listLi2").size();i++){
			if($(".list2").find(".listLi2").eq(i).attr("selectstate") == "false"){
				layer.msg("第"+(i+1)+"项请选择药店",{icon:2});
				return;
			}
		}
	}
	if($("#d12").val() == ""||$("#d13").val()==""){
		layer.msg("请填写时间段",{icon:2});
		return
	}
	var dateTa = new Date($("#d12").val().replace(/\/g/,""));
	var dateTb = new Date($("#d13").val().replace(/\/g/,""));
	if(dateTb.getTime() - dateTa.getTime() >31622400000){
		layer.msg("时间段不要超过366天",{icon:2});
		return;
	}
	var DateCond=$("#d12").val()+'-'+$("#d13").val();
	if($("#check-1").is(':checked') && $(".list").find(".region").size() == 0){
		layer.msg("请填写地址",{icon:2});
		return;
	}
	if($("#check-2").is(':checked') && $(".pharmacy").val() == ""){
		layer.msg("请填写药店",{icon:2});
		return;
	}
	
	var AreaInfo = getAreaInfo();
	var InstitutionCond="";
	if($("#check-2").is(':checked')){
		$("#choice2 input.pharmacy").each(function(index,item){
			InstitutionCond+=$(this).attr("data-instID")+"-"+$(this).attr("data-instName")+"|";
		})
	}
	setValue(DateCond,AreaInfo,InstitutionCond);
	$("#form1").submit();
});
function getAreaInfo(){
	var AreaInfo="";
	if($("#check-1").is(':checked')){
		$(".list li").each(function(index,item){
			AreaInfo+="|"+$(item).attr("data-id")+"-";
			for(var i=0;i<3;i++){
				if($(item).find("span").eq(i).html()!="" && $(item).find("span").eq(i).next().html()!="" && i!=2){
					AreaInfo+=$(item).find("span").eq(i).html()+"/";
				}else{
					AreaInfo+=$(item).find("span").eq(i).html();
				}
			}
		})
		AreaInfo=AreaInfo.substring(1, AreaInfo.length);
	}
	return AreaInfo;
}