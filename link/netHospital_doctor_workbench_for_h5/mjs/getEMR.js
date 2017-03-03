var ServiceInstitutionID=$("#ServiceInstitutionID").val();
var UserID = $("#UserID").val();
var EMRStatus = $("#EMRStatus").val();
var accessType=1;
$(function(){	
//	$(".EMRhistory .tab-content input").attr("readonly","readonly");
//	$(".EMRhistory .tab-content select,.EMRhistory .tab-content textarea").attr("disabled","disabled");		
//	calAge($(".EMR"),true);//计算基本信息中的年龄并计算电子处方和检查建议中的年龄	
//	calBMI();//计算BMI
//	getEMRdetail();//初始化暂存数据
//	recordTemplateList();//获取模板
//	getEMRList();//初始化病历列表
	
//	getScanContent();//初始化扫描件
});
//获取病历扫描件列表
function getScanContent(){
	$.post("emr/getUserMedicalRecord", {
		UserID:UserID
	}, function(data) {
		if(data.Status == 200){
			scanList = data.ListInfo;						
			var html="";
			for(var i=0;i<scanList.length;i++){
				html+='<li class="scan_image_item clearfix" onclick="gotoScanPage(this)"><span class="fileIcon fl"></span><span class="time fl">'+scanList[i].RecordCreateTime+'</span><input type="hidden" value='+scanList[i].MRID+'></li>'
			}		
			$("ul.scan_image").append(html);
		}
	});
}
//跳转到扫描件
function gotoScanPage(event){
//	var MRtime=$(event).find("span.time").text();
//	var MRID=$(event).find("input").val();
//	$.post("emr/getUserMedicalRecordImageAjax",{
//		MRID:MRID,
//		RecordCreateTime:MRtime
//	},function(data){
//		if(data.Status == 200){
			$(".htmleaf-container").show();
			$(".EMR").hide();
			$(".EMRhistory").hide();
//			var scanList=data.ListInfo;
//			var scanHTML="";
//			for(var i=0;i<scanList.length;i++){
//				scanHTML+='<li><figure>'
//								+'<div>'
//									+'<a href="'+data.IMG_HOST+scanList[i].ImagePath+'" data-size="720x2394">'
//										+'<img style="height:100%;" src="'+data.IMG_HOST+scanList[i].ImagePath+'">'
//									+'</a>'
//								+'</div>'
//							+'</figure></li>'
//			}
//			$(".docs-pictures").empty().append(scanHTML);
////			设置data-size属性
//			if($(".docs-pictures li").size()>0){
//				$(".docs-pictures li img").each(function(index,item){
//					var img = $(this);
//					var realWidth;//真实的宽度
//					var realHeight;//真实的高度
//					var dataSize;
//					$("<img/>").attr("src", $(img).attr("src")).load(function(){
//						realWidth = this.naturalWidth;
//						realHeight = this.naturalHeight;
//						console.log(realWidth,realHeight)
//						dataSize=realWidth+"x"+realHeight;
//						$(".docs-pictures li a").eq(index).attr("data-size",dataSize)
//					});
//					
//				})
//			}
//		}
//	})
}

