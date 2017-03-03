$(function(){
	$.validator.addMethod("keepDecimal",function(value,element,params){
		var correctNumber=/\.\d{1}$/;
		return this.optional(element) || correctNumber.test(value);
	},"请保留1位小数");
	$.validator.addMethod("limitLength",function(value,element,params){		
		return this.optional(element) || value.length==params;
	},$.validator.format("字数长度必须为{0}位"));
	$.validator.addClassRules({			
		medicineAmount:{
			required:function(element){
				return $(element).parent().parent().find(".EMRdata[lepuEMR-ID='HR53_01_002']").is(":filled");
			},
			maxlength:10,	
			digits:true,
		},		
		freqInput:{
			required:function(element){
				return $(element).parent().parent().find(".EMRdata[lepuEMR-ID='HR53_01_002']").is(":filled");
			},
			maxlength:15,	
			digits:true,
		},
		method:{
			required:function(element){
				return $(element).parent().parent().find(".EMRdata[lepuEMR-ID='HR53_01_002']").is(":filled");
			},
			maxlength:100,				
		},
		channel:{
			required:function(element){
				return $(element).parent().parent().find(".EMRdata[lepuEMR-ID='HR53_01_002']").is(":filled");
			}
		}		
	});
	$("#healthEMR input,#healthEMR textarea").each(function(){
		var name=$(this).attr("lepuEMR-ID");
		$(this).attr("name",name);
	});
	healthDataValidation=$("#healthEMR").validate({	 
	     rules: {
	    	HR51_02_034: {	    			
		            rangelength:[2,3],
		            digits:true,
		        },
			HR51_02_035:{
				rangelength:[2,3],
	            digits:true,
			},
			HR51_02_003:{
				keepDecimal:true,
				rangelength:[4,5],
	            number:true,
			},
			HR51_02_004:{
				keepDecimal:true,
				rangelength:[3,5],
	            number:true,
			},
			HR51_02_042:{
				rangelength:[2,3],
				digits:true,
			},
			HR51_02_173:{
				keepDecimal:true,
				limitLength:4,
	            number:true,
			},
			HR51_02_175:{
				keepDecimal:true,
				rangelength:[4,5],
	            number:true,
			},
			HR51_02_174:{
				keepDecimal:true,
				rangelength:[4,5],
	            number:true,
			},
			HR51_02_176:{
				keepDecimal:true,
				limitLength:3,
	            number:true,
			}	
		},		
		ignore:".noCheck",
	    highlight:function(element,errorClass,validClass){
	    		$(element).addClass("errorLepuInfo").removeClass("validLepuInfo");
		    	$(element).parent().removeClass("validLepuInfoBox");	    		    	
	    },
	    unhighlight:function(element,errorClass,validClass){	    	
	    		$(element).addClass("validLepuInfo").removeClass("errorLepuInfo");
		    	$(element).parent().addClass("validLepuInfoBox");	    	    	
	    }		
	});
	
	$("#recordEMR input,#recordEMR textarea").each(function(){
		var name=$(this).attr("lepuEMR-ID");
		$(this).attr("name",name);
	});
	
	recordDataValidation=$("#recordEMR").validate({	 
	     rules: {
	    	 HR51_01_037: {
	    		required:true,
		        maxlength:200,		            
		        },
		     HR51_01_300:{
		    	 required:true,
		         maxlength:3000,	
		     },		     
		     HR52_02_107:{
		    	 maxlength:3000,	
		     }		    
	     },
	     ignore:".noCheck",
	     highlight:function(element,errorClass,validClass){		    	
		    		$(element).addClass("errorLepuInfo").removeClass("validLepuInfo");
			    	$(element).parent().removeClass("validLepuInfoBox");
			    	$(element).parent().find(".wordsAmount").hide();
		    },
		unhighlight:function(element,errorClass,validClass){		    	
		    		$(element).addClass("validLepuInfo").removeClass("errorLepuInfo");
			    	$(element).parent().addClass("validLepuInfoBox");
			    	$(element).parent().find(".wordsAmount").show();		    		    	
		    }		
	});
	
	medicineDataValidation=$("#e_pres").validate({
		rules: {
			medicineAmount:{
				required:function(element){
					return $(element).parent().parent().find(".EMRdata[lepuEMR-ID='HR53_01_002']").is(":filled");
				},
				maxlength:10,	
				digits:true,
			},				
			freqInput:{
				required:function(element){
					return $(element).parent().parent().find(".EMRdata[lepuEMR-ID='HR53_01_002']").is(":filled");
				},
				maxlength:15,	
				digits:true,
			},
			method:{
				required:function(element){
					return $(element).parent().parent().find(".EMRdata[lepuEMR-ID='HR53_01_002']").is(":filled");
				},
				maxlength:100,				
			},
			channel:{
				required:function(element){
					return $(element).parent().parent().find(".EMRdata[lepuEMR-ID='HR53_01_002']").is(":filled");
				}
			}
		},
		highlight:function(element,errorClass,validClass){	    	
	    		$(element).addClass("errorLepuInfo").removeClass("validLepuInfo");  
	    },
	    unhighlight:function(element,errorClass,validClass){	    	
	       $(element).addClass("validLepuInfo").removeClass("errorLepuInfo");	    		    	
	    },
	});	 
	
});

