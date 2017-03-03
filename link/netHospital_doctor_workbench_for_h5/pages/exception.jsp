<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'exception.jsp' starting page</title>
    <meta name="viewport" content="width=device-width user-scalable=no" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script>
		var html=document.getElementsByTagName("html")[0];
		var width=html.getBoundingClientRect().width;
		html.style.fontSize=width/16+"px";
	</script>
	<style>
		body{
			font-size:0.8rem;
			margin:0;
			padding-top:2rem;
		}
		.login{
			width:90%;
			height:2rem;
			line-height:2rem;
			text-decoration:none;
			position:absolute;
			left:5%;
			top:8rem;
			text-align:center;
			font-size:1rem;
			background-color:#0eabd4;
			border-radius:5px;
			-webkit-tap-highlight-color:rgba(0,0,0,0);
		}
	</style>
  </head>
  
  <body>
   出异常了！o(╯□╰)o  ${errorMsg}<br>
   <a href="doctor/logout" class="login">去登陆</a>
  </body>
</html>