//查询病例列表
function searchEMRhistory(){
//	var StartDate=$("#StartDate").val();
//	var EndDate=$("#EndDate").val();
	var StartDate="";
	var EndDate="";
	isHistoryEMROnoff=false;
	getEMRList(StartDate,EndDate);
}
//用户的病历列表
function getEMRList(sDate,eDate){
	StartDate=sDate || "";
	EndDate=eDate || "";
//	$.post("emr/getEMRListByUser", {
//		UserID:UserID,
//		StartDate:StartDate,
//		EndDate:EndDate
//	}, function(data) {
//		if(data.Status == 200){
//			var emrList = data.ListInfo;
			var emrListHTML="";
			$(".history_box .publist_box").empty();
//			if(emrList.length>0){
//				for(var i=0;i<emrList.length;i++){
//					emrListHTML+='<li onclick="getEMRdetail_history(this)">'
//									+'<div class="history_content"><div><span>'+emrList[i].OrderNumber+'</span></div>'
//									+'<p>医院：'+emrList[i].HospitalName+'</p>'
//									+'<p>医生：'+emrList[i].DoctorName+' </p>'
//									+'<input type="hidden" value="'+emrList[i].DoctorID+'">'
//									+'<p>时间：'+emrList[i].RecordCreateTime+'</p></div></li>'
					emrListHTML+='<li onclick="getEMRdetail_history(this)">'
									+'<div class="history_content"><div><span>A201602120001</span></div>'
									+'<p>医院：HospitalName</p>'
									+'<p>医生：DoctorName</p>'
									+'<input type="hidden" value="DoctorID">'
									+'<p>时间：RecordCreateTime</p></div></li>'
//				}
//			}else{
//				emrListHTML="暂无历史病历";
//				$(".history_box .publist_box").css({
//					"text-align":"center",
//					"color":"#cfcfcf"
//				})
//			}
			$(".history_box .publist_box").empty().append(emrListHTML);			
//		}
//	});
}
//获取历史病历json数据
function getEMRdetail_history(event){
	$(".EMR").hide();//隐藏当前就诊信息
	$(".EMRhistory").show();//显示历史就诊记录列表
//	var OrderNumberHistory=$(event).find(".history_content div span").html();//获取病例ID
	divBox=$(".EMRhistory");
//	$.post("emr/getEMRDetail", {
//		EMRStatus:EMRStatus,
//		OrderNumber:OrderNumberHistory,
//	}, function(data) {
//		if(data.Status == 200){
//			dataEMR = data.DetailInfo;
//			if(dataEMR.HR00_00_001_05){//病例编号存在
				$(event).parent().parent().hide();//隐藏历史病例列表
				$(".EMRhistory").show();//显示历史病例信息
				$(".EMRhistory .content>ul").hide();
				$(".EMRhistory .content>ul.records").show();
				$(".EMRhistory .type_list>a").removeClass("checked_tab");
				$(".EMRhistory .type_list>a").eq(1).addClass("checked_tab");
				displayEMRdata(divBox,dataEMR);
//			}else{
//				layer.msg("病历信息不存在",{icon:2});
//			}
//		}
//	});	
}
//获取暂存病历json数据
function getEMRdetail(){
	var OrderNumber=$("#OrderNumber").html();
	divBox=$(".EMR");
	$.post("emr/getEMRDetail", {
		EMRStatus:EMRStatus,
		OrderNumber:OrderNumber,
	}, function(data){
		if(data.Status == 200){
			dataEMR = data.DetailInfo;
			if(dataEMR.HR00_00_001_05){
				displayTemparyEMRdata(divBox,dataEMR);
			}
		}	
	});	
}

