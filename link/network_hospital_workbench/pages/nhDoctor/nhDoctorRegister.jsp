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
	<script type="text/javascript" src="../../../js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="../../../js/common/common.js"></script>
	<script type="text/javascript" src="js/common/searchAutoComplete.js"></script>
	
	<link rel="stylesheet" href="../../../jquery-easyui-1.4.3/themes/default/easyui.css">
	<script type="text/javascript" src="../../../jquery-easyui-1.4.3/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="../../../jquery-easyui-1.4.3/easyui-lang-zh_CN.js"></script>
	<link rel="stylesheet" type="text/css" href="../../../css/400_base.css">
	<link rel="stylesheet" href="../../../css/doctor_register.css">

	<script type="text/javascript" src="../../../js/common/link_pop_window.js"></script>
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
	</style>
	<script type="text/javascript">
	
	$(document).ready(function() {		
		getHospitalList();		
	});
	function checkAndSave() {
		var docName = $.trim($("#DoctorName").val());
		if(docName == "" || docName == null){
			alert("医生姓名为必填项不能为空！");
			$("#DoctorName").focus();
			return false;
		}else if(docName.length < 2 || docName.length > 30 ){
			alert("医生姓名长度为2-30字符之间，请您重新填写！");
			$("#DoctorName").focus();
			return false;
		}
		
		var AuditorName = $.trim($("#AuditorName").val());
		if(AuditorName == "" || AuditorName == null){
			alert("审核药师为必填项不能为空！");
			$("#AuditorName").focus();
			return false;
		}else if(AuditorName.length < 2 || AuditorName.length > 20 ){
			alert("审核药师长度为1-20字符之间，请您重新填写！");
			$("#AuditorName").focus();
			return false;
		}
			
		$.post("nhdoctor/checkMobilePhoneExistAjax", {
			MobilePhone:$("#MobilePhone").val(),		
			r:Math.random()
		}, function(data) {	
			/* if (data.Status == "200") {
				saveForm();
			} else {
				alert("手机号码已存在");
			} */			
			if (data == true) {
				saveForm();
			} else {
				alert("手机号码已存在");
			}
			
		});
	}
	function saveForm(){
		var roleStr="";
		var roleName = document.getElementsByName("RoleName");
		for(var index=0;index<roleName.length;index++){
			if(roleName[index].checked == true){
				roleStr += roleName[index].value+",";
			}
		}
		if(roleStr.length > 0){
			roleStr = roleStr.slice(0, roleStr.length-1);
			$("#RoleIDs").val(roleStr);
		} else {
			alert("请选择所属角色");
			return;
		}
		
		var flag = $("#myForm").form('validate');	
		if(flag){
			alert("如您添加的医生可预约，请到医生列表-诊疗费-明细下完善出诊价格才能预约哦");
			$("#HospitalID").next("input[type='hidden']").val($("#HospitalID option:selected").text());
			$("form").submit();
		}
	}
	
	function getHospitalList(){		
		$.post("nhdoctor/getHospitalListAjax", {
			r:Math.random()
		}, function(data) {			
			var listInfo = data.ListInfo.HospitalList;
			$("#HospitalID").append("<option value=''>---请选择---</option>");
			for(var i=0; i<listInfo.length; i++){
				$("#HospitalID").append("<option value='" + listInfo[i].HospitalID + "'>" + listInfo[i].HospitalName + "</option>");
			}
		});
	}
	
	function getConsultRoomList(){
		$("#ConsultRoomID").empty();
		var HospitalID = $("#HospitalID").val();
		$.post("nhdoctor/getConsultRoomList",{HospitalID:HospitalID,
			r:Math.random()
		}, function(data) {
			var listInfo = data.ListInfo.ConsultRoomList;
			$("#ConsultRoomID").append("<option value=''>---请选择---</option>");
			for(var i=0; i<listInfo.length; i++){
				$("#ConsultRoomID").append("<option value='"+listInfo[i].ConsultRoomID+","+listInfo[i].ConsultRoomName+"'>"+listInfo[i].ConsultRoomName+"</option>");
			}
		});
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
	                           //url : 'doctor/checkDoctorMobileIsAvailable',
	                           url : 'nhdoctor/checkMobilePhoneExistAjax',
	                           data : {  
	                               'MobilePhone' : value
	                           }
	                       }).responseText;						 
	                       return flag==="true"; 
					},
					message : "该手机号已被注册！"
				},onlyInt : {// 验证整数
					validator : function(value) {
						var pattern=/^[0-9]*$/;
						return pattern.test(value);
					},
					message : "请输入数字，并确保格式正确"
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
</head>
<body>
<form id="myForm" action="<%=basePath%>nhdoctor/addNHDoctor" method="post" enctype="multipart/form-data">	
	<div class="section">
		<div class="title" id="title">网络医院医生注册</div>
		<ul class="clearfix info">
			
			<li>
				<span class="label required">医生姓名：</span>
				<input class="easyui-validatebox" data-options="" type="text" name='DoctorName' id="DoctorName">
			</li>
			<li>
				<span class="label required">注册手机：</span>
				<input type="text" name='MobilePhone' id="MobilePhone" style="vertical-align:top;" class="easyui-validatebox textbox" data-options="required:true,validType:['num','mobile[11]','mobileIsAvailable']">
			</li>
			<li>
				<span class="label required">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</span>
				
				<select name="HospitalID" id="HospitalID" class="easyui-validatebox" data-options="required:true" onchange="getConsultRoomList();">
					${HospitalOption }
				</select>
				<input type="hidden" name=HospitalName value="" />
			</li>
			<li>
				<span class="label required">诊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室：</span>
				<select name="ConsultRoomID" id="ConsultRoomID" class="easyui-validatebox" data-options="required:true">
					<option value="">---请选择---</option>
				</select>
				<input type="hidden" name=ConsultRoomName value="" />
			</li>
			
			<li>
				<span class="label">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
				<select name="Gender" id="Gender">
					<option value="0">未知</option>
					<option value="1">男</option>
					<option value="2">女</option>
				</select>
			</li>
			<li>
				<span class="label">是否推荐：</span>
				<select name="IsRecommend" id="IsRecommend">
					<option value="0">否</option>
					<option value="1">是</option>
				</select>
			</li>
			<li>
				<span class="label">技术职称：</span>
				<select name="MedicalJobTitle" id="MedicalJobTitle" class="easyui-validatebox" >
					<option value="">请选择</option>
					<option value="1">主任医师</option>
					<option value="2">副主任医师</option>
					<option value="3">主治医师</option>
					<option value="4">住院医师</option>
				</select>
			</li>
			<li>
				<span class="label">教学职称：</span>
				<select name="TeachJobTitle" id="TeachJobTitle">
					<option value="">请选择</option>
					<option value="1">教授</option>
					<option value="2">副教授</option>
					<option value="3">讲师</option>
					<option value="4">助教</option>
				</select>
			</li>
			<li>
				<span class="label">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：</span>
				<input type="text" name="JobTitle" id="JobTitle">
			</li>
			
			<li class="double" style="margin-bottom:10px;">
				<span class="label">擅&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长：</span>
				<textarea style="width: 530px;height: 50px;" id="Skill" name="Skill" placeholder="擅长:1-200字符" class="easyui-validatebox" data-options="required:false,validType:['length[0,200]']"></textarea>
			</li>
			<li style="width: 100%;margin-bottom:10px" class="double" >
				<span class="label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
				
				<textarea style="width: 530px;height: 50px;" class="easyui-validatebox" data-options="required:false,validType:['length[0,80]']" value="" type="text" placeholder="备注:0-80字符" id="Note" name="Note"></textarea>
			
			</li>
			<li>
				<span class="label">排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序：</span>
				
				<input class="easyui-validatebox" data-options="required:false,validType:['onlyInt','length[0,3]']" value="" type="text" id="OrderNum" name="OrderNum">
				
			</li>
			<li class="three">
				<span class="label">上传照片：</span>
				<input type="file" name="Image">
				<span class="prompt">(请上传小于4M,格式为JPG,PNG,JPEG图片 预览尺寸100*100)</span>
			</li>
			<li style="clear:both;width:600px;">
				<span class="label required">医生密码：</span>
				<input class="easyui-validatebox" type="text" placeholder="点击生成密码" id="Password" name="Password" data-options="required:true">
				<input type="button" value="自动生成密码" onclick="getPassword();"/>
			</li>
			
			<li style="width: 100%">
				<input type="hidden" id="RoleIDs" name="RoleIDs">
			    <span class="label required">所属角色：</span> 
			    <div style="margin-left:100px;"class="role_select">
			    	<c:forEach items="${RoleList }" var="item">
			    		<input type="checkbox" name="RoleName" value="${item.RoleID }">${item.RoleName }
			    	</c:forEach>
			    </div>
			 </li>
			 
			 <li>
				<span class="label">医生状态：</span>
				<select name="Status" id="Status">
					<!-- <option value="">请选择</option> -->
					<option value="1">白班</option>
					<option value="2">晚班</option>
					<option value="3">停诊</option>
					<option value="4">离职</option>
				</select>
			</li>
			<li style="width: 100%;" class="label">
				<span class="label required">审核药师：</span>
				<input type="text" id="AuditorName" name="AuditorName" placeholder="审核药师:1-20字符">
			</li>
		</ul>
		<div ><input type="button" onclick="checkAndSave();" id="ensureAdd" value="确认新建"></div>
		<!-- <div class="submit"><input type="button" onclick="checkAndSave();" id="ensureAdd" value="确认新建"></div> -->
	</div>
</form>
</body>
</html>