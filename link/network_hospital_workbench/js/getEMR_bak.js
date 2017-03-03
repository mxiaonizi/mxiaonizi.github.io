var ServiceInstitutionID=$("#ServiceInstitutionID").val();
var UserID = $("#UserID").val();
var EMRStatus = $("#EMRStatus").val();
$(function(){
	$(".EMRhistory .tab-content input").attr("readonly","readonly");
	$(".EMRhistory .tab-content select,.EMRhistory .tab-content textarea").attr("disabled","disabled");		
	calAge($(".EMR"),true);//计算基本信息中的年龄并计算电子处方和检查建议中的年龄	
	calBMI();//计算BMI
	getEMRdetail();//初始化暂存数据
	recordTemplateList();//获取模板
	getEMRList();//初始化病历列表
	getScanContent();//初始化扫描件	
	//如果是管理员，隐藏暂存按钮
	/*if(IsManager==1){
		$(".saveBox").hide();
		$(".managerSaveBox").show();
	}*/
});
//获取病历扫描件
function getScanContent(){
	$.post("emr/getUserMedicalRecord", {
		UserID:UserID
	}, function(data) {
		if(data.Status == 200){
			scanList = data.ListInfo;						
			var html="";
			for(var i=0;i<scanList.length;i++){
				html+="<li class='scanUnit' onclick='gotoScanPage(this)'><div><img src='images/scanList.png' alt='扫描件' title='扫描件'></div><div class='time'><span>"
					+scanList[i].RecordCreateTime+"</span><input type='hidden' value='"+scanList[i].MRID+"'></div></li>"
			}			
			$("ul.box").append(html);			
		}
	});
}

//跳转到扫描件
function gotoScanPage(event){
	var MRtime=$(event).find(".time span").text();
	var MRID=$(event).find(".time input").val();
	window.parent.open("emr/getUserMedicalRecordImage?MRID="+ MRID +"&RecordCreateTime="+MRtime,"self");
}

//疾病搜索
function diseaseSearch(event){
	if($(event).attr("noEdit")=='true'){
		$(event).val("");
		$(event).attr("noEdit",false);
	}else{
		var SearchKey=$(event).val();
		var optionHTML="";
		if(SearchKey!=""){		
			$.post("emr/diseaseSearch", {
				SearchKey:SearchKey,
			}, function(data) {
				if(data.Status == 200){
					var diseaseList = data.ListInfo;
					$(event).parent().find(".fuzzySearch").children().empty();
					for(var i=0;i<diseaseList.length;i++){
						optionHTML+="<li ICD='"+ diseaseList[i].ICD +"' onclick='fuzzySearchDisease(this)'>" + diseaseList[i].DiseaseName + "</li>"
					}
					var fuzzyBox=$(event).parent().find(".fuzzySearch");
					if(diseaseList.length>0){
						fuzzyBox.children().append(optionHTML);
						fuzzyBox.show();	
					}else{
						fuzzyBox.children().append("<li>暂无数据，请重新搜索</li>");
						fuzzyBox.show();					
					}						
				}
			});
		}
	}	
}

//模糊搜索选中疾病
function fuzzySearchDisease(event){
	var searchInput=$(event).parent().parent().parent().find("input[type=text]");
	searchInput.val($(event).text());
	searchInput.attr("noEdit",true);
	$(event).parent().parent().next().val($(event).attr("ICD"));
	$(event).parent().parent().hide();
	
}
//输入框失去焦点时隐藏搜索框
function hideSearchBox(){
	$(".fuzzySearch").hide();
}

//检查项目和检验项目搜索(SearchType   1-检查项目，2-检验项目)
function clinicalExaminationSearch(event,SearchType){	
		var SearchKey=$(event).val();
		var optionHTML="";
		if(SearchKey.length>20){
			SearchKey=SearchKey.substring(0,20);
			$(event).val(SearchKey);
		}else if(SearchKey!=""){
			$.post("emr/clinicalExaminationSearch", {
				SearchKey:SearchKey,
				SearchType:SearchType
			}, function(data) {
				if(data.Status == 200){
					var ceList = data.ListInfo;
					$(event).parent().find(".fuzzySearch").children().empty();
					for(var i=0;i<ceList.length;i++){
						optionHTML+="<li onclick='fuzzySearchExamin(this)'>" + ceList[i] + "</li>"
					}
					var fuzzyBox=$(event).parent().find(".fuzzySearch");
					if(ceList.length>0){
						fuzzyBox.children().append(optionHTML);
						fuzzyBox.show();	
					}else{
						fuzzyBox.children().append("<li>暂无数据，请重新搜索</li>");
						fuzzyBox.show();	
					}			
					
				}
			});
		}		
	
}
//模糊搜索检查项目
function fuzzySearchExamin(event){
	var searchInput=$(event).parent().parent().parent().find("input[type=text]");
	searchInput.val($(event).text());
	$(event).parent().parent().hide();	
}



