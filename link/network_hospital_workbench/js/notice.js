//图片上传预览
$("#file").on("change",function(){
	var File=this.files[0];
	var filename = $("#file").prop("files")[0];
	var formData = new FormData();
	formData.append("MediaFile",filename);
	$.ajax({
		type: "POST",
		url: "../nhArticle/updateMedia",
		contentType: false,
		processData: false,
		data: formData,
		success: function (d) {
			$("#cover").val(d.Message);
			//显示
			var reader=new FileReader();
			reader.onload=function(e){
				$(".showImg img").attr("src",e.target.result)
			}
			reader.readAsDataURL(File);
		}
	});
})


//添加省市区
$(".add").on("click",function(){//添加省市区
	NameOnoff = true;
	if($("#select2-chosen-1").html()=="省份"){//没有选择省市点击添加
		layer.msg("请选择省市",{icon:2,offset: 't'});
		return;
	}
	addAreaLocation();
});


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
			var seatOf = $('<li class="region" data-id="'+addProvinceID+'"><span>'+addProvince+'</span><span>'+addCity+'</span><span>'+addCounty+'</span><span class="delete" style="float:right"  onclick="deleteList(this)">删除</span></li>');
		}
		$(".list").append(seatOf);
	}
}
//添加药店
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
//模糊查询药店
function fuzzySearchInstitution(ele){
	$.ajax({
		url:"../orderstat/fuzzySearchInstitution",
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

//提交
$(".submit").on("click",function(){
	submitData();
})
function submitData(){
	if($.trim($("input[name=articleTitle]").val())==""){
		layer.msg("请输入标题",{icon:2,offset: 't'});
		return;
	}
	if($("input[name=publishDate]").val()==""){
		layer.msg("选择发布时间",{icon:2,offset: 't'});
		return;
	}
	if($("input[name=cover]").val()==""){
		layer.msg("请选择封面图",{icon:2,offset: 't'});
		return;
	}
	if($("select[name=linkTargetType]").val()==""){
		layer.msg("请选择文章类型",{icon:2,offset: 't'});
		return;
	}
	var targetID="";
	var targetName="";
	if($("#check-1").is(':checked')){
		if($(".list").find(".region").size()==0){
			layer.msg("请选择省市区",{icon:2,offset: 't'});
			return;
		}
		targetID="";
		targetName="";
		$(".list li.region").each(function(index,item){
			targetID+=$(item).attr("data-id")+"|";
			for(var i=0;i<3;i++){
				if($(item).find("div span").eq(i).html()!="" && $(item).find("span").eq(i).next().html()!="" && i!=2){
					targetName+=$(item).find("span").eq(i).html()+"/";
				}else{
					targetName+=$(item).find("span").eq(i).html();
				}
			}
			targetName+="|";
		})
	}
	if($("#check-2").is(':checked') ){
		if($(".pharmacy").val() == ""){
			layer.msg("请选择药店",{icon:2,offset: 't'});
			return;
		}
		targetID="";
		targetName="";
		$("#choice2 input.pharmacy").each(function(index,item){
			targetID+=$(this).attr("data-instID")+"|";
			targetName+=$(this).attr("data-instName")+"|";
		})
	}
	$("#targetID").val(targetID);
	$("#targetName").val(targetName);
	$("#Iform").submit();
}
function handleInst(li){//选中搜索后药店操作
	var flag=true;
	$(".list2 li .pharmacy").each(function(index,item){
		if($(item).attr("data-instid")==$(li).attr("data-instid") && $(item).val()==$(li).html()){
			layer.msg("请不要重复添加",{icon:2,offset: 't'});
			flag=false;
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
function deleteList(obj){ //删除添加的所在地
	$(obj).parent().remove();
};
