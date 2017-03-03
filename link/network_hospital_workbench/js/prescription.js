$(".analyInp").on("click",function(){
	if(!d5221.value) {
		alert("请输入就诊开始时间");
		return;
	}
	if(!d5222.value) {
		alert("请输入就诊结束时间");
		return;
	}
	
	$("#ProvinceIDData").val($('#loc_province').val());
	$("#CityIDData").val($('#loc_city').val());
	$("#TownIDData").val($('#loc_town').val());
	
	if($("#loc_province").val()==""){
		$("#AreaID").val("");
	}else{
		if($("#loc_province").val()!=""){
			$("#AreaID1").val($('#loc_province').val());
		}
		if($("#loc_city").val()!=""){
			$("#AreaID1").val($('#loc_city').val());
		}
		if($("#loc_town").val()!=""){
			$("#AreaID1").val($('#loc_town').val());
		}
	}
	
	
	
	layer.load(0, {shade: false});
	$("form").submit();
})




var hospital=$("#HospitalID");
//	$.ajax({
//		url: 'prestat/getHospitalListAjax',
//		type: 'POST',
//		dataType: 'json',
//		data: {param1: 'value1'},
//		success:function(data){
//			if(data.Status == 200){
//				var option = "<option value=''>请选择</option>";
//				data.ListInfo.HospitalList.forEach(function(item){
//					option += "<option value='" + item.HospitalID + "'>" + item.HospitalName + "</option>";
//				});
//				hospital.empty().append(option);
//				var saveID=$("#saveID").val();
//				if(!!saveID){
//					hospital.val(saveID).change();					
//				}
//				
//			}else{
//				layer.msg(data.Message,{icon:2});
//			}
//		},
//		error:function(){
//			layer.msg("获取医院信息失败",{icon:2});
//		}
//	});	
	hospital.change(function(){
		var HospitalID=this.value;
		var result=!!this.value?$(this).find("option:selected").text():"";
		$(this).next().val(result);
		$.ajax({
			url: 'prestat/getNHDoctorListAjax',
			type: 'POST',
			dataType: 'json',
			data: {HospitalID: HospitalID},
			success:function(data){
				if(data.Status == 200){
					var option = "<option value=''>请选择</option>";
					data.ListInfo.forEach(function(item){
						option += "<option value='" + item.DoctorID + "'>" + item.DoctorName + "</option>";
					});	
					
					var doctorID=$("#DoctorID");
					doctorID.change(function(){
						var result=!!this.value?$(this).find("option:selected").text():"";
						$(this).next().val(result);
					});
					var select=doctorID.empty().append(option).prev().val();
					if(!!select){
						doctorID.val(select);
					}
					doctorID.change();
				}else{
					layer.msg(data.Message,{icon:2});
				}
			},
			error:function(){
				layer.msg("获取医院详细信息失败",{icon:2});
			},
			beforeSend:function(){
				if(!HospitalID){
					$("#DoctorID").empty().append("<option value=''>请选择</option>").val("").next().val("");
					return false;
				}else{
					return true;
				}
			}
		});
	});
	
//	查看处方
	$(".getRecipeDetail").on("click",function(){
//		var OrderNumber=$(this).parent().parent().children(0).html();
//		$.ajax({
//			url:"recipemt/getRecipe",
//			type:"POST",
//			data:{OrderNumber:OrderNumber},
//			dataType:"json",
//			success:function(data){
//				if(data.Status==200 && !!data.DetailInfo.OrderNumber){
//					displayRecipeDetail(data.DetailInfo);
					displayRecipeDetail();
//				}else{
//					layer.msg("处方不存在",{icon:2});
//				}
//			},
//			error:function(data){
//				layer.msg("获取处方失败",{icon:2});
//			}
//		})
	})
