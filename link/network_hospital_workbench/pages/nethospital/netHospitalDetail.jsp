<%@ page language="java" import="java.util.*"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>网络医院诊室管理</title>
	<script type="text/javascript" src="<%=basePath%>js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/layer/layer.js"></script>
	<script type="text/javascript">
	var AddToOnoff = true;
	var deleteOnoff = true;
	function showConsultRoomDiv(){
		AddToOnoff = true;
		layer.open({
			  type: 1, 
			  title:"请填写诊室信息",
			  content: '<div id="addConsultRoom" class="addConsultRoom"><div class="InputBox1 clearfix"><span>诊室名称:</span><input type="text" id="ConsultRoomName"></div><div class="InputBox2 clearfix"><span>视频ID:</span><input type="text" id="VideoID"></div><input type="button" value="保存" onclick="addConsultRoom();" class="Preservation"></div>' ,
			  closeBtn: 1
			});
	}
	function showConsultRoomDivEdit(element){
		layer.open({
			  type: 1, 
			  title:"请填写诊室信息",
			  content: '<div id="addConsultRoom" class="addConsultRoom"><div class="InputBox1 clearfix"><span>诊室名称:</span><input type="text" id="ConsultRoomName"><input type="hidden" id="ConsultRoomID"></div><div class="InputBox2 clearfix"><span>视频ID:</span><input type="text" id="VideoID"></div><input type="button" value="保存" onclick="editConsultRoom();" class="Preservation"></div>' ,
			  closeBtn: 1
			});
		var ConsultRoomName = $(element).parents("tr").find(".ConsultRoomName").text();
		var VideoID = $(element).parents("tr").find(".VideoID").text();
		var ConsultRoomID = $(element).parents("tr").find(".ConsultRoomID").text();
		$("#ConsultRoomName").val(ConsultRoomName);
		$("#VideoID").val(VideoID);
		$("#ConsultRoomID").val(ConsultRoomID);
	}
	function addConsultRoom(){
		if(AddToOnoff){
			AddToOnoff = false;
			var ConsultRoomName = $("#ConsultRoomName").val();
			var VideoID = $("#VideoID").val();
			if(ConsultRoomName == ""){
				layer.msg('请输入诊室名称！', {icon: 2});
				AddToOnoff = true;
				return;
			}
			if(VideoID == ""){
				layer.msg('请输入视频ID！', {icon: 2});
				AddToOnoff = true;
				return;
			}
			if(VideoID.length > 200){
				layer.msg('视频ID长度应小于200！', {icon: 2});
				AddToOnoff = true;
				return;
			}
			console.log(AddToOnoff)
			var HospitalID = $("#HospitalID").val();
			var HospitalName = $("#HospitalName").val();
			$.post("<%=basePath%>nethospital/addConsultRoom", {
				ConsultRoomName:ConsultRoomName,
				VideoID:VideoID,
				HospitalID:HospitalID,
				HospitalName:HospitalName,
				r:Math.random()
			}, function(data) {
				if(data.Status == 200){
					layer.msg('保存成功！', {icon: 1});
					setTimeout(function(){
						location.reload();
					},1500);
				} else {
					layer.msg('保存失败，'+ data.Message, {icon: 2});
					AddToOnoff = true;
				}
			});
		}
	}
	function editConsultRoom(){
		var ConsultRoomName = $("#ConsultRoomName").val();
		var HospitalID = $("#HospitalID").val();
		var VideoID = $("#VideoID").val();
		var ConsultRoomID = $("#ConsultRoomID").val();
		if(ConsultRoomName == ""){
			layer.msg('请输入诊室名称！', {icon: 2});
			return;
		}
		if(ConsultRoomName.length>11){
			layer.msg('诊室名称长度应小于11', {icon: 2});
			return;
		}
		if(VideoID == ""){
			layer.msg('请输入视频ID！', {icon: 2});
			return;
		}
		if(VideoID.length > 200){
			layer.msg('视频ID长度应小于200！', {icon: 2});
			return;
		}
		$.post("<%=basePath%>nethospital/changeConsultRoom", {
			ConsultRoomName:ConsultRoomName,
			VideoID:VideoID,
			HospitalID:HospitalID,
			ConsultRoomID:ConsultRoomID,
			r:Math.random()
		}, function(data) {
			if(data.Status == 200){
				layer.msg('修改成功！', {icon: 1});
				setTimeout(function(){
					location.reload();
				},1500);
			} else {
				layer.msg('修改失败，'+ data.Message, {icon: 2});
			}
		});
	}
	function deleteConsultRoom(element){
		deleteOnoff = true;
		layer.confirm('您确定要删除<font color=red>'+$(element).parents("tr").find(".ConsultRoomName").text()+'</font>吗？', {
			  btn: ['删除','取消'] //按钮
			}, function(){
				if(deleteOnoff){
					deleteOnoff = false;
					$.ajax({
						type:'POST',
						url:'<%=basePath%>nethospital/deleteConsultRoom',
						dataType:'json',
						data:{ConsultRoomID:$(element).parents("tr").find(".ConsultRoomID").text()},
						success:function(data){
							if(data.Status == 200){
								layer.msg('删除成功', {icon: 1});
								setTimeout(function(){
									location.reload();
								},1500);
							}else{
								layer.msg('删除失败,'+ data.Message, {icon: 2});
								deleteOnoff = true;
							}					
						},
						error:function(){
							layer.msg('删除失败', {icon: 2});
						}
					});	
				}		  
			});
	}
	</script>
	<link rel="stylesheet" href="<%=basePath%>css/osms_base_161101.css">
	
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
		
		
		/* 自定义弹出层样式 */
		.addConsultRoom{
			margin: 30px 50px;
		}
		.addConsultRoom span{
			font: 14px "微软雅黑";
			float: left;
			margin-right:10px;
		}
		.addConsultRoom input,.addConsultRoom .Preservation{
			float: right;
		}
		.addConsultRoom div{
			margin-top: 10px;
		}
		.addConsultRoom .Preservation{
			width: 58px;
			height: 28px;
			border-radius: 2px;
			border: 1px solid #4898d5;
			background-color: #2e8ded;
			font: 14px/28px "微软雅黑";
			color: #fff;
			text-align: center;
			cursor: pointer;
			margin:10px;
		}
		.clearfix:after{
			content: "";
			display: block;
			clear: both;
		}
	</style>
