<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/WEB-INF/authTag.tld" prefix="auth"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String paramMap = String.valueOf(request.getAttribute("paramMap"));
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>网络医院医生列表</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="jquery-easyui-1.4.3/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jquery-easyui-1.4.3/easyui-lang-zh_CN.js"></script>
	<link href="jquery-easyui-1.4.3/themes/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="jquery-easyui-1.4.3/themes/icon.css" rel="stylesheet" type="text/css" />
    
	<link href="jquery-easyui-1.4.3/themes/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="jquery-easyui-1.4.3/themes/icon.css" rel="stylesheet" type="text/css" />
    
	<link rel="stylesheet" href="css/osms_base_161101.css">
	
	<script type="text/javascript" src="js/common/common.js"></script>
	
	 <!-- 弹窗  -->
    <script type="text/javascript" src="js/alert.js"></script>        
    <link rel="stylesheet" href="css/alert_161101.css" />	

	
	<!-- 实现三级联动 -->
	<script type="text/javascript" src="js/common2/area.js"></script>
	<script type="text/javascript" src="js/common2/location.js"></script>
	<script type="text/javascript" src="js/common2/select2.js"></script>
	<script type="text/javascript" src="js/common2/select2_locale_zh-CN.js"></script>
	<link href="js/common2/select2.css" rel="stylesheet"/>
	
	<script type="text/javascript" src="js/common/searchAutoComplete.js"></script>
	<script type="text/javascript" src="js/common/pop.js"></script>
	
	<style type="text/css">
		.dropDiv {
		    background-color: #FFFFFF;
		    position: absolute;
		    z-index: 10000;
		    display: none;
		    cursor: hand;
		    border:1px solid #7F9DB9;
		}
		
		.dropDiv .jhover {
		    background-color: #D5E2FF;
		}
		.dropDiv .list {
		    float:left;
		    width:100%;
		}
		.dropDiv .word {
			float:left;
		}
		
		.dropDiv .view {
			float:right;
			color: gray;
			text-align: right;
			font-size: 10pt;
		}
		.data li{width:300px; margin:5px 0;}
		.data li span{width:100px;}
		
		
	   .bg{
			 background: #000 none repeat scroll 0 0;
		    display: none;
		    left: 0;
		    opacity: 0.7;
		    position: absolute;
		    top: 0;
		}
	   .popbox{
	  	  width: 800px;
		  background: #fff;
		  border: 1px solid #79a8cd;
		  /* position: relative; */
		  position: absolute;
		  left: 50%;
		  margin-left: -400px;
		  top: 200px;
		  z-index: 11;
		  display: none;
		  height: auto;
		}
		.popbox .pop_title{
			
		    background:#337aB7;
		    padding:10px 15px;
		    font-size:16px;
		    color:#fff;
		}
		.popbox .close{
		    position:absolute;
		    transform:rotate(45deg);
		    font-size:30px;
		    right:0;
		    top:0px;
		    cursor:pointer;
		    width:30px;height:30px;
		    border-radius:15px;
		}
		.popbox .btn{
			  margin-top: 132px;
  			margin-left: 78px;
		}
		.m-input-show input,.m-input-show select{
			height: 30px;
			line-height: 30px;
			outline: none;
			text-indent: 5px;
		}
		.m-input-show select{
			width:80px;
		}
		.m-input h2 {
			text-align:center;
			color:#3d5055;
			padding:10px;
		}
		.m-bar {
			height:1px;
			border-bottom:1px solid #9a9a9a;
			margin:20px 0;
		}
		.m-input-show {
			padding:5px 20px;
		}
		.m-info-list{
			padding-bottom:30px;
		}
		.m-info-list ul li{
			padding:10px 10px;
			width:100px;
			text-align:center;
			float:left;
		}
		.none {
			display:none;
		}
		.m-input-show .u-btn-style {
			border:1px solid #9c9c9c;
			background: #337aB7;
			border-radius:5px;
			padding:0 10px;
			border: 1px solid #2268a4;
			color: #fff;
			cursor: pointer;
			font-family: 微软雅黑;
			vertical-align: middle;
		}
		.m-info-list ul {
			padding: 0 20px;
			overflow:hidden;
		}
		.m-info-list {
			font-size:16px;
		}
		.u-original, .u-dis, .u-price{
		   width:138px;
		}
		li.integralBox {
			width:auto;
		}
	</style>
	<script type="text/javascript">
	$(document).ready(function() {
		
	    var dataObj = eval(<%=paramMap%>);
		$("#DoctorName").val(dataObj.DoctorName);
		$("#HospitalID").val(dataObj.HospitalID);
		$("#HospitalName").val(dataObj.HospitalName);
		$("#MobilePhone").val(dataObj.MobilePhone);
		enterKeydown("query");
		getHospitalList();
		
	});
	function showPageData(pageNum){
		$("#fm").attr("action","nhdoctor/getNHDoctorList?pageIndex="+pageNum);
		fm.submit();
	}
	function doGetNHDoctorList(){
		var getPhone = $.trim($("#MobilePhone").val());
		if (!!getPhone) {
			var str = /^\d{11}$/;
			var telflag = str.test(getPhone);
	        if(!telflag){
	            alert("您的手机号码有误，请重新填写");
	            return false;
	        }
		}		
		$("#fm").submit();
	}
	
	function getHospitalList(){		
		$.post("nhdoctor/getHospitalListAjax", {
			r:Math.random()
		}, function(data) {			
			var listInfo = data.ListInfo.HospitalList;
			/* $("#HospitalID").append("<option value=''>---请选择---</option>");
			for(var i=0; i<listInfo.length; i++){
				$("#HospitalID").append("<option value='" + listInfo[i].HospitalID + "'>" + listInfo[i].HospitalName + "</option>");
			} */
			
			var html = "<option value=''>---请选择---</option>";	
			 var hid = '${HospitalID}';		 					
			if (listInfo) {
				for(var i=0; i<listInfo.length; i++){
					if (hid == listInfo[i].HospitalID) {
						html += "<option value='" + listInfo[i].HospitalID + "' selected>" + listInfo[i].HospitalName + "</option>";
					} else {
						html += "<option value='" + listInfo[i].HospitalID + "'>" + listInfo[i].HospitalName + "</option>";	
					}			 										
				}
			}
			$("#HospitalID").html(html);
			
			
		});
	}	
	
	
	</script>
  </head>
  
  <body>
   <div class="container">
		<div class="title">医生列表</div>
		<form action="nhdoctor/getNHDoctorList" method="post" id="fm" name="fm">
		<ul class="cont clearfix">
			<li>医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：
				<select name="HospitalID" id="HospitalID" class="easyui-validatebox" >
					
				</select>
				
			</li>
			
			<li>医生姓名：<input type="text" id="DoctorName" name="DoctorName"></li>
			<li>&nbsp;&nbsp;手机号：
			    <input type="text" id="MobilePhone" name="MobilePhone" onblur="this.value=this.value.trim();"></li>
		</ul>
		</form>
		<div class="btn">
			<a href="javascript:void(0)"><input type="button" id="query" value="查询" onclick="doGetNHDoctorList()"></a>
			
		</div>
		
		<!-- 分页 -->
    	<%out.print(request.getAttribute("page").toString()); %>
 		<!-- 分页 -->
		<table>
			<thead>
			<tr>			
				
				<th>医生姓名</th>
				<th>注册手机</th>
				<th>医院名称</th>
				
				
				<th>技术职称</th>
				<th>教学职称</th>
				<th>诊疗费</th>
				<th>注册时间</th>			
				
				<th>推荐</th>
				
				<th width="130px;">操作</th>
				
				<th>擅长</th>
				
			</tr>
			</thead>
			
			<c:forEach items="${expertList }" var="item">
			<tbody>
			<tr>
				
				
				<td class='DoctorID'>${item.DoctorName }
				  <input type="hidden" name="DoctorID" value="${item.DoctorID}" >
				</td>
				<td>${item.MobilePhone }</td>
				<td class='HospitalName'>${item.HospitalName }</td>
				
				<td>
				<c:if test="${item.MedicalJobTitle eq 1}">主任医师</c:if>
				<c:if test="${item.MedicalJobTitle eq 2}">副主任医师</c:if>
				<c:if test="${item.MedicalJobTitle eq 3}">主治医师</c:if>
				<c:if test="${item.MedicalJobTitle eq 4}">住院医师</c:if>
				</td>
				<td>
				<c:if test="${item.TeachJobTitle eq 1}">教授</c:if>
				<c:if test="${item.TeachJobTitle eq 2}">副教授</c:if>
				<c:if test="${item.TeachJobTitle eq 3}">讲师</c:if>
				<c:if test="${item.TeachJobTitle eq 4}">助教</c:if>
				</td>
				<td class='DoctorID'><a href="javascript:;" class="m-info">明细</a>
				  
				</td>
				<td>${item.UpdateTime}</td>
				
				
					<c:if test="${item.IsRecommend eq 1 }">
							<td>是</td>
					</c:if>
					<c:if test="${item.IsRecommend ne 1 }">
						<td>否</td>
					</c:if>
				
				<td>
					<a class="doctorDetail" data-tabtitle="医生详情" data-menu="" data-url="nhdoctor/getNHDoctorDetail?DoctorID=${item.DoctorID }">详情</a>
					
					<auth:authTag authId="79">
					<!-- 增加权限 -->
						<c:if test="${ApplicationID eq 16 }">
						<c:if test="${item.IsRecommend eq 1 }">
							<a href="javascript:void(0)" onclick="recommendDoctor(${item.DoctorID },${ApplicationID},0)">取消推荐</a>
						</c:if>
						<c:if test="${item.IsRecommend ne 1 }">
							<a href="javascript:void(0)" onclick="recommendDoctor(${item.DoctorID },${ApplicationID},1)">推荐医生</a>
						</c:if>
					</c:if>
					
					</auth:authTag>	
					
				</td>
				
				<td>${item.Skill}</td>
				
			</tr>
			</tbody>
			</c:forEach>
		</table>
		
	</div>
	
	<div class="bg"></div>
	<div class="popbox" data-id="">
		<div class="pop_title">诊疗费详情</div>
		<div class="close">+</div>
		<div class="m-input">
			<h2 class='h'>北京医院 内科 高高 专家诊疗费用价格</h2>
			<div class="m-input-show m-show-cell">
				<select class="u-method" name="ServiceType">
					<!-- <option value="">请选择</option> -->
					<option value="1">视频</option>
					<!-- <option value="2">面诊</option> -->
				</select>
				<select class="u-diagnose" name="IsFirstVisit">
					<!-- <option value="">请选择</option> -->
					<option value="1">初诊</option>
					<option value="2">复诊</option>
				</select>
				<input type="text" class="u-original" value="" placeholder="原价输入(必填)" />
				<input type="text" class="u-dis" value=""  placeholder="折扣(必填)" onblur=""/><span style="position:absolute;margin-left:-16px;line-height:24px">%</span>
				<!-- <input type="text" class="u-price" value="" placeholder="折后价计算" onfocus="calDis(this)" /> -->
				<input type="button" id="addInfo" class="u-btn-style" value="添加" />
			</div>
			<div class="m-bar"></div>
				
			<div class="m-info-box">
				<div class="m-input-show-child m-input-show none">
					 <span class="u-method"></span>    <span class="u-diagnose"></span> 
					
					<!-- <select class="u-method">						
						<option value="1">视频</option>						
					</select>
					<select class="u-diagnose">						
						<option value="1">初诊</option>
						<option value="2">复诊</option>
					</select> -->
					<input type="text" class="u-original" value="原价输入" />
					<input type="text" class="u-dis" value="折扣" /><span style="position:absolute;margin-left:-16px;line-height:24px">%</span>
					<!-- <input type="text" class="u-price" value="折后价计算" onfocus="calDis(this)" /> -->
					<input type="button" class="u-btn-style u-edit-save" id="addInfo" value="保存" />
				</div>
			</div>
			<div class="m-info-list">
				<ul>
					<li>就诊方式</li>
					<li>初/复诊</li>
					<li>原价</li>
					<li>折扣</li>
					<li>优惠价</li>
					<li></li>
				</ul>
			</div>
			
		</div>
	</div>
	
	<!-- 弹框 -->
	<style>
	.m-alert-box {
		position:fixed;
		width:400px;
		height:200px;
		top:30%;
		margin-left:40%;
		border:1px solid #ccc;
		background:#fff;
		z-index:1001;
		border-radius:5px;
	}
	.m-alert-content {
		padding:20px;
	}
	.u-text {
		font-size:16px;
	}
	.m-input-box input {
		width:100px;
		height:30px;
		border:1px solid #999;
		background:#fff;
		border-radius:5px;
		margin-left:10px;
	}
	.txtAlcent {
		text-align:center;
	}
	.mt3 {
		margin-top:30px;
	}
	.bg_black {
		width:100%;
		height:100%;
		position:fixed;
		left :0;
		top :0;
		background:black;
		'z-index':1000;
		opacity:0.5;
		display:none;
	}
	</style>
	<div class="m-alert-box none">
		<div class="m-alert-content txtAlcent">
			<p class="u-text mt3">是否要为医生兑换？</p>
			<div class="m-input-box mt3">
				<input type="button" class="f-cancel" value="取消" />
				<input type="button" data-id="" data-flag="" class="f-cancel f-enterInfo" value="兑换"/>
			</div>
		</div>
	</div>
	<div class="bg_black"></div>
	<script type="text/javascript">
	function calDis(event){
		$(event).val($(event).prev().prev().prev().val()*$(event).prev().prev().val()/100);
	};
	$(".doctorDetail").click(function(){
			var url=this.getAttribute("data-url");
			window.parent.addTab("医生详情",url);
	});
				
	$(document).ready(function() {
		$(".bg").height($(document).height());
        $(".bg").width($(window).width());
        $(window).resize(function(){
	        $(".bg").height($(document).height());
	        $(".bg").width($(window).width());
	    });
		$(".popbox .close").click(function(event) {
			$(".bg").css("display","none");
	        $(".popbox").css("display","none");
		});	
		
		$(".m-info").click(function() {
			/* 北京医院 内科 高高 */
			var  HospitalName=$(this).parent().siblings('.HospitalName').text();
			var  DepartmentName=$(this).parent().siblings('.DepartmentName').text();
			var  DoctorID=$(this).parent().siblings('.DoctorID').text();
		    $(".h").text(HospitalName+" "+DepartmentName+"  "+DoctorID+"  专家诊疗费用价格 ");	
			 //查询该医生的价格
			var  DoctorID=$(this).parent().siblings('.DoctorID').find("input").val();
			 $(".popbox").attr("data-id",DoctorID);
			 $(".m-info-list .u-detials , .m-info-list .m-input-show-child ").remove();
			 $.ajax({
					type: "post",
					dataType:"json", //收受数据格式
					cache:false,
					data:{DoctorID : DoctorID},
					url: "${pageContext.request.contextPath}/nhdoctor/getDoctorPriceListByDoctorID",
					success: function(data){console.log(data);
						var listInfo = data.ListInfo;
						for(var i=0; i<listInfo.length; i++){
							var liHtml = "<ul class='u-detials'>"+
							               "<li data-type='"+ listInfo[i].ServiceType +"'>"+  listInfo[i].ProductName +"</li>"+
							               "<li data-type='"+ listInfo[i].IsFirstVisit +"'>"+ listInfo[i].IsFirstVisitName +"</li>"+
							               "<li>"+ listInfo[i].Price +"</li>"+
							               "<li>"+ listInfo[i].Discount +"</li>"+
							               "<li>"+ listInfo[i].DicountPrice +"</li>"+
							               "<li><input type='button' class='f-edite u-btn-style' value='编辑' />"+
							               "<input type='hidden' class='u-id' value="+listInfo[i].ProductID+" />"+
							               "</li></ul>";
							var divHtml = $(".m-info-box").html();
							
							$(".m-info-list").append(liHtml + divHtml);
						}
					},error:function(){
						$.messager.alert("操作结果","操作失败");
						//setTimeout("window.location.reload()",2000)
					}
			 });
			 
			 //
			$(".bg").css("display","block");
	        $(".popbox").css("display","block");
		})
		$("#addInfo").click(function(){
			var DoctorID = $(".popbox").attr("data-id");
			var ServiceType = $(".m-show-cell .u-method").val();
			IsFirstVisit = $(".m-show-cell .u-diagnose").val();
			Price = $(".m-show-cell .u-original").val();
			Discount = $(".m-show-cell .u-dis").val();
			DicountPrice = $(".m-show-cell .u-price").val();
			 if(ServiceType==1){
			    	ServiceTypeName="视频"
			    }
			    if(ServiceType==2){
			    	ServiceTypeName="面诊"
			    }
			    if(IsFirstVisit==1){
			    	IsFirstVisitName="初诊"
			    }
			    if(IsFirstVisit==2){
			    	IsFirstVisitName="复诊"
			    }
			    console.log(typeof parseFloat(Price))
			  if(parseFloat(Price)<=0){
			  	$.messager.alert("操作结果","价格需大于0");
			  }else{
				 $.ajax({
						type: "post",
						dataType:"json", //收受数据格式
						cache:false,
						data:{DoctorID :DoctorID,ServiceType:ServiceType,IsFirstVisit:IsFirstVisit,Price:Price,Discount:Discount},
						url: "${pageContext.request.contextPath}/nhdoctor/addDoctorPrice",
						success: function(data){
							if (data!=null) {
	// 							console.log(data);
								if (data.Status == 200) {
									var liHtml = "<ul class='u-detials'>"+
						               "<li data-type='"+ ServiceType +"'>"+ ServiceTypeName +"</li>"+
						               "<li data-type='"+ IsFirstVisit +"'>"+ IsFirstVisitName +"</li>"+
						               "<li>"+ Price +"</li>"+
						               "<li>"+ Discount +"</li>"+
						               "<li>"+Price*Discount/100+"</li>"+
						               "<li><input type='button' class='f-edite u-btn-style' value='编辑' />"+
						               "<input type='hidden' class='u-id' value="+data+" />"+
						               "</li></ul>";
						             var divHtml = $(".m-info-box").html();
						             $(".m-info-list").append(liHtml + divHtml);
									$.messager.alert("操作结果","操作成功！");					             
								} else {								
									$.messager.alert("操作结果",data.Message);
								}						
								
							}
						}
						
				 });
			 }
		})
		
		$(".m-info-list").delegate(".f-edite","click",function() {
		//$(".f-edite").bind("click",function() {alert($(this));
			var $parentUl = $(this).parents(".u-detials");
			$parentUl.hide().next(".m-input-show-child").show();
			var methods = $parentUl.find("li").eq(0).attr("data-type");
			var diagnoses = $parentUl.find("li").eq(1).attr("data-type"); 
			var originals = $parentUl.find("li").eq(2).text();
			var diss = $parentUl.find("li").eq(3).text();
			var prices = $parentUl.find("li").eq(4).text();
			
			var $nextDiv = $parentUl.hide().next(".m-input-show-child");
			//$nextDiv.find(".u-method option[value='1']").attr("selected","selected");
			/* $nextDiv.find(".u-method").val(methods);
			$nextDiv.find(".u-diagnose").val(diagnoses); */
			var txt = "";
			if (methods == 1) {
				txt = "视频";
			} else if (methods == 2) {
				txt = "面诊";
			}
			
			$nextDiv.find(".u-method").text(txt);
			
			if(diagnoses == 1) {
				txt = "初诊";
			} else {
				txt = "复诊";
			}
			$nextDiv.find(".u-diagnose").text(txt);
			$nextDiv.find(".u-original").val(originals);
			$nextDiv.find(".u-dis").val(diss);
			$nextDiv.find(".u-price").val(prices);
		})
		
		//保存编辑数据
		$(".m-info-list").delegate(".u-edit-save","click",function() {
			var $edt = $(this).parent(".m-input-show-child");
			/* var edt_method = $edt.find(".u-method").children("option:selected").text();
			var edt_diagnose = $edt.find(".u-diagnose").children("option:selected").text(); */
			var edt_method = $edt.find(".u-method").text();
			var edt_diagnose = $edt.find(".u-diagnose").text();
			
			var edt_method_id = $edt.find(".u-method").val();
			var edt_diagnose_id = $edt.find(".u-diagnose").val();
			
			var edt_original = $edt.find(".u-original").val();
			var edt_dis = $edt.find(".u-dis").val();
			//var edt_price = $edt.find(".u-price").val();
			var edt_price = edt_original * edt_dis /100;

			var $showVal = $edt.prev();
			
			if(parseFloat(edt_original)<0){
			    $.messager.alert("操作结果","价格需大于0");
			}else{
				var arrVal = [edt_method,edt_diagnose,edt_original,edt_dis,edt_price];
				var arrVal_id = [edt_method_id,edt_diagnose_id];
				var productId = $showVal.find(".u-id").val();
				for(var i = 0; i<arrVal.length; i++) {
					$showVal.find("li").eq(i).text(arrVal[i]);
				}
				for(var m = 0; m<arrVal_id.length; m++) {
					$showVal.find("li").eq(i).attr("data-type",arrVal_id[m]);
				}
				$edt.hide();
				$showVal.show();
				//插入数据库
				var ServiceType=0;
				var IsFirstVisit=0;
			   if(edt_method=="视频"){
				 ServiceType=1;
			    }
			    if(edt_method=="面诊"){
			    	ServiceType=2;
			    }
			    if(edt_diagnose=="初诊"){
			    	IsFirstVisit=1;
			    }
			    if(edt_diagnose=="复诊"){
			    	IsFirstVisit=2;
			    }
				 $.ajax({
						type: "post",
						dataType:"json", //收受数据格式
						cache:false,
						data:{ProductID:productId,ServiceType:ServiceType,IsFirstVisit:IsFirstVisit,Price:edt_original,Discount:edt_dis},
						url: "${pageContext.request.contextPath}/nhdoctor/updateDoctorPrice",
						success: function(data){
							if (data.Status == "200") {
								$.messager.alert("操作结果","操作成功！");
							}else{
								$.messager.alert("操作结果",data.Message);
							}
							//setTimeout("window.location.reload()",2000);
						},error:function(){
							$.messager.alert("操作结果","操作失败");
							//setTimeout("window.location.reload()",2000)
						}
				 });
			}	
		})
	})
	</script>
	
	
  </body>
</html>
