//药品搜索
function medicineList(event){
	if($(event).attr("noEdit")=='true'){		
		$(event).parent().parent().find("input,select").val("");
		$(event).attr("noEdit",false);
	}else{
		var SearchKey=$(event).val();
		var optionHTML="";	
		if(SearchKey!=""){
			$.post("emr/medicineList", {
				SearchKey:SearchKey,
				ServiceInstitutionID:ServiceInstitutionID
			}, function(data) {
				if(data.Status == 200){
					var jsonArray = eval(data.ListInfo);
					$(event).parent().find(".fuzzySearch").children().empty();
					for(var i=0;i<jsonArray.length; i++){
						optionHTML+="<li MedicineID='"+ jsonArray[i].MedicineID
									+"' Packing='"+ jsonArray[i].Packing 
									+"' PackingUnit='"+ jsonArray[i].PackingUnit
									+"' RetailPrice='"+ jsonArray[i].RetailPrice
									+"'  onclick='fuzzySearchExamin(this)'>" 
									+ jsonArray[i].GenericName 
									+ "</li>";								
					}
					var fuzzyBox=$(event).parent().find(".fuzzySearch");
					if(jsonArray.length>0){						
						fuzzyBox.children().append(optionHTML);
						fuzzyBox.show();	
					}else{
						fuzzyBox.children().append("<li>暂无数据，请重新搜索</li>");
						fuzzyBox.show();		
					}			
				}
			});
		}	
	}
	
}
//模糊查询药品
function fuzzySearchExamin(event){	
	var tr=$(event).parent().parent().parent().parent();
	$(event).parent().parent().prev().val($(event).text());
	$(event).parent().parent().next().val($(event).attr("MedicineID"));
	tr.find(".EMRdata[lepuEMR-ID='Lepu_Medicine_Specifications']").val($(event).attr("Packing"));
	tr.find(".EMRdata[lepuEMR-ID='Lepu_Medicine_Unit']").val($(event).attr("PackingUnit"));
	tr.find(".EMRdata[lepuEMR-ID='Lepu_Medicine_UnitPrice']").val($(event).attr("RetailPrice"));
	$(event).parent().parent().hide();
	$(event).parent().parent().prev().attr("noEdit",true);
	calPresFee();
	tr.find(".method").focus();
}

//检查模糊搜索功能的输入框，如果状态是可编辑的，直接自动清空，避免自定义数据
function checkFuzzySearchBox(event){	
	if($(event).attr("noEdit")=='false'){
		$(event).val("");			
	}
}

//其他注意事项（模板）
function recordTemplateList(){
	$.post("emr/recordTemplateList", {
	}, function(data) {
		if(data.Status == 200){
			var templateList = data.ListInfo;
			$("#otherTip").empty();
			var templateHTML="<option value=''>请选择</option>";
			for(var i=0;i<templateList.length;i++){
				templateHTML+="<option value='"+ templateList[i].MedicalRecordTemplateID
							+"' content='"+ templateList[i].MedicalRecordTemplateContent
							+"'>"+ templateList[i].MedicalRecordTemplateName
							+"</option>";
			}
			$("#otherTip").append(templateHTML);			
		}
	});
}
//选中模板
function selectTemplate(event){
	$(event).parent().next().val($(event).find("option:selected").attr("content"));
	showNumber($(event).parent().next());
}

//查询病例列表
function searchEMRhistory(){
	var StartDate=$("#StartDate").val();
	var EndDate=$("#EndDate").val();
	getEMRList(StartDate,EndDate);
}