//显示暂存病例信息
function displayTemparyEMRdata(divBox,json){
//	显示就诊记录信息
	//健康相关信息(收缩压、舒张压、心率、主诉，病史描述，其他注意事项)
	divBox.find(".EMRdata").each(function(){
		var id=$(this).attr("lepuEMR-ID");
		$(this).val(json[id]);
	});
	var mainNum=$(".EMR .EMRdata[lepuemr-id=HR51_01_037]").val().length+"/200";
	$("#mainNum").html(mainNum);
	var hisDesNum=$(".EMR .EMRdata[lepuemr-id=HR51_01_300]").val().length+"/3000";
	$("#hisDesNum").html(hisDesNum);
	var otherNum=$(".EMR .EMRdata[lepuemr-id=HR52_02_107]").val().length+"/3000";
	$("#otherNum").html(otherNum);
	//诊断
	var lepu_diagnosis=json.Lepu_Diagnosis_Result;//诊断结果
	var spanHtml="";
	//诊断
	if(lepu_diagnosis &&　lepu_diagnosis['length'] && lepu_diagnosis.length>0){
		var spans=$(".EMR #diagnose div span");
		for(var i=0;i<lepu_diagnosis.length;i++){
			for(var j=0;j<spans.length;j++){
				if($(spans[j]).html()==lepu_diagnosis[i].name){
					$(spans[j]).addClass("active");
				}
			}
		}
	}
	var lepuDiagArr=[];
	lepu_diagnosis.forEach(function(diag){
		lepuDiagArr.push(diag.name);
		lepuDiagArr.push(diag.number);
	});
	divBox.find(".EMRdata[lepuEMR-id=Lepu_Diagnosis_Result]").val(lepuDiagArr.join(","));
		
	//处方
	var medicine=json.S_09;
	divBox.find("#medicine").empty();
	if(medicine.length>0){
		for(var i=0;i<medicine.length;i++){
			var medicineTr='<li class="item">'
				+'<span class="EMRdata hide" lepuEMR-ID="Lepu_Medicine_Specifications">'+medicine[i].Lepu_Medicine_Specifications+'</span>'
				+'<span class="EMRdata hide" lepuEMR-ID="Lepu_Medicine_UnitPrice">'+medicine[i].Lepu_Medicine_UnitPrice+'</span>'
				+'<span class="EMRdata hide" lepuEMR-ID="Lepu_Medicine_Flag">'+medicine[i].Lepu_Medicine_Flag+'</span>'
				+'<span class="EMRdata hide" lepuEMR-ID="HR53_01_010">'+medicine[i].HR53_01_010+'</span>'
				+'<a href="javascript:;" class="modify_btn" onclick="modifyMedicine(this)">编辑</a>'
				+'<a href="javascript:;" class="delete_btn" onclick="deleteMedicine(this)">删除</a>'
				+'<div class="medicine_info">'
					+'<p class="medicine_name EMRdata" lepuEMR-ID="HR53_01_002">'+medicine[i].HR53_01_002+'</p>'
					+'<div lepuEMR-ID="HR53_01_010" class="EMRdata hidden">'+medicine[i].HR53_01_010+'</div>'
					+'<p>X<span lepuemr-id="HR53_01_037_04" class="EMRdata" style="padding-right:0.5rem;">'+medicine[i].HR53_01_037_04+'</span>'
						+'<span lepuemr-id="Lepu_Medicine_Unit" class="EMRdata">'+medicine[i].Lepu_Medicine_Unit+'</span>'
					+'</p>'
				+'</div>'
				+'<div class="taking_info">'
					+'<p>每<span lepuEMR-ID="medFreqPart1" class="EMRdata">'+medicine[i].medFreqPart1+'</span>'
						+'<span lepuEMR-ID="medFreqPart2" class="EMRdata">'+medicine[i].medFreqPart2+'</span>次'
						+'<span lepuemr-id="HR52_01_037_01" class="EMRdata hide">每'+medicine[i].medFreqPart1+medicine[i].medFreqPart2+'次</span>'
					+'</p>'
					+'<p><span lepuemr-id="HR52_01_013" class="EMRdata">'+medicine[i].HR52_01_013+'</span></p>'
					+'<p lepuEMR-ID="route" class="EMRdata">'+medicine[i].route+'</p>'
					+'<span lepuEMR-ID="HR52_01_037_05" class="EMRdata hidden">'+medicine[i].HR52_01_037_05+'</span>'
				+'</div>'
				+'<div class="pophead">价格：<span class="EMRdata" lepuemr-id="Lepu_Medicine_TotalPrice">'+medicine[i].Lepu_Medicine_TotalPrice+'</span>元</div></li>'
			divBox.find("#medicine").append(medicineTr);
		}
		$(".totalFeeShow_box ").show();
		divBox.find(".totalFeeShow").text(json.Lepu_MedicalExpenses);//费用
	}
	//显示生活处方
	var EMRproduct=json.Lepu_LivingPrescription_Product;
	var EMRapp=json.Lepu_LivingPrescription_App;	
	divBox.find(".EMRdata[lepuEMR-ID='Lepu_LivingPrescription_Product']").val(EMRproduct.join(","));
	divBox.find(".EMRdata[lepuEMR-ID='Lepu_LivingPrescription_App']").val(EMRapp.join(","));
	var lifeStyleStr="";
	if(EMRproduct.length>0||EMRapp.length>0){
		lifeStyleStr+='<li class="item" style="padding-left: 0;padding-top:1rem;" id="lifestyle_item">'
			+'<a href="javascript:;" class="modify_btn" onclick="mofifyLifestyle()">编辑</a>'
			+'<a href="javascript:;" class="delete_btn" onclick="deleteMedicine(this)">删除</a>'
			+'<div class="medicine_info" style="padding-left:0.75rem;">';
		for(var i=0;i<EMRproduct.length;i+=2){
			lifeStyleStr+='<div class="medicine_name"><p>'+EMRproduct[i]+'</p><span class="productPrice hidden">'+EMRproduct[i+1]+'</span></div>';
		}
		lifeStyleStr+='</div><ul class="wechat clearfix">';
		for(var i=0;i<EMRapp.length;i+=2){
			lifeStyleStr+='<li class="fl"><img src="mimages/App'+EMRapp[i+1]+'.png"><p appnum="'+EMRapp[i+1]+'">'+EMRapp[i]+'</p></li>';
		}
		lifeStyleStr+='</ul></li>';
		$("#lifestyle_box").append(lifeStyleStr);
//		divBox.find(".totalFeeShow").text(json.Lepu_MedicalExpenses);//费用
	}
//	检查建议
	var examin1=json.HR51_96_301_02;//检验项目
	var examin2=json.HR51_96_001_02;//检查项目
	var divHTML="";
	divBox.find("#test_info").empty();
	for(var i=0;i<examin1.length;i++){
		if(examin1[i]!=""){
			divHTML+='<li class="item clearfix">'
				+'<p class="medicine_name fl" style="width:88%;">'+examin1[i]+'</p>'
				+'<a href="javascript:;" class="fr" onclick="deleteCheckSug(this)">删除</a>'
			+'</li>';
			
		}else{
			examin1.splice(i,1);
		}		
	}
	divBox.find("#test_info").append(divHTML);
	divBox.find("#check_info").empty();
	divHTML="";
	for(var i=0;i<examin2.length;i++){
		if(examin2[i]!=""){
			divHTML+='<li class="item clearfix">'
				+'<p class="medicine_name fl" style="width:88%;">'+examin2[i]+'</p>'
				+'<a href="javascript:;" class="fr" onclick="deleteCheckSug(this)">删除</a>'
			+'</li>';
			
		}else{
			examin2.splice(i,1);
		}
	}
	divBox.find("#check_info").append(divHTML);
}


