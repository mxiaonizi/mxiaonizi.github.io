<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="/WEB-INF/authTag.tld" prefix="auth"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
response.setHeader("Cache-Control","no-store");
response.setHeader("Pragrma","no-cache");
response.setDateHeader("Expires",0);
%>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<base href="<%=basePath%>">
	<title></title>
	 <script type="text/javascript" src="../../../js/jquery-1.11.1.min.js"></script>
	
	<link rel="stylesheet" href="../../../jquery-easyui-1.4.3/themes/default/easyui.css">
	<script type="text/javascript" src="../../../jquery-easyui-1.4.3/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="../../../jquery-easyui-1.4.3/easyui-lang-zh_CN.js"></script>
	<link rel="stylesheet" type="text/css" href="../../../css/reset.css">
<!-- 	<link rel="stylesheet" href="../../../js/easy_ui/css/easyui.css"> -->
 	<link rel="stylesheet" type="text/css" href="../../../css/400_base.css">
  	<link rel="stylesheet" href="../../../css/institution_detail_160929.css">
	
<!-- 	<script type="text/javascript" src="../../../js/common/link_pop_window.js"></script> -->
		
    <!-- 实现三级联动 -->
	<script type="text/javascript" src="js/common2/area.js"></script>
	<script type="text/javascript" src="js/common2/location.js"></script>
	<script type="text/javascript" src="js/common2/select2.js"></script>
	<script type="text/javascript" src="js/common2/select2_locale_zh-CN.js"></script>
	<link href="js/common2/select2.css" rel="stylesheet"/>
	
	<script type="text/javascript" src="js/layer/layer.js"></script>
	<script type="text/javascript">
	showLocation();
	$(function(){
		$(".submit_btn").attr("flag","read");//增加一个标识
		$(".submit_btn input").click(function(){
			if($(".submit_btn").attr("flag")=="read"){//如果是只读
				$(".submit_btn").attr("flag","modify");
				$(".modify,.save_btn,.get_pwd").css("display","block");//显示
				$(".read,.modify_btn").css("display","none");//隐藏
			}else{				
				toSave();//保存
			}
		});		
	});
	
	function toSave(){
		//获取所属项目
		/* var appStr="";
		var appName = document.getElementsByName("ApplicationName");
		for(var index=0;index<appName.length;index++){
			if(appName[index].checked == true){
				appStr += appName[index].value+",";
			}
		}
		if(appStr.length > 0){
			appStr = appStr.slice(0, appStr.length-1);
			$("#AppIds").val(appStr);
		} else {
			alert("请选择所属项目");
			return;
		} */
		
		var flag = $("#myForm").form('validate');
		
		if($('#loc_province').val() == ""){
			layer.msg("所在地为必填项!",{icon:2,time:3000});
			return;
		}else{			
			if($('#loc_province').val() != null && $('#loc_province').val() != ''){
				$("#AreaID").val($('#loc_province').val());
			}
			if($('#loc_city').val() != null && $('#loc_city').val() != ''){
				$("#AreaID").val($('#loc_city').val());
			}
			if($('#loc_town').val() != null && $('#loc_town').val() != ''){
				$("#AreaID").val($('#loc_town').val());
			}			
		}
		
		var oldInstitutionName ='${institutionDetail.InstitutionName }';
		var newInstitutionName = $("#InstitutionName").val();
		if(oldInstitutionName == newInstitutionName){
			if(flag){
				$("form").submit();
				$(".submit_btn").attr("flag","read");
				$(".read,.modify_btn").css("display","block");
				$(".modify,.save_btn,.get_pwd").css("display","none");
			}
		}
		else{
			$.ajaxSettings.async = false;
			$.ajaxSetup({cache:false});
			$.post("${pageContext.request.contextPath}/simpleinstitution/checkInstitutionName", {InstitutionName:newInstitutionName,
				r:Math.random()
			}, function(data) {
				if(data.Status == 200) {
					if(data.DetailInfo.createFlag == 0){
						if(flag){
							$("form").submit();
							$(".submit_btn").attr("flag","read");
							$(".read,.modify_btn").css("display","block");
							$(".modify,.save_btn,.get_pwd").css("display","none");
						}
					} else {
						layer.msg("已经存在服务站名称为 "+newInstitutionName+ "，请重新输入！",{icon:2,time:3000});
					}
				}
			});
		}
		
		
		/* if(flag){
			$("form").submit();
			$(".submit_btn").attr("flag","read");
			$(".read,.modify_btn").css("display","block");
			$(".modify,.save_btn,.get_pwd").css("display","none");
		} */
	}
	function isTel(s) {
        var patrn = /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/
        if (!patrn.exec(s)) return false
        return true
    }
    function isMobile(value) {
        var validateReg = /^((\+?86)|(\(\+86\)))?1\d{10}$/;
        return validateReg.test(value);
    }
	//自定义easyUI校验规则
	$.extend(
			$.fn.validatebox.defaults.rules,
			{
				minLength : { // 判断最小长度
					validator : function(value, param) {
						return value.length >= param[0];
					},
					message : "最少输入 {0} 个字符。"
				},
				length : {
					validator : function(value, param) {
						var len = $.trim(value).length;
						return len >= param[0]
								&& len <= param[1];
					},
					message : "输入内容长度必须介于{0}和{1}之间."
				},
				mobile : {// 验证手机号码
					validator : function(value, param) {
						if(value.length > param[0] || value.length < param[0]){
							return false;
						}else{
							return true; 
						}
					},
					message : "手机号码格式不正确,只能输入11位有效数字！"
				},
				mobileIsAvailable : {// 验证手机号码唯一性
					validator : function(value, param) {
						 var flag = $.ajax({// 数据库比对手机号码是否重复  
	                           async : false,
	                           cache: false,
	                           type : 'post',  
	                           url : 'doctor/checkDoctorMobileIsAvailable',  
	                           data : {  
	                               'MobilePhone' : value
	                           }
	                       }).responseText;
	                       return flag==="true"; 
					},
					message : "该手机号已被注册！"
				},
				intOrFloat : {// 验证整数或小数
					validator : function(value) {
						return /^d+(.d+)?$/i.test(value);
					},
					message : "请输入数字，并确保格式正确"
				},
				chinese : {// 验证中文
					validator : function(value) {
						return /^[u0391-uFFE5]+$/i.test(value);
					},
					message : "请输入中文"
				},
				english : {// 验证英语
					validator : function(value) {
						return /^[A-Za-z]+$/i.test(value);
					},
					message : "请输入英文"
				},
				unnormal : {// 验证是否包含空格和非法字符
					validator : function(value) {
						return /.+/i.test(value);
					},
					message : "输入值不能为空和包含其他非法字符"
				},
				 name : {// 验证姓名，可以是中文或英文
					validator : function(value) {
						return /^[A-Za-z\u4e00-\u9fa5]+$/i.test(value);
					},
					message : "格式不正确，只能输入中文或者英文"
				} ,
				
				TelandPhone: {
					validator : function(value) {
						var isFixTel = isTel(value);
						var isMobilePhone = isMobile(value);
						
						return isFixTel || isMobilePhone;
					},
					message : "格式不正确，只能输入手机号或者固定电话"
				},
				Fix: {
					validator : function(value) {
						var isFixTel = isTel(value);
						return isFixTel ;
					},
					message : "格式不正确，只能输入传真号"
				},
			});	
	//自动生成密码
		function getPassword(){
			var $chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz';
			var $num = '0123456789';
			var pwd = "";
			var maxPos = $chars.length;
			var maxNum = $num.length;
			for(var i=0; i<6; i++){
				if(i%2 == 0){
					pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
				}else{
					pwd += $num.charAt(Math.floor(Math.random() * maxNum));
				}	
			}
			$("#Password").val(pwd);
			//console.log(pwd);
		}
	</script>
	
	<script>
	$(function(){
		/* showLocation();
		showLocation2();	 */	
		if ($("#AreaName").val() != "" && $("#AreaID").val() != "") {			
			$("#loc_province").val($("#AreaID").val());
			//$("#select2-chosen-1").text($("#AreaName").val());
			var areaName = $("#AreaName").val();
			var areaNameArray =  areaName.split(',');
			var len = areaNameArray.length;
			if (len == 1) {				
				$("#select2-chosen-1").text(areaNameArray[0]);
			} else if (len == 2) {				
				$("#select2-chosen-1").text(areaNameArray[0]);
				$("#select2-chosen-2").text(areaNameArray[1]);
			} else if (len == 3) {				
				$("#select2-chosen-1").text(areaNameArray[0]);
				$("#select2-chosen-2").text(areaNameArray[1]);
				$("#select2-chosen-3").text(areaNameArray[2]);
			}
		}
	})
	</script>
