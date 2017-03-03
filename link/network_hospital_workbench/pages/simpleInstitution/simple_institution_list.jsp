<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>网络医院服务站列表</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" href="css/osms_base_161101.css">
	<!-- <link rel="stylesheet" href="css/control.css"> -->
 	<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
	
 	<!-- <script type="text/javascript" src="js/common/common.js"></script>
	<script type="text/javascript" src="js/common/link_pop_window.js"></script> -->
	
	<!-- 实现三级联动 -->
	<script type="text/javascript" src="js/common2/area.js"></script>
 	<script type="text/javascript" src="js/common2/location.js"></script>
 	<script type="text/javascript" src="js/common2/select2.js"></script>
 	<script type="text/javascript" src="js/common2/select2_locale_zh-CN.js"></script>
 	<link href="js/common2/select2.css" rel="stylesheet"/>
  </head>
  <body>
   <div class="container">
		<div class="title">网络医院服务站列表</div>
		<form action="simpleinstitution/getSimpleInstitutionList" method="post" id="fm" name="fm">
		<ul class="cont clearfix" style="width:auto">
			<!--  <li>所&nbsp;属&nbsp;项&nbsp;目：
			    <select name="ApplicationID" id="ApplicationID">
					<option value=''>-请选择-</option>
			    </select>
			 </li> -->
			 <li>服务站类型：
			    <select name="InstitutionType" id="InstitutionType" style="margin-top:8px;">
					<option value='' selected>-请选择-</option>
					<option value='2' <c:if test="${InstitutionType eq '2'}">selected</c:if>>-药店-</option>
					<option value='8' <c:if test="${InstitutionType eq '8'}">selected</c:if>>-诊所-</option>
			    </select>
			 </li>
			<li>服务站名称：<input type="text" id="InstitutionName" name="InstitutionName" value="${InstitutionName }"></li>
			
			<li>服务站状态：
			    <select name="NHStatus" style="margin-top:8px;">
			    	<option value='' selected>-请选择-</option>
			    	<option value="0" <c:if test="${NHStatus eq '0'}">selected</c:if>>未填写</option>
					<option value="1" <c:if test="${NHStatus eq '1'}">selected</c:if>>已营业</option>
					<option value="2" <c:if test="${NHStatus eq '2'}">selected</c:if>>终止营业(不统计)</option>
					<option value="3" <c:if test="${NHStatus eq '3'}">selected</c:if>>已签约</option>
					<option value="4" <c:if test="${NHStatus eq '4'}">selected</c:if>>已投放设备</option>
					<option value="5" <c:if test="${NHStatus eq '5'}">selected</c:if>>终止营业(仍统计)</option>					
			    </select>
			 </li>
			 <li>经理姓名：<input type="text" id="ContactName" name="ContactName" value="${ContactName }"></li>
			 <li>陪诊人姓名：<input type="text" id="AssistantName" name="AssistantName" value="${AssistantName }"></li>
			<li class="location" style="clear:both; width:720px;height:30px;margin-top:20px;">
				<span class="lcoate label">所&nbsp;&nbsp;在&nbsp;&nbsp;地：&nbsp;&nbsp;</span>
			 	<select id="loc_province" style="width:173px; height:22px;"></select>
			 	<select id="loc_city" style="width:155px; margin-left:16px"></select>
				<select id="loc_town" style="width:155px;margin-left:16px"></select>
			 	<input type="hidden"  id="ProvinceID" name="ProvinceID" value="${ProvinceID}"></input>
			 	<input type="hidden"  id="CityID" name="CityID" value="${CityID}"></input>
			 	<input type="hidden"  id="TownID" name="TownID" value="${TownID}"></input>
			 	<input type="hidden"  id="AreaID" name="AreaID" value="${AreaID}"></input>
				
			</li>
		</ul>
		</form>
		<div class="btn">
			<a href="javascript:void(0)"><input type="button" id="query" value="查询" onclick="getExpertList()"></a>
		</div>
		
		<table>
			<tr>				
				<th>服务站名称</th>
				<th>服务站类型</th>
				<th>服务站状态</th>
				<th>经理电话</th>
				<th>经理姓名</th>
				<th style="width: 300px">所在地区</th>
				<th>详细地址</th>
				<th>陪诊电话</th>
				<!-- <th>服务站传真</th> -->
				<th>陪诊人姓名</th>
				<th>操作</th>
			</tr>
			<c:forEach items="${institutionList }" var="item">
			<tr>
				<td>${item.InstitutionName }</td>
				<td>${item.TypeTitle }</td>
				<td>				
					<c:if test="${item.NHStatus eq '0'}">未填写</c:if>
					<c:if test="${item.NHStatus eq '1'}">已营业</c:if>
					<c:if test="${item.NHStatus eq '2'}">终止营业(不统计)</c:if>
					<c:if test="${item.NHStatus eq '3'}">已签约</c:if>
					<c:if test="${item.NHStatus eq '4'}">已投放设备</c:if>
					<c:if test="${item.NHStatus eq '5'}">终止营业(仍统计)</c:if>
				</td>
				<td>${item.ContactPhone }</td>
				<td>${item.ContactName }</td>
				<td>${item.AreaPathName }</td>
				<td>${item.Address}</td>
				<td>${item.Phone}</td>
				<%-- <td>${item.Fax}</td> --%>
				<td>${item.AssistantName}</td>
				<td>
					<%-- <a data-tabtitle="网络医院服务站点详情" data-menu="" href="simpleinstitution/getSimpleInstitutionDetail?InstitutionID=${item.InstitutionID }">详情</a> --%>
					<%-- <a data-tabtitle="查看药品" data-menu="" href="nhMedicineManagement/getMedicineList?InstitutionID=${item.InstitutionID }&InstitutionName=${item.InstitutionName}&GotoSearch=1">查看药品</a> --%>
					<a href="javascript:getDetailTab('${item.InstitutionID }')">详情</a>
					<a href="javascript:getMedicineTab('${item.InstitutionID }','${item.InstitutionName}')">查看药品</a>
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
	<script type="text/javascript">
		$(document).ready(function() {
			getApplicationIDList();
			showLocation();
			
			if ($("#ProvinceID").val() != "") {
				$("#loc_province").val($("#ProvinceID").val()).change();
				
				!function(){
					var CityID=$("#CityID").val();
					if(CityID!=""){
						$("#loc_city").val(CityID).change();
						var TownID=$("#TownID").val();
						if(TownID!=""){
							$("#loc_town").val(TownID).change();
						}
					}			
				}();
			}		
			
		});
		function showPageData(pageNum){
			$("#fm").attr("action","simpleinstitution/getSimpleInstitutionList?pageIndex="+pageNum);
			fm.submit();
		}
		function getExpertList(){
			if($("#InstitutionName").val().trim() == ""){
				$("#InstitutionID").val('');
			}
			var areaID=$("#AreaID");		
			var TownID=$('#loc_town').val();
			var CityID=$('#loc_city').val();
			var ProvinceID=$('#loc_province').val();
			$("#TownID").val(TownID);
			$("#CityID").val(CityID);
			$("#ProvinceID").val(ProvinceID);
			if(TownID != null && TownID != ''){
				areaID.val(TownID);			
			}else{
				if(CityID != null && CityID != ''){
					areaID.val(CityID);				
				}else{
					if(ProvinceID != null  && ProvinceID != ''){
						areaID.val(ProvinceID);					
					} else {
						areaID.val("");	
					}	
				}	
			}		
			$("#fm").submit();
		}
		function getApplicationIDList(){
			$.post("simpleinstitution/getApplicationIDList", {
				r:Math.random()
			}, function(data) {			
				var ApplicationIDTmp = "${ApplicationID}";
				if(ApplicationIDTmp==null || ApplicationIDTmp==""){
					ApplicationIDTmp=0;
				}
				var listInfo = data.ListInfo;
				for(var i=0; i<listInfo.length; i++){
					if(listInfo[i].ApplicationID == ApplicationIDTmp){
						$("#ApplicationID").append("<option value='" + listInfo[i].ApplicationID + "' selected>" + listInfo[i].ApplicationName + "</option>");
					} else {
						$("#ApplicationID").append("<option value='" + listInfo[i].ApplicationID + "'>" + listInfo[i].ApplicationName + "</option>");
					}
				}
			});
		}
		function getMedicineTab(InstitutionID,InstitutionName){
			window.parent.parent.window.addTab2("查看药品","${pageContext.request.contextPath}/nhMedicineManagement/getMedicineList?InstitutionID="+InstitutionID+"&InstitutionName="+InstitutionName+"&GotoSearch=1");		
		}
		function getDetailTab(InstitutionID){
			window.parent.parent.window.addTab2("网络医院服务站详情","${pageContext.request.contextPath}/simpleinstitution/getSimpleInstitutionDetail?InstitutionID="+InstitutionID);
		}
	</script>
  </body>
</html>