//用户的病历列表
function getEMRList(sDate,eDate){
	StartDate=sDate || "";
	EndDate=eDate || "";
	$.post("emr/getEMRListByUser", {
		UserID:UserID,
		StartDate:StartDate,
		EndDate:EndDate
	}, function(data) {
		if(data.Status == 200){
			var emrList = data.ListInfo;
			var emrListHTML=""
			$(".searchTable tbody").empty();
			for(var i=0;i<emrList.length;i++){
				emrListHTML+="<tr><td>" 
							+ emrList[i].RecordCreateTime+ "</td><td>"
							+ emrList[i].HospitalName+"</td><td>"
							+ emrList[i].DoctorName+ "<input type='hidden' value='"
							+ emrList[i].DoctorID+"'></td><td><a onclick='getEMRdetail_history(this)' >查&nbsp;&nbsp;看</a><input type='hidden' value='"
							+ emrList[i].OrderNumber+"'></td></tr>";	
			}
			$(".searchTable tbody").empty().append(emrListHTML);			
		}
	});
}
//获取历史病历json数据
function getEMRdetail_history(event){	
	var OrderNumberHistory=$(event).next().val();
	divBox=$(".EMRhistory");
	$.post("emr/getEMRDetail", {
		EMRStatus:EMRStatus,
		OrderNumber:OrderNumberHistory,
	}, function(data) {
		if(data.Status == 200){
			dataEMR = data.DetailInfo;
			if(dataEMR.HR00_00_001_05){
				displayEMRdata(divBox,dataEMR);
				$(".toHide").click();
			}else{
				createPopWindow("病历信息不存在");
			}
			
		}
	});	
}
//获取暂存病历json数据
function getEMRdetail(){	
	var OrderNumber=$("#OrderNumber").val();
	divBox=$(".EMR");
	$.post("emr/getEMRDetail", {
		EMRStatus:EMRStatus,
		OrderNumber:OrderNumber,
	}, function(data) {
		if(data.Status == 200){			
			dataEMR = data.DetailInfo;
			if(dataEMR.HR00_00_001_05){
				displayEMRdata(divBox,dataEMR);
			}			
		}	
	});	
}

