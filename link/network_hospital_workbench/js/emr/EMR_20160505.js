// 显示和隐藏搜索病例框
function showSearchBox(event){
	$(event).hide();
	$(event).next().show();
}
function HideSearchBox(event){
	$(event).parent().hide();
	$(event).parent().prev().show();
}

// 计算BMI
function calBMI(){
	var bmiData=$(".bmi");
	var height=bmiData[0].value;
	var weight=bmiData[1].value;
	if(height && weight){
		var BMI=weight*10000/height/height;
		bmiData[2].value=BMI.toFixed(1);
	}else{
		bmiData[2].value="";
	}
}

// 计算腰臀比
function calRatio(){
	var RatilData=$(".ratio");
	var waist=RatilData[0].value;
	var hip=RatilData[1].value;
	if(waist && hip){
		var ratio=waist/hip;
		RatilData[2].value=ratio.toFixed(1);
	}else{
		RatilData[2].value="";
	}
}
// 添加诊断
function addDiagnosis(event){	
	var inputBox=$(event).parent().parent().find(".diagnosisInput").eq(0);
	var inputBoxClone=inputBox.clone(true);	
	inputBoxClone.find("label").remove();	
	inputBoxClone.find("input").val("").removeClass("errorLepuInfo");
	inputBoxClone.find("input[type=text]").attr("noedit",false);
	inputBoxClone.find("input[lepuEMR-ID='HR55_02_057_02']").val(1);
	$(event).parent().before(inputBoxClone);
	
//	//新加后，根据排序，重新命名后，不同名字的输入框才能分别校验
//	var diagnosisInput=$(event).parent().parent().find(".EMRdata[lepuEMR-ID='HR55_02_057_04']");
//	var sortNumber=0;
//	diagnosisInput.each(function(){
//		var name='HR55_02_057_04_'+ ++sortNumber;
//		$(this).attr("name",name);		
//	});		
}

//删除诊断
function deleteDiagTr(event){
	if($(event).parent().parent().find(".diagnosisInput").length>1){
		$(event).parent().remove();
	}else{
		$(event).parent().find("input").val("");
	}
}

// 显示和限制字数
function showNumber(event){
	var text=$(event).val();
	var number=text.length;
	var maxNumber=parseInt($(event).parent().find(".maxNumber").text());
	if(number>maxNumber){
		text=text.substring(0,maxNumber);
		$(event).val(text);		
	}
	$(event).parent().find(".realNumber").text(text.length);
}
// 编辑处方
function editPrescription(){	
	$(".prescriptionBox").show();	
}

// 电子处方 删除一行
function deleteTr(event,type){
	if($(event).parent().parent().parent().find(".deleteButton").length>1){
		$(event).parent().parent().remove();
	}else{
		$(event).parent().parent().find("input,select").val("");
	}
	if(type=="medicine"){calPresFee();}		
}
// 电子处方 添加一行
function addMedicineTr(event){
	var tr=$(event).parent().parent().parent().prev();	
	var trClone=tr.clone(true);
	trClone.find("input,select").val("").removeClass("errorLepuInfo");
	trClone.find("label").remove();
	trClone.find("input[type=text]").attr("noedit",false);
	$(event).parent().parent().parent().before(trClone);
	
	var medicineTr=$(event).parent().parent().parent().parent().find("tr");
	var sortNumber=1;
	medicineTr.each(function(){
		$(this).find(".medicineAmount").attr("name",'medicineAmount_'+sortNumber);		
		$(this).find(".freqInput").attr("name",'freqInput'+sortNumber);
		$(this).find(".method").attr("name",'method'+sortNumber);
		$(this).find(".channel").attr("name",'channel'+sortNumber);
		sortNumber++;
	});	
}
// 编辑处方
function editExamination(){	
	$(".examinationPop").show();	
}
// 检查建议 删除一行
function deleteExamTr(event){	
	if($(event).parent().parent().parent().find(".deleteButtonExamination").length>1){
		var addBtn=$(event).parent().parent().parent().find(".addButtonExamination");
		$(event).parent().parent().remove();
		sort(addBtn);
	}else{
		$(event).parent().parent().find("input").val("");
	}	
}
// 检查建议 添加一行
function addButtonExaminationTr(event){
	var tr=$(event).parent().parent().prev();	
	var trClone=tr.clone(true);
	trClone.find("input").val("");
	trClone.find("input[type=text]").attr("noedit",false);
	$(event).parent().parent().before(trClone);
	sort(event);		
}
//排序
function sort(event){
	var td=$(event).parent().parent().parent().parent().find("td.number");
	var number=1;
	td.each(function(){
		$(this).text(number);
		number++;
	});
}
//用药频率相互转化
function freqToString(event){
	var freqPart=$(event).parent().find(".medicineFreq_part");
	var string="每";
	freqPart.each(function(){
		string+=$(this).val();
	});
	string+="次";
	$(event).parent().find(".medicineFreq").val(string);
	
}
//下拉框的内容保存
function selToValue(event){
	var value=$(event).find("option:selected").text();
	$(event).parent().find(".EMRdata[lepuEMR-ID='route']").val(value);
}

