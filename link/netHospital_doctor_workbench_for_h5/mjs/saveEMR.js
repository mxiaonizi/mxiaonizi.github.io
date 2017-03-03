//暂存电子病历
function temporary(element){
	var errorNumber=0;
	$(".EMR textarea").each(function(index,item){//文本域不能输入表情
		var re=/\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|\ud83d[\u2000-\u2fff]/g;
		if($(item).val()!=""){
			if(re.test($(item).val())){
				$(item).parent().addClass("errorLepuInfo");
				errorNumber++;
			}
		}
	})
	$(".EMR input").each(function(index,item){
		if($(item).hasClass("errorLepuInfo")){
			errorNumber++;
		}
	})
	if(errorNumber>0){
		layer.msg("有"+ errorNumber + "处填写不正确",{icon:2});
	}else{//数据验证通过
		$(".EMR *").removeClass("errorLepuInfo");
		makeBtnDiabled(element);
		baseData=saveBaseData();
		healthRelativeData=saveHealthData();
		recordsData=saveRecords();
		entireEMR=$.extend({},baseData,healthRelativeData,recordsData);
//		console.log(entireEMR);
	//	格式化病例信息
		dataFormat(entireEMR);
	//	暂存电子病历
		var OrderNumber = $("#OrderNumber").html();
		
//		 $.post("emr/saveEMR", {
//			 OrderNumber:OrderNumber,
//			 EMRStatus:1,
//			 UserId:UserId,
//			 ServiceInstitutionID:ServiceInstitutionID,
//			 ElectronicMedicalJson:JSON.stringify(entireEMR)
//		 }, function(data) {
//			if(data.Status == 200){
				makeBtnEnabled(element,1);	
				layer.msg("暂存成功",{icon:1});				
//			}else{
//				makeBtnEnabled(element,1);
//				layer.msg("暂存失败，"+ data.Message,{icon:2});			
//				
//			}		
//		 });
	}
}
//提交电子病历
function submitEMR(event){
//	点击提交病例，先填写是否合格
	if(checkEMRdata()){//数据验证通过
		$(".wcjz-modal").show();
	}
}
//点击提交病历，先填写是否合格
function saveIsOK(element){
	makeBtnDiabled(element);
	var evaluateResult=$("#evaluate input:checked").attr("id").substring(5);
 	var EvaluateContent=$("#pl_content").val();
 	/* 如果选中不合格或有错误，验证必须填写理由 */
 	if(evaluateResult == 0 || evaluateResult == 2){
 		if($.trim(EvaluateContent) == null || $.trim(EvaluateContent) == ""){
			layer.msg("请填写理由",{icon:2});
			makeBtnEnabled(element);
			return false;
		}else if($.trim(EvaluateContent).length>400){
			layer.msg("内容要在400字以内",{icon:2});
			makeBtnEnabled(element);
			return false;
		}else{
			doctorSaveEMR(evaluateResult,EvaluateContent,element);
		}
 	}else{
 		doctorSaveEMR(evaluateResult,EvaluateContent,element);
 	}
}

//医生提交病历，并评价是否合格
function doctorSaveEMR(IsEligible,EvaluateContent,element){
	var OrderNumber = $("#OrderNumber").html();
	baseData=saveBaseData();
	healthRelativeData=saveHealthData();
	recordsData=saveRecords();   
	entireEMR=$.extend({},baseData,healthRelativeData,recordsData);
	//格式化病历信息
	dataFormat(entireEMR);
	console.log(entireEMR);
//	$.ajax({
//		url:"emr/saveEMR",
//		type:"POST",
//		data:{
//				OrderNumber:OrderNumber,
//				IsEligible:IsEligible,
//				EvaluateContent:EvaluateContent,
//				EMRStatus:2,
//				ElectronicMedicalJson:JSON.stringify(entireEMR),
//				r:Math.random()
//			},
//		dataType:"json",
//		success:function(data){
//				if(data.Status==200){								
					layer.msg("提交病历成功",{icon:1});
					setTimeout(function(){//延迟1s返回待诊列表页面 
//						var cookie=document.cookie.split(";");
//						$("#returnTodayOrder input").eq(0).val(cookie[1].split("=")[1]);
//						$("#returnTodayOrder input").eq(1).val(cookie[0].split("=")[1])
//						$("#returnTodayOrder").submit();
						window.location.href="today_order_list.html"
					},1000)
//				}else{
//					makeBtnEnabled(element,1);
//					layer.msg("提交病历失败，"+data.Message,{icon:2});					
//				}
//			},
//		error:function(data){
//			makeBtnEnabled(element,1);
//			layer.msg("提交病历失败",{icon:2});			
//		}
//	});
}

//	保存基本信息
function saveBaseData(){
	baseData={
		"HR22_01_100":"医生姓名",
	    "HR00_00_001_05":"病例编号",
	    "HR00_00_001_03":"医院名称",
	    "HR02_01_002":"姓名",
	    "HR02_02_001": "性别代码",
	    "HR30_00_001":"出生日期",
	    "HR01_01_002_02":"标识号-类别代码(身份证号)",
	    "HR04_00_001_03":"联系电话-号码",
	    "HR03_00_004_01":"地址-省（自治区、直辖市）",
	    "HR03_00_004_02":"地址-市（地区）",
	    "HR03_00_004_03":"地址-县（区）",
	    "HR03_00_004_06":"地址-门牌号码",
	    "HR02_06_003":"婚姻状况类别代码",
	    "HR02_08_001":"文化程度代码"
	};
	for(var attr in baseData){
		baseData[attr]=$(".EMR").find(".EMRdata[lepuEMR-ID='" + attr + "']").html();
	}
	return baseData;
}

