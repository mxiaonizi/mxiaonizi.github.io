<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
  <head>
    <base href="<%=basePath%>"/>
    
    <title>患者看诊次数统计</title>
    
	<meta content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" name="viewport">
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="black" name="apple-mobile-web-app-status-bar-style">
	<meta content="telephone=no" name="format-detection">
	<link rel="stylesheet" href="../../../css/public.css" />
	<link rel="stylesheet" href="../../../css/reset.css" />
	<link rel="stylesheet" href="../../../css/compare.css" />
	
	<script src="../../../js/jquery-1.11.1.min.js"></script>
	
	
	<!--省市区三级联动 -->
	<script src="../../../js/common2/area.js"></script>
	<script src="../../../js/common2/location.js"></script>
	<script src="../../../js/common2/select2.js"></script>
	<script src="../../../js/common2/select2_locale_zh-CN.js"></script>
	<link href="../../../js/common2/select2.css" rel="stylesheet"/>
  </head>
  <body>
  		<div class="control">
  			<header class="head">
				<span>筛选条件</span>
			</header>
			<ul class="screen clearfix">
				<li class="TimeSlot">
					<p style="display:inline-block;"><span style="color:red">* </span>开始时间：</p>
					<input id="d5221" style="width: 120px;height: 30px; border: 1px solid #d6d6d8;" class="Wdate" type="text" value="${BeginDate }" onFocus="var d5222=$dp.$('d5222');WdatePicker({maxDate:'#F{$dp.$D(\'d5222\')}'})"/>
					<p style="display:inline-block;"><span style="color:red">* </span>结束时间：</p><input id="d5222"  style="width: 120px;height: 30px; border: 1px solid #d6d6d8;" class="Wdate" type="text" value="${EndDate }" onFocus="WdatePicker({minDate:'#F{$dp.$D(\'d5221\')}'})"/>
				</li>
				
				<li class="region">
					<p style="display:inline-block;"><span>所在地：</span></p>
					<select id="loc_province" style="width:100px; height: 25px;"></select>
					<select id="loc_city" style="width:100px;  height: 25px; margin-left:10px"></select>
					<select id="loc_town" style="width:100px;  height: 25px; margin-left:10px"></select>
				</li>
				
				<li class="frequency">
					<p style="display:inline-block;"><span style="color:red">* </span>看诊次数：</p>
					<select id="ChoiceNum">
						<option value="">请选择</option>
						<option value="2">看诊&gt;=2次</option>
						<option value="3">看诊&gt;=3次</option>
						<option value="4">看诊&gt;=4次</option>
						<option value="5">看诊&gt;=5次</option>
						<option value="6">看诊&gt;=6次</option>
						<option value="7">看诊&gt;=7次</option>
						<option value="8">看诊&gt;=8次</option>
						<option value="9">看诊&gt;=9次</option>
						<option value="10">看诊&gt;=10次</option>
						<option value="11">看诊&gt;=11次</option>
						<option value="12">看诊&gt;=12次</option>
						<option value="13">看诊&gt;=13次</option>
						<option value="14">看诊&gt;=14次</option>
						<option value="15">看诊&gt;=15次</option>
					</select>
					<p style="display:inline-block;"><span style="margin-left: 20px;">排序：</span></p>
					<select id="sortOption">
						<option value="">请选择</option>
						<option value="desc">由多到少</option>
						<option value="asc">由少到多</option>
					</select>
				</li>
			</ul>
			<form id="form1" action="vcstat/getVCStat?Search=1" method="post">
				<input type="hidden" id="TimeSlotS" name="BeginDate"/>
				<input type="hidden" id="TimeSlotE" name="EndDate"/>
				<input type="hidden" id="SeatOf" name="AreaCond"/>
				<input type="hidden" id="frequency" name="VisitCount"/>
				<input type="hidden" id="sort" name="SortFilter"/>
				<input type="hidden" id="ProvinceID" name="ProvinceID"/>
				<input type="hidden" id="CityID" name="CityID"/>
				<input type="hidden" id="TownID" name="TownID"/>
			</form>
			<div class="analyBox">
				<span class="analyInp">查询</span>
			</div>
		</div>
		<div class="tableBox">
			<p class="patientTotal"></p>
			<table class="tab" cellpadding="0" cellspacing="0">
				<tr>
					<th>时间段</th>
					<th>看诊次数</th>
					<th>患者人数</th>
					<th>患者姓名</th>
					<th>联系方式</th>
				</tr>
				<c:forEach items="${DetailInfo['VCStatResult']}" var="item" varStatus="status">
					<tr class="itamData">
						<c:if test="${status.index==0}">
	                    	<td class="DateTd"  style="width:400px">${DetailInfo.DateField}</td>
	                    </c:if>
					<c:forEach items="${item.value['list']}" var="item2" varStatus="status2">
		                    <c:if test="${status2.index==0}">
		                    	<td rowspan="${item.value.PatientCount}">${item.key}次</td>
		                    </c:if>
		                    <c:if test="${status2.index==0}">
		                    	<td rowspan="${item.value.PatientCount}" class="patientCount">${item.value.PatientCount}人</td>
		                    </c:if>
		                    <td><a class="NameDetails" style="text-decoration:underline" data-url="${pageContext.request.contextPath}/${item2.Url}">${item2.TrueName}</a></td>
		                    <td>${item2.MobilePhone}</td>
		                </tr>
		            </c:forEach>
	            </c:forEach>
            </table>
		</div>
		<input type="hidden" value="${DateCond}" id="DateCondData"/>
		<input type="hidden" value="${AreaCond}" id="AreaCondData"/>
		<input type="hidden" value="${VisitCount}" id="VisitCountData"/>
		<input type="hidden" value="${SortFilter}" id="SortFilterData"/>
		<input type="hidden" value="${ProvinceID}" id="ProvinceIDData"/>
		<input type="hidden" value="${CityID}" id="CityIDData"/>
		<input type="hidden" value="${TownID}" id="TownIDData"/>
		<input type="hidden" value='${DetailInfo.VCStatResult}' id="totalData"/>
		<input type="hidden" value='${DetailInfo}' id="111"/>
		<script src="../../../js/My97DatePicker/WdatePicker_161206.js"></script>
		<script src="../../../js/compare.js"></script>
		<script>
			
			var num = 0;
			var numberData =  $("#totalData").val();
			if(numberData){
				numberData = JSON.parse($("#totalData").val()); ;
				for(var i=0;i<numberData.length;i++){
					num += numberData[i].value.PatientCount;
				}
				$(".DateTd").attr("rowspan",num);
			}
				
// 			看诊次数
			$("#ChoiceNum option").each(function(i,ele){
				if($(ele).val() == $("#VisitCountData").val()){
					$(ele).attr("selected",true);
				}
			});
			
			//排序回显
			$("#sortOption option").each(function(i,ele){
				if($(ele).val() == $("#SortFilterData").val()){
					$(ele).attr("selected",true);
				}
			});
			
			//回显地区
			$(document).ready(function() {
				$("#loc_province").val($("#ProvinceIDData").val()).change();
				$("#loc_city").val($("#CityIDData").val()).change();
				$("#loc_town").val($("#TownIDData").val()).change();
			});
			
			
			$(".NameDetails").click(function(){
				var url=this.getAttribute("data-url");
				window.parent.addTab2("看诊详情",url);
			});
			/* 患者人数汇总 */
			var patientTotal=0;
			$("table .patientCount").each(function(index,item){
				var text=$(item).html();
				patientTotal+=parseInt(text.substring(0,text.length-1));
			})
			if($("#VisitCountData").val()){
				$(".patientTotal").html("当前看诊>="+$("#VisitCountData").val()+"次的总人数："+patientTotal+"人");
			}
			
			
		</script>
  </body>
</html>
