<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
	<title>网络医院号源收回</title>
 	<link rel="stylesheet" href="css/osms_base_161101.css">
<!-- 	<link rel="stylesheet" href="css/osms/list.css"> -->
</head>
<body>
<div class="container">
	<div id="top" class="title">网络医院号源列表</div>
	<form action="" method='post' id="netHospital_form">		
		<div style="overflow:hidden;">			
			<span>医院名称：</span>
			<select name="HospitalID" id="HospitalList" onchange="getDoctorListByHospitalID(this.value)" value="${HospitalID}"></select>			         
			<span>医生姓名：</span>
			<select name="DoctorID" id="expertList" value="${DoctorID }">
				<option value="">---请选择---</option>
			</select>
			<span>上下午：</span>
			<select name="DayPeriod" value="${DayPeriod }">
				<option value="">---请选择---</option>
				<option value="1" <c:if test="${DayPeriod eq 1}">selected</c:if> >上午</option>
				<option value="2" <c:if test="${DayPeriod eq 2}">selected</c:if> >下午</option>	
			</select>
			<div class="btn" style="display:inline-block;margin-left:30px;">			
				<input type="button" value="查询" onclick="javascript:showPageData(1);"/>						
			</div>
		</div>
	</form>
	<div class="table_list" style="clear:both;margin-top:10px;">
		<table>
			<tr>
				<th style="width: 140px;">出诊时间</th>
				<th>上下午</th>
				<th>医生姓名</th>
				<th>医院</th>
				<th>诊室</th>
				<th>排期号数</th>
				<th>加号号数</th>
				<th>已预约号数</th>
				<th>号池剩余号数</th>
				<th>操作</th>				
			</tr>
			<c:forEach items="${ListInfo}" var="item">
				<tr>
					<td class="forTip">${item.ScheduleDate}</td>
					<td class="forTip">
						<c:if test="${item.DayPeriod == '1'}">上午</c:if>
						<c:if test="${item.DayPeriod == '2'}">下午</c:if>
					</td>
					<td class="forTip">${item.DoctorName}</td>
					<td>${item.HospitalName}</td>
					<td>${item.ConsultRoomName}</td>		
					<td class="forPost">${item.BasicConsultCount}</td>
					<td class="forPost">${item.ExtraConsultCount}</td>
					<td class="forPost">${item.OccupyConsultCount}</td>								
					<td class="forTip">${item.RemainConsultCount}</td>
					<td class="handleColumn">
						<a href="javascript:void(0)" class="takeBack" data-ScheduleID="${item.EASID}">收回</a>
					</td>					
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
 	<script type="text/javascript" src="js/emr/takeBack_160929.js"></script>
	<script>
		$(function(){		
			getHospitalList();
		});	
// 		 获取医院列表
		function getHospitalList(){
			var html = "<option value=''>---请选择---</option>";	
			$.post("${pageContext.request.contextPath}/nhdoctor/getHospitalListAjax",{
				r:Math.random()
			}, function(data) {
				var listInfo = data.ListInfo.HospitalList;
				for(var i=0; i<listInfo.length; i++){
					html += "<option value='" + listInfo[i].HospitalID + "'>" + listInfo[i].HospitalName + "</option>";
				}
				$("#HospitalList").html(html);
				$("#HospitalList").val(${HospitalID});
				var hospitalID = "${HospitalID}";
				if (!!hospitalID) {
					getDoctorListByHospitalID(hospitalID);
				}
			});
		}
// 		根据医院ID获取医生列表
		function getDoctorListByHospitalID(hospitalID) {	
			var html = "<option value=''>---请选择---</option>";
			$("#expertList").html(html);
			$.post("${pageContext.request.contextPath}/nhdoctor/getNHDoctorListAjax", {				
				HospitalID : hospitalID,
				r : Math.random()
			}, function(data) {
				if(data.Status == 200){
					$.each(data.ListInfo,function(){
						html += "<option value="+this.DoctorID+">"+this.DoctorName+"</option>";
					});
					$("#expertList").html(html);
					$("#expertList").val(${DoctorID});
				}else{
					layer.msg("获取医生列表失败!",{icon:2});
				}
			});
		}
	</script>	
</body>
</html>
