<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/WEB-INF/authTag.tld" prefix="auth"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String paramMap = String.valueOf(request.getAttribute("paramMap"));
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>网络医院列表</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link rel="stylesheet" href="<%=basePath%>css/osms_base_161101.css">
	
	<script type="text/javascript" src="<%=basePath%>js/jquery-1.11.1.min.js"></script>
	
	<style type="text/css">
		.dropDiv {
		    background-color: #FFFFFF;
		    position: absolute;
		    z-index: 10000;
		    display: none;
		    cursor: hand;
		    border:1px solid #7F9DB9;
		}
		
		.dropDiv .jhover {
		    background-color: #D5E2FF;
		}
		.dropDiv .list {
		    float:left;
		    width:100%;
		}
		.dropDiv .word {
			float:left;
		}
		
		.dropDiv .view {
			float:right;
			color: gray;
			text-align: right;
			font-size: 10pt;
		}
		.data li{width:300px; margin:5px 0;}
		.data li span{width:100px;}
		
		
	   .bg{
			 background: #000 none repeat scroll 0 0;
		    display: none;
		    left: 0;
		    opacity: 0.7;
		    position: absolute;
		    top: 0;
		}
	   .popbox{
	  	  width: 800px;
		  background: #fff;
		  border: 1px solid #79a8cd;
		  /* position: relative; */
		  position: absolute;
		  left: 50%;
		  margin-left: -400px;
		  top: 200px;
		  z-index: 11;
		  display: none;
		  height: auto;
		}
		.popbox .pop_title{
			
		    background:#337aB7;
		    padding:10px 15px;
		    font-size:16px;
		    color:#fff;
		}
		.popbox .close{
		    position:absolute;
		    transform:rotate(45deg);
		    font-size:30px;
		    right:0;
		    top:0px;
		    cursor:pointer;
		    width:30px;height:30px;
		    border-radius:15px;
		}
		.popbox .btn{
			  margin-top: 132px;
  			margin-left: 78px;
		}
		.m-input-show input,.m-input-show select{
			height: 30px;
			line-height: 30px;
			outline: none;
			text-indent: 5px;
		}
		.m-input-show select{
			width:80px;
		}
		.m-input h2 {
			text-align:center;
			color:#3d5055;
			padding:10px;
		}
		.m-bar {
			height:1px;
			border-bottom:1px solid #9a9a9a;
			margin:20px 0;
		}
		.m-input-show {
			padding:5px 20px;
		}
		.m-info-list{
			padding-bottom:30px;
		}
		.m-info-list ul li{
			padding:10px 10px;
			width:100px;
			text-align:center;
			float:left;
		}
		.none {
			display:none;
		}
		.m-input-show .u-btn-style {
			border:1px solid #9c9c9c;
			background: #337aB7;
			border-radius:5px;
			padding:0 10px;
			border: 1px solid #2268a4;
			color: #fff;
			cursor: pointer;
			font-family: 微软雅黑;
			vertical-align: middle;
		}
		.m-info-list ul {
			padding: 0 20px;
			overflow:hidden;
		}
		.m-info-list {
			font-size:16px;
		}
		.u-original, .u-dis, .u-price{
		   width:138px;
		}
		li.integralBox {
			width:auto;
		}
	</style>
	<script type="text/javascript" src="<%=basePath%>js/layer/layer.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
		    var dataObj = eval(<%=paramMap%>);
			$("#HospitalName").val(dataObj.HospitalName);
			
			$(".addHospital").click(function(){	
				layer.prompt({
				  title: '输入医院名称，并确认',
				  formType: 0
				}, function(pass){
					$.ajax({
						type:'POST',
						url:'<%=basePath%>nethospital/addNetHospital',
						dataType:'json',
						data:{HospitalName:pass},
						success:function(data){
							if(data.Status == 200){
								layer.msg('添加医院成功', {icon: 1});						
								setTimeout(function(){
									location.reload();
								},1500);
							}else{
								if(pass.length>11){
									layer.msg('添加医院失败,医院名称长度限制11个字符', {icon: 2});
								}else{
									layer.msg('添加医院失败,'+ data.Message, {icon: 2});
								}
							}					
						},
						error:function(){
							layer.msg('添加医院失败', {icon: 2});
						}		  
					});
				});
			});
	// 		排序
			$(".sortIndex").click(function(){
				var HospitalID=$(this).parents("tr").find(".HospitalID").text();
				layer.prompt({
				  title: '输入医院序号，并确认',
				  formType: 0
				}, function(pass){
	// 				console.log(parseFloat(pass)<0)
					if(/^[1-9]\d*|0$/g.test(pass) && parseFloat(pass)>=0){
							$.ajax({
								type:'POST',
								url:'<%=basePath%>nethospital/changeNetHospitalSortIndex',
								dataType:'json',
								data:{HospitalID:HospitalID,SortIndex:pass},
								success:function(data){
									if(data.Status == 200){
										layer.msg('更新排序成功', {icon: 1});						
										setTimeout(function(){
											location.reload();
										},1500);
									}else{
										layer.msg('更新排序失败,'+ data.Message, {icon: 2});
									}					
								},
								error:function(){
									layer.msg('更新排序失败', {icon: 2});
								}		  
							});
					}else if(parseFloat(pass)<0){//负数
							layer.msg('更新排序失败,数据不能小于0', {icon: 2});
					}else{
						layer.msg('更新排序失败,数据类型不正确', {icon: 2});
					}
				});
			});
		});
		function showPageData(pageNum){
			$("#fm").attr("action","<%=basePath%>nethospital/getNetHospitalList?PageIndex="+pageNum);
			fm.submit();
		}
		function addNetHospital(){
			$("#fm").submit();
		}
		function deleteHospital(element){
			var HospitalID=$(element).parents("tr").find(".HospitalID").text();
			layer.confirm('您确定要删除<font color=red>'+$(element).parents("tr").find(".HospitalName").text()+'</font>吗？', {
				  btn: ['删除','取消'] //按钮
				}, function(){
					$.ajax({
						type:'POST',
						url:'<%=basePath%>nethospital/deleteNetHospital',
						dataType:'json',
						data:{HospitalID:HospitalID},
						success:function(data){
							if(data.Status == 200){
								layer.msg('删除成功', {icon: 1});
								setTimeout(function(){
									location.reload();
								},1500);
							}else{
								layer.msg(data.Message, {icon: 2});
							}					
						},
						error:function(){
							layer.msg('删除失败', {icon: 2});
						}				
					});//ajax		  
				});//layer
		}
	
		function getDetailTab(HospitalID,HospitalName){
			window.parent.parent.window.addTab2("医院详情","${pageContext.request.contextPath}/nethospital/getNetHospitalDetail?HospitalID="+HospitalID+"&HospitalName="+HospitalName);
		}
	</script>
  </head>
  
  <body>
   <div class="container">
		<div class="title">网络医院列表</div>
		<form action="<%=basePath%>nethospital/getNetHospitalList" method="post" id="fm" name="fm">
		<ul class="cont clearfix">
			<li>医院名称：<input type="text" id="HospitalName" name="HospitalName"></li>
		</ul>
		</form>
		<div class="btn">
			<a href="javascript:void(0)"><input type="button" id="query" value="查询" onclick="showPageData(1)"></a>&nbsp;&nbsp;
			<a href="javascript:void(0)"><input type="button" id="query" value="添加医院" class="addHospital"></a>
		</div>
		<table>
			<thead>
			<tr>			
				<th>医院ID</th>
				<th>医院名称</th>
				<th>医院排序</th>
				<th>创建时间</th>
				<th style="width:25%;">操作</th>
			</tr>
			</thead>
			
			<c:forEach items="${hospitalList }" var="item">
				<tbody>
				<input type="hidden" value="${item }" />
					<tr>
						<td class="HospitalID">${item.HospitalID }</td>
						<td>${item.HospitalName }</td>
						<td>${item.SortIndex }</td>
						<td>${item.RecordCreateTime}</td>
						<td class="handleColumn">
							<a href="javascript:void(0)" class="sortIndex">排序</a>
							<a href="javascript:getDetailTab('${item.HospitalID }','${item.HospitalName }')">详情</a>
							<a href="javascript:void(0)" onclick="deleteHospital(this)">删除</a>
						</td>
					</tr>
				</tbody>
			</c:forEach>
		</table>
		 <div class="lepu-m-page">
	     	<!-- 分页 -->
	    		<%out.print(request.getAttribute("page").toString()); %>
	 		<!-- 分页 -->
 		</div>
	</div>
  </body>
</html>