//计算年龄
function calAge(divBox,isUpdatePopBox){	
	var birthday=divBox.find(".EMRdata[lepuEMR-ID='HR30_00_001']").val();
	var today=new Date();
	var age=today.getFullYear()-birthday.split("-")[0];	
	divBox.find(".age").val(age);
	if(isUpdatePopBox){
		$(".popBox .age").val(age);
	}
}

//勾选生活处方
function checkBox_pres(event){
	checkBox(event);
	updateLivingPres();	
}
function updateLivingPres(){
	var livingPres={
			product:[],
			app:[],
	};
	//产品处方
	$(".product input.lPres").each(function(){
		if($(this).prop("checked")){
			livingPres.product.push($(this).next().next().text());
			livingPres.product.push($(this).next().next().next().text());
		}
	});
	$(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_Product']").val(livingPres.product.join(','));
	
	//APP处方
	$(".app input.lPres").each(function(){
		if($(this).prop("checked")){
			livingPres.app.push($(this).next().next().text());
			livingPres.app.push($(".app input.lPres").index(this)+1);
		}
	});
	$(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_App']").val(livingPres.app.join(','));
}


//计算处方价格
function calPresFee(){
	var totalFee=0;	
	$(".medicineTr").each(function(){
		var amount=parseInt($(this).find("input[lepuEMR-ID='HR53_01_037_04']").val());
		var unitPrice=$(this).find("input[lepuEMR-ID='Lepu_Medicine_UnitPrice']").val();
		if(amount && unitPrice){
			var totalPrice=unitPrice*amount;
			$(this).find("input[lepuEMR-ID='Lepu_Medicine_TotalPrice']").val(totalPrice);
			totalFee+=totalPrice;
		}		
	});		
	totalFee=accurateToHundredth(totalFee);
	$(".totalFee").text(totalFee);	
}

//精确到百分位
function accurateToHundredth(number){
	return Math.round(number * 100)/100;
}

//勾选诊断
function checkBox_diag(element){
	checkBox(element);
	updateDiagnosis();	
}
function labelClick(element){
	$(element).prev().click();
}
function updateDiagnosis(){
	var diagArray=[];
	var diagIpt=$(".diagnosis input");
	diagIpt.each(function(){
		if(this.checked==true){
			diagArray.push($(this).next().next().text());
		}
	});
	$(".EMR .diagnosis input[lepuEMR-ID='Lepu_Diagnosis_Result']").val(diagArray.join(","));
}

//保存电子处方
function savePres(){
	if(!checkMedicine()){
		return false;
	}
	updateLivingPres();	
	medicineSet=[];
	var medicine={			
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
	
	var totalFee=accurateToHundredth($(".totalFee").text());
	
	//复制模板行后清空再插入模板，实现清空历史信息
	var tClone=$(".EMR .prescription .presList tr.template").eq(0).clone(true).show();
	$(".EMR .prescription .presList tbody").empty().append(tClone);
	
	$(".medicineTr").each(function(){
		if($(this).find(".EMRdata[lepuEMR-ID='HR53_01_002']").val()!=""){
			var tempTrClone= tClone.clone(true);
			for(key in medicine){			
				medicine[key]=$(this).find(".EMRdata[lepuEMR-ID='" + key + "']").val();
				tempTrClone.find(".EMRdata[lepuEMR-ID='" + key + "']").text(medicine[key]);
			}
			medicineSet.push(medicine);
			$(".EMR .prescription .presList table").append(tempTrClone);
		}else if($(".medicineTr").length>1){
			$(this).remove();			
		}		
	});
	tClone.hide();
	
	if(medicineSet.length>0){		
		$(".EMR .presList table").show();
		$(".EMR .presList table").next().removeClass("borderTop");
	}else{
		$(".EMR .presList table").hide();
		$(".EMR .presList table").next().addClass("borderTop");
	}
	
	var EMRproduct=$(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_Product']").val().split(",");	
	var EMRapp=$(".EMR .EMRdata[lepuEMR-ID='Lepu_LivingPrescription_App']").val().split(",");	
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
		$(".productShow").empty().append(ul);
		hasProduct=true;
	}else{
		$(".productShow").empty();
		hasProduct=false;
	}	
	ul=$("<ul></ul>");
	li="";
	for(var i=0;i<EMRapp.length-1;i=i+2){
		li+="<li><div><img src='images/app"+ EMRapp[i+1] +".png'></div><div>"+ EMRapp[i] +"</div></li>";
	}//product
	if(li!=""){
		ul.append(li);
		$(".appShow").empty().append(ul);
		hasApp=true;
	}else{
		$(".appShow").empty();
		hasApp=false;
	}	
	
	if(!hasProduct && !hasApp){
		$(".EMR .livPresShow").hide();		
	}else{		
		$(".EMR .livPresShow").show();
	}
	$(".EMR .totalFeeShow").text(totalFee);
	
	
	if(!hasProduct && !hasApp && medicineSet.length==0){		
		$(".EMR .presList,.edit").hide();
		$(".EMR .prescription .add").show();
	}else{
		$(".EMR .presList,.edit").show();
		$(".EMR .prescription .add").hide();
	}
	$(".prescriptionBox").hide();	
}

//保存检查建议
function saveExamin(){
	var examin1=[];
	var examin2=[];
	var divHTML="";
	var sortNumber=0;
	$(".EMR .examin1").empty();
	$(".EMRdata[lepuEMR-ID='HR51_96_301_02']").each(function(){
		if($.trim($(this).val())!=""){
			examin1.push($(this).val());
			divHTML=++sortNumber + "." + $(this).val() + "<br>";
			$(".EMR .examin1").append(divHTML);
		}		
	});
	if(examin1.length==0){$(".EMR .examinPart1").parent().hide();
	}else{$(".EMR .examinPart1").parent().show();}
	$(".EMR .examinPart1").val(examin1);
	
	sortNumber=0;
	$(".EMR .examin2").empty()
	$(".EMRdata[lepuEMR-ID='HR51_96_001_02']").each(function(){
		if($.trim($(this).val())!=""){
			examin2.push($(this).val());		
			divHTML=++sortNumber + "." + $(this).val() + "<br>";
			$(".EMR .examin2").append(divHTML);
		}		
	});
	if(examin2.length==0){$(".EMR .examinPart2").parent().hide();
	}else{$(".EMR .examinPart2").parent().show();}
	$(".EMR .examinPart2").val(examin2);
	if(examin1.length>0 || examin2.length>0){
		$(".examinationPop,.EMR .examination .add").hide();
		$(".EMR .examineList,.EMR .examination .edit").show();
	}else{
		$(".examinationPop,.EMR .examineList,.EMR .examination .edit").hide();
		$(".EMR .examination .add").show();
	}
}

//展示区域性静态信息
function showTextareaContent(divBox){
	var textarea=divBox.find("textarea");
	textarea.each(function(){
		$(this).parent().find("p.showAreaContent").text(this.value);
	});
}