//保存健康相关信息
function saveHealthData(){
	healthData={
	    "HR51_02_034":"收缩压(mmHg)",
	    "HR51_02_035":"舒张压(mmHg)",
	    "HR51_02_042":"心率（次/分）"
	};
	for(var attr in healthData){
		if($(".EMR").find(".EMRdata[lepuEMR-ID='" + attr + "']").val()!=""){
			healthData[attr]=parseFloat($(".EMR").find(".EMRdata[lepuEMR-ID='" + attr + "']").val());
		}else{
			healthData[attr]="";
		}
	}
	return healthData;
}

//保存就诊记录
function saveRecords(){
	var records={
			"HR51_01_037":"主诉",
		    "HR51_01_300":"现病史",
		    "Lepu_Diagnosis_Result":[],//乐普诊断列表
		    "S_09":[],//处方药
		    "Lepu_LivingPrescription_Product":[],//生活方式建议
		    "Lepu_LivingPrescription_App":[],//生活方式建议APP
		    "Lepu_MedicalExpenses":"医药费", //药品总价 
		    "HR51_96_301_02":[],//检验项目 
		    "HR51_96_001_02":[],//检查项目
		    "HR52_02_107":"医嘱内容"//其他注意事项
	};
	records.HR51_01_037=$(".EMR .EMRdata[lepuEMR-ID=HR51_01_037]").val();//主诉
	records.HR51_01_300=$(".EMR .EMRdata[lepuEMR-ID=HR51_01_300]").val();//病史描述
	records.Lepu_MedicalExpenses=$(".EMR .totalFeeShow").html();
	records.HR52_02_107=$(".EMR .EMRdata[lepuEMR-ID=HR52_02_107]").val();//其他注意事项
	
	var resultStr=$(".EMR .EMRdata[lepuEMR-ID=Lepu_Diagnosis_Result]").val();
	if(resultStr!=""){
		var diagResult=resultStr.split(",");
		var resultLength=diagResult.length;
		for(var i=0;i<resultLength;i=i+2){		
			records.Lepu_Diagnosis_Result.push({"name":diagResult[i],"number":diagResult[i+1]});
		}
	}
	//处方药
	$(".EMR #medicine li").each(function(index,item){	
		var medicinePres={			
			"HR53_01_002": "",//药物名称
	        "HR53_01_010": "", //药物名称代码
	        "HR52_01_037_01":"",// "每日1次",
	        "HR52_01_013":"",//HR52_01_013
	        "HR53_01_037_04": "",//药物使用-总剂量
	        "HR52_01_037_05":"",//药物使用-途径代码
			"Lepu_Medicine_Flag":"",//是否乐普药1:是0:不是
			"Lepu_Medicine_Specifications":"",//药品规格
	        "Lepu_Medicine_Unit":"",//药品单位
	        "Lepu_Medicine_UnitPrice":"",//药品单价
			"Lepu_Medicine_TotalPrice":"",//单个药品总价
	        "route":"",//用药途径名称
	        "medFreqPart1":"",//用药频率（每x）
	        "medFreqPart2":""//用药频率（x次）
		};
		for(var attr in medicinePres){
			medicinePres[attr]=$(this).find(".EMRdata[lepuEMR-ID='" + attr + "']").html();
		}
		records.S_09.push(medicinePres);
	});
	
	//生活方式
	records.Lepu_LivingPrescription_Product=strToArray($(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_Product']").val());
	records.Lepu_LivingPrescription_App=strToArray($(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_App']").val());
	//检验和检查
	records.HR51_96_301_02=strToArray($(".EMR .EMRdata[lepuemr-id=HR51_96_301_02]").val());//检验项目
	records.HR51_96_001_02=strToArray($(".EMR .EMRdata[lepuemr-id=HR51_96_001_02]").val());//检查项目
	return records;
}
//禁用按钮，鼠标变成沙漏
function makeBtnDiabled(element){
	$(element).attr("disabled","disabled");
	$(element).css("cursor","wait");
}
//恢复按钮状态
function makeBtnEnabled(element,time){
	if(!time){
		time=200;
	}else{
		time=time*1000;
	}
	setTimeout(function(){
		$(element).removeAttr("disabled");
		$(element).css("cursor","pointer");
	},time);		
}

//数据验证
function checkEMRdata(){
	var errorNumber=0;
	if($("#mainComInfo").val()==""){//主诉是否为空
		errorNumber++;
		$("#mainComInfo").parent().addClass("errorLepuInfo");
	}else{
		$("#mainComInfo").parent().removeClass("errorLepuInfo");
	}
	if($("#hisDesInfo").val()==""){//病史描述是否为空
		errorNumber++;
		$("#hisDesInfo").parent().addClass("errorLepuInfo");
	}else{
		$("#hisDesInfo").parent().removeClass("errorLepuInfo");
	}
	if($(".EMR input[class*=errorLepuInfo]").length>0){
		errorNumber+=$(".EMR input[class*=errorLepuInfo]").length;
	}
	
	$(".EMR textarea").each(function(index,item){
		var re=/\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|\ud83d[\u2000-\u2fff]/g;
		if($(item).val()!=""){
			if(re.test($(item).val())){
				$(item).parent().addClass("errorLepuInfo");
				errorNumber++;
			}
		}
	})
	if(errorNumber==0){
		return true;
	}else{
		layer.msg("有"+ errorNumber + "处填写不正确",{icon:2});
		return false;
	}
}