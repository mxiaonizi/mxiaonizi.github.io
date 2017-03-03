var UserID = $("#UserID").val();
var OrderNumber=$("#OrderNumber").val();
var EMRStatus=$("#EMRStatus").val();
$(function(){	
	$(".EMRhistory .tab-content input").attr("readonly","readonly");
	$(".EMRhistory .tab-content select,.EMRhistory .tab-content textarea").attr("disabled","disabled");		
	$(".EMRhistory .tab-content textarea").css("background","#fff");		
	
	//初始化病例列表
	getEMRListByUser();
	//获取扫描件信息	
	getScanContent();
	
	//如果病例是完成状态 初始化病例详情
	if(EMRStatus==2){
		getEMRdetailInit(OrderNumber);
	}
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
					+scanList[i].RecordCreateTime+"</span><input type='hidden' value='"+scanList[i].MRID+"'></div></li>";
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
//获取用户有关所有电子病例
function getEMRListByUser(){
	console.log(UserID)
	var StartDate=$("#StartDate").val() || "";
	var EndDate=$("#EndDate").val() || "";	
	$.post("emr/getEMRListByUser", {
		UserID:UserID,StartDate:StartDate,EndDate:EndDate
	}, function(data) {
		if(data.Status == 200){						
			var emrList = data.ListInfo;
			var emrListHTML="";
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
	OrderNumber=$(event).next().val();
	divBox=$(".EMRhistory");
	$.post("emr/getEMRDetail", {
		EMRStatus:EMRStatus,
		OrderNumber:OrderNumber,
	}, function(data) {
		if(data.Status == 200){
			dataEMR = data.DetailInfo;
			if(dataEMR.HR00_00_001_05){
				$(".EMRnumber input").val(OrderNumber);
				displayEMRdata(divBox,dataEMR);				
			}else{
				createPopWindow("病历信息不存在");
			}
		}
	});	
}


function getEMRdetailInit(OrderNumber){	
	divBox=$(".EMRhistory");
	$.post("emr/getEMRDetail", {
		EMRStatus:EMRStatus,
		OrderNumber:OrderNumber,
	}, function(data) {
		if(data.Status == 200){
			dataEMR = data.DetailInfo;
			if(dataEMR.HR00_00_001_05){				
				displayEMRdata(divBox,dataEMR);				
			}else{
				createPopWindow("病历信息不存在");
			}
		}
	});	
}

function displayEMRdata(divBox,json){
	//病历编号
	$(".EMRdata[lepuEMR-ID='HR00_00_001_05']").val(json.HR00_00_001_05);
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
	divBox.find(".healthEMR .EMRdata").each(function(){
		var id=$(this).attr("lepuEMR-ID");
		$(this).val(json[id]);
	});//单项信息	
	
	//就诊记录	
	divBox.find(".diagRecords textarea.EMRdata").each(function(){
		var id=$(this).attr("lepuEMR-ID");
		$(this).val(json[id]);
		showNumber(this);
	});//主诉，现病史，医嘱
	
	showTextareaContent(divBox);//将静态内容更新到静态框
	
	var diagnosis=json.S_07;
	var lepu_diagnosis=json.Lepu_Diagnosis_Result;
	var diagnosisDiv=divBox.find(".diagnosis");
	var diagNormalDiv=diagnosisDiv.find(".diagNormal").empty();
	var diagHeartDiv=diagnosisDiv.find(".diagHeart").empty().hide();
	var diagOtherDiv=diagnosisDiv.find(".diagOther").empty().hide();
	var spanHtml="";
	if(diagnosis){
		diagnosis.forEach(function(item){
			if(item.HR55_02_057_04!=""){
				spanHtml+="<span>" + item.HR55_02_057_04 + "</span>";
			}
		});
		diagNormalDiv.append(spanHtml);
	}
	
	if(lepu_diagnosis && lepu_diagnosis!=""){
		lepu_diagnosis.forEach(function(item){
			if(item.number.substring(0,9)=="lepuDiag1"){//冠心病
				diagHeartDiv.append("<span>" + item.name + "</span>").show();
			}else if(item.number.substring(0,9)=="lepuDiag0"){
				diagNormalDiv.append("<span>" + item.name + "</span>");
			}else if(item.number.substring(0,9)=="lepuDiag2"){
				diagOtherDiv.append("<span>" + item.name + "</span>").show();
			}
		});	
		diagHeartDiv.prepend($("<span style='color:#000;background:#fff;'>冠心病：</span>"));
		diagOtherDiv.prepend($("<span style='color:#000;background:#fff;'>其他：</span>"));
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
	
	divBox.find(".totalFeeShow").text(json.Lepu_MedicalExpenses);//费用
	var EMRproduct=json.Lepu_LivingPrescription_Product;	
	var EMRapp=json.Lepu_LivingPrescription_App;
	//显示生活处方
	var ul=$("<ul></ul>");
	var li="";
	var hasProduct=false;
	var hasApp=false;
	for(var i=0;i<EMRproduct.length-1;i=i+2){
		li+="<li><span class='productName'>"+ EMRproduct[i] +"</span></li>";
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