<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/authTag.tld" prefix="auth"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>修改密码</title>
    <link rel="stylesheet" href="../../../css/reset.css"/>
    <link rel="stylesheet" href="../../../bootstrap-3.3.4/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../../../css/w-base.css"/>
    <link rel="stylesheet" href="../../../css/common.css"/>
    <script src="../../../js/jquery-1.11.1.min.js"></script>
    <script src="../../../js/alert.js"></script>

    <!--[if lt IE 9]>
    <script src="js/html5shiv.min.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->
    <style>.content .choose-conditions li span:first-child{width:120px}</style>
    
</head>
<body>
<div class="content">
    <div class="seleBox">
        <span>修改密码</span>
    </div>
    <div class="choose-conditions reset-pwd">
        <form action="">
            <ul style="margin-top:50px">
                <li>
                    <span>当前密码：</span>
                    <input type="text" hidden/>
                    <input type="password" autocomplete="off" id="OldPassword"/>（6-20位字母数字组成）
                </li>
                <li>
                    <span>输入新密码：</span>
                    <input type="text" hidden/>
                    <input type="password" autocomplete="off" id="NewPassword1" />（6-20位字母数字组成）
                </li>
                <li>
                    <span>再次输入新密码：</span>
                    <input type="text" hidden/>
                    <input type="password" autocomplete="off" id="NewPassword2"/>（6-20位字母数字组成）
                </li>
            </ul>
            <div class="btn-box">
            	<button id="btn-reset" type="button" class="handleButton">确认提交</button> 
	            <%-- <auth:authTag authId="12">
	                <button id="btn-reset" type="button" class="handleButton">确认提交</button>
	            </auth:authTag> --%>
            </div>
        </form>
    </div>
</div>
<script>
        $(document).ready(function(){
        	/* var contentH = $(".content").height();
    		$(".content .choose-conditions").height(contentH-70); */
            var str = /^[A-Za-z0-9]{6,20}$/;
            $("#btn-reset").click(function(){
            
                var oldPwd = $.trim($("#OldPassword").val());
                var newPwd = $.trim($("#NewPassword1").val());
                var rnewPwd = $.trim($("#NewPassword2").val());
                var oldPwdReg = !!oldPwd.match(str);
                var newPwdReg = !!newPwd.match(str);
                var rnewPwdReg = !!rnewPwd.match(str);

                if(oldPwd == ""||oldPwd == null){
                    createPopWindow("初始密码不能为空！");
                    $("#OldPassword").focus();
                    return false;
                }else if(newPwd == ""||newPwd == null){
                    createPopWindow("请输入6~20位新密码！");
                    $("#NewPassword1").focus();
                    return false;
                }else if(rnewPwd == ""||rnewPwd == null){
                    createPopWindow("再次输入密码不能为空！");
                    $("#NewPassword2").focus();
                    return false;
                }else if(oldPwdReg == false){
                    createPopWindow("初始密码有误，请重新输入！");
                    $("#OldPassword").focus();
                    return false;
                }else if(newPwdReg == false){
                    createPopWindow("请输入6~20位字母数字组合！");
                    $("#NewPassword1").focus();
                    return false;
                }else if(rnewPwdReg == false){
                    createPopWindow("两次密码输入不一致！");
                    $("#NewPassword2").focus();
                    return false;
                }else if(!(newPwd == rnewPwd)){
                    createPopWindow("两次密码输入不一致！");
                    $("#NewPassword1").focus();
                    return false;
                }
                
                
              
                
			var OldPassword=$("#OldPassword").val();
			var NewPassword1=$("#NewPassword1").val();
			var NewPassword2=$("#NewPassword2").val();
			$.post("${pageContext.request.contextPath}/staff/updatePassword",{
				 OldPassword:OldPassword,
				 NewPassword1:NewPassword1, 
				 NewPassword2:NewPassword2,
				r:Math.random()
			},function(data){
				if(data.Status==200){
				    createPopWindow("修改密码成功，2秒后自动跳转!");
					function func()
					{	
						var exit = parent.document.getElementById('btn-exit');
						exit.click();
					}
					setTimeout(func,"2000");//二秒后执行
				}else{
					createPopWindow("初始密码有误，请重新输入！");
				}
				$("#OldPassword").val("");
				$("#NewPassword1").val("");
				$("#NewPassword2").val("");
			});        
           //end ajax
                
            });
        });
    </script>
</body>
</html>