<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
  <head>
    
    <title>问题反馈列表</title>
    
	 <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />  <!--主要是针对IE浏览器的一个设置-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-control" content="no-cache">
	<meta http-equiv="Cache" content="no-cache">
	
	<link rel="stylesheet" href="../css/reset.css"/>
    <link rel="stylesheet" href="../css/bootstrap.min.css"/>
    <script type="text/javascript" src="../js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../js/bootstrap.min.js"></script>
    
    <!--省市区三级联动 -->
	<script src="../../../js/common2/area.js"></script>
	<script src="../../../js/common2/location.js"></script>
	<script src="../../../js/common2/select2.js"></script>
	<script src="../../../js/common2/select2_locale_zh-CN.js"></script>
	<link href="../../../js/common2/select2.css" rel="stylesheet"/>
	
	<!--日期选择插件 -->
	<script src="../../../js/My97DatePicker/WdatePicker_161206.js"></script>
	
    <!-- 网络医院公共样式库  -->
	<script type="text/javascript" src="../js/common.js"></script>        
	<link rel="stylesheet" href="../css/common.css" />	
    
    <link rel="stylesheet" href="../css/main.css"/>
	<script type="text/javascript">
	
	$(function(){
		$("#loc_province").val($("#loc_province_id").val()).change();
		$("#loc_city").val($("#loc_city_id").val()).change();
		$("#loc_town").val($("#loc_town_id").val()).change();
		
		$("#loc_province").change(function(){
			$("#loc_province_id").val($(this).val());
		});
		$("#loc_city").change(function(){
			$("#loc_city_id").val($(this).val());
		});
		$("#loc_town").change(function(){
			$("#loc_town_id").val($(this).val());
		});
	})
	
	function showPageData(pageNum){
		$("#iframeList").attr("action","${pageContext.request.contextPath}/advice/list?pageIndex="+pageNum);
		$("#iframeList").submit();
	} 
	/* console.log($(".table tbody tr")) */
	function detail22(p_adviceID){
		window.parent.parent.window.addTab2("留言详情","${pageContext.request.contextPath}/advice/detail?adviceID="+p_adviceID);		
	}
	</script>
  </head>
  
  <body>
  <input type="hidden" id="pageIndex" />	
    <div class="container col-md-12 contentBox">
        <div class="lepu-box">
	        <form id='iframeList' action="" method="post">
	        	<div class="lepu-m-form">
	          	<p class="lepu-u-title" style="background:#1eb4ab">筛选条件</p>
	          	<div class="lepu-u-box f-ofh">
	          		<ul>
		          		<li class="lepu-u-tag">开始时间：</li>
		          		<li><input name="beginTime" value="${beginTime }" id="d5221" style="width: 120px;height: 30px; border: 1px solid #d6d6d8;" class="Wdate" type="text" onFocus="var d5222=$dp.$('d5222');WdatePicker({onpicked:function(){d5222.focus();},maxDate:'#F{$dp.$D(\'d5222\')}',dateFmt:'yyyy-MM-dd'})"/>
		          		<li class="lepu-u-tag">结束时间：</li>
		          		<li><input name="endTime" value="${endTime }" id="d5222"  style="width: 120px;height: 30px; border: 1px solid #d6d6d8;" class="Wdate" type="text" onFocus="WdatePicker({minDate:'#F{$dp.$D(\'d5221\')}',dateFmt:'yyyy-MM-dd'})"/></li>
		          		<li class="lepu-u-tag">所在地：</li>
		          		<li>
		          		    <input type="hidden" id="loc_province_id" name="provinceID" value="${provinceID }">
		          		    <input type="hidden" id="loc_city_id" name="cityID" value="${cityID }">
		          		    <input type="hidden" id="loc_town_id" name="townID" value="${townID }">
			          		<select id="loc_province" style="width:100px; height: 25px;"></select>
							<select id="loc_city" style="width:100px;  height: 25px; margin-left:10px"></select>
							<select id="loc_town" style="width:100px;  height: 25px; margin-left:10px"></select>
						</li>
		          	</ul>
		          	<br>
		          	<ul>
		          		<li class="lepu-u-tag">留言标题：</li>
		          		<li><input style="width:200px" type="text" name="keywords" value="${keywords }"/></li>
		          		<li class="lepu-u-tag">状态：</li>
		          		<li> 
			          		<select style="width:150px" name="replyStatus">
			          		<option value="-1" <c:if test="${replyStatus==-1 }">selected</c:if> >-请选择-
			          		<option value="0" <c:if test="${replyStatus==0 }">selected</c:if> >未处理
			          		<option value="1" <c:if test="${replyStatus==1 }">selected</c:if> >已处理
			          		</select> 
		          		</li>
		          		<li style="margin-left: 150px;">
		          		<input type="button" value="查询" onclick="showPageData(1)" class="btn-primary" style="min-width:90px;width:90px;height:40px;">
		          		</li>
		          	</ul>
		          	<!-- <div class="btnBox" style="width:auto ;padding-left:20px;"><input type="button" value="查询" onclick="showPageData(1)" class="btn-primary" style="min-width:90px;width:90px;height:40px;"></div> -->
	          	</div>
          	</form>
       </div>
       <div class="lepu-u-box lepu-u-tab" style="padding:0px;">
           <table class="table table-bordered">
               <thead>
                   <tr>
                   		<th>序号</th>
                       <th>状态</th>
                       <th>时间</th>
                       <th>药店名称</th>
                       <th>经理姓名</th>
                       <th style="width:700px;" >标题</th>
                       <th>操作</th>
                   </tr>
               </thead>
               <tbody>
                  <c:forEach items="${AdviceList}" var="item" varStatus="stu">
                   <tr>
        		  		<td class="pageNum">${(stu.index+1) + pageSize* (pageIndex-1)  }</td>
                       <td><c:if test="${item.ReplyStatus == 0}"><span style="color: red;">未处理</span></c:if> <c:if test="${item.ReplyStatus == 1}">已处理</c:if></td>
                       <td>${item.RecordCreateTime}</td>
                       <td>${item.InstitutionName}</td>
                       <td>${item.ContactName}</td>
                       <td>${item.AdviceTitle}</td>
                       <td><a style="text-decoration:underline;color: #1EB4AB" href="javascript:detail22('${item.AdviceID }')">查看详情</a></td>
                   </tr>
                   </c:forEach>
               </tbody>
           </table>
        </div>
        <div class="lepu-m-page" style="margin-bottom:50px;">${page }</div>
	</div>
</body>
</html>