//显示历史病例
function displayEMRdata(divBox,json){
	//病历编号
//	divBox.find(".EMRdata[lepuEMR-ID='HR00_00_001_05']").val(json.HR00_00_001_05);
	
	//健康相关信息(收缩压、舒张压、心率、主诉，病史描述，其他注意事项)
//	divBox.find(".EMRdata").each(function(){
//		var id=$(this).attr("lepuEMR-ID");
//		$(this).html(json[id]);
//	});//单项信息
	
	
//	showTextareaContent(divBox);//将静态内容更新到静态框
	
//	var diagnosis=json.S_07;
	var lepu_diagnosis=json.Lepu_Diagnosis_Result;//诊断结果
	var diagnosisDiv=divBox.find(".diagnosisResult");
	var diagNormalDiv=diagnosisDiv.find(".diagNormal").empty();
	var diagHeartDiv=diagnosisDiv.find(".diagHeart").empty();
	var spanHtml="";
	//诊断结果
	if(lepu_diagnosis &&　lepu_diagnosis['length'] && lepu_diagnosis.length>0){
		lepu_diagnosis.forEach(function(item){
			if(item.name.substring(0,3)=="冠心病"){
				diagHeartDiv.append("<span>" + item.name + "</span>");
			}else{
				diagNormalDiv.append("<span>" + item.name + "</span>");
			}		
		});
		var lepuDiagArr=[];
		lepu_diagnosis.forEach(function(diag){
			lepuDiagArr.push(diag.number);
			lepuDiagArr.push(diag.name);
		});
		divBox.find(".EMRdata[lepuEMR-id='Lepu_Diagnosis_Result']").val(lepuDiagArr.join(","));
	}
	if(lepu_diagnosis &&　lepu_diagnosis['length'] && lepu_diagnosis.length==0){
		divBox.find(".diagHeart").css({
			"margin-top":"0"
		})
	}
		
	//处方
	var medicine=json.S_09;
	divBox.find("#medicine").empty();
	if(medicine.length>0){
		for(var i=0;i<medicine.length;i++){
			var medicineTr='<li class="item">'
				+'<span class="EMRdata hide" lepuEMR-ID="Lepu_Medicine_Specifications">'+medicine[i].Lepu_Medicine_Specifications+'</span>'
				+'<span class="EMRdata hide" lepuEMR-ID="Lepu_Medicine_UnitPrice">'+medicine[i].Lepu_Medicine_UnitPrice+'</span>'
				+'<span class="EMRdata hide" lepuEMR-ID="Lepu_Medicine_Flag">'+medicine[i].Lepu_Medicine_UnitPrice+'</span>'
				+'<span class="EMRdata hide" lepuEMR-ID="HR53_01_010">'+medicine[i].HR53_01_010+'</span>'
				+'<div class="medicine_info">'
					+'<p class="medicine_name EMRdata" lepuEMR-ID="HR53_01_002">'+medicine[i].HR53_01_002+'</p>'
					+'<p>X<span lepuemr-id="HR53_01_037_04" class="EMRdata">'+medicine[i].HR53_01_037_04+'</span>&nbsp;&nbsp;'
						+'<span lepuemr-id="Lepu_Medicine_Unit" class="EMRdata">'+medicine[i].Lepu_Medicine_Unit+'</span>'
					+'</p>'
				+'</div>'
				+'<div class="taking_info">'
					+'<p>每<span lepuEMR-ID="medFreqPart1" class="EMRdata">'+medicine[i].medFreqPart1+'</span>'
						+'<span lepuEMR-ID="medFreqPart2" class="EMRdata">'+medicine[i].medFreqPart2+'</span>次'
						+'<span lepuemr-id="HR52_01_037_01" class="EMRdata hide">每'+medicine[i].HR52_01_037_01+'次</span>'
					+'</p>'
					+'<p><span lepuemr-id="HR52_01_013" class="EMRdata">'+medicine[i].HR52_01_013+'</span></p>'
					+'<p lepuEMR-ID="route" class="EMRdata">'+medicine[i].route+'</p>'
					+'<span lepuEMR-ID="HR52_01_037_05" class="EMRdata hidden">'+medicine[i].HR52_01_037_05+'</span>'
				+'</div>'
				+'<div class="pophead">价格：<span class="EMRdata" lepuemr-id="Lepu_Medicine_TotalPrice">'+medicine[i].Lepu_Medicine_TotalPrice+'</span>元</div>'
			+'</li>'
			divBox.find("#medicine").append(medicineTr);
		}
		divBox.find(".totalFeeShow_box").show();
		divBox.find(".totalFeeShow").text(json.Lepu_MedicalExpenses);//费用
	}else{
		divBox.find(".totalFeeShow_box").hide();
	}

	//显示生活处方
	var EMRproduct=json.Lepu_LivingPrescription_Product;
	var EMRapp=json.Lepu_LivingPrescription_App;
	divBox.find(".EMRdata[lepuEMR-ID='Lepu_LivingPrescription_Product']").val(EMRproduct.join(","));
	divBox.find(".EMRdata[lepuEMR-ID='Lepu_LivingPrescription_App']").val(EMRapp.join(","));
	var li="";
	for(var i=0;i<EMRproduct.length-1;i=i+2){
		li+='<div class="medicine_name"><p>'+EMRproduct[i]+'</p><span class="productPrice hidden">'+EMRproduct[i+1]+'</span></div>'
	}//product
	if(li!=""){
		divBox.find("#lifestyle_item .medicine_info").empty().append(li);
	}else{
		divBox.find("#lifestyle_item .medicine_info").empty();
		divBox.find("#lifestyle_item .medicine_info").css({
			"margin-bottom":"0"
		})
	}
	li="";
	for(var i=0;i<EMRapp.length-1;i=i+2){
		li+='<li class="fl"><img src="mimages/App'+EMRapp[i+1]+'.png"><p appnum="'+EMRapp[i+1]+'">'+EMRapp[i]+'</p></li>';
	}//App
	if(li!=""){
		divBox.find(".wechat").empty().append(li);
	}else{
		divBox.find(".wechat").empty();
		divBox.find(".wechat").css({
			"margin-top":"0"
		})
	}
	/*if(divBox.find(".wechat").html()=="" && divBox.find("#lifestyle_item .medicine_info").html()==""){
		divBox.find("#lifestyle_item").css({
			"padding":"0"
		})
	}*/
	
	
	
//	检查建议
	var examin1=json.HR51_96_301_02;//检验项目
	var examin2=json.HR51_96_001_02;//检查项目
	var divHTML="";
	divBox.find("#test_info").empty();
	for(var i=0;i<examin1.length;i++){
		if(examin1[i]!=""){
			divHTML+='<li class="item clearfix"><p class="medicine_name fl">'+examin1[i]+'</p></li>';
		}else{
			examin1.splice(i,1);
		}		
	}
	divBox.find("#test_info").append(divHTML);
	divBox.find("#check_info").empty();
	divHTML="";
	for(var i=0;i<examin2.length;i++){
		if(examin2[i]!=""){
			divHTML+='<li class="item clearfix"><p class="medicine_name fl">'+examin2[i]+'</p></li>';
			
		}else{
			examin2.splice(i,1);
		}			
	}
	divBox.find("#check_info").append(divHTML);
}
//计算年龄
var date=new Date();
var birthday=$(".EMRdata[lepuEMR-ID=HR30_00_001]").html();
var age=date.getFullYear()-birthday.split("-")[0];	
$(".age").html(age);


