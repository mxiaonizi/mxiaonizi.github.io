var nowObj=null;
var u = navigator.userAgent;
//var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
$('.EMR .main').on("touchmove",function(){
	ScrollTop=$(this).scrollTop();
    if(isiOS){
    	$(":focus").blur();
    }
})
$(".usage_box").on("touchmove",function(){
	if(isiOS){
		$(".usage_box :focus").blur();
	}
})
//删除药品
function deleteMedicine(obj){
	if($(obj).parent().attr("id")=="lifestyle_item"){//删除生活方式
		$(".EMRdata[lepuemr-id=Lepu_LivingPrescription_Product]").val("");
		$(".EMRdata[lepuemr-id=Lepu_LivingPrescription_App]").val("");
	}
	$(obj).parent().remove();
	calPresFee();
}
//初始化用法用量信息
function resetUsageInfo(){
//	点击开药,进入用法用量页面,初始化页面信息
	$("#medNum").val(1);
	$(".cycle").find("span").eq(1).addClass("bg").siblings().removeClass("bg");
	$("#times").val(1);
	$("#each").val("");
	$(".usage").find("span").eq(0).addClass("bg").siblings().removeClass("bg");
}
//修改用法用量
function modifyMedicine(obj){
	setTop=ScrollTop;
	$(".EMR .head").hide();
	$(".EMR .main .content").hide();
	$(".EMR .foot").hide();
	nowObj=$(obj).parent();
	$(".usage_box").show();//显示用法用量页面
	$(".drugName span").html($(obj).parent().find("p[class*=medicine_name]").html());//显示对应药品名
	var spans=$(obj).next().next().find("p").eq(1).find("span");// <span>2</span><span>瓶</span>
	$("#medNum").val(spans.eq(0).html());
	$("#unit").html(spans.eq(1).html());
//	用药频率
	var $freq=$(obj).next().next().next().find("p").eq(0).find("span");//每<span>晚</span><span>3</span>次
	$(".cycle").find("span").each(function(index,item){
		$(item).removeClass("bg");
		if($(item).html()==$freq.eq(0).html()){
			$(item).addClass("bg");
		}
	})
//	次数
	$("#times").val($freq.eq(1).html());
//	每次
	$("#each").val($freq.parent().next().find("span").eq(0).html());
	$(".usage").find("span").each(function(index,item){
		$(item).removeClass("bg");
		if($(item).html()==$freq.parent().next().next().html()){
			$(item).addClass("bg");
		}
	})
}
function confirmModMedicine(obj){
	$(obj).parent().parent().hide();
	$("#searchDrug").val("");
	$("#drugList").html("");
	$("#drugList>li").removeClass("backColor");
}
//新增药品
function addMedicine(obj){
	$(obj).parent().parent().hide();
	$("#searchDrug").val("");
	$("#drugList").html("");
	$("#drugList>li").removeClass("backColor");
	var medName=$(".drugName").find("span").html();
	var freq=$(".cycle span[class*=bg]").html()||"";
	var takType=$(".usage span[class=bg]").html()||"";
	var takTypeNum=$(".usage span[class=bg]").attr("value")||"";
	var str='<li class="item"><span class="EMRdata hide" lepuEMR-ID="Lepu_Medicine_Specifications">'+$(".drugName").find("span").attr("packing")+'</span><span class="EMRdata hide" lepuEMR-ID="Lepu_Medicine_UnitPrice">'+$(".drugName").find("span").attr("retailprice")+'</span><span class="EMRdata hide" lepuEMR-ID="Lepu_Medicine_Flag">'+$(".drugName").find("span").attr("isLepu")+'</span><span class="EMRdata hide" lepuEMR-ID="HR53_01_010">'+$(".drugName").find("span").attr("medicineid")+'</span><a href="javascript:;" class="modify_btn" onclick="modifyMedicine(this)">编辑</a><a href="javascript:;" class="delete_btn" onclick="deleteMedicine(this)">删除</a><div class="medicine_info"><p class="medicine_name EMRdata" lepuEMR-ID="HR53_01_002">'+medName+'</p><div lepuEMR-ID="HR53_01_010" class="EMRdata hidden"></div><p>X<span lepuemr-id="HR53_01_037_04" class="EMRdata" style="padding-right:0.5rem;">'+$("#medNum").val()+'</span><span lepuemr-id="Lepu_Medicine_Unit" class="EMRdata">'+$("#unit").html()+'</span></p></div><div class="taking_info"><p>每<span lepuEMR-ID="medFreqPart1" class="EMRdata">'+freq+'</span><span lepuEMR-ID="medFreqPart2" class="EMRdata">'+$("#times").val()+'</span>次<span lepuemr-id="HR52_01_037_01" class="EMRdata hide">每'+freq+$("#times").val()+'次</span></p><p><span lepuemr-id="HR52_01_013" class="EMRdata">'+$("#each").val()+'</span></p><p lepuEMR-ID="route" class="EMRdata">'+takType+'</p><span lepuEMR-ID="HR52_01_037_05" class="EMRdata hidden">'+takTypeNum+'</span></div><div class="pophead">价格：<span class="EMRdata" lepuemr-id="Lepu_Medicine_TotalPrice"></span>元</div></li>';
	
	$("#medicine").append(str);
	if(freq==""){
		$(".cycle").find("span").eq(0).html("每")
		$(".taking_info").find("p").eq(0).html("")
	}
	if($("#each").val()==""){
		$(".taking_info").find("p").eq(1).html("");
	}
}

