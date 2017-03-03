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
	<title>药品管理</title>
	<link rel="stylesheet" href="css/osms_base_161101.css">	
<!-- 	<link rel="stylesheet" href="css/osms/list.css"> -->
<!-- 	<style>table input{cursor:pointer}.disabled{border:0;background:transparent;text-align:center}</style>	 -->
</head>
<body>
<div class="container">
	<div id="top" class="title">药品合并</div>
	<form action="" method='post' id="netHospital_form">		
		<div style="overflow:hidden"><input type="hidden" id="SourceMedicineID" value="${SourceMedicineID}">			
			<span>通用名：</span><input type="text" name="GenericName" id="GenericName" value="${SourceGenericName}">			
			<span>商品名：</span><input type="text" name="ProductName" id="ProductName" value="${ProductName}">
			<span>厂商：</span><input type="text" name="Producer" id="Producer" value="${Producer }">			
			<div class="btn" style="display:inline-block;margin-left:30px;">			
				<input type="button" value="查询" id="search"/>							
			</div>
		</div>	
	</form>
	<div class="table_list" style="clear:both;">
		<table>
			<thead>
			<tr>
				<th style="width:60px">药品编号</th>
				<th style="width:80px">大分类</th>
				<th style="width:120px">小分类</th>
				<th>通用名</th>
				<th>商品名</th>				
				<th>厂商</th>
				<th>规格</th>				
				<th style="width:80px">单位</th>
				<th>操作</th>							
			</tr></thead>
			<tbody>
			<c:forEach items="${ListInfo}" var="item">
				<tr>
					<td>${item.MedicineID}</td>
					<td>${item.FirstCategory}</td>
					<td>${item.SecondCategory}</td>
					<td class="GenericName">${item.GenericName}</td>					
					<td>${item.ProductName}</td>
					<td>${item.Producer}</td>
					<td>${item.Packing}</td>
					<td>${item.PackingUnit}</td>					
					<td class="handleColumn">
						<a href="javascript:void(0)" onclick="merge(this)" data-TargetMedicineID="${item.MedicineID}">合并药品</a>												
					</td>			
				</tr>
			</c:forEach></tbody>
		</table>
		<div class="lepu-m-page">
	     	<!-- 分页 -->
	    		${page}
	 		<!-- 分页 -->
 		</div>
	</div>
</div>
	<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>	
	<script type="text/javascript" src="js/layer/layer.js"></script>	
	<script type="text/javascript" src="js/emr/mergeMedicine_160929.js"></script>
</body>
</html>
