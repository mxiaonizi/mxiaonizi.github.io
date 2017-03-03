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
	
	<link rel="stylesheet" href="../../../css/400_base.css">
	<link rel="stylesheet" href="../../../css/doctor_detail.css">
	<script type="text/javascript" src="../../../js/jquery-1.11.1.min.js"></script>
	<link rel="stylesheet" href="../../../jquery-easyui-1.4.3/themes/default/easyui.css">
	<script type="text/javascript" src="../../../jquery-easyui-1.4.3/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="../../../jquery-easyui-1.4.3/easyui-lang-zh_CN.js"></script>
	
    <script type="text/javascript" src="js/common/searchAutoComplete.js"></script>
    <style type="text/css">
		.dropDiv {
		    background-color: #FFFFFF;
		    position: absolute;
		    z-index: 10;
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
	
	$(function(){
		
		/*JQuery 限制文本框只能输入数字和小数点*/  
    	$(".NumText").keyup(function(){    
            $(this).val($(this).val().replace(/[^0-9.]/g,''));    
        }).bind("paste",function(){  //CTR+V事件处理    
            $(this).val($(this).val().replace(/[^0-9.]/g,''));     
        }).css("ime-mode", "disabled"); //CSS设置输入法不可用   

		var width=$(".richtext").width();
		$(".richtext p").css("max-width",width);
		$(".richtext img").css("max-width",width);

		$(".submit_btn").attr("flag","read");
		$(".submit_btn input").click(function(){
			if($(".submit_btn").attr("flag")=="read"){
				$(".submit_btn").attr("flag","modify");
				$(".modify,.save_btn").css("display","block");
				$(".read,.modify_btn").css("display","none");				
			}
			else{
				toSave()
			}
		});
		
		//获取医院列表
		getHospitalList();
		getConsultRoomList();
	});
	function toModify(ued){
		ued.setContent($("#span_Content").html(), false);
		//内容
		$("#Content").text(ued.getContent());
	}
	
	function toSave(){
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
			$("#HospitalID").next("input[type='hidden']").val($("#HospitalID option:selected").text());
			$("form").submit();
			$(".submit_btn").attr("flag","read");
			$(".read,.modify_btn").css("display","block");
			$(".modify,.save_btn").css("display","none");
		}
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
				onlyInt : {// 验证整数
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
	
	
	function getHospitalList(){		
		$.post("nhdoctor/getHospitalListAjax", {
			r:Math.random()
		}, function(data) {			
			var listInfo = data.ListInfo.HospitalList;
			//获取选中的医院ID
			var hid = ${nhDoctorDetail.HospitalID};	
			
			$("#HospitalID").append("<option value=''>---请选择---</option>");
			for(var i=0; i<listInfo.length; i++){
				if (hid == listInfo[i].HospitalID) {
					$("#HospitalID").append("<option value='" + listInfo[i].HospitalID + "' selected >" + listInfo[i].HospitalName + "</option>");
				} else {
					$("#HospitalID").append("<option value='" + listInfo[i].HospitalID + "'>" + listInfo[i].HospitalName + "</option>");
				}
			}
		});
	}
	
	function getConsultRoomList(){
		$("#ConsultRoomID").empty();
		var HospitalID = $("#HospitalID").val();
		if(HospitalID == null){
			HospitalID = ${nhDoctorDetail.HospitalID};
		}
		$.post("nhdoctor/getConsultRoomList",{HospitalID:HospitalID,
			r:Math.random()
		}, function(data) {
			var listInfo = data.ListInfo.ConsultRoomList;
			var CID = ${nhDoctorDetail.ConsultRoomID};
			$("#ConsultRoomID").append("<option value=''>---请选择---</option>");
			for(var i=0; i<listInfo.length; i++){
				if(CID == listInfo[i].ConsultRoomID){
					$("#ConsultRoomID").append("<option value='"+listInfo[i].ConsultRoomID+","+listInfo[i].ConsultRoomName+"' selected>"+listInfo[i].ConsultRoomName+"</option>");
				} else {
					$("#ConsultRoomID").append("<option value='"+listInfo[i].ConsultRoomID+","+listInfo[i].ConsultRoomName+"'>"+listInfo[i].ConsultRoomName+"</option>");
					
				}
			}
		});
	}
	
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
<form id="myForm" action="<%=basePath%>nhdoctor/editNHDoctorDetail" method="post" enctype="multipart/form-data">
<input type="hidden" id="DoctorID" name="DoctorID" value="${param.DoctorID }">
	<div class="section">
		<div class="title" id="title">医生详情</div>
		<ul class="clearfix info">			
			<li>
				<span class="label required">医生姓名：</span>
				<span class="modify">
					<input class="easyui-validatebox" type="text" name='DoctorName' id="DoctorName" value="${nhDoctorDetail.DoctorName }">
				</span>
				<span class="read">${nhDoctorDetail.DoctorName }</span>
			</li>
			<li>
				<span class="label required">注册手机：</span>
				<span class="modify">
					${nhDoctorDetail.MobilePhone }
				</span>
				<span class="read">${nhDoctorDetail.MobilePhone }</span>
			</li>
			
			<li>
				<span class="label required">医 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</span>
				<span class="modify">
					<select name="HospitalID" id="HospitalID" class="easyui-validatebox" data-options="required:true" onchange="getConsultRoomList();">					
					</select>
					<input type="hidden" name=HospitalName value="" />					
				</span>
				<span class="read">${nhDoctorDetail.HospitalName }</span>
			</li>
			
			<li>
				<span class="label required">诊 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室：</span>
				<span class="modify">
					<select name="ConsultRoomID" id="ConsultRoomID" class="easyui-validatebox" data-options="required:true">					
					</select>
					<input type="hidden" name=ConsultRoomName value="" />					
				</span>
				<span class="read">${nhDoctorDetail.ConsultRoomName }</span>
			</li>
			
			<li>
				<span class="label">性别：</span>
				<span class="modify">
					<select name="Gender" id="Gender">
						<option value="0" <c:if test="${nhDoctorDetail.Gender eq '0'}">selected</c:if>>未知</option>
						<option value="1" <c:if test="${nhDoctorDetail.Gender eq '1'}">selected</c:if>>男</option>
						<option value="2" <c:if test="${nhDoctorDetail.Gender eq '2'}">selected</c:if>>女</option>
					</select>
				</span>
				<span class="read">
					<c:if test="${nhDoctorDetail.Gender eq '0'}">未知</c:if>
					<c:if test="${nhDoctorDetail.Gender eq '1'}">男</c:if>
					<c:if test="${nhDoctorDetail.Gender eq '2'}">女</c:if>
				</span>
			</li> 
			
			<li>				
				<span class="label">是否推荐：</span>
				<span class="modify">
					<select name="IsRecommend" id="IsRecommend">
						<option value="0" <c:if test="${nhDoctorDetail.IsRecommend eq '0'}">selected</c:if>>否</option>
						<option value="1" <c:if test="${nhDoctorDetail.IsRecommend eq '1'}">selected</c:if>>是</option>
					</select>
				</span>
				<span class="read">
					<c:if test="${nhDoctorDetail.IsRecommend eq '0'}">否</c:if>
					<c:if test="${nhDoctorDetail.IsRecommend eq '1'}">是</c:if>
				</span>
			</li>
			
			<li>
				<span class="label">技术职称：</span>
				<span class="modify">
					<select name="MedicalJobTitle" id="MedicalJobTitle" class="easyui-validatebox">
						<option value="" selected>请选择</option>
						<option value="1" <c:if test="${nhDoctorDetail.MedicalJobTitle eq '1'}">selected</c:if>>主任医师</option>
						<option value="2" <c:if test="${nhDoctorDetail.MedicalJobTitle eq '2'}">selected</c:if>>副主任医师</option>
						<option value="3" <c:if test="${nhDoctorDetail.MedicalJobTitle eq '3'}">selected</c:if>>主治医师</option>
						<option value="4" <c:if test="${nhDoctorDetail.MedicalJobTitle eq '4'}">selected</c:if>>住院医师</option>
					</select>
				</span>
				<span class="read">
					<c:if test="${nhDoctorDetail.MedicalJobTitle eq '1'}">主任医师</c:if>
					<c:if test="${nhDoctorDetail.MedicalJobTitle eq '2'}">副主任医师</c:if>
					<c:if test="${nhDoctorDetail.MedicalJobTitle eq '3'}">主治医师</c:if>
					<c:if test="${nhDoctorDetail.MedicalJobTitle eq '4'}">住院医师</c:if>
				</span>
			</li>
			<li>
				<span class="label">教学职称：</span>
				<span class="modify">
					<select name="TeachJobTitle" id="TeachJobTitle">
						<option value="" selected>请选择</option>
						<option value="1" <c:if test="${nhDoctorDetail.TeachJobTitle eq '1'}">selected</c:if>>教授</option>
						<option value="2" <c:if test="${nhDoctorDetail.TeachJobTitle eq '2'}">selected</c:if>>副教授</option>
						<option value="3" <c:if test="${nhDoctorDetail.TeachJobTitle eq '3'}">selected</c:if>>讲师</option>
						<option value="4" <c:if test="${nhDoctorDetail.TeachJobTitle eq '4'}">selected</c:if>>助教</option>
					</select>
				</span>
				<span class="read">
					<c:if test="${nhDoctorDetail.TeachJobTitle eq '1'}">教授</c:if>
					<c:if test="${nhDoctorDetail.TeachJobTitle eq '2'}">副教授</c:if>
					<c:if test="${nhDoctorDetail.TeachJobTitle eq '3'}">讲师</c:if>
					<c:if test="${nhDoctorDetail.TeachJobTitle eq '4'}">助教</c:if>
				</span>
			</li>
			<li>
				<span class="label">职务：</span>
				<span class="modify">
					<input value="${nhDoctorDetail.JobTitle }" type="text" id="JobTitle" name="JobTitle">
				</span>
				<span class="read">${nhDoctorDetail.JobTitle }</span>
			</li>
			
			
			<li style="width: 100%" class="double" >
				<span class="label">擅 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长：</span>
				<span class="modify">
					<textarea style="width: 530px;height: 50px;" type="text" id="Skill" name="Skill" placeholder="擅长:1-200字符" class="easyui-validatebox" data-options="required:false,validType:['length[0,200]']">${nhDoctorDetail.Skill }</textarea>
				</span>
				<span class="read" style="word-break:break-all;">${nhDoctorDetail.Skill }</span>
			</li>
			<li style="width: 100%" class="double" >
				<span class="label">备 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
				<span class="modify" style="margin-top:10px;">
					<textarea style="width: 530px;height: 50px;" class="easyui-validatebox" data-options="required:false,validType:['length[0,80]']"  type="text" placeholder="备注:0-80字符" id="Note" name="Note">${nhDoctorDetail.Note}</textarea>
				</span>
				<span class="read" style="">${nhDoctorDetail.Note }</span>
			</li>
			<li>
				<span class="label">排 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序：</span>
				<span class="read">${nhDoctorDetail.OrderNum }</span>
				<span class="modify">
					<input class="easyui-validatebox" data-options="required:false,validType:['onlyInt','length[0,3]']" value="${nhDoctorDetail.OrderNum }" type="text" id="OrderNum" name="OrderNum">
				</span>
			</li>
			<li class="three">
				<span class="label">上传照片：</span>
				<span class="modify">
					<input type="file" name="Image">
					<span class="prompt">(请上传小于4M,格式为 jpg、png、jpeg 图片,预览尺寸100*100)</span>
				</span>
				<span class="read img">
					<c:if test="${not empty nhDoctorDetail.Avatar }">
						<img src="${nhDoctorDetail.Avatar }" alt="">
					</c:if>
					<%-- <c:if test="${empty nhDoctorDetail.Avatar }">
						<img src="../../../images/member/admin.png" alt="">
					</c:if> --%>
				</span>
			</li>
			<li style="clear:both;">
				<span class="label">医生密码：</span>
				<span class="modify">
					<input class="easyui-validatebox"  type="text" placeholder="请生成医生端密码.." name='Password' id="Password" value="" readonly="readonly" />
				</span>
				<span class="read">******</span>
			</li>
			<li>
				<span class="modify">
					<input class="get_pwd" type="button" value="自动生成密码" onclick="getPassword();"/>
				</span>
			</li>
			
			<li style="width: 100%">
				<input type="hidden" id="RoleIDs" name="RoleIDs">
			    <span class="label required">所属角色：</span> 
			    <span class="modify" style="margin-left:100px;">
				    <c:forEach items="${RoleList }" var="item">
				    	<input type="checkbox" name="RoleName" value="${item.RoleID}"
				    	<c:if test="${fn:contains(nhDoctorDetail.RoleName,item.RoleName)}">checked</c:if>
				    	>${item.RoleName}
				    </c:forEach>
				</span>
			    <span class="read">${nhDoctorDetail.RoleName}</span>
			 </li>
			 
			 
			 <li>
				<span class="label">医生状态：</span>
				<span class="modify">
					<select name="Status" id="Status" class="easyui-validatebox">
						<option value="" selected>请选择</option>
						<option value="1" <c:if test="${nhDoctorDetail.Status eq '1'}">selected</c:if>>白班</option>
						<option value="2" <c:if test="${nhDoctorDetail.Status eq '2'}">selected</c:if>>晚班</option>
						<option value="3" <c:if test="${nhDoctorDetail.Status eq '3'}">selected</c:if>>停诊</option>
						<option value="4" <c:if test="${nhDoctorDetail.Status eq '4'}">selected</c:if>>离职</option>
					</select>
				</span>
				<span class="read">
					<c:if test="${nhDoctorDetail.Status eq '1'}">白班</c:if>
					<c:if test="${nhDoctorDetail.Status eq '2'}">晚班</c:if>
					<c:if test="${nhDoctorDetail.Status eq '3'}">停诊</c:if>
					<c:if test="${nhDoctorDetail.Status eq '4'}">离职</c:if>
				</span>
			</li>
			<li style="width: 100%" class="double" >
				<span class="label required">审核药师：</span>
				<span class="modify">
					<input value="${nhDoctorDetail.AuditorName }" type="text" id="AuditorName" name="AuditorName" placeholder="审核药师:1-20字符">
				</span>
				<span class="read">${nhDoctorDetail.AuditorName }</span>
			</li>
		</ul>
		
		<div class="submit_btn">
		<%-- <auth:authTag authId="79"> --%>
			<input class="modify_btn" type="button" id="_edit_expert" data-operation="79" value="修改">
		<%-- </auth:authTag>	 --%>
			<input style="display:none;" class="save_btn" type="button" id="_save_expert" data-operation="" value="保存">
			
		</div>
	</div>
</form>
</body>
</html>