</head>
<body>
<form id="myForm" action="<%=basePath%>simpleinstitution/updateSimpleInstitution" method="post" enctype="multipart/form-data">
<input type="hidden" value="${institutionDetail.InstitutionID}" id="InstitutionID" name="InstitutionID"></input>
	<div class="section">
		<span class="modify">
		<div class="title" id="title">网络医院服务站修改</div>
		</span>
		<span class="read">
		<div class="title" id="title">网络医院服务站详情</div>
		</span>
		<ul class="clearfix info">
			<input type="hidden" id="AppIds" name="AppIds" value="16">
			<%-- <li style="width: 100%">
				<input type="hidden" id="AppIds" name="AppIds">
			    <span class="label required">所&nbsp;属&nbsp;项&nbsp;目：</span> 
			    <span class="modify" style="margin-left:100px;">
				    <c:forEach items="${ApplicationList }" var="item">
				    	<input type="checkbox" name="ApplicationName" value="${item.ApplicationID}"
				    	<c:if test="${fn:contains(institutionDetail.ApplicationName,item.ApplicationName)}">checked</c:if>
				    	>${item.ApplicationName}
				    </c:forEach>
				</span>
			    <span class="read">${institutionDetail.ApplicationName}</span>
			 </li> --%>
			 <li>
				<span class="label required">服务站类型：</span>
				<span class="modify">
					<select name="InstitutionType" id="InstitutionType">
						<option value="2" <c:if test="${institutionDetail.InstitutionType eq '2'}">selected</c:if>>药店</option>
						<option value="8" <c:if test="${institutionDetail.InstitutionType eq '8'}">selected</c:if>>诊所</option>
					</select>
				</span>
				<span class="read">
					<c:if test="${institutionDetail.InstitutionType eq '2'}">药店</c:if>
					<c:if test="${institutionDetail.InstitutionType eq '8'}">诊所</c:if>
				</span>
			</li>
			<li style="width:70%;">
				<span class="label required">服务站名称：</span>
				<span class="modify">
					<input class="easyui-validatebox" data-options="required:true" type="text" name='InstitutionName' id="InstitutionName" value="${institutionDetail.InstitutionName }">
				</span>
				<span class="read">${institutionDetail.InstitutionName }</span>
			</li>
			<li>
				<span class="label">经理电话：</span>
				<span class="modify">
					<input class="easyui-validatebox" type="text" name='ContactPhone' id="ContactPhone" value="${institutionDetail.ContactPhone }" data-options="validType:['TelandPhone']">
				</span>
				<span class="read">${institutionDetail.ContactPhone}</span>
			</li>
			<li>
				<span class="label">经理姓名：</span>
				<span class="modify">
					<input class="easyui-validatebox" type="text" name='ContactName' id="ContactName" value="${institutionDetail.ContactName }" data-options="validType:['name']">
				</span>
				<span class="read">${institutionDetail.ContactName}</span>
			</li>
			<li class="double location required regLocation">
				<span class="label">所&nbsp;&nbsp;&nbsp;在&nbsp;&nbsp;&nbsp;地：</span>
				<span class="modify">
					<select id="loc_province" style="width:155px;"></select>
		 			<select id="loc_city" style="width:155px; margin-left:16px"></select>
					<select id="loc_town" style="width:155px;margin-left:16px"></select>
					<input type="hidden"  id="AreaID" name="AreaID" value="${institutionDetail.ShareAreaID}"></input>
					<input type="hidden" id="AreaName" name="AreaName" value="${institutionDetail.AreaPathName} "></input>
				</span>
				<span class="read">${institutionDetail.AreaPathName}</span>
			</li>			
			<li style="width:100%;">
				<span class="label required">详&nbsp;细&nbsp;地&nbsp;址：</span>
				<span class="modify">
					<input class="easyui-validatebox" data-options="required:true" type="text" name="Address" id="Address" value="${institutionDetail.Address} " />
				</span>
				<span class="read">${institutionDetail.Address}</span>				
			</li>
			<li>
				<span class="label">陪诊电话：</span>
				<span class="modify">
					<input class="easyui-validatebox" type="text" name='Phone' id="Phone" value="${institutionDetail.Phone }" data-options="validType:['TelandPhone']"/>
				</span>
				<span class="read">${institutionDetail.Phone}</span>
			</li>
			<li>
				<span class="label">陪诊姓名：</span>
				<span class="modify">
					<input class="easyui-validatebox" type="text" name='AssistantName' id="AssistantName" value="${institutionDetail.AssistantName }" data-options="validType:['name']"/>
				</span>
				<span class="read">${institutionDetail.AssistantName}</span>
			</li>
			<li>
				<span class="label">服务站传真：</span>
				<span class="modify">
					<input class="easyui-validatebox"  type="text" name='Fax' id="Fax" value="${institutionDetail.Fax }" data-options="validType:['Fix']"/>
				</span>
				<span class="read">${institutionDetail.Fax}</span>
			</li>
			<li>
				<span class="label">服&nbsp;务&nbsp;站&nbsp;ID：</span>
				<span class="modify">
					${institutionDetail.InstitutionID}
				</span>				
				<span class="read">${institutionDetail.InstitutionID}</span>
			</li>
			<li>
				<span class="label">服务站密码：</span>
				<span class="modify">
					<input class="easyui-validatebox"  type="text" name='Password' id="Password" value="" readonly="readonly" />
				</span>
				<span class="read">******</span>
			</li>
			<li>
				<input class="get_pwd" type="button" value="自动生成密码" onclick="getPassword();"/>
			</li>
			<li>
				<span class="label">服务站状态：</span>
				<span class="modify">
					<select name="NHStatus" id="NHStatus">
						<option value="0" <c:if test="${institutionDetail.NHStatus eq '0'}">selected</c:if>>未填写</option>
						<option value="1" <c:if test="${institutionDetail.NHStatus eq '1'}">selected</c:if>>已营业</option>
						<option value="2" <c:if test="${institutionDetail.NHStatus eq '2'}">selected</c:if>>终止营业(不统计)</option>
						<option value="3" <c:if test="${institutionDetail.NHStatus eq '3'}">selected</c:if>>已签约</option>
						<option value="4" <c:if test="${institutionDetail.NHStatus eq '4'}">selected</c:if>>已投放设备</option>
						<option value="5" <c:if test="${institutionDetail.NHStatus eq '5'}">selected</c:if>>终止营业(仍统计)</option>
					</select>
				</span>
				<span class="read">
					<c:if test="${institutionDetail.NHStatus eq '0'}">未填写</c:if>
					<c:if test="${institutionDetail.NHStatus eq '1'}">已营业</c:if>
					<c:if test="${institutionDetail.NHStatus eq '2'}">终止营业(不统计)</c:if>
					<c:if test="${institutionDetail.NHStatus eq '3'}">已签约</c:if>
					<c:if test="${institutionDetail.NHStatus eq '4'}">已投放设备</c:if>
					<c:if test="${institutionDetail.NHStatus eq '5'}">终止营业(仍统计)</c:if>
				</span>
			</li>
		</ul>
		<div class="submit_btn">
			<auth:authTag authId="40">
				<input class="modify_btn" type="button" id="_edit_expert" value="修改"/>	
			</auth:authTag>	
			<input class="save_btn" type="button" id="_save_expert" value="保存"/>
			
		</div>
	</div>
</form>
</body>
</html>