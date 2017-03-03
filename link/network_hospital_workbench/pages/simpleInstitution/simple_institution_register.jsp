<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
response.setHeader("Cache-Control","no-store");
response.setHeader("Pragrma","no-cache");
response.setDateHeader("Expires",0);
%>
<!doctype>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<base href="<%=basePath%>">
	<title></title>
	<link rel="stylesheet" type="text/css" href="../../../css/reset.css">
	<link rel="stylesheet" type="text/css" href="../../../css/400_base.css">
  	<link rel="stylesheet" href="../../../css/institution_detail_160929.css">

 	<script type="text/javascript" src="../../../js/jquery-1.11.1.min.js"></script>
<!--  	<script type="text/javascript" src="../../../js/common/common.js"></script> -->
	
	<link rel="stylesheet" href="../../../jquery-easyui-1.4.3/themes/default/easyui.css">
 	<script type="text/javascript" src="../../../jquery-easyui-1.4.3/jquery.easyui.min.js"></script>
 	<script type="text/javascript" src="../../../jquery-easyui-1.4.3/easyui-lang-zh_CN.js"></script>
    <!-- 实现三级联动 -->
 	<script type="text/javascript" src="js/common2/area.js"></script>
 	<script type="text/javascript" src="js/common2/location.js"></script>
 	<script type="text/javascript" src="js/common2/select2.js"></script>
 	<script type="text/javascript" src="js/common2/select2_locale_zh-CN.js"></script>
 	<link href="js/common2/select2.css" rel="stylesheet"/>
	
	<script type="text/javascript" src="js/layer/layer.js"></script>
	<script type="text/javascript">
	function saveForm(){
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
			layer.msg("请选择所属项目",{icon:2,time:1000});
			return;
		} */
		var flag = $("#myForm").form('validate');		
		
		if($('#loc_province').val() == ""){
			layer.msg("所在地为必填项!",{icon:2,time:1000});
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
		
		$.ajaxSettings.async = false;
		$.ajaxSetup({cache:false});
		var InstitutionName = $("#InstitutionName").val();
		$.post("${pageContext.request.contextPath}/simpleinstitution/checkInstitutionName", {InstitutionName:InstitutionName,
			r:Math.random()
		}, function(data) {
			if(data.Status == 200) {
				if(data.DetailInfo.createFlag == 0){
					if(flag){
						$("form").submit();
					}
				} else {
					layer.msg("已经存在服务站名称为"+InstitutionName+"，请重新输入！",{icon:2,time:1000});
				}
			}
		});
	}
	
	function isTel(s) {
        var patrn = /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/
        if (!patrn.exec(s)) return false;
        return true;
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
		}
	</script>
</head>
<body>
<c:if test="${actStatus==200}"><script type="text/javascript">layer.msg("操作成功！",{icon:1});</script></c:if>
<form id="myForm" action="<%=basePath%>simpleinstitution/registerSimpleInstitution" method="post" enctype="multipart/form-data">
	<input type="hidden" value="${InstitutionID}" id="InstitutionID" name="InstitutionID"></input>
	<input type="hidden" value="" id="AreaID" name="AreaID"></input>
	<div class="section">
		<div class="title" id="title">网络医院服务站点注册</div>
		<ul class="clearfix info">
			<input type="hidden" id="AppIds" name="AppIds" value="16"><!-- 默认网络医院 -->
			<%-- <li style="width: 100%">
				<input type="hidden" id="AppIds" name="AppIds" value="16">
			    <span class="label required">所&nbsp;属&nbsp;项&nbsp;目：</span>
			    <div style="margin-left:100px;">
			    	<c:forEach items="${ApplicationList }" var="item">
			    		<input type="checkbox" name="ApplicationName" value="${item.ApplicationID }">${item.ApplicationName }
			    	</c:forEach>
			    </div>
			 </li> --%>
			 <li>
				<span class="label required">服务站类型：</span>
				<select name="InstitutionType" id="InstitutionType" class="easyui-validatebox" data-options="required:true">
					<option value="">请选择</option>
					<option value="2">药店</option>
					<option value="8">诊所</option>					
				</select>
			</li>
			<li>
				<span class="label required">服务站名称：</span>
				<input class="easyui-validatebox"  type="text" placeholder="请输入服务站名称.." name='InstitutionName' id="InstitutionName" data-options="required:true">
			</li>
			<li>
				<span class="label">经理电话：</span>
				<input type="text" placeholder="请输入经理电话.." name='ContactPhone' id="ContactPhone" style="vertical-align:top;" class="easyui-validatebox textbox" data-options="validType:['TelandPhone']">
			</li>
			<li>
				<span class="label">经理姓名：</span>
				<input class="easyui-validatebox" type="text" placeholder="请输入经理姓名.." name="ContactName" id="CantactName" autocomplete="off" data-options="validType:['name']">
			</li>
			<li class="double location required regLocation">
					<span class="label">所&nbsp;&nbsp;&nbsp;在&nbsp;&nbsp;&nbsp;地：</span>
					<select id="loc_province" style="width:155px;"></select>
		 			<select id="loc_city" style="width:155px; margin-left:16px"></select>
					<select id="loc_town" style="width:155px;margin-left:16px"></select>
			</li>
			<li>
				<span class="label required">详&nbsp;细&nbsp;地&nbsp;址：</span>
				<input class="easyui-validatebox" type="text" name="Address" id="Address" placeholder="请输入详细地址.." data-options="required:true">
			</li>
			<li>
				<span class="label">陪诊姓名：</span>
				<input class="easyui-validatebox" type="text" placeholder="请输入陪诊姓名.." class="txt" id="AssistantName" name="AssistantName" data-options="validType:['name']"/>
			</li>
			<li>
				<span class="label">陪诊电话：</span>
				<input class="easyui-validatebox" type="text" placeholder="请输入陪诊电话.." class="txt NumText" id="Phone" name="Phone" data-options="validType:['TelandPhone']">
			</li>
			<li>
				<span class="label">服务站传真：</span>
				<input class="easyui-validatebox" type="text" placeholder="请输入服务站传真.." id="Fax" name="Fax" data-options="validType:['Fix']">
			</li>
			<li>
				<span class="label ">服务站密码：</span>
				<input class="easyui-validatebox" type="text" placeholder="请输入服务站密码.." id="Password" name="Password" data-options="validType:['Password']" readonly="readonly">
			</li>
			<li>
				<input type="button" value="自动生成密码" onclick="getPassword();" style="height: 32px;margin-top:4px;"/>
			</li>
			
			<li>
				<span class="label">服务站状态：</span>
				<select name="NHStatus" id="NHStatus" class="easyui-validatebox" data-options="required:true">
					<option value="0">未填写</option>
					<option value="1">已营业</option>
					<option value="2">终止营业(不统计)</option>
					<option value="3">已签约</option>
					<option value="4">已投放设备</option>
					<option value="5">终止营业(仍统计)</option>						
				</select>
			</li>
		</ul>
		<div class="submit"><input type="button" onclick="saveForm();" id="ensureAdd" value="确认新建"></div>
	</div>
</form>
</body>
</html>