<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
  <head>
    <base href="<%=basePath%>"/>
    
    <title>患者看诊次数统计</title>
    
	<meta content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" name="viewport">
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="black" name="apple-mobile-web-app-status-bar-style">
	<meta content="telephone=no" name="format-detection">
	<link rel="stylesheet" href="../../../css/public.css" />
	<link rel="stylesheet" href="../../../css/reset.css" />
	<link rel="stylesheet" href="../../../css/compare.css" />

  </head>
  <body>
  		<div class="tableBox" style="margin-top: 50px;">
			<table class="tab" cellpadding="0" cellspacing="0">
				<tr>
					<th style="width:130px">患者姓名</th>
					<th style="width:150px">订单</th>
					<th style="width:130px">医生姓名</th>
					<th style="width:150px">看诊日期</th>
					<th style="width:170px">省</th>
					<th style="width:170px">市</th>
					<th style="width:170px">县</th>
					<th>药店</th>
				</tr>
				<tr class="itamData">
	                <td rowspan="${ListInfo.size()}">${DetailInfo.UserName}</td>
					<c:forEach items="${ListInfo}" var="item" varStatus="status">
		                    <td>${item.OrderNumber}</td>
		                    <td>${item.DoctorName}</td>
		                    <td>${item.ScheduleDate}</td>
		                    <td>${item.Provice}</td>
		                    <td>${item.City}</td>
		                    <td>${item.County}</td>
		                    <td>${item.InstitutionName}</td>
		                </tr>
	            	</c:forEach>
            </table>
		</div>
  </body>
</html>