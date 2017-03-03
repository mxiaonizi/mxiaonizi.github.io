<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
  <head>
    
    <title>用户列表</title>
    
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
    <script src="../js/layer/layer.js"></script>
	
    <!-- 网络医院公共样式库  -->
	<script type="text/javascript" src="../js/common.js"></script>        
	<link rel="stylesheet" href="../css/common.css" />	
    
    <link rel="stylesheet" href="../css/main.css"/>
	<script type="text/javascript">
	function showPageData(pageNum){
		$("#fm").attr("action","<%=basePath%>staff/getStaffList?pageIndex="+pageNum);
		fm.submit();
	} 
	function modifyStaff(StaffID){
		window.parent.parent.window.addTab("用户修改","${pageContext.request.contextPath}/staff/modifyStaffInit?StaffID="+StaffID);	
	}
	function deleteStaff(StaffID){
		var tip="确定删除吗？";
		layer.confirm(tip, {
            btn: ['确定','取消'] //按钮
        }, function(){
            $.post("<%=basePath%>staff/deleteStaff",
                {StaffID:StaffID},
                function(d){
                    if(d.Status == 200){
                        layer.msg('操作成功', {icon: 1});
                        setTimeout(function(){
    						location.reload();
    					},1500);
                    }else{
                        layer.msg('操作失败', {icon: 2});
                    }
                });
        });
	}
	</script>
  </head>
  
  <body>
  <input type="hidden" id="pageIndex" />	
    <div class="container col-md-12 contentBox">
        <div class="lepu-box">
	        <form id='fm' action="" method="post">
	        	<div class="lepu-m-form">
	          	<p class="lepu-u-title" style="background:#1eb4ab">筛选条件</p>
	          	<div class="lepu-u-box f-ofh" style="height:75px;">
		          	<ul style="width:1200px">
		          		<li class="lepu-u-tag">姓名：</li>
		          		<li><input style="width:200px" type="text" name="StaffName" value="${StaffName }"/></li>
		          		<li class="lepu-u-tag">注册手机：</li>
		          		<li><input style="width:200px" type="text" name="MobilePhone" value="${MobilePhone }"/></li>
		          		<li class="lepu-u-tag">角色：</li>
		          		<li> 
			          		<select style="width:150px" name="RoleID">
			          			<option value="-1" <c:if test="${RoleID == -1 }">selected</c:if> >请选择</option>
				          		<c:forEach items="${RoleList }" var="item">
				          			<option value="${item.RoleID }"  <c:if test="${RoleID == item.RoleID }">selected</c:if> >${item.RoleName }</option>
				          		</c:forEach>
			          		</select> 
		          		</li>
		          		<li style="float:right">
		          			<input type="button" value="查询" onclick="showPageData(1)" class="btn-primary" style="min-width:90px;width:90px;height:40px;">
		          		</li>
		          	</ul>
	          	</div>
          	</form>
       </div>
       <div class="lepu-u-box lepu-u-tab" style="padding:0px;">
           <table class="table table-bordered">
               <thead>
                   <tr>
                   	   <th>用户ID</th>
                       <th>姓名</th>
                       <th>性别</th>
                       <th>注册手机</th>
                       <th>角色</th>
                       <th>邮箱</th>
                       <th>操作</th>
                   </tr>
               </thead>
               <tbody>
                  <c:forEach items="${StaffList}" var="item">
                   <tr>
                       <td>${item.StaffID}</td>
                       <td>${item.StaffName}</td>
                       <td>
                       	   <c:if test="${item.Gender eq 1}">男</c:if>
                       	   <c:if test="${item.Gender eq 2}">女</c:if>
                       </td>
                       <td>${item.MobilePhone}</td>
                       <td>${item.RoleName}</td>
                       <td>${item.Email}</td>
                       <td>
                       <a style="text-decoration:underline;color: #1EB4AB" href="javascript:deleteStaff('${item.StaffID }')">删除</a>
                       <a style="text-decoration:underline;color: #1EB4AB" href="javascript:modifyStaff('${item.StaffID }')">修改</a>
                       </td>
                   </tr>
                   </c:forEach>
               </tbody>
           </table>
        </div>
        <div class="lepu-m-page" style="margin-bottom:50px;">${page }</div>
	</div>
</body>
</html>
