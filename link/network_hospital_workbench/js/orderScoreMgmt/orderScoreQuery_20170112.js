$(function(){
	showAreaDetail();
	$("#getOrderScore").on("click",function(){
		getAreaDetail();
//		$("#order_form").submit();
	})
	function getAreaDetail(){
		var AreaID="";
		var AreaName="";
		if($("#loc_town").val()!=""){
			AreaID=$("#loc_town").val();
			AreaName=$('#loc_province').find('option:selected').text()+","+$('#loc_city').find('option:selected').text()+","+$('#loc_town').find('option:selected').text();
		}else if($("#loc_city").val()!=""){
			AreaID=$("#loc_city").val();
			AreaName=$('#loc_province').find('option:selected').text()+","+$('#loc_city').find('option:selected').text();
		}else{
			AreaID=$("#loc_province").val();
			AreaName=$('#loc_province').find('option:selected').text();
		}
		$("#AreaID").val(AreaID);
		$("#AreaName").val(AreaName);
		$("#ArgProvinceID").val($("#loc_province").val());
		$("#ArgCityID").val($("#loc_city").val());
		$("#ArgTownID").val($("#loc_town").val());
	}
//	省市区回显
	function showAreaDetail(){
		$("#loc_province").val($("#ArgProvinceID").val());
		$("#loc_province").change();
		$("#loc_city").val($("#ArgCityID").val());
		$("#loc_city").change();
		$("#loc_town").val($("#ArgTownID").val());
		$("#loc_town").change();
	}
//	查看总分详情
	$(".getScoreDetail").on("click",function(){
		$(".totalScore").css("margin-top","0px");
		var MT=parseFloat($(".totalScore").css("margin-top"))+$(window).scrollTop()-200;
		$(".totalScore").show().html("").css("margin-top",MT+"px");
		$(".mask").show();
//		var json=JSON.parse($(this).attr("data-score"));
//		患者标签得分
		var patientScore=0;
//		for(var attr in json){
//			if(attr.substring(0,4)=="Ill_"){
//				patientScore+=parseInt(json[attr]);
//			}
//		}
		var CSE_Score=0;//人工评分总分
		var MR_Score=0;//病历得分
//		if(json.QA_MR_Option!=""){
//			MR_Score=json.QA_MRScore;
//		}else{//未质检
//			MR_Score=json.CSE_MRScore;
//		}
		var FirstVisitScore=0;//初复诊得分
//		if(json.QA_FirstVisit_Option!=""){
//			FirstVisitScore=json.QA_FirstVisitScore;
//		}else{
//			FirstVisitScore=json.CSE_FirstVisitScore;
//		}
//		CSE_Score+=MR_Score+FirstVisitScore+parseInt(json.CSE_CallbackScore)+parseInt(json.CSE_SatisficationScore);
//		系统评分
		var systemScore=0;
//		systemScore+=parseInt(json.BaseScore)+patientScore+parseInt(json.RecipeScore)+parseInt(json.EavluationScroe);
//		var html='<h2 class="head">总分:<span>'+json.TotalScore+'</span><span class="close">×</span></h2>'
//			+'<div class="scoreList">'
//				+'<div class="item" style="margin-right: 7%;">'
//					+'<h3>系统评分：'+systemScore+'分</h3>'
//					+'<ul class="scoreDetail">'
//						+'<li>'
//							+'<span>默认订单基础分：<span class="score">'+json.BaseScore+'分</span></span>'
//						+'</li>'
//						+'<li>'
//							+'<span>患者标签：<span class="score">'+patientScore+'分</span></span>'
//							+'<p>';
//							if(json.Ill_GXY=="3"){
//								html+='高血压'+'、';
//							}
//							if(json.Ill_XZYC=="3"){
//								html+='血脂异常'+'、';
//							}
//							if(json.Ill_TNB=="2"){
//								html+='糖尿病'+'、';
//							}
//							if(json.Ill_XLSC=="1"){
//								html+='心律失常'+'、';
//							}
//							if(json.Ill_GXBDQZ=="2"){
//								html+='冠心病：待确诊？'+'、';
//							}
//							if(json.Ill_GXBBSZL=="2"){
//								html+='冠心病：保守治疗'+'、';
//							}
//							if(json.Ill_GXBXDQ=="1"){
//								html+='冠心病：需搭桥'+'、';
//							}
//							if(json.Ill_GXBXZJ=="10"){
//								html+='冠心病：需支架'+'、';
//							}
//							if(json.Ill_GXBSH=="6"){
//								html+='冠心病：术后'+'、';
//							}
//							html=html.substring(0,html.length-1);
//							html+='</p>';
//						html+='</li>'
//						+'<li>'
//							+'<span>医生开具处方：<span class="score">'+json.RecipeScore+'分</span></span>'
//							+'<p>';
//						if(json.RecipeScore=="0"){
//							html+='无处方';
//						}else if(json.RecipeScore=="3"){
//							html+='有处方、无乐普药品';
//						}else if(json.RecipeScore=="5"){
//							html+='有处方、有乐普药品';
//						}
//						html+='</p>'
//						+'</li>'
//						+'<li>'
//							+'<span>订单评价：<span class="score">'+json.EavluationScroe+'分</span></span>'
//							+'<p>';
//						if(json.EavluationScroe=="0"){
//							html+='合格';
//						}else if(json.EavluationScroe=="-4"){
//							html+='有错误';
//						}
//						html+='</p>'
//						+'</li>'
//					+'</ul>'
//				+'</div>'
//				+'<div class="item">'
//					+'<h3>人工评分：'+CSE_Score+'分</h3>'
//					+'<ul class="scoreDetail">'
//						+'<li>'
//							+'<span>病历情况：<span class="score">'+MR_Score+'分</span></span>'
//							+'<p>';
//						var MR_option="";
//						if(json.QA_MR_Option!=""){//已质检
//							MR_option=json.QA_MR_Option;
//						}else{//待质检
//							MR_option=json.CSE_MR_Option;
//						}
//						if(MR_option=="3"){
//							html+='无病历扫描件';
//						}else if(MR_option=="2"){
//							html+='有病历扫描件，非一年内';
//						}else if(MR_option=="1"){
//							html+='有病历扫描件，一年内';
//						}
//						html+='</p>'
//						+'</li>'
//						+'<li>'
//							+'<span>复诊情况：<span class="score">'+FirstVisitScore+'分</span></span>'
//							+'<p>';
//						var FirstVisit_Option="";
//						if(json.QA_FirstVisit_Option!=""){
//							FirstVisit_Option=json.QA_FirstVisit_Option;
//						}else{
//							FirstVisit_Option=json.CSE_FirstVisit_Option;
//						}
//						if(FirstVisit_Option=="1"){
//							html+='初诊';
//						}else if(FirstVisit_Option=="2"){
//							html+='复诊';
//						}
//						html+='</p>'
//						+'</li>'
//						+'<li>'
//							+'<span>回访情况：<span class="score">'+json.CSE_CallbackScore+'分</span></span>'
//							+'<p>';
//						if(json.CSE_Callback_Option=="1"){
//							html+='完成回访';
//						}
//						if(json.CSE_Callback_Option=="2"){
//							html+='回访中断';
//						}
//						if(json.CSE_Callback_Option=="3"){
//							html+='未接通';
//						}
//						if(json.CSE_Callback_Option=="4"){
//							html+='停机';
//						}
//						if(json.CSE_Callback_Option=="5"){
//							html+='空号';
//						}
//						if(json.CSE_Callback_Option=="6"){
//							html+='电话信息错误';
//						}
//						if(json.CSE_Callback_Option=="7"){
//							html+='明确拒绝回访';
//						}
//						html+='</p>'
//						+'</li>'
//						+'<li>'
//							+'<span>满意情况：<span class="score">'+json.CSE_SatisficationScore+'分</span></span>'
//							+'<p>';
//						if(json.CSE_Satisfication_Option=="1"){
//							html+='满意';
//						}
//						if(json.CSE_Satisfication_Option=="2"){
//							html+='一般';
//						}
//						if(json.CSE_Satisfication_Option=="3"){
//							html+='对医生不满意';
//						}
//						if(json.CSE_Satisfication_Option=="4"){
//							html+='对陪诊不满意';
//						}
//						if(json.CSE_Satisfication_Option=="5"){
//							html+='其他';
//						}
//						html+='</p>'
//						+'</li>'
//						+'<li>'
//							+'<span>诊断标签评定：</span>'
//							+'<p>';
//						if(json.QA_Diagnose_Option=="1"){
//							html+='诊断标签有错';
//						}
//						if(json.QA_Diagnose_Option=="2"){
//							html+='诊断标签无错';
//						}
//						html+='</p>'
//						+'</li>'
//					+'</ul>'
//				+'</div>'
//				+'<div class="item note">'
//					+'<h3>备注：</h3>'
//					+'<p>'+json.CSE_Remark+'</p>'
//				+'</div>'
//			+'</div>';
		var html='<h2 class="head">总分:<span>27</span>'
			+'<span class="close">×</span></h2>'
			+'<div class="scoreList">'
				+'<div class="item" style="margin-right: 20px;">'
					+'<h3>系统评分：30分</h3>'
					+'<ul class="scoreDetail">'
						+'<li>'
							+'<span>默认订单基础分：'
							+'<span class="score">10分</span></span>'
						+'</li>'
						+'<li>'
							+'<span>患者标签：<span class="score">19分</span></span>'
							+'<p>高血压、血脂异常、糖尿病、心律失常、冠心病：需支架</p>'
						+'</li>'
						+'<li>'
							+'<span>医生开具处方：'
							+'<span class="score">5分</span></span>'
							+'<p>有处方、有乐普药品</p>'
						+'</li>'
						+'<li>'
							+'<span>订单评价：<span class="score">-4分</span></span>'
							+'<p>有错误</p>'
						+'</li>'
					+'</ul>'
				+'</div>'
				+'<div class="item">'
					+'<h3>人工评分：-3分</h3>'
					+'<ul class="scoreDetail">'
						+'<li>'
							+'<span>病历情况：<span class="score">0分</span></span>'
							+'<p>有病历扫描件，一年内</p>'
						+'</li>'
						+'<li>'
							+'<span>复诊情况：<span class="score">10分</span></span>'
							+'<p>复诊</p>'
						+'</li>'
						+'<li>'
							+'<span>回访情况：<span class="score">5分</span></span>'
							+'<p>空号</p>'
						+'</li>'
						+'<li>'
							+'<span>满意情况：<span class="score">2分</span></span>'
							+'<p>对陪诊不满意</p>'
						+'</li>'
						+'<li>'
							+'<span>诊断标签评定：</span>'
							+'<p>诊断标签有错</p>'
						+'</li>'
					+'</ul>'
				+'</div>'
				+'<div class="item note">'
					+'<h3>备注：</h3>'
					+'<p>呵呵呵呵呵呵呵呵呵呵，呵呵呵呵呵呵呵呵呵呵； 呵呵呵呵，呵呵呵。</p>'
				+'</div>'
			+'</div> '
		$(".totalScore").append(html);
		showScoreColor();
		$(".close").on("click",function(){//关闭弹窗
			$(this).parent().parent().hide();
			$(".mask").hide();
		})
	})
//	质检评定错误详情
	$(".CSE_Check").on("click",function(){
		$(".checkDetail").css("margin-top","0px");
		var MT=parseFloat($(".checkDetail").css("margin-top"))+$(window).scrollTop()-200;
		$(".checkDetail").show().css("margin-top",MT+"px");
		$(".mask").show();
		var json=JSON.parse($(this).attr("data-check"));
		var CSE_MR="";
		if(json.CSE_MR_Option=="1"){
			CSE_MR="有病历扫描件，一年内";
		}
		if(json.CSE_MR_Option=="2"){
			CSE_MR="有病历扫描件，非一年内";
		}
		if(json.CSE_MR_Option=="3"){
			CSE_MR="无病历扫描件";
		}
		var CSE_FirstVisit="";
		if(json.CSE_FirstVisit_Option=="1"){
			CSE_FirstVisit="初诊";
		}
		if(json.CSE_FirstVisit_Option=="2"){
			CSE_FirstVisit="复诊";
		}
		var QA_MR="";
		if(json.QA_MR_Option=="1"){
			QA_MR="有病历扫描件，一年内";
		}
		if(json.QA_MR_Option=="2"){
			QA_MR="有病历扫描件，非一年内";
		}
		if(json.QA_MR_Option=="3"){
			QA_MR="无病历扫描件";
		}
		var QA_FirstVisit="";
		if(json.QA_FirstVisit_Option=="1"){
			QA_FirstVisit="初诊";
		}
		if(json.QA_FirstVisit_Option=="2"){
			QA_FirstVisit="复诊";
		}
		$(".CSE_MR").html(CSE_MR);
		$(".CSE_FirstVisit").html(CSE_FirstVisit);
		$(".QA_MR").html(QA_MR);
		$(".QA_FirstVisit").html(QA_FirstVisit);
	})
	
//	诊断标签评定
	$(".DiagnoseResult").on("click",function(){
		$(".diagnoseDetail").css("margin-top","0px");
		var MT=parseFloat($(".diagnoseDetail").css("margin-top"))+$(window).scrollTop();
		$(".diagnoseDetail").show().css("margin-top",MT+"px");
		$(".mask").show();
		var note=$(this).attr("data-error");
		$(".diagnoseDetail .note").html(note);
	})
	$(".close").on("click",function(){//关闭弹窗
		$(this).parent().parent().hide();
		$(".mask").hide();
	})
	function showScoreColor(){
		$(".scoreDetail span.score").each(function(index,item){
			var score=parseInt($(this).html());
			if(score>0){
				$(this).css("color","red");
			}else if(score<0){
				$(this).css("color","rgb(18,229,18)");
			}else{
				$(this).css("color","#000");
			}
		})
	}
})