<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String paramMap = String.valueOf(request.getAttribute("paramMap"));
%>

<!DOCTYPE>
<html>
  <head>
    <base href="<%=basePath%>">    
    <title>药品管理</title>    
	<meta name="pragma" content="no-cache">
	<meta name="cache-control" content="no-cache">
	<meta name="expires" content="0">    
	<meta name="keywords" content="keyword1,keyword2,keyword3">
	<meta name="description" content="This is my page">
    
    <link rel="stylesheet" href="../../../css/reset.css"/>
    <link rel="stylesheet" href="../../../css/bootstrap.min.css"/>
    <script type="text/javascript" src="../../../js/jquery-1.11.1.min.js"></script>   
    <link rel="stylesheet" href="../../../css/statistics.css"/>
    <link rel="stylesheet" href="../../../css/page.css"/>    
    <!-- 公共  -->
	<script type="text/javascript" src="../../../js/common.js"></script>        
	<link rel="stylesheet" href="../../../css/common.css" />
	
	<!-- <script type="text/javascript">
		//导出Excel
		function exportExcel() {
			alert("hheh");
			$("#fm").attr("action","prestat/exportOrderList");
			fm.submit(); 
		}
    </script>  --> 	
  </head>  
  <body>
  <div class="content">
  <form  method="post" id="fm" name="fm">
  	<input type="hidden" name="BeginDate" id="BeginDate"/>
     <input type="hidden" name="EndDate" id="EndDate"/>
     <input type="hidden" name="DoctorID" id="DoctorID"/>
     <input type="hidden" name="DoctorName" id="DoctorName"/>
     <input type="button" name="exportExcelButton" id="exportExcelButton" onclick="exportExcel();" value="导出Excel"/>
  </form>
     
     
     <div class="table-box">
            <table class="table table-bordered">
                <thead><tr>
                <th>订单编号</th>
                <th>医生姓名</th>
                <th>看诊日期</th>
                <th>患者姓名</th>
                <th>病历填写</th>
                <th>处方价格</th>              
                </tr></thead>
                <tbody>
                <c:forEach items="${ListInfo}" var="item">
                <tr>                  
                    <td>${item.OrderNumber}</td>
                    <td>${item.DoctorName}</td>
                    <td>${item.ScheduleDate}</td>                    
                    <td>${item.TrueName}</td> 
                    <td><c:if test="${item.EMRStatus eq 0}">未填写</c:if>
	                    <c:if test="${item.EMRStatus eq 1}">暂存</c:if>
	                    <%-- <c:if test="${item.EMRStatus eq 2}">已提交</c:if></td> --%>	                    
	                    <c:if test="${item.EMRStatus eq 2}"><a class="btn btn-info emr_edit showOrder" style="padding: 3px 7px;color: #fff;background: #5BC0DE;border-radius: 4px;" data-url="${pageContext.request.contextPath}/emr/getMyEMRInit?EMRStatus=2&UserID=${item.UserID}&OrderNumber=${item.OrderNumber}">已提交</a></c:if>
	                </td>
	                <td>${item.TotalPrice}</td>                            
                </tr>
                </c:forEach>
                </tbody>
            </table>
           <div class="lepu-m-page">
            <!-- 分页 -->
	   		<%out.print(request.getAttribute("page").toString()); %> 
			<!-- 分页 -->
			</div>
        </div>
    </div>
    <script type="text/javascript">
  
	  $(document).ready(function() {			
		    var dataObj = eval(<%=paramMap%>);
			$("#DoctorName").val(dataObj.DoctorName);
			$("#DoctorID").val(dataObj.DoctorID);
			$("#BeginDate").val(dataObj.BeginDate);
			$("#EndDate").val(dataObj.EndDate);	
		});	  
	  
		function showPageData(pageNum){		
			$("#fm").attr("action","prestat/getOrderList?PageIndex="+pageNum);
			fm.submit();
		}
		//导出Excel
		function exportExcel() {			
			$("#fm").attr("action","prestat/exportOrderList");
			fm.submit();
		}
		
		$(".showOrder").click(function(){			
			var url=this.getAttribute("data-url");
			window.parent.addTab2("查看电子病历",url);
		});
    </script>
    
  </body>
</html>
