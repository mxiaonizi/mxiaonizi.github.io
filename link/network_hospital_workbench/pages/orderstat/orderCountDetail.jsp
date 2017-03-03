<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/WEB-INF/authTag.tld" prefix="auth"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <base href="<%=basePath%>">
        <link rel="stylesheet" href="css/osms_base_161101.css" />
    </head>
    <body>
        <div class="container">
			<div class="lepu-m-page">
				${page}
			</div>
            <table>
                <tr>
                    <th>订单编号</th>
                    <th>订单状态</th>
                    <th>患者姓名</th>
                    <th>手机号</th>
                    <th>专家姓名</th>
                    <th>就诊时间</th>
                    <th>就诊类型</th>
                    <th>医院</th>
                    <th>诊室</th>
                    <th width="5%">就诊预约排序</th>
                    <th>预约操作人</th>
                    <th>初/复诊</th>
                    <th>填写病历</th>
                    <th>处方情况</th>
                    <th>是否合格</th>
                    <th>站点机构</th>
                    <th>地区</th>
                    <th>最近操作人</th>
                </tr>
                <c:forEach items="${ListInfo}" var="item" varStatus="status">	
	                <tr>
	                    <td class="details_link OrderNumber">
	                    	<a href="javascript:;" style="cursor:default;text-decoration:none;">${item.OrderNumber }</a>
	                    </td>
	                    <td>
							<c:if test="${item.OrderStatus == '4'}">已下单</c:if>
							<c:if test="${item.OrderStatus == '5'}">已取消</c:if>
							<c:if test="${item.OrderStatus == '7'}">完成看诊</c:if>
							<c:if test="${item.OrderStatus == '8'}">已过期</c:if>
							<c:if test="${item.OrderStatus == '10'}">已爽约</c:if>
							<c:if test="${item.OrderStatus == '11'}">待诊</c:if>
							<c:if test="${item.OrderStatus == '12'}">医生做好准备</c:if>
	                    </td>
	                    <td>${item.TrueName }</td>
	                    <td>${item.MobilePhone }</td>
	                    <td>${item.DoctorName }</td>
	                    <td>${item.AppointmentDate } <c:if test="${item.DayPeriod == '1'}">上午</c:if> <c:if test="${item.DayPeriod == '2'}">下午</c:if> ${item.BeginTime } </td> 
	                    <td>
	                    	<c:if test="${item.ServiceType == '1'}">远程会诊</c:if>
	                    	<c:if test="${item.ServiceType == '2'}">专家面诊</c:if>
	                    	                    	                  
	                    </td>
	                    <td>${item.HospitalName}</td>
	                    <td>${item.ConsultRoomName}</td>
	                    <td>
	                           <c:if test="${item.SortForDoctor eq 10000}"></c:if>
	                           <c:if test="${item.SortForDoctor!=10000}">${item.SortForDoctor}</c:if>
	                    </td>
	                    <td>
		                    <c:choose>
					        <c:when test="${item.CreateStaffName=='' }">
					           ${item.InstitutionName }
					            
					        </c:when> 
					        <c:otherwise>
					          ${item.CreateStaffName }
					        </c:otherwise>
					     </c:choose> 
	                    
	                    </td>
	                    <td>
	                    	<c:if test="${item.IsFirstVisit == '1'}">初诊</c:if>
	                  		<c:if test="${item.IsFirstVisit == '2'}">复诊</c:if>                    
	                    </td>
	                     <td class="EMR">
	                    	<c:if test="${item.EMRStatus == '0'}">未填写</c:if>
	                  		<c:if test="${item.EMRStatus == '1'}">暂存</c:if>
	                  		<c:if test="${item.EMRStatus == '2'}">
	                  			<a class="btn btn-info emr_edit" href="javascript:;" onclick="window.parent.parent.window.addTab('查看病例','${pageContext.request.contextPath}/emr/getMyEMRInit?EMRStatus=2&OrderNumber=${item.OrderNumber }')" >已提交</a>
	                  		</c:if>
	                     </td>
	                     <td>
	                    	<c:if test="${item.RecipeStatus == '1'}">有处方</c:if>
	                  		<c:if test="${item.RecipeStatus == '0'}">无处方</c:if>                    
	                     </td>
	                     <td class="z-hgCheck">
	                     	<span class="none_EvaluateContent" style="display: none">${item.EvaluateContent}</span>
	                     	<span class="IsEligible_content">
	                     		<c:if test="${item.IsEligible == '-1'}">未评价</c:if>
	                  		    <c:if test="${item.IsEligible == '0'}">不合格</c:if>  
	                  		    <c:if test="${item.IsEligible == '1'}">合格</c:if>
	                  		    <c:if test="${item.IsEligible == '2'}">有错误</c:if> 
	                     	</span>
	                    </td>
	                   	<td>${item.InstitutionName}</td>
	                   	<td>${item.AreaPathName}</td>
	                   	<td>${item.UpdateStaffName}</td>
	                </tr>
				</c:forEach>
            </table>
        </div>
        <script>
        </script>
    </body>
</html>