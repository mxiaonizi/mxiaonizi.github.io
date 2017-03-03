$(function(){
	var setTop=0;
//	点击历史病例,弹出历史病例列表
	$(".history_btn").on("click",function(){
		setTop=ScrollTop;
		$(".EMR .head").hide();
		$(".EMR .main .content").hide();
		$(".EMR .foot").hide();
		$(".history_box").show();
		
	})
	$(".history_box>.pubhead>span").on("click",function(){//关闭
		isHistoryEMROnoff=true;
		$(".history_box").hide();
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
//		回到查看历史病例之前的状态
		$(".EMR .content>ul").hide();
		$(".EMR .type_list>a").each(function(index,item){
			if($(item).attr("class")=="checked_tab"){
				$(".EMR .content>ul").eq(index).show()
			}
		})
		
		$(".EMR .main").scrollTop(setTop);
	})
//	点击按钮切换内容
	$(".EMR .type_list>a").on("click",function(){
		$(".EMR .type_list>a").removeClass("checked_tab");
		$(this).addClass("checked_tab");
		$(".EMR .content>ul").hide();
		$(".EMR .content>ul").eq($(this).index()).show();
	})
	
	
	
//	主诉
	var arr=[];//存放选择的主诉项
	$("#maiSelMoudle").on("click",function(){
		$("#main_complain_box").show();//显示主诉模板
	})
	$(".main_complain_box>.pubhead>span").on("click",function(){//点击关闭
		$(".main_complain_box").hide();
		$(".main_complain_box").find("li").removeClass("backColor");
		$(arr).each(function(index,item){
			item[1].addClass("backColor");
		});
	})
	$(".main_complain_box li").on("click",function(event){
		$(this).toggleClass("backColor");
		return false;
	})
	$("#mainCompBtn").on("click",function(){//点击确定
		$("#main_complain_box").hide();
		arr=[];
		var ele=$("#main_Complainlist_list").find("li[class=backColor]");
		$(ele).each(function(index,item){
			arr.push([$(item).html().replace(".","；"),$(item)]);
		});
		var str="";
		$(arr).each(function(index,item){
			str+=item[0];
		})
		$("#mainComInfo").val(str);
		checkTextNum($("#mainNum"),$("#mainComInfo"),200);
	})
//	$("#mainComInfo").on("focus",function(event){
//		if($(".EMR .main").scrollTop()>100){
//			$(".EMR .main").scrollTop(150);
//		}
//		
//	})
	$("#mainComInfo").on("input",function(){
		checkTextNum($("#mainNum"),$("#mainComInfo"),200);
	})
//	排除表情
	var re=/\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|\ud83d[\u2000-\u2fff]/g;
	$("#mainComInfo").on("blur",function(){
		re.lastIndex=0;
		if($("#mainComInfo").val()!=""){
			if(re.test($("#mainComInfo").val())){
				$("#mainComInfo").parent().addClass("errorLepuInfo");
				layer.msg("请不要输入非法字符",{icon:2,time:1000});
			}else{
				$("#mainComInfo").parent().removeClass("errorLepuInfo");
			}
		}else{
			$("#mainComInfo").parent().removeClass("errorLepuInfo");
		}
	})
//	病史描述
//	$("#hisDesInfo").on("focus",function(event){
//		$(".EMR .main").scrollTop(350);
//		$("#hisDesInfo").focus();
//	})
	$("#hisDesInfo").on("input",function(){
		checkTextNum($("#hisDesNum"),$("#hisDesInfo"),3000);
	})
//	排除表情
	var re=/\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|\ud83d[\u2000-\u2fff]/g;
	$("#hisDesInfo").on("blur",function(){
		re.lastIndex=0;
		if($("#hisDesInfo").val()!=""){
			if(re.test($("#hisDesInfo").val())){
				$("#hisDesInfo").parent().addClass("errorLepuInfo");
				layer.msg("请不要输入非法字符",{icon:2,time:1000});
			}else{
				$("#hisDesInfo").parent().removeClass("errorLepuInfo");
			}
		}else{
			$("#hisDesInfo").parent().removeClass("errorLepuInfo");
		}
	})
	
	
//	诊断
	$("#diagnose span").on("click",function(){
//		if($(this).parent().attr("class")=="bottom"){
//			$("#diagnose .bottom span").removeClass("active");
//		}
		$(this).toggleClass("active");
		
		//生成诊断数据
		var lepuDiagResult="";
		$("#diagnose span[class*=active]").each(function(index,item){
			lepuDiagResult+=","+$(item).html()+","+$(item).attr("diagnum");
		})
		$(".EMRdata[lepuemr-id=Lepu_Diagnosis_Result]").val(lepuDiagResult.substr(1));
	})
	
//处方
	
//	点击开药进入搜索药品页面
	$("#prescBtn").on("click",function(){
		setTop=ScrollTop;
		$(this).attr("onoff",true);
		$(".EMR .head").hide();
		$(".EMR .main .content").hide();
		$(".EMR .foot").hide();
		$(".presc_box").show();
		
	})
//	点击关闭回到上一页
	$(".presc_box>.pubhead>span").on("click",function(){
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
		$(this).parent().parent().hide();
		$("#searchDrug").val("");
		$("#drugList").html("");
		$("#prescBtn").attr("onoff",false);
		$(".EMR .main").scrollTop(setTop);
	})
//	药品处方
	//点击对应药品进入用法用量页面
	$("#drugList").on("click",function(event){
		if(event.target.nodeName=="LI" && $(event.target).html()!="暂无数据，请重新搜索"){
			var flag=true;
			//判断是否已开过此药，如果开过，弹出提示框
			$(".EMR #medicine li").each(function(index,item){//遍历已开过的药品的名字,是否与当前点击内容相等
				if($(item).find("div[class=medicine_info] p").eq(0).html()==$(event.target).html()){
					layer.msg("已开过此药，请重新选择",{icon:2,time:1000});
					flag=false;
				}
			})
			if(flag){//开药
				$("#searchDrug").val($(event.target).html());
				$("#drugList>li").removeClass("backColor");
				$(event.target).addClass("backColor");
				var This=$(event.target);
//				setTimeout(function(){
					$(This).parent().parent().parent().hide();
					$(".usage_box").show();
//				},100);
		//		点击对应的药品跳转到这个药品的用法用量页面
				$(".drugName").find("span").html($(event.target).html());//显示选中药品名
				$(".drugName").find("span").attr("isLepu",$(event.target).attr("lepu_medicine_flag"));//标识是否乐普药
				$(".drugName").find("span").attr("medicineid",$(event.target).attr("medicineid"));//药物名称代码
				$(".drugName").find("span").attr("retailprice",$(event.target).attr("retailprice"));//药品单价
				$(".drugName").find("span").attr("packing",$(event.target).attr("packing"));//药品规格
				$("#unit").html($(event.target).attr("packingunit"));
		//		初始化用法用量信息
				resetUsageInfo();
			}
		}
	})
	/*
	 设置用法用量
	 * */
//	点击关闭,关闭当前页面,回到药品选择页面
	$(".usage_box>.pubhead>span").on("click",function(){
//		判断开药按钮的onoff值
		if($("#prescBtn").attr("onoff")=="true"){//开药-回到搜索药品页
			$(this).parent().parent().hide();//关闭当前页面
			$(".presc_box").show();//显示搜索药品页
			$("#searchDrug").val("");//清空搜索框
			$("#drugList").html("");//清空搜索结果
			$("#drugList>li").removeClass("backColor");//清空搜索结果样式
		}
		if($("#prescBtn").attr("onoff")=="false"){//修改用法用量--回到看诊页面
			$(".EMR .head").show();
			$(".EMR .main .content").show();
			$(".EMR .foot").show();
			$(".EMR .main").scrollTop(1100);
			$(".usage_box").hide();
			$("#prescBtn").attr("onoff",false);//开药按钮设为初始状态
			
		}
		
		$(".usage_box input").removeClass("errorLepuInfo");
		return false;
	})
//	药品数量
	$(".add").on("click",function(){
		var num=$(this).prev().val();
		if(/^[0-9]{1,}$/.test(num)){
			num++;
			$(this).prev().val(num);
			$(this).prev().removeClass("errorLepuInfo");
		}else{
			$(this).prev().addClass("errorLepuInfo");
		}
		
	})
	$(".minus").on("click",function(){
		var num=$(this).next().val();
		if(/^[0-9]{1,}$/.test(num)){
			num--;
			num=num<1?1:num;
			$(this).next().val(num);
			$(this).next().removeClass("errorLepuInfo");
		}else{
			$(this).next().addClass("errorLepuInfo");
		}
		
	})
	$("#medNum").on("blur",function(){
		if($(this).val()==""||$(this).val()=="0"){
			$(this).addClass("errorLepuInfo");
			layer.msg("请正确填写",{icon:2});
		}
	})
//	用药频率
	$(".cycle span[class*=cycleItem]").on("click",function(){
		$(".cycle span").removeClass("bg");
		$(this).addClass("bg");
	})
	
	$("#times").on("blur",function(){
		if($(this).val()>10){
			$(this).addClass("errorLepuInfo");
			layer.msg("数字不能大于10",{icon:2});
		}
		if($(this).val()==""||$(this).val()==0){
			$(this).addClass("errorLepuInfo");
			layer.msg("请正确填写",{icon:2});
		}
	})
	
	var re=/\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|\ud83d[\u2000-\u2fff]/g;
	$("#each").on("blur",function(){
		re.lastIndex = 0;
		if($(this).val()!=""){
			if($(this).val()=="0"){
				$(this).addClass("errorLepuInfo");
				layer.msg("输入内容不能为0",{icon:2,time:1000});
			}else if(re.test($(this).val())){
				$(this).addClass("errorLepuInfo");
				layer.msg("请不要输入非法字符",{icon:2,time:1000});
			}else{
				$(this).removeClass("errorLepuInfo");
			}
		}else{
			$(this).addClass("errorLepuInfo");
			layer.msg("内容不能为空",{icon:2});
		}
//		if($(this).val()=="0"){
//			
//			$(this).addClass("errorLepuInfo");
//			layer.msg("输入内容不能为0",{icon:2,time:1000});
//		}else{
//			$(this).removeClass("errorLepuInfo");
//		}
	})
	
//	服用方式
	$(".usage span").on("click",function(){
		$(".usage span").removeClass("bg");
		$(this).addClass("bg");
	})
//	用法用量-确定
	$("#usageBtn").on("click",function(){
//		判断信息填写是否规范
		var flag=true;
		$(".EMR .usage_box input").each(function(index,item){
			if($(item).val()==""){
				$(item).addClass("errorLepuInfo");
			}
		})
		if($(".usage_box input[class*=errorLepuInfo]").length>0){
			var length=$(".usage_box input[class*=errorLepuInfo]").length
			flag=false;
			layer.msg("有"+length+"处填写不正确，请修改",{icon:2,time:1000});
		}else{
			flag=true;
		}
		if(flag){
	//		判断是在开药阶段还是在编辑阶段
			if($("#prescBtn").attr("onoff")=="true"){//开药
				addMedicine($(this));
			}
			if($("#prescBtn").attr("onoff")=="false"){//修改用法用量
				$(this).parent().parent().hide();
	//			初始化搜索药品页面样式
				$("#searchDrug").val("");
				$("#drugList").html("");
				$("#drugList>li").removeClass("backColor");
				
	//			修改后的信息渲染到页面
				var div1=nowObj.find("div[class=medicine_info]");
				var div2=nowObj.find("div[class=taking_info]");
				div1.find("p").eq(1).find("span").eq(0).html($("#medNum").val());
				div1.find("p").eq(1).find("span").eq(1).html($("#unit").html())
				div2.find("p").eq(0).find("span").eq(0).html($(".cycle").find("span[class*=bg]").html());//每晚
				div2.find("p").eq(0).find("span").eq(1).html($("#times").val());//3次
				div2.find("p").eq(1).find("span").html($("#each").val());//每次3
				
				div2.find("p").eq(2).html($(".usage span[class*=bg]").html());//修改用药方式
				div2.find("div[lepuemr-id=HR52_01_037_05]").html($(".usage span[class*=bg]").attr("value"));
				$(".EMRdata[lepuemr-id=Lepu_Medicine_TotalPrice]").html($("#medNum")*$(".EMRdata[lepuemr-id=HR53_01_037_04]").html());//计算单一药品总价
				$(".EMRdata[lepuemr-id=Lepu_Medicine_TotalPrice]")
			}
			$("#prescBtn").attr("onoff",false);
			calPresFee();
			$(".EMR .head").show();
			$(".EMR .main .content").show();
			$(".EMR .foot").show();
			$(".EMR .main").scrollTop(1100);
		}
		
	})
	
	
//	生活方式建议
	
	$("#lifestyle_btn").on("click",function(){
		$(".EMR .head").hide();
		setTop=ScrollTop;
		$(".EMR .main .content").hide();
		$(".EMR .foot").hide();
		$("#lifestyle").show();//弹出生活方式弹窗
		
	})
	
	$(".App li").on("click",function(){
		$(this).toggleClass("active");
		return false;
	})
	$("#confirm_lStyleBtn").on("click",function(){
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
		$(".EMR .main").scrollTop(setTop);
		var lifeStyleStr="";
		$("#lifestyle_item").remove();//清空原来内容，重新生成
		
		if($("#lifestyle_list li[class*=backColor]").size()>0||$(".App li[class*=active]").size()>0){
			lifeStyleStr+='<li class="item" style="padding-left: 0;padding-top:1rem;" id="lifestyle_item"><a href="javascript:;" class="modify_btn" onclick="mofifyLifestyle()">编辑</a><a href="javascript:;" class="delete_btn" onclick="deleteMedicine(this)">删除</a><div class="medicine_info" style="padding-left:0.75rem;">';
		}
		
		$("#lifestyle_list li[class*=backColor]").each(function(index,item){//添加选中建议
			lifeStyleStr+='<div class="medicine_name">'+$(item).html()+'</div>';
		})
		lifeStyleStr+='</div><ul class="wechat clearfix">';
		$(".App li[class*=active]").each(function(index,item){//添加选中App
			lifeStyleStr+='<li class="fl">'+item.innerHTML+'</li>';
		})
		lifeStyleStr+='</ul></li>';
		$(this).parent().hide();//隐藏弹窗
		
		$("#lifestyle_box").append(lifeStyleStr);
			
		
//		生成生活方式数据
		var LivingPrescription_Product="";

		$("#lifestyle_list li[class=backColor]").each(function(index,item){
			LivingPrescription_Product+=$(item).find("p").html()+","+$(item).find("span[class*=productPrice]").html()+",";
		})
		$(".EMRdata[lepuemr-id=Lepu_LivingPrescription_Product]").val(LivingPrescription_Product.substr(0,LivingPrescription_Product.length-1));
		var LivingPrescription_App="";
		$(".App li[class*=active]").each(function(index,item){
			LivingPrescription_App+=$(item).find("p").eq(0).html()+","+$(item).find("p").eq(0).attr("appNum")+",";
		})
		$(".EMRdata[lepuemr-id=Lepu_LivingPrescription_App]").val(LivingPrescription_App.substr(0,LivingPrescription_App.length-1));
	})
	$("#lifestyle .pubhead span").on("click",function(){
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
		$(".EMR .main").scrollTop(setTop);
	})
//	检查建议
	
//	检验项目
	$("#testBtn").on("click",function(){
		setTop=ScrollTop;
		$(".EMR .head").hide();
		$(".EMR .main .content").hide();
		$(".EMR .foot").hide();
		$("#pop_test").show();//弹出检验项目弹窗
		$("#pop_test ul").empty();
		$("#pop_test input").val("");
		
	})
	$("#confirm_testBtn").on("click",function(){
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
		checkSuggest("#pop_test","#test_info");
		$(".EMR .main").scrollTop(setTop);
//		保存数据
		var examStr="";
		$(".EMR #test_info li").each(function(index,item){
			examStr+=$(item).find("p").html()+",";
		})
		console.log(examStr)
		$(".EMR .EMRdata[lepuemr-id=HR51_96_301_02]").val(examStr.substr(0,examStr.length-1));
		
	})
	$("#pop_test .pubhead span").on("click",function(){
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
		$(".EMR .main").scrollTop(setTop);
	})
//	检查项目
	$("#checkBtn").on("click",function(){
		setTop=ScrollTop;
		$(".EMR .head").hide();
		$(".EMR .main .content").hide();
		$(".EMR .foot").hide();
		$("#pop_check").show();//弹出检查项目弹窗
		$("#pop_check ul").empty();
		$("#pop_check input").val("");
		
	})
	$("#confirm_checkBtn").on("click",function(){
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
		$(".EMR .main").scrollTop(setTop);
		checkSuggest("#pop_check","#check_info");
//		保存数据
		var examStr="";
		$(".EMR #check_info li").each(function(index,item){
			examStr+=$(item).find("p").html()+",";
		})
		$(".EMRdata[lepuemr-id=HR51_96_001_02]").val(examStr.substr(0,examStr.length-1));
	})
	$("#pop_check .pubhead span").on("click",function(){
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
		$(".EMR .main").scrollTop(setTop);
	})
	
	
//	$('.search_Examination').on('compositionstart', function(){
//	    $(this).prop('comStart', true);
////			    console.log('中文输入：开始');
//	}).on('compositionend', function(){
//	    $(this).prop('comStart', false);
////			    console.log('中文输入：结束');、
//	    return;
//	});
	$('.EMR .search_Examination').on("input",function(SearchType){
		if($(this).prop('comStart')) return; //中文输入过程中不截断
		var SearchKey=$.trim($(this).val());
		$(this).val(SearchKey);
		var SearchType=$(this).attr("SearchType");
		var optionHTML="";
		var This=this;
		if(SearchKey!=""){
			if(SearchKey.length>20){
				SearchKey=SearchKey.substring(0,20);
				$(this).val(SearchKey);
			}
			$.post("emr/clinicalExaminationSearch", {
				SearchKey:SearchKey,
				SearchType:SearchType
			}, function(data) {
				if(data.Status == 200){
					var ceList = data.ListInfo;
					$(This).parent().next().empty();
					for(var i=0;i<ceList.length;i++){
						optionHTML+="<li onclick='changeBgColor(this)'>" + ceList[i] + "</li>";
					}
					var fuzzyBox=$(This).parent().next();
					if(ceList.length>0){
						fuzzyBox.append(optionHTML);
					}else{
						fuzzyBox.append("<li>暂无数据，请重新搜索</li>");
					}
					fuzzyBox.show();
				}
			});
		}else{
			$(this).parent().next().hide();
		}
	}).on("compositionstart",function(){
		 $(this).prop('comStart', true);
////			    console.log('中文输入：开始');
	}).on("compositionend",function(){
		 $(this).prop('comStart', false);
////			    console.log('中文输入：结束');
	})
	
	
	
//	其他注意事项
	var otherArr=[];//存放选择的项
	$("#otherSelMoudle").on("click",function(){
		setTop=ScrollTop;
		$(".EMR .head").hide();
		$(".EMR .main .content").hide();
		$(".EMR .foot").hide();
		
		$("#otherSel_box").show();
			//其他注意事项（模板）
//			$.post("emr/recordTemplateList", {
//			}, function(data) {
//				if(data.Status == 200){
//					var templateList = data.ListInfo;
//					$("#otherSel_list").empty();
//					var templateHTML="";
//					for(var i=0;i<templateList.length;i++){
//						templateHTML+='<li id="'+templateList[i].MedicalRecordTemplateID+'">'+templateList[i].MedicalRecordTemplateName+'<input type="hidden" value="'+templateList[i].MedicalRecordTemplateContent+'"></li>';
//					}
//					$("#otherSel_list").append(templateHTML);
//				}
//		});
	})
	
	$("#otherSel_list").on("click",function(event){
		if($(event.target)[0].nodeName=="LI"){
			$(event.target).siblings().removeClass("backColor");
			$(event.target).toggleClass("backColor");
		}
	})
	
	$("#otherSelBtn").on("click",function(){//点击确定
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
		$("#otherSel_box").hide();
		$(".EMR .main").scrollTop(setTop);
		var str="";
		var ele=$("#otherSel_list").find("li[class*=backColor]");
		$(ele).each(function(index,item){
			str+=$(item).find("input").eq(0).val();
		});
		$("#other_notes").val(str);
		checkTextNum($("#otherNum"),$("#other_notes"),3000);
	})
	$("#other_notes").on("input",function(){
		checkTextNum($("#otherNum"),$("#other_notes"),3000);
	})
	$("#otherSel_box .pubhead span").on("click",function(){
		$(".EMR .head").show();
		$(".EMR .main .content").show();
		$(".EMR .foot").show();
		$(".EMR .main").scrollTop(setTop);
	})
//	排除表情
	var re=/\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|\ud83d[\u2000-\u2fff]/g;
	$("#other_notes").on("blur",function(){
		if($(this).val()!==""){
			if(re.test($(this).val())){
				$(this).parent().addClass("errorLepuInfo");
				layer.msg("请不要输入非法字符",{icon:2,time:1000});
			}else{
				$(this).parent().removeClass("errorLepuInfo");
			}
		}
	})
	
	//历史就诊记录	点击按钮切换内容
	$(".EMRhistory .type_list>a").on("click",function(){
		$(".EMRhistory .type_list>a").removeClass("checked_tab");
		$(this).addClass("checked_tab");
		$(".EMRhistory .content>ul").hide();
		$(".EMRhistory .content>ul").eq($(this).index()).show();
	})
	
})