//药品搜索
var ServiceInstitutionID=$("#ServiceInstitutionID").val();//就诊服务站ID
function medicineList(event){
	var SearchKey=$(event).val();
	var optionHTML="";	
	if(SearchKey!=""){
//		$.post("emr/medicineList", {
//			SearchKey:SearchKey,
//			ServiceInstitutionID:ServiceInstitutionID
//		}, function(data) {
//			if(data.Status == 200){
//				var jsonArray = eval(data.ListInfo);
//				$(event).parent().next().children().empty();
//				for(var i=0;i<jsonArray.length; i++){
//					var showName=jsonArray[i].GenericName;
//					var searchName=jsonArray[i].GenericName;
//					var searchNameArray=[];						
//					if(jsonArray[i].ProductName!=""){
//						showName+="("+ jsonArray[i].ProductName +")";
//						searchNameArray.push(jsonArray[i].ProductName);
//					}
//					if(jsonArray[i].Packing!=""){
//						searchNameArray.push(jsonArray[i].Packing);
//					}
//					if(jsonArray[i].Producer!=""){
//						searchNameArray.push(jsonArray[i].Producer);
//					}
//					searchName+="("+ searchNameArray.join("--") +")";
//					
//					optionHTML+="<li MedicineID='"+ jsonArray[i].MedicineID
//								+"' showName='"+ showName
//								+"' Packing='"+ jsonArray[i].Packing 
//								+"' PackingUnit='"+ jsonArray[i].PackingUnit
//								+"' RetailPrice='"+ jsonArray[i].RetailPrice
//								+"' Lepu_Medicine_Flag='"+ jsonArray[i].IsLepuMedicine
//								+"' >" 
//								+ searchName + "</li>";	
					optionHTML+="<li MedicineID='' showName='' Packing='' PackingUnit='' RetailPrice='' Lepu_Medicine_Flag='' >阿斯匹林肠溶片/ASA</li>";	
//				}
				var fuzzyBox=$(event).parent().next();
//				if(jsonArray.length>0){						
					fuzzyBox.children().append(optionHTML);
					fuzzyBox.show();
//				}else{
//					fuzzyBox.children().append("<li>暂无数据，请重新搜索</li>");
//					fuzzyBox.show();
//				}
//				fuzzyBox.find("li[lepu_medicine_flag=1]").css("color","red");
//			}
//		});
	}else{
		$(event).parent().next().hide();
	}
}

