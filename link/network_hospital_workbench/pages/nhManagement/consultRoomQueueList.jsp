<%@ page language="java" import="java.util.*"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";	
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>诊室排队</title>
	<link rel="stylesheet" href="css/osms_base_161101.css">	
<!-- 	<link rel="stylesheet" href="css/osms/list.css"> -->
	<!-- <style>select{width:120px;margin-right:20px}</style>	 -->
</head>
<body>
<div class="container">
	<div id="top" class="title">诊室排队信息</div>
	<form action="" method='post' id="netHospital_form">		
		<div style="overflow:hidden">
			<span>上下午：</span>
			<select class="" name="DayPeriod" id="DayPeriod">
				<option value="">---请选择---</option>
				<option value="1" <c:if test="${DayPeriod eq 1}">selected</c:if> >上午</option>
				<option value="2" <c:if test="${DayPeriod eq 2}">selected</c:if> >下午</option>	
			</select>
			<span>医院：</span><input type="hidden" id="saveID" value="${HospitalID}">
			<select class="" name="HospitalID" id="HospitalID" onchange="getDoctorListByHospitalID(this.value)">
<!-- 				<option value="">---请选择---</option> -->
			</select>
			<span>诊室：</span><input type="hidden" value="${ConsultRoomID}">
			<select class="" name="ConsultRoomID" id="ConsultRoomID" >
				<option value="">---请选择---</option>
			</select>
			<span>医生：</span><input type="hidden" value="${DoctorID}">
			<select class="" name="DoctorID" id="DoctorID" >
				<option value="">---请选择---</option>
			</select>
			<div class="btn" style="display:inline-block;margin-left:30px;">			
				<input type="button" value="查询" onclick="javascript:showPageData(1);"/>							
			</div>
		</div>	
	</form>
	<div class="table_list" style="clear:both;margin-top:10px;">
		<table>
			<tr>
				<th>出诊时间</th>
				<th>上下午</th>
				<th>医生姓名</th>
				<th>医院</th>
				<th>诊室</th>
				<th>排队人数</th>							
			</tr>
			<c:forEach items="${ListInfo}" var="item">
				<tr>
					<td>${item.ScheduleDate}</td>
					<td><c:if test="${item.DayPeriod eq 1}">上午</c:if>
						<c:if test="${item.DayPeriod eq 2}">下午</c:if>
						</td>
					<td>${item.DoctorName }</td>
					<td>${item.HospitalName}</td>
					<td>${item.ConsultRoomName}</td>
					<td>${item.QueueNumber}</td>			
				</tr>
			</c:forEach>
		</table>
		<div class="lepu-m-page">
	     	<!-- 分页 -->
	    		<%out.print(request.getAttribute("page").toString()); %>
	 		<!-- 分页 -->
 		</div>
	</div>
</div>
	<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="js/layer/layer.js"></script>
	<script type="text/javascript" src="js/emr/lineUp_160929.js"></script>
</body>
</html>
