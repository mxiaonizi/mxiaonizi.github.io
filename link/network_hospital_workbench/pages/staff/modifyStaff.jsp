<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
response.setHeader("Cache-Control","no-store");
response.setHeader("Pragrma","no-cache");
response.setDateHeader("Expires",0);
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>工作站用户信息修改</title>
		<link rel="stylesheet" href="../../../css/public.css" />
		<link rel="stylesheet" href="../../../css/reset.css" />
		<link rel="stylesheet" href="../../../css/User_registration.css" />
		<script src="../../../js/jquery-1.11.1.min.js"></script>
		<script src="../../../js/layer/layer.js"></script>
	</head>
	<body>
		<div class="box">
			<h3 class="title">工作站用户信息修改</h3>
			<form action="<%=basePath%>staff/modifyStaffSave" name="form" id="form" method="post" enctype="multipart/form-data">
			<input hidden="hidden" id="RoleID" name="RoleID"></input>
			<input type="hidden" name='MobilePhone' id="MobilePhone" value="${DetailInfo.MobilePhone }"/>
			<input type="hidden" name='StaffID' id="StaffID" value="${StaffIDOp }"/>
			<input type="hidden" id="roleID" value="${DetailInfo.RoleID }"/>
			<input type="hidden" id="roleName" value="${DetailInfo.RoleName }"/>
				<ul class="content clearfix">
					<li class="fl"><span><em class="Prompt">*</em>手&nbsp;&nbsp;&nbsp;&nbsp;机:</span><span>${DetailInfo.MobilePhone }</span></li>
					<li class="fl"><span><em class="Prompt">*</em>姓&nbsp;&nbsp;&nbsp;&nbsp;名:</span><input type="text" name='StaffName' id="StaffName" value="${DetailInfo.StaffName }" class="name"/></li>
					<li class="fl"><span><em class="Prompt">*</em>密&nbsp;&nbsp;&nbsp;&nbsp;码:</span>
					<input type="text" name='Password' id="Password" class="passWord"  placeholder="******" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></li>
					<li class="fl"><span><em class="Prompt">*</em>角色类别:</span><a class="category">&nbsp;&nbsp;点击选择</a><div class="JurBox"></div></li>
					<li class="fl"><span>&nbsp;&nbsp;邮&nbsp;&nbsp;&nbsp;&nbsp;箱:</span><input type="text" name='Email' id="Email" class="Email" value="${DetailInfo.Email }"/></li>
					<li class="fl">
						<span>&nbsp;&nbsp;性&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
						<input type="radio" name="Gender" id="man" <c:if test="${DetailInfo.Gender eq 1 }">checked</c:if> value="1"/>
						<label for="man">男</label>
						<input type="radio" name="Gender" id="woman" <c:if test="${DetailInfo.Gender eq 2 }">checked</c:if> value="2"/>
						<label for="woman">女</label>
					</li>
				</ul>
			</form>
			<div class="but">
				<input type="button" value="提交" class="Submit"/>
			</div>
		</div>
		<script>
			var roleNameArr =$("#roleName").val().split(",");
			var arr = $("#roleID").val().split(",");
			var roleStr = "";
			for(var i=0;i<roleNameArr.length;i++){
				roleStr+=roleNameArr[i]+",";
			}
			$(".category").css("color","#000");
			roleStr = roleStr.substring(0,roleStr.length-1);
			$(".category").html(roleStr);
			
			var Popup = '<ul class="roleBox">';
			var roleList = ${RoleListInfo};
			$.each(roleList,function(i,data){
					Popup +='<li><input type="checkbox" name="main" id="main'+i+'" value="'+data.RoleID+'"/><label for="main'+i+'">'+data.RoleName+'</label></li>';
			});
			
			Popup+='</ul>'+
					'<div class="DetermineBox"><input type="button" value="确定" class="Determine"/></div>';
			//页面层
			$('.category').on("click",function(){
				
				layer.open({
				  type: 1,
				  title :'角色类别',
				  skin: 'layui-layer-rim', //加上边框
				  area: ['200px', '350px'], //宽高
				  content: Popup
				});
				for(var i=0;i<arr.length;i++){
					$(".roleBox input").each(function(j,ele){
						if(arr[i] == $(ele).val()){
							$(ele).attr("checked",true);
						}
					});
				}
				
				
				$(".Determine").on("click",function(){
					var str = "";
					arr = [];
					$(".roleBox input").each(function(i,ele){
						if($(ele).is(':checked')){
							arr.push($(ele).val());
							str+=$(ele).next().html()+",";
						}
					});
					if(str == ""){
						$(".category").html("&nbsp;&nbsp;点击选择");
						$(".category").css("color","#a9a9a9");
					}else{
						str = str.substring(0,str.length-1);
						$(".category").html(str);
						$(".category").css("color","#000");
					}
					layer.closeAll();
				});
			});
			
			//验证姓名
			$(".Submit").on('click',function(){
				if($(".name").val()==""){
					layer.msg("请填写姓名",{icon:2});
					$(".name").focus();
					return false;
				}
				if($(".name").val().length >20){
					layer.msg("姓名不能超过20个字符",{icon:2});
					$(".name").focus();
					return false;
				}
				
				
				//验证角色类别不为空
				if($(".category").html() == "&nbsp;&nbsp;点击选择"||$(".category").html() ==""){
					layer.msg("请选择角色类别",{icon:2});
					$(".category").focus();
					return false;
				}
				
				
              //对电子邮件的验证
              var myreg = /^(\w)+(\.\w)*@(\w)+((\.\w{2,3}){1,3})$/;
              /* var myreg = /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{0,20}$/; */  /* 验证邮箱格式及长度 */
              if($(".Email").val()!=""&&!myreg.test($(".Email").val())){
                   layer.msg("请输入有效的邮箱",{icon:2});
                   $(".Email").focus();
                  return false;
              }
              //邮箱长度验证
              if($(".Email").val().length>30){
                  layer.msg("邮箱长度不要超过30字符",{icon:2});
                  $(".Email").focus();
                 return false;
              }
              
              var RoleIDs = "";
			  for(var i=0;i<arr.length;i++){
				RoleIDs += arr[i]+",";
			  }
			  $("#RoleID").val(RoleIDs);
              
			  
              form.submit();
              
			});
			
			
			//密码不能输入汉字
			function isChn(str){
		      var reg = /^[u4E00-u9FA5]+$/;
		      if(!reg.test(str)){
		       return false;
		      }
		      return true;
			}
		</script>
	</body>
</html>