//修改生活方式建议
function mofifyLifestyle(){
	$("#lifestyle").show();
}

//新增检验项目
function checkSuggest(obj,append){//把选中的项目渲染到页面  obj:检验项目|检查项目弹窗；append：添加所选项目的对象
	$(obj).hide();
	var prevExam="";
	if($(append).find("li").length>0){
		prevExam=$(append).html();
		console.log(prevExam);
	}
	var str="";
	if($(obj).find("ul").find("li[class=backColor]").size()>0){
		$(obj).find("ul").find("li[class=backColor]").each(function(index,item){
			str+='<li class="item clearfix"><p class="medicine_name fl" style="width:88%;">'+$(item).html()+'</p><a href="javascript:;" class="fr" onclick="deleteCheckSug(this)">删除</a></li>';
		})
		str=str+prevExam;
		$(append).html(str);
	}
}
function deleteCheckSug(obj){
	var objId=$(obj).parent().parent().attr("id");
	$(obj).parent().remove();
	var examStr="";
	if(objId=="test_info"){//检验项目
		examStr="";
		$("#test_info li").each(function(index,item){
			examStr+=$(item).find("p").html()+",";
		})
		$(".EMR .EMRdata[lepuemr-id=HR51_96_301_02]").val(examStr.substr(0,examStr.length-1));
	}
	if(objId=="check_info"){//检查项目
		examStr="";
		$("#check_info li").each(function(index,item){
			examStr+=$(item).find("p").html()+",";
		})
		$(".EMRdata[lepuemr-id=HR51_96_001_02]").val(examStr.substr(0,examStr.length-1));
	}
}
function modifyCheckSug(obj){
	if($(obj).parent().parent().attr("id")=="test_info"){
		$("#pop_test").show();
	}
	if($(obj).parent().parent().attr("id")=="check_info"){
		$("#pop_check").show();
	}
}

function radioBox(event){
	$(event).parent().find("span").removeClass('selected');
	$(event).addClass('selected');
	$(event).prev().click();
}
//显示和限制字数
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

function goBack(){
//	获取用户名、密码
	var cookie=document.cookie.split(";");
	$("#loginid").val(cookie[1].split("=")[1]);
	$("#password").val(cookie[0].split("=")[1])
	$("#goback").submit();
}
function goBackHistory(){
	$(".EMRhistory").hide();//隐藏历史就诊记录
	$(".EMR").show();//显示历史急诊记录列表
	$(".EMR .history_box").show();//显示历史急诊记录列表
}
//计算处方价格
function calPresFee(){
	var totalFee=0;	
	$(".EMR #medicine li").each(function(){
		var amount=parseInt($(this).find("span[lepuEMR-ID='HR53_01_037_04']").html());
		var unitPrice=$(this).find("span[lepuEMR-ID='Lepu_Medicine_UnitPrice']").html();
		if(amount && unitPrice){
			var totalPrice=accurateToHundredth(unitPrice*amount);
			$(this).find("span[lepuEMR-ID='Lepu_Medicine_TotalPrice']").html(totalPrice);
			totalFee+=totalPrice;
		}		
	});		
	totalFee=accurateToHundredth(totalFee);
	$(".totalFeeShow").html(totalFee);
	if($(".totalFeeShow").html()==0){
		$(".totalFeeShow_box").hide();
	}else{
		$(".totalFeeShow_box").show();
	}
}
//精确到百分位
function accurateToHundredth(number){
	return Math.round(number * 100)/100;
}
//扫描件详情点击返回-扫描件列表
function returnScanList(){
	$(".htmleaf-container").hide();
	if(isHistoryEMROnoff){//当前病例
		$(".EMR").show();
		$(".EMR .content>ul").hide();
		$(".EMR .content>ul").eq(2).show();
		
	}else{//历史病例
		$(".EMRhistory").show();
		$(".EMRhistory .content>ul").hide();
		$(".EMRhistory .content>ul").eq(2).show();
	}
	
	
//	显示扫描件页面
//	$(".type_list>a").removeClass("checked_tab");
//	$(".type_list>a").eq(2).addCalss("checked_tab");
//	$(".content>ul").addClass("hide");
//	$(".content>ul").eq(2).removeClass("hide");
	
}

//	设置bigImgBox高度
var clientHeight=$(window).height();
$(".bigImgBox").css("height",clientHeight)
function showBigImg(event){
	$(event).next().show();
	
}
function hideBigImg(event){
	$(event).hide();
}