//模糊查询药品
function fuzzySearchMedicine(event){
//	var tr=$(event).parent().parent().parent().parent();
//	var targetID=$(event).attr("MedicineID");
//	if(medicineCheck(targetID)){
//		$(".presc_box").hide();
//		$(".usage_box").show();
//		$(event).parent().parent().prev().val($(event).attr("showName"));
//		$(event).parent().parent().next().val($(event).attr("MedicineID")).next().val($(event).attr("Lepu_Medicine_Flag"));
//		tr.find(".EMRdata[lepuEMR-ID='Lepu_Medicine_Specifications']").val($(event).attr("Packing"));
//		tr.find(".EMRdata[lepuEMR-ID='Lepu_Medicine_Unit']").val($(event).attr("PackingUnit"));
//		tr.find(".EMRdata[lepuEMR-ID='Lepu_Medicine_UnitPrice']").val($(event).attr("RetailPrice"));
//		$(event).parent().parent().hide();
//		$(event).parent().parent().prev().attr("noEdit",true);
//		calPresFee();
//		tr.find(".method").focus();
//	}else{
//		window.parent.layer.alert("医生您好！您选择的该药品<font color='#f00'>已经添加过了</font>，请您直接对该药品这一行的内容进行编辑即可。");
//	}
}

//搜索检查项目和检验项目              SearchType:  1-检查项目，2-检验项目
function clinicalExaminationSearch(event,SearchType){
	if($(event).prop('comStart')) return;    // 中文输入过程中不截断
	var SearchKey=$(event).val();
	var optionHTML="";
	if(SearchKey!=""){
		if(SearchKey.length>20){
			SearchKey=SearchKey.substring(0,20);
			$(event).val(SearchKey);
		}
//		$.post("emr/clinicalExaminationSearch", {
//			SearchKey:SearchKey,
//			SearchType:SearchType
//		}, function(data) {
//			if(data.Status == 200){
//				var ceList = data.ListInfo;
				$(event).parent().next().empty();
//				for(var i=0;i<ceList.length;i++){
//					optionHTML+="<li ontouchstart='changeBgColor(this)'>" + ceList[i] + "</li>";
					optionHTML+="<li ontouchstart='changeBgColor(this)'>血糖</li><li ontouchstart='changeBgColor(this)'>血压</li><li ontouchstart='changeBgColor(this)'>心电图</li>";
//				}
				var fuzzyBox=$(event).parent().next();
//				if(ceList.length>0){
					fuzzyBox.append(optionHTML);
//				}else{
//					fuzzyBox.append("<li>暂无数据，请重新搜索</li>");
//				}
				fuzzyBox.show();
//			}
//		});
	}else{
		$(event).parent().next().hide();
	}
}
function changeBgColor(event){
	$(event).parent().prev().find("input").blur();
	//判断是否已选择此项
	var flag=true;
	$("#diagnosisBox p").each(function(index,item){
		if($(event).html()==$(item).html()){
			flag=false;
			layer.msg("已选择，不能重复添加",{icon:2});
		}
	})
	if(flag){
		$(event).toggleClass("backColor");
	}
}

function medicineCheck(targetID){//检查是否已选择该药品
	var medicineFLag=true;
	$(".prescriptionBox input.EMRdata[lepuEMR-ID='HR53_01_010").each(function(){
		if(this.value == targetID){				
			medicineFLag=false;
			return;
		}
	});
	return medicineFLag;
}