//	显示处方详情
	function displayRecipeDetail(data){
		var data={
			PatientName:"aaa",
			Gender:"男",
			Age:"20",
			OrderNumber:"A201706240001",
			Department:"诊室",
			ServiceInstitutionName:"北医三院",	
			DiagnosisResult:["糖尿病","冠心病"],
			RecipeList:[
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				{
					"HR53_01_002":"阿托伐他汀钙",
					Lepu_Medicine_Specifications:"100mg",
					HR53_01_037_04:"",
					Lepu_Medicine_Unit:"瓶",
					Lepu_Medicine_TotalPrice:"120",
					route:"口服",
					HR52_01_013:"每日两次",
					HR52_01_037_01:"每次1片"
				},
				
			],
			RecipeCount:13
		}
		var html='';
		if(data.RecipeCount>0){
			var itemNum=Math.ceil(data.RecipeCount / 5);
			for(var i=0;i<itemNum;i++){
				var startNum=i*5+1;
				var endNum=(i+1)*5;
				html+='<div class="bs_pres_item fl">'
						+'<header class="pres_head">'
							+'<div class="top">'
								+'<span class="type">普通药处方</span>'
								+'<div class="title">'
									+'<img src="../../images/logoRecipe.png" />'
									if(itemNum==1){
										html+='<h3>乐普心脑血管网络医院处方笺<strong></strong></h3>';
									}else{
										html+='<h3>乐普心脑血管网络医院处方笺-<strong>'+(i+1)+'</strong></h3>';
									}
								html+='</div>'
								+'<span class="closeRecipe" onclick="closeBoxShadow()">关闭</span>'
							+'</div>'
							+'<ul class="brief_info clearfix">'
								+'<li class="fl w180">姓名：'
									+'<span>'+data.PatientName+'</span>'
								+'</li>'
								+'<li class="fl w180">性别：'
									+'<span>'+data.Gender+'</span>'
								+'</li>'
								+'<li class="fl w180">年龄：'
									+'<span>'+data.Age+'</span>'
								+'</li></br></br>'
								+'<li class="fl w180">No.';
								if(itemNum==1){
									html+='<span>'+data.OrderNumber+'</span>';
								}else{
									html+='<span>'+data.OrderNumber+'-'+(i+1)+'</span>'
								}
								html+='</li>'
								+'<li class="fl w180">科别：'
									+'<span>'+data.Department+'</span>'
								+'</li>'
								
								+'<li class="fl">就诊药店：'
									+'<span>'+data.ServiceInstitutionName+'</span>'
								+'</li>'
							+'</ul>'
						+'</header>'
						+'<div class="pres_main clearfix">'
							+'<div class="diagnosis_result fl">'
								+'<h4>初步诊断：</h4>'
								+'<ul>';
				if(data.DiagnosisResult.length>0){
					for(var m=0;m<data.DiagnosisResult.length;m++){
						if(data.DiagnosisResult[m].indexOf(",")==-1){
							html+='<li>'+data.DiagnosisResult[m]+'</li>';
						}else{
							var otherArr=data.DiagnosisResult[m].split(",");
							for(var k=0;k<otherArr.length;k++){
								html+='<li>'+otherArr[k]+'</li>';
							}
						}
					}
				}
				html+='</ul>'
						+'</div>'
						+'<div class="medicine fl">'
						+'<h4>Rp:</h4>'
						+'<ul class="medicine_info">';
				for(var j=startNum;j<=endNum;j++){
					if(j<=data.RecipeCount){
						html+='<li class="item clearfix">'
							+'<span class="num fl">'+j+'.</span>'
							+'<div class="detail fl">'
								+'<div class="medicine_detail">'
									+'<span>'+data.RecipeList[j-1].HR53_01_002+'</span>'
									+'<span>'+data.RecipeList[j-1].Lepu_Medicine_Specifications+'</span>'
									+'<span>'+data.RecipeList[j-1].HR53_01_037_04+data.RecipeList[j-1].Lepu_Medicine_Unit+'</span>'
									+'<span>¥'+data.RecipeList[j-1].Lepu_Medicine_TotalPrice+'</span></div>'
								+'<div class="usage_detail">'
									+'<span>用法用量：</span>'
									+'<span>'+data.RecipeList[j-1].route+'</span>'
									+'<span>'+data.RecipeList[j-1].HR52_01_013+'</span>'
									+'<span>'+data.RecipeList[j-1].HR52_01_037_01+'</span>'			
								+'</div>'
							+'</div>'
						+'</li>';
					}
				}
				html+='</ul>'
							+'<dl class="doctor">'
								+'<dt class="fl">处方医师：</dt>'
								+'<dd class="fl">'
									+'<p>'+data.DoctorName+'</p>'
									+'<p>乐普网络医院</p>'
									+'<p>'+data.RecipeDate+'</p>'
								+'</dd>'
								+'<dt class="fl">审核药师：</dt>'
								+'<dd class="fl">'
									+'<p>'+data.AuditorName+'</p>'
									+'<p>乐普网络医院</p>'
									+'<p>'+data.RecipeDate+'</p>'
								+'</dd>'
							+'</dl>'
						+'</div>'
					+'</div>'
					+'<footer class="pres_foot">'
						+'<p class="note">注意：处方限于本院及接诊药店配送，自行下载配药不具有处方效力，为确保用药安全，该方案3日内有效。</p>'
						+'<p class="total_price">药品总计:'
							+'<span>¥'+data.TotalPrice+'</span>'
						+'</p>'
					+'</footer>'
				+'</div>';
			}
			$(".boxshadow_prescription").empty().append(html);
			$(".boxshadow").show();
			var width=$(".boxshadow_prescription .bs_pres_item").width()+100;
			if(itemNum>1){
				$(".boxshadow_prescription,.opacity_bg").css("width",width*itemNum);
			}
		}else{
			html+='<div class="bs_pres_item fl">'
				+'<header class="pres_head">'
					+'<div class="top">'
						+'<span class="type">普通药处方</span>'
						+'<div class="title">'
							+'<img src="../../../images/logoRecipe.png" />'
							+'<h3>乐普心脑血管网络医院处方笺<strong></strong></h3>'
						+'</div>'
						+'<span class="closeRecipe" onclick=$(".boxshadow").hide()>关闭</span>'
					+'</div>'
					+'<ul class="brief_info clearfix">'
						+'<li class="fl w180">姓名：'
							+'<span>'+data.PatientName+'</span>'
						+'</li>'
						+'<li class="fl w180">性别：'
							+'<span>'+data.Gender+'</span>'
						+'</li>'
						+'<li class="fl w180">年龄：'
							+'<span>'+data.Age+'</span>'
						+'</li></br></br>'
						+'<li class="fl w180">No.'
							+'<span>'+data.OrderNumber+'</span>'
						+'</li>'
						+'<li class="fl w180">科别：'
							+'<span>'+data.Department+'</span>'
						+'</li>'
						+'<li class="fl">就诊药店：'
							+'<span>'+data.ServiceInstitutionName+'</span>'
						+'</li>'
					+'</ul>'
				+'</header>'
				+'<div class="pres_main clearfix">'
					+'<div class="diagnosis_result fl">'
						+'<h4>初步诊断：</h4>'
						+'<ul>';
			if(data.DiagnosisResult.length>0){
				for(var m=0;m<data.DiagnosisResult.length;m++){
					if(data.DiagnosisResult[m].indexOf(",")==-1){
						html+='<li>'+data.DiagnosisResult[m]+'</li>';
					}else{
						var otherArr=data.DiagnosisResult[m].split(",");
						for(var k=0;k<otherArr.length;k++){
							html+='<li>'+otherArr[k]+'</li>';
						}
					}
				}
			}
			html+='</ul>'
					+'</div>'
					+'<div class="medicine fl">'
					+'<h4>Rp:</h4>'
					+'<ul class="medicine_info"></ul>'
						+'<dl class="doctor">'
							+'<dt class="fl">处方医师：</dt>'
							+'<dd class="fl">'
								+'<p>'+data.DoctorName+'</p>'
								+'<p>乐普网络医院</p>'
								+'<p>'+data.RecipeDate+'</p>'
							+'</dd>'
							+'<dt class="fl">审核药师：</dt>'
							+'<dd class="fl">'
								+'<p>'+data.AuditorName+'</p>'
								+'<p>乐普网络医院</p>'
								+'<p>'+data.RecipeDate+'</p>'
							+'</dd>'
						+'</dl>'
					+'</div>'
				+'</div>'
				+'<footer class="pres_foot">'
					+'<p class="note">注意：处方限于本院及接诊药店配送，自行下载配药不具有处方效力，为确保用药安全，该方案3日内有效。</p>'
					+'<p class="total_price">药品总计:'
						+'<span>¥0</span>'
					+'</p>'
				+'</footer>'
			+'</div>';
			$(".boxshadow_prescription").empty().append(html);
			$(".boxshadow").show();
		}
		$(".diagnosis_result ul").each(function(index,item){
			if($(this).find("li").size()>10){
				var length=$(this).find("li").size();
				for(var l=10;l<length;l++){
					$(this).find("li").eq(10).remove();
				}
			}
		})
	}
	
	function closeBoxShadow(){
		$(".boxshadow").hide();
		$("boxshadow,.boxshadow_prescription,.opacity_bg").css("width","100%");
//		var width=$(".boxshadow_prescription .bs_pres_item").width()+100;
//		if(itemNum>1){
//			$(".boxshadow_prescription,.opacity_bg").css("width",width*itemNum);
//		}
	}
	
	$(".PharmacyUl").hide();
	$(".PharmacyName").on("input",function(){
		$.ajax({   
		     url:'orderstat/fuzzySearchInstitution',   
		     type:'post',   
		     data:{"SearchName":$(".PharmacyName").val()},
		     async : false, //默认为true 异步      
		     success:function(data){
		    	 if(data.ListInfo == undefined ||data.ListInfo.length == 0){
		    		 $(".PharmacyUl").hide();
		    	 }else{
		    		 $(".PharmacyUl").show();
		    		 $(".PharmacyUl").html("");
		    		 for(var i = 0;i<data.ListInfo.length;i++){
			    		 var li = $("<li>"+data.ListInfo[i].InstitutionName+"</li>");
			    		 $(li).mouseover(function(){
			    			$(this).css({
				    						"background":"#ccc",
				    						"cursor":"pointer"
			    						});
				    			
			    		 });
			    		 
			    		$(li).mouseout(function(){
				    		$(this).css("background","");
				    	});
			    		
			    		
			    		 $(li).on("click",function(ev){
			    			 $(".PharmacyName").val($(this).html());
			    			 $(".PharmacyUl").hide();
			    			 return false
			    		 });
		    			 $(".PharmacyUl").append(li);
		    			 
		    			 $(window).click(function(){
			    			 $(".PharmacyUl").hide();
			    		 });
			    	 }
		    	 }
		     }
		})
	})