</head>
<body>

<div class="container">
	<div id="top" class="title">${HospitalName}</div>
	<input type="hidden" name="HospitalID" id="HospitalID" value="${HospitalID}">
	<input type="hidden" name="HospitalName" id="HospitalName" value="${HospitalName}">
	<div class="btn" >				
		<input type="button" value="添加诊室" onclick="showConsultRoomDiv()" />					
	</div>		
	${page}		
	<div style="clear:both;">
		<table>
			<tr>
				<th>诊室ID</th>
				<th>诊室名称</th>
				<th>视频ID</th>			
				<th>创建时间</th>
				<th>操作</th>				
			</tr>
			<c:forEach items="${ConsultRoomList}" var="item">
				<tr>
					<td class="ConsultRoomID">${item.ConsultRoomID}</td>
					<td class="ConsultRoomName">${item.ConsultRoomName }</td>
					<td class="VideoID">${item.VideoID }</td>			
					<td>${item.RecordCreateTime}</td>
					<td class="handleColumn">
						<a href="javascript:void(0)" onclick="showConsultRoomDivEdit(this)">编辑</a>
						<a href="javascript:void(0)" onclick="deleteConsultRoom(this)">删除</a>
					</td>					
				</tr>
			</c:forEach>
		</table>
	</div>
</div>
</body>
</html>
