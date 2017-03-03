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
	<style>td{overflow:hidden;}table input{cursor:pointer;width:100%}select{width:120px;margin-right:20px}.handleColumn a{text-align:center;}.disabled{border:0;background:transparent;text-align:center}</style>	
</head>
<body>
<div class="container">
	<div id="top" class="title">药品查询</div>
	<form action="" method='post' id="netHospital_form">
		<input type="hidden" name="InstitutionID" value="${InstitutionID }">
		<input type="hidden" name="InstitutionName" value="${InstitutionName }">
		<div style="overflow:hidden">
			<span>药品状态：</span>
			<select class="" name="VerifyStatus" id="VerifyStatus" value="${VerifyStatus}">
				<option value="0" <c:if test="${VerifyStatus eq 0}">selected</c:if> >待审核</option>
				<option value="1" <c:if test="${VerifyStatus eq 1}">selected</c:if> >已审核</option>
				<option value="" <c:if test="${empty VerifyStatus}">selected</c:if> >全部</option>
			</select>
			<span>通用名：</span><input type="text" name="GenericName" id="GenericName" value="${GenericName}">
			<span>商品名：</span><input type="text" name="ProductName" id="ProductName" value="${ProductName}">
			
			<div class="btn" style="display:inline-block;margin-left:30px;">
				<input type="button" value="查询" onclick="javascript:showPageData(1);"/>
			</div>
		</div>
		
	</form>
	<div class="table_list" style="clear:both;margin-top:10px;">
		<table>
			<tr>
				<th style="width:60px">药品编号</th>
				<th style="width:50px">大分类</th>
				<th style="width:90px">小分类</th>
				<th>通用名</th>
				<th>拼音</th>
				<th>商品名</th>				
				<th>厂商</th>
				<th>规格</th>				
				<th style="width:80px">单位</th>
				<th class="price">单价</th>
				<th style="width:200px;">操作</th>
			</tr>
			<c:forEach items="${ListInfo}" var="item">
				<tr>
					<td><input type="hidden" name="MedicineID" value="${item.MedicineID}">${item.MedicineID}</td>
					<td><input type="text" name="FirstCategory" class="disabled" value="${item.FirstCategory}" readonly="readonly" ></td>
					<td><input type="text" name="SecondCategory" class="disabled" value="${item.SecondCategory}" readonly="readonly"></td>
					<td class="GenericName"><input type="text" class="disabled" name="GenericName" value="${item.GenericName}" readonly="readonly"></td>
					<td><input type="text" name="Pinyin" class="disabled" value="${item.Pinyin}" readonly="readonly"></td>					
					<td><input type="text" name="ProductName" class="disabled" value="${item.ProductName}" readonly="readonly"></td>
					<td><input type="text" name="Producer" class="disabled" value="${item.Producer}" readonly="readonly"></td>
					<td><input type="text" name="Packing" class="disabled" value="${item.Packing}" readonly="readonly"></td>
					<td><input type="text" name="PackingUnit" class="disabled" value="${item.PackingUnit}" readonly="readonly" style="width:60px"></td>
					<td class="price"><input type="text" name="Price" class="disabled" value="${item.Price}" readonly="readonly"></td>
					<td class="handleColumn" style="text-align: left;padding-left: 20px;">
						<a href="javascript:void(0)" class="save" style="display:none">保存</a>
						<a href="javascript:void(0)" class="edit" >编辑</a>
						<a href="nhMedicineManagement/getMergeMedicinePage?SourceMedicineID=${item.MedicineID}&SourceGenericName=${item.GenericName}">合并</a>
						
						<c:if test="${item.VerifyStatus eq 0}"><a href="javascript:void(0)" data-medicineID="${item.MedicineID}" class="approval" >核准</a></c:if>
						<%-- <a data-tabtitle="所属药店" data-menu="" href="nhMedicineManagement/getInstitutionByMedicine?MedicineID=${item.MedicineID}">所属药店</a> --%>
						<a href="javascript:getInstitutionByMedicineTab('${item.MedicineID}')">所属药店</a>										
					</td>			
				</tr>
			</c:forEach>
		</table>
		<div class="lepu-m-page">
			${page}
	     	<!-- 分页 -->
	    		<%-- <%out.print(request.getAttribute("page").toString()); %> --%>
	 		<!-- 分页 -->
 		</div>
	</div>
</div>
	<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="js/layer/layer.js"></script>	
	<script type="text/javascript" src="js/emr/medicineManage_20170206.js"></script>
	<script>
		var InstitutionName=$("input[name=InstitutionName]").val();
		if(InstitutionName!=""){
			$("#top").html("药品查询-"+InstitutionName);
		}else{
			$(".price").remove();
		}
		function getInstitutionByMedicineTab(MedicineID){
			window.parent.parent.window.addTab2("所属药店","${pageContext.request.contextPath}/nhMedicineManagement/getInstitutionByMedicine?MedicineID="+MedicineID);
		}
	</script>
</body>
</html>