//数据验证
function checkEMRdata(){
	var errorNumber=0;
	if(!$("#healthEMR").valid()){
		errorNumber+=healthDataValidation.numberOfInvalids();
	};
	if(!$("#recordEMR").valid()){
		errorNumber+=recordDataValidation.numberOfInvalids();		
	}
	if(errorNumber==0){
		return true;
	}else{
		createPopWindow("有"+ errorNumber + "处填写不正确");
		return false;
	}
}
function checkMedicine(){
	var errorNumber=0;
	if(!$("#e_pres").valid()){
		errorNumber+=medicineDataValidation.numberOfInvalids();
	};
	if(errorNumber==0){
		return true;
	}else{
		createPopWindow("有"+ errorNumber + "处填写不正确");
		return false;
	}
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

//暂存电子病历
function temporary(element){	 
	 makeBtnDiabled(element);
	 baseData=saveBaseData();
	 healthRelativeData=saveHealthData();
	 recordsData=saveRecords();   
	 entireEMR=$.extend({},baseData,healthRelativeData,recordsData);
	 //暂存电子病历
	 var OrderNumber = $("#OrderNumber").val();	 
	 $.post("emr/saveEMR", {
		 OrderNumber:OrderNumber,
		 EMRStatus:1,
		 ElectronicMedicalJson:JSON.stringify(entireEMR)
	 }, function(data) {
		if(data.Status == 200){
			createPopWindow("暂存成功");
			makeBtnEnabled(element,1);		
		}else{
			createPopWindow("暂存失败，"+data.Message,3);			
			makeBtnEnabled(element,1);	
			
		}		
	 });
}

//点击提交病历，先填写是否合格
function submitEMR(){
	if(checkEMRdata()){
		$(".wcjz-modal").addClass("show");
	}	
}


//点击提交病历，先填写是否合格
function saveIsOK(element){
	makeBtnDiabled(element);	
	var evaluateResult=$("#evaluate input:checked").attr("id").substring(5); 	
 	var EvaluateContent=$("#pl_content").val();
 	/* 如果选中不合格，验证必须填写理由 */
 	if(evaluateResult == 0 || evaluateResult == 2){
 		if($.trim(EvaluateContent) == null || $.trim(EvaluateContent) == ""){
			createPopWindow("请填写不合格理由或错误");
			makeBtnEnabled(element);	
			return false;
		}else if($.trim(EvaluateContent).length>400){
			createPopWindow("内容要在400字以内");
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
	var OrderNumber = $("#OrderNumber").val();
	baseData=saveBaseData();
	healthRelativeData=saveHealthData();
	recordsData=saveRecords();   
	entireEMR=$.extend({},baseData,healthRelativeData,recordsData);
	$.ajax({
		url:"emr/saveEMR",
		type:"POST",
		data:{OrderNumber:OrderNumber,IsEligible:IsEligible,EvaluateContent:EvaluateContent,EMRStatus:2,
			ElectronicMedicalJson:JSON.stringify(entireEMR),r:Math.random()},
		dataType:"json",
		success:function(data){
				if(data.Status==200){								
					createPopWindow("提交病历成功");
					//makeBtnEnabled(element);
					setTimeout(function(){
						switch(fromWhere){
							case 1:window.parent.addTab('当日就诊','order/todayOrderList');
								   window.parent.updateTab('待提交病历','order/readyOrderList');
								   window.parent.closeTab('填写病历'); 
								   break;
							case 2:window.parent.addTab('待提交病历','order/readyOrderList');
								   window.parent.updateTab('当日就诊','order/todayOrderList');
							       window.parent.closeTab('完善病历'); 
							       break;
							case 3:window.parent.addTab('修改病历','order/dotorOrderList?isShowData=0');
								   window.parent.closeTab('编辑病历'); 
							       break;
						};  				
					},1000);
				}else{
					createPopWindow("提交病历失败，"+data.Message,3);					
					makeBtnEnabled(element,1);
					
				}
			},
		error:function(data){
			createPopWindow("提交病历失败");
			makeBtnEnabled(element,1);
			}
		});
	
}
//管理员提交病历
function managerSaveEMR(element){
	if(checkEMRdata()){
		makeBtnDiabled(element);
	   	 baseData=saveBaseData();
	   	 healthRelativeData=saveHealthData();
	   	 recordsData=saveRecords();   
	   	 entireEMR=$.extend({},baseData,healthRelativeData,recordsData);
	   	 var OrderNumber = $("#OrderNumber").val();
	   	 
	   	$.ajax({
			url:"emr/managerSaveEMR",
			type:"POST",
			data:{OrderNumber:OrderNumber,ElectronicMedicalJson:JSON.stringify(entireEMR),r:Math.random()},
			dataType:"json",
			success:function(data){
					if(data.Status==200){								
						createPopWindow("提交病历成功");
						//makeBtnEnabled(element);
						setTimeout(function(){	
							window.parent.closeTab('编辑病历');	
						},1000);
					}else{
						createPopWindow("提交病历失败，"+data.Message,3);						
						makeBtnEnabled(element,1);
						
					}
				},
			error:function(data){
				createPopWindow("提交病历失败");
				makeBtnEnabled(element,1);
				}
			});	   	 
	}
}

//保存基本信息
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
		    "HR02_08_001":"文化程度代码",
	};
	for(key in baseData){
		baseData[key]=$(".EMR").find(".EMRdata[lepuEMR-ID='" + key + "']").val();
	}
	return baseData;
}
//保存健康相关信息
function saveHealthData(){
	healthData={
			"HR51_03_003":"ABO血型", 
		    "HR51_02_034":"收缩压(mmHg)",
		    "HR51_02_035":"舒张压(mmHg)",
		    "HR51_02_003":"身高(cm)",
		    "HR51_02_004":"体重（kg）",
		    "HR51_02_042":"心率（次/分）",
		    "HR51_02_173":"体重指数",
		    "HR51_02_175":"腰围(cm)",
		    "HR51_02_174":"臀围(cm)",
		    "HR51_02_176":"腰臀围比值"		    
	};
	for(key in healthData){
		healthData[key]=$(".EMR").find(".EMRdata[lepuEMR-ID='" + key + "']").val();
	}
	return healthData;
}
//保存就诊记录
function saveRecords(){
	var records={
			"HR51_01_037":"主诉",
		    "HR51_01_300":"现病史",
		    "HR42_02_012": "诊断日期",		    
		    "Lepu_Diagnosis_Result":[],//乐普诊断列表   
		    "S_07":[],//ICD10旧版诊断
		    "S_09":[],//处方药
		    "Lepu_LivingPrescription_Product":[],//生活处方
		    "Lepu_LivingPrescription_App":[],//生活处方
		    "Lepu_MedicalExpenses":"医药费",  
		    "HR51_96_301_02":[],//检验项目     
		    "HR51_96_001_02":[],//检查项目
		    "HR52_02_107":"医嘱内容",
	};
	records.HR51_01_037=$(".EMR .EMRdata[lepuEMR-ID='HR51_01_037']").val();
	records.HR51_01_300=$(".EMR .EMRdata[lepuEMR-ID='HR51_01_300']").val();
	var today=new Date();	
	records.HR42_02_012=today.toLocaleDateString();
	records.Lepu_MedicalExpenses=$(".EMR .totalFeeShow").text();
	records.HR52_02_107=$(".EMR .EMRdata[lepuEMR-ID='HR52_02_107']").val();
	
	var resultStr=$(".EMR .EMRdata[lepuEMR-ID='Lepu_Diagnosis_Result']").val();
	if(resultStr!=""){
		var diagResult=resultStr.split(",");
		var resultLength=diagResult.length;
		for(var i=0;i<resultLength;i=i+2){		
			records.Lepu_Diagnosis_Result.push({"number":diagResult[i],"name":diagResult[i+1]});
		}
	}
	
	
	
	records.S_07=diagICD10;
	//处方药
	$(".EMR .presList tbody tr.template").each(function(){
		if(this.style.display!="none"){
			var medicinePres={			
					 "HR53_01_002": "",      
			         "HR53_01_010": "",    
			         "HR52_01_037_01":"",	         
			         "HR52_01_013":"", 
			         "HR53_01_037_04": "",     
			         "HR52_01_037_05":"",	         
			         "Lepu_Medicine_Specifications":"",
			         "Lepu_Medicine_Unit":"",
			         "Lepu_Medicine_UnitPrice":"",
			         "Lepu_Medicine_TotalPrice":"",	
			         "route":"",
			         "medFreqPart1":"",
			         "medFreqPart2":""
			};
			for(key in medicinePres){
				medicinePres[key]=$(this).find("div.EMRdata[lepuEMR-ID='" + key + "']").text();
			}
			records.S_09.push(medicinePres);
		}			
	});
	
	//生活处方
	records.Lepu_LivingPrescription_Product=$(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_Product']").val().split(",");	
	records.Lepu_LivingPrescription_App=$(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_App']").val().split(",");	
	//检验和检查
	records.HR51_96_301_02=$(".EMR .examineList .examinPart1").val().split(",");
	records.HR51_96_001_02=$(".EMR .examineList .examinPart2").val().split(",");
	
	return records;
}