function displayEMRdata(divBox,json){
	//病历标号
	divBox.find(".EMRdata[lepuEMR-ID='HR00_00_001_05']").val(json.HR00_00_001_05);
	//基本信息
	divBox.find(".BaseList .EMRdata").each(function(){
		var id=$(this).attr("lepuEMR-ID");
		$(this).val(json[id]);
	});
	
	calAge(divBox);//计算年龄
	
	//显示省市区
	var ssqText="";
	divBox.find(".ssq input").each(function(){
		ssqText+=$(this).val();
	});
	divBox.find(".ssq span").html(ssqText);	
	
	//健康相关信息
	divBox.find(".healthEMR:even .EMRdata").each(function(){
		var id=$(this).attr("lepuEMR-ID");
		$(this).val(json[id]);
	});//单项信息
	var isDrink=divBox.find(".EMRdata[lepuEMR-ID='HR51_01_189_01']");
	if(isDrink.val()==="true"){
		isDrink.parent().find(".radioBox").eq(0).click();
	}else if(isDrink.val()==="false"){
		isDrink.parent().find(".radioBox").eq(1).click();
	}
	divBox.find(".habitsList select").change();
	
	var allergy=json.S_04_006;
	var allergyTr=divBox.find(".allergy tbody tr");
	var allergyTbody=divBox.find(".allergy tbody");
	for(var i=1;i<allergyTr.length;i++){
		$(allergyTr[i]).remove();
	}	
	allergyTr=divBox.find(".allergy tbody tr");
	for(var i=0;i<allergy.length;i++){
		if(i==0){
			for(key in allergy[i]){
				allergyTr.find(".EMRdata[lepuEMR-ID='" + key + "']").val(allergy[i][key]);			
			}
			allergyTr.find(".EMRdata[lepuEMR-ID='HR51_01_049']").attr("name","HR51_01_049_"+(i+1));			
		}
		if(i>0){
			allergyTr=divBox.find(".allergy tbody tr").eq(0).clone(true);
			allergyTr.find("input").val("");
			for(key in allergy[i]){
				allergyTr.find(".EMRdata[lepuEMR-ID='" + key + "']").val(allergy[i][key]);			
			}
			allergyTr.find(".EMRdata[lepuEMR-ID='HR51_01_049']").attr("name","HR51_01_049_"+(i+1));	
			allergyTbody.append(allergyTr);
		}
	}//过敏史	
	
	var diseaseHistory=json.S_04_001;
	var diseaseHistoryTr=divBox.find(".diseaseHistory tbody tr");
	var diseaseHistoryTbody=divBox.find(".diseaseHistory tbody");
	for(var i=1;i<diseaseHistoryTr.length;i++){
		$(diseaseHistoryTr[i]).remove();
	}	
	diseaseHistoryTr=divBox.find(".diseaseHistory tbody tr");
	for(var i=0;i<diseaseHistory.length;i++){
		if(i==0){
			for(key in diseaseHistory[i]){
				diseaseHistoryTr.find(".EMRdata[lepuEMR-ID='" + key + "']").val(diseaseHistory[i][key]);			
			}
			calYears(diseaseHistoryTr.find(".EMRdata[lepuEMR-ID='HR51_01_203_05']"));			
		}
		if(i>0){
			diseaseHistoryTr=divBox.find(".diseaseHistory tbody tr").eq(0).clone(true);
			diseaseHistoryTr.find("input").val("");
			for(key in diseaseHistory[i]){
				diseaseHistoryTr.find(".EMRdata[lepuEMR-ID='" + key + "']").val(diseaseHistory[i][key]);			
			}
			calYears(diseaseHistoryTr.find(".EMRdata[lepuEMR-ID='HR51_01_203_05']"));
			diseaseHistoryTbody.append(diseaseHistoryTr);
		}		
	}//疾病史	
	
	var familyHistory=json.S_04_013;
	var familyHistoryTr=divBox.find(".familyHistory tbody tr");
	var familyHistoryTbody=divBox.find(".familyHistory tbody");
	for(var i=1;i<familyHistoryTr.length;i++){
		$(familyHistoryTr[i]).remove();
	}	
	familyHistoryTr=divBox.find(".familyHistory tbody tr");
	for(var i=0;i<familyHistory.length;i++){
		if(i==0){
			for(key in familyHistory[i]){
				familyHistoryTr.find(".EMRdata[lepuEMR-ID='" + key + "']").val(familyHistory[i][key]);			
			}
		}
		if(i>0){
			familyHistoryTr=divBox.find(".familyHistory tbody tr").eq(0).clone(true);
			familyHistoryTr.find("input").val("");
			for(key in familyHistory[i]){
				familyHistoryTr.find(".EMRdata[lepuEMR-ID='" + key + "']").val(familyHistory[i][key]);			
			}
			familyHistoryTbody.append(familyHistoryTr);
		}
	}//家族史
	
	//就诊记录	
	divBox.find(".diagRecords textarea.EMRdata").each(function(){
		var id=$(this).attr("lepuEMR-ID");
		$(this).val(json[id]);
		showNumber(this);
	});//主诉，现病史，医嘱
	
	showTextareaContent(divBox);//将静态内容更新到静态框
	
	var diagnosis=json.S_07;	
	var diagnosisDiv=divBox.find(".diagnosis div.diagnosisInput");
	for(var i=1;i<diagnosisDiv.length;i++){
		$(diagnosisDiv[i]).remove();
	}	
	diagnosisDiv=divBox.find(".diagnosis div.diagnosisInput");
	for(var i=0;i<diagnosis.length;i++){		
		if(i==0){
			for(key in diagnosis[i]){
				diagnosisDiv.find(".EMRdata[lepuEMR-ID='" + key + "']").val(diagnosis[i][key]);			
			}
			//diagnosisDiv.find(".EMRdata[lepuEMR-ID='HR55_02_057_04']").attr("name","HR55_02_057_04_"+(i+1));
		}
		if(i>0){
			diagnosisDiv=divBox.find(".diagnosis div.diagnosisInput").eq(0).clone(true);
			diagnosisDiv.find("input").val("");
			for(key in diagnosis[i]){
				diagnosisDiv.find(".EMRdata[lepuEMR-ID='" + key + "']").val(diagnosis[i][key]);			
			}
			//diagnosisDiv.find(".EMRdata[lepuEMR-ID='HR55_02_057_04']").attr("name","HR55_02_057_04_"+(i+1));
			divBox.find(".diagnosis .addButton").before(diagnosisDiv);
		}
	}//诊断结果
	
	var medicine=json.S_09;
	var medicineTemplate=divBox.find(".presList tr.template").eq(0).clone(true).show();
	divBox.find(".presList tbody").empty().append(medicineTemplate);
	for(var i=0;i<medicine.length;i++){
		var medicineTr=divBox.find(".presList tr.template").eq(0).clone(true);
		for(key in medicine[i]){			
			medicineTr.find(".EMRdata[lepuEMR-ID='" + key + "']").text(medicine[i][key]);			
		}
		divBox.find(".presList tbody").append(medicineTr);		
	}
	divBox.find(".presList tr.template").eq(0).hide();//处方药
	
	if(medicine.length>0){		
		divBox.find(".presList table").show();
		divBox.find(".presList table").next().removeClass("borderTop");
	}else{
		divBox.find(".presList table").hide();
		divBox.find(".presList table").next().addClass("borderTop");
	}
	
	var EMRproduct=json.Lepu_LivingPrescription_Product;	
	var EMRapp=json.Lepu_LivingPrescription_App;
	
	$(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_Product']").val(EMRproduct.join(","));	
	$(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_App']").val(EMRapp.join(","));	
	
	//显示生活处方
	var ul=$("<ul></ul>");
	var li="";
	var hasProduct=false;
	var hasApp=false;
	for(var i=0;i<EMRproduct.length-1;i=i+2){
		li+="<li><span class='productName'>"+ EMRproduct[i] +"</span><span class='productPrice'>"+ EMRproduct[i+1] +"</span></li>";
	}//product
	if(li!=""){
		ul.append(li);
		divBox.find(".productShow").empty().append(ul);
		hasProduct=true;
	}else{
		divBox.find(".productShow").empty();
		hasProduct=false;
	}	
	ul=$("<ul></ul>");
	li="";
	for(var i=0;i<EMRapp.length-1;i=i+2){
		li+="<li><div><img src='images/app"+ EMRapp[i+1] +".png'></div><div>"+ EMRapp[i] +"</div></li>";
	}//product
	if(li!=""){
		ul.append(li);
		divBox.find(".appShow").empty().append(ul);
		hasApp=true;
	}else{
		divBox.find(".appShow").empty();
		hasApp=false;
	}	
	
	if(!hasProduct && !hasApp){
		divBox.find(".livPresShow").hide();		
	}else{		
		divBox.find(".livPresShow").show();
	}	
	
	if(!hasProduct && !hasApp && medicine.length==0){		
		divBox.find(".presList,.edit").hide();
		divBox.find(".prescription .add").show();
	}else{
		divBox.find(".presList,.edit").show();
		divBox.find(".prescription .add").hide();
	}
	
	divBox.find(".totalFeeShow").text(json.Lepu_MedicalExpenses);//费用		
	
	var examin1=json.HR51_96_301_02;
	var examin2=json.HR51_96_001_02;
	var divHTML="";
	var sortNumber=0;
	divBox.find(".examin1").empty();
	for(var i=0;i<examin1.length;i++){
		if(examin1[i]!=""){
			divHTML=++sortNumber + "." + examin1[i] + "<br>";
			divBox.find(".examin1").append(divHTML);
		}else{
			examin1.splice(i,1);
		}		
	}	
	if(examin1.length==0){divBox.find(".examinPart1").parent().hide();
	}else{divBox.find(".examinPart1").parent().show();}
	divBox.find(".examinPart1").val(examin1);
	
	sortNumber=0;
	divBox.find(".examin2").empty();
	for(var i=0;i<examin2.length;i++){
		if(examin2[i]!=""){
			divHTML=++sortNumber + "." + examin2[i] + "<br>";
			divBox.find(".examin2").append(divHTML);
		}else{
			examin2.splice(i,1);
		}			
	}	
	if(examin2.length==0){divBox.find(".examinPart2").parent().hide();
	}else{divBox.find(".examinPart2").parent().show();}
	divBox.find(".examinPart2").val(examin2);
	
	
	if(examin1.length>0 || examin2.length>0){
		divBox.find(".examination .add").hide();
		divBox.find(".examineList,.examination .edit").show();
	}else{
		divBox.find(".examineList,.examination .edit").hide();
		divBox.find(".examination .add").show();
	}
	
}