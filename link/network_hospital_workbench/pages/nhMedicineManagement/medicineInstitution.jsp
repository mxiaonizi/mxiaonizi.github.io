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
	<title>药品所属药店</title>
	<link rel="stylesheet" href="css/osms_base_161101.css">
</head>
<body>
	<div class="container">
		<div id="top" class="title">
			<h4>药品所属药店</h4>
			<span class="InstTotal fr">药店合计：${ListInfoSize}</span>
		</div>
		<div class="table_list" style="clear:both;">
			<table>
				<tr>
					<th style="width:60px">药店ID</th>
					<th style="width:80px">药店名称</th>
					<th style="width:80px">价格</th>
					<th style="width:120px">药店所在地</th>
											
				</tr>
				<c:forEach items="${ListInfo}" var="item">
					<tr>
						<td>${item.InstitutionID}</td>
						<td>${item.InstitutionName}</td>
						<td>${item.Price}</td>
						<td>${item.AreaPathName}</td>							
					</tr>
				</c:forEach>
			</table>
		</div>
	</div>
</body>
</html>