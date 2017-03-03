<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>数据分析报告</title>
	<meta content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" name="viewport">
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="black" name="apple-mobile-web-app-status-bar-style">
	<meta content="telephone=no" name="format-detection">
	
	<link rel="stylesheet" href="../../../css/analysisReport_170209.css"/>
	<link rel="stylesheet" href="../../../css/public.css" />
	<link rel="stylesheet" href="../../../css/reset.css" />
	<script src="../../../js/jquery-1.11.1.min.js"></script>
  </head>
  <body>
  		<div class="box">
			<h2>网络医院运营数据分析报告</h2>
			<div class="PreTime">报告时间:<span class="reportTime"></span></div>
			<div class="timeRegion">
				<div class="time">时间阶段：<span>${DetailInfo.OrderStatResult.dateList[0]}</span>至<span>${DetailInfo.OrderStatResult.dateList[DetailInfo.OrderStatResult.dateList.size()-1]}</span></div>
				<div class="Region"><span class="typeName" style="margin:0;color:#878787"></span>
					<c:forEach items="${DetailInfo.OrderStatResult['histoList']}" var="item3">
					    <span>${item3.statObjName}</span>&#44;          
					</c:forEach>
				</div>
			</div>
			<div class="chart">
				<h3>
					<span class="dataCompare">每天数据比较</span>
				</h3>
				<p class="titleText">
					<span class="titleText2">
						<c:forEach items="${DetailInfo.OrderStatResult['histoList']}" var="item3">
							<span>${item3.statObjName}</span>，        
						</c:forEach>
					</span>
				</p>
				<div class="chartBox" style="width:1000px">
					<div id="lineMain" style="width: 98%; height:600px;"></div>
					<!--打印分页 -->
					<div class="PageNext"></div>
					<h3>
						<span class="dataCompare">数据比较</span>
					</h3>
					<p class="titleText">
						<span class="titleText2">
							<c:forEach items="${DetailInfo.OrderStatResult['histoList']}" var="item3">
								<span>${item3.statObjName}</span>，        
							</c:forEach>
						</span>
					</p>
					<div id="barMain" style="width: 98%; height:800px; margin-left:0;"></div>
					<c:forEach items="${DetailInfo.OrderStatResult['lineChartList']}" var="item3">
		               <input type="hidden" class="chart_region" value="${item3.statObjName}"/>
		               <input type="hidden" class="chart_number" value="${item3.totalCount}"/>
		               <input type="hidden" class="chart_Data" value="${item3.data}"/>
		            </c:forEach>
		            <c:forEach items="${DetailInfo.OrderStatResult['histoList']}" var="item4">
		               <input type="hidden" class="line_region" value="${item4.statObjName}"/>
		               <input type="hidden" class="line_number" value="${item4.totalCount}"/>
		            </c:forEach>
				</div>
			</div>
			<!--打印分页 -->
			<div class="PageNext"></div>
			<div class="dataForm">
				<h3>
					<span class="dataCompare">数据比较</span>
				</h3>
				<p class="titleText">
					<span class="titleText2">
						<c:forEach items="${DetailInfo.OrderStatResult['histoList']}" var="item3">
							<span>${item3.statObjName}</span>，        
						</c:forEach>
					</span>
				</p>
				<div id="totalCount" style="text-align:right;font-size:16px;line-height:30px;font-weight: bold;display:none;padding-right:10px;">全国总数: <span></span></div>
				<table class="tab">
							<tr>
								<th>时间段</th>
								<th>订单状态</th>
								<th>初/复诊</th>
								<th>是否合格</th>
								<th style="width:40px">省</th>
								<th style="width:40px">市</th>
								<th style="width:40px">区</th>
								<th>药店名称</th>
								<th style="width:50px">经理姓名</th>
								<th>药店内合计</th>
								<th>省内合计</th>
								<th>接诊量&lt;5</th>
								<th>接诊量=0</th>
							</tr>
							<c:forEach items="${DetailInfo.OrderStatResult['tableResultList']}" var="item">
								<c:forEach items="${item['itemList']}" var="item2" varStatus="status">
								<input type="hidden" id="timeSlot" value="${item2.OrderStatusTxt}"/>
									<tr class="itamData">
					                    <td>${item2.StatDateTxt}</td>
					                    <td>${item2.OrderStatusTxt}</td>
					                    <td>${item2.IsFirstVisitTxt}</td>
					                    <td>${item2.IsEligibleTxt}</td>
					                    <td class="province">${item2.Province}</td>
					                    <td>${item2.City}</td>
					                    <td>${item2.Country}</td>
					                    <td>${item2.ServiceInstitutionName}</td>
					                    <td>${item2.ServiceInstitutionContact}</td>
					                    <c:choose>
					                    	<c:when test="${item2.OrderCount  == 0 and item2.OrderCountTxt != '——'}">
					                    		<td style="background:#ff8db3">${item2.OrderCountTxt}</td>
					                    	</c:when>
					                    	<c:when test="${item2.OrderCount  > 0 and item2.OrderCount  < 5}">
					                    		<td style="background:#ffffb3">${item2.OrderCountTxt}</td>
					                    	</c:when>
					                    	
					                    	<c:otherwise>
					                    		<td>${item2.OrderCountTxt}</td>
					                    	</c:otherwise>
					                    </c:choose>
					                    <c:if test="${status.index==0}">
					                    	<td class="totalOrderCount" style="font:bold 16px '微软雅黑'" rowspan='${item.itemList.size()}'>${item.totalOrderCount}</td>
								            <td class="lessThanFivePercent" style="font:bold 14px '微软雅黑'" rowspan='${item.itemList.size()}'>${item.lessThanFivePercent}</td>
								            <td class="equalZeroPercent" style="font:bold 14px '微软雅黑'" rowspan='${item.itemList.size()}'>${item.equalZeroPercent}</td>
					                    </c:if>
						                 </tr>   
					            </c:forEach>
			                </c:forEach>
						</table>
			</div>
			<!--打印分页 -->
			<div class="PageNext"></div>
			<div class="summary">
				<h3>大数据总结</h3>
				<ul>
					<li>截止当前时间<span class="dateEnd"></span>整体数据如下：</li>
					<li> 营业药店数：<span>${DetailInfo.BigDataSummaryResult.InstitutionCount}</span>家</li>
					<li>患者注册总数<span>${DetailInfo.BigDataSummaryResult.UserTotalCount}</span>人 (男<span>${DetailInfo.BigDataSummaryResult.UserManCount}</span>人；女<span>${DetailInfo.BigDataSummaryResult.UserWomanCount}</span>人；性别未知<span>${DetailInfo.BigDataSummaryResult.UserUnknownCount}</span>人；平均年龄：<span>${DetailInfo.BigDataSummaryResult.UserAvgAge}</span>岁)</li>
					<li>开具处方<span>${DetailInfo.BigDataSummaryResult.PreCount}</span>单； 处方总价<span>${DetailInfo.BigDataSummaryResult.PreTotalPrice}</span>元； 处方均价<span>${DetailInfo.BigDataSummaryResult.PreAvgPrice}</span>元；</li>
				</ul>
				<div class="situation">
					<h4>患者年龄情况：</h4>
					<table class="tab2">
						<tr>
							<th>10岁以下</th>
							<th>11-19岁</th>
							<th>19-29岁</th>
							<th>29-39岁</th>
							<th>39-49岁</th>
							<th>49-59岁</th>
							<th>59-69岁</th>
							<th>70岁以上</th>
						</tr>
						<tr>             
		                    <td>${DetailInfo.BigDataSummaryResult.Age0T10}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Age10T20}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Age20T30}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Age30T40}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Age40T50}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Age50T60}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Age60T70}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.AgeLg70}人</td>
						</tr>
					</table>
				</div>
				<div class="situation">
					<h4>患者疾病情况：</h4>
					<table class="tab2">
						<tr class="textColor">
							<th>高血压</th>
							<th>糖尿病</th>
							<th>血脂异常</th>
							<th>心律失常</th>
							<th>脑血管疾病</th>
							<th>冠心病？</th>
							<th>冠心病需搭桥</th>
							<th>冠心病需支架</th>
							<th>冠心病术后</th>
							<th>冠心病保守治疗</th>
						</tr>
						<tr>
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_GXY}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_TNB}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_XZYC}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_XLSC}人</td>
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_NXGJB}人</td><!-- 脑血管疾病 -->
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_GXBDQZ}人</td><!-- 冠心病？ -->
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_GXBXSS}人</td><!-- 冠心病需搭桥 -->
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_GXBXZJ}人</td><!-- 冠心病需支架 -->
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_GXBZJH}人</td><!-- 冠心病术后 -->
		                    <td>${DetailInfo.BigDataSummaryResult.Ill_GXBBSZL}人</td><!-- 冠心病保守治疗 -->
						</tr>
					</table>
				</div>
				<div class="situation">
					<h4>完成看诊总人次：（<span>${DetailInfo.BigDataSummaryResult.TotalOrderCount}</span>）人次</h4>
					<table class="tab2">
						<tr>
							<c:forEach items="${DetailInfo.BigDataSummaryResult['ProviceOrderCount']}" var="item">
				                 <th>${item.key}</th>
				            </c:forEach>
				        </tr>
				        <tr>
							<c:forEach items="${DetailInfo.BigDataSummaryResult['ProviceOrderCount']}" var="item">
				                 <th>${item.value}</th>
				            </c:forEach>
				        </tr>
					</table>
				</div>
				<div class="situation medicine">
					<header>
						<h4>处方中乐普药品情况：</h4>
						<p style="margin-top:15px;">乐普药品总计：<c:if test="${DetailInfo.BigDataSummaryResult.LepuMedicineStat !=null && DetailInfo.BigDataSummaryResult.LepuMedicineStat!=''}">${DetailInfo.BigDataSummaryResult.LepuMedicineStat.LepuMedicineTotalMoney }元</c:if></p>
					</header>
					<ul class="">
						<!-- 省份排名情况 -->
						<li>
							<p>一、省份排名情况汇总：</p>
							<ul>
								<c:forEach items="${DetailInfo.BigDataSummaryResult.LepuMedicineStat.LepuMedicineList }" var="mItem" varStatus="i">
									<li>
										<p style="line-height:30px;">
											<span class="medicineName">${i.index+1 }、${mItem.medicineName }</span>
											<span class="hide isShow"></span>
										</p>
										<table class="tab2">
											<thead>
												<tr>
													<th>名次</th>
													<th>省份</th>
													<th>含该药品处方个数</th>
													<c:forEach items="${mItem.specificationList }" var="itemSpecifList">
														<th>${itemSpecifList }</th>
													</c:forEach>
													<th>数量份额（盒）</th>
													<th>业绩份额（元）</th>
												</tr>
											</thead>
											<tbody>
												<c:forEach items="${mItem.proviceList }" var="proviceList" varStatus="Status">
													<tr class="active">
														<td>${Status.index+1 }</td><!-- 排名 -->
														<td>${proviceList.key }</td><!-- 省份 -->
														<td>${proviceList.value.preCount }</td><!-- 含该药品处方个数	 -->
														<!-- 规格 -->
														<c:forEach items="${mItem.specificationList }" var="specifList">
															<td>${proviceList.value.specificationMap[specifList].soldNumber }</td>
														</c:forEach>
														<td>${proviceList.value.soldNumber }</td><!-- 数量份额（盒） -->
														<td>${proviceList.value.soldMoney }</td><!-- 业绩份额（元） -->
													</tr>
												</c:forEach>
												<!-- 无处方省市 -->
												<c:forEach items="${mItem.noDataProvinceList }" var="noDataProvinceList" varStatus="Status">
													<tr class="active">
														<td>${Status.index+1+mItem.proviceList.size()}</td><!-- 排名 -->
														<td>${noDataProvinceList }</td><!-- 省份 -->
														<td>——</td><!-- 含该药品处方个数	 -->
														<!-- 规格 -->
														<c:forEach items="${mItem.specificationList }" var="specifList">
															<td>——</td>
														</c:forEach>
														<td>——</td><!-- 数量份额（盒） -->
														<td>——</td><!-- 业绩份额（元） -->
													</tr>
												</c:forEach>
												<tr>
													<td rowspan="2" colspan="2">合计</td>
													<td rowspan="2">${mItem.preCount }个</td>
													<c:forEach items="${mItem.specificationStatList }" var="specificationStatList">
														<td>${specificationStatList.value.soldNumber }盒</td>
													</c:forEach>
													<td rowspan="2">${mItem.soldNumber }盒</td>
													<td rowspan="2">${mItem.soldMoney }元</td>
												</tr>
												<tr>
													<c:forEach items="${mItem.specificationStatList }" var="specificationStatList">
														<td>${specificationStatList.value.soldMoney }元</td>
													</c:forEach>
												</tr>
											</tbody>
										</table>
									</li>
								</c:forEach>
							</ul>
						</li>
						<!-- 药店排名情况 -->
						<li>
							<p>二、药店排名情况汇总：</p>
							<ul>
								<c:forEach items="${DetailInfo.BigDataSummaryResult.LepuMedicineStat.LepuMedicineList }" var="mItem" varStatus="i">
									<li>
										<p style="line-height:30px;">
											<span class="medicineName">${i.index+1 }、${mItem.medicineName }</span>
											<span class="hide isShow"></span>
										</p>
										<table class="tab2">
											<thead>
												<tr>
													<th>名次</th>
													<th>药店</th>
													<th>省份</th>
													<th>含该药品处方个数</th>
													<c:forEach items="${mItem.specificationList }" var="itemSpecifList">
														<th>${itemSpecifList }</th>
													</c:forEach>
													<th>数量份额（盒）</th>
													<th>业绩份额（元）</th>
												</tr>
											</thead>
											<tbody>
												<c:forEach items="${mItem.institutionList }" var="institutionList" varStatus="Status">
													<tr class="active">
														<td>${Status.index+1 }</td><!-- 排名 -->
														<td>${institutionList.key }</td><!-- 药店 -->
														<td><!-- 省份 -->
															<c:choose>
																<c:when test="${institutionList.key eq '终止营业不统计' }">——</c:when>
																<c:otherwise>${institutionList.value.statObjName }</c:otherwise>
															</c:choose>
														</td>
														<td>${institutionList.value.preCount }</td><!-- 含该药品处方个数	 -->
														<!-- 规格 -->
														<c:forEach items="${mItem.specificationList }" var="specifList">
															<td>${institutionList.value.specificationMap[specifList].soldNumber }</td>
														</c:forEach>
														<td>${institutionList.value.soldNumber }</td><!-- 数量份额（盒） -->
														<td>${institutionList.value.soldMoney }</td><!-- 业绩份额（元） -->
													</tr>
												</c:forEach>
												<tr>
													<td rowspan="2" colspan="3">合计</td>
													<td rowspan="2">${mItem.preCount }个</td>
													<c:forEach items="${mItem.specificationStatList }" var="specificationStatList">
														<td>${specificationStatList.value.soldNumber }盒</td>
													</c:forEach>
													<td rowspan="2">${mItem.soldNumber }盒</td>
													<td rowspan="2">${mItem.soldMoney }元</td>
												</tr>
												<tr>
													<c:forEach items="${mItem.specificationStatList }" var="specificationStatList">
														<td>${specificationStatList.value.soldMoney }元</td>
													</c:forEach>
												</tr>
											</tbody>
										</table>
									</li>
								</c:forEach>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<input type="hidden" class="IsCityCondText" value="${IsCityCond}"/>
		<script src="../../../js/dist/echarts.js"></script>
		<script>
		// 图表路径配置
			var chart_address = [];
			$(".chart_region").each(function(i1,ele1){
				chart_address.push($(ele1).val());
			});
			var bar_data = [];
			$(".chart_number").each(function(i2,ele2){
				bar_data.push($(ele2).val());
			});
			
			var chart_line = [];
			var dataArr = [];
			$(".chart_region").each(function(i3,ele3){
				dataArr = $('.chart_Data').eq(i3).val().substr(1,$('.chart_Data').eq(i3).val().length-2).split(",");
				chart_line.push({"name":$(ele3).val(),
								 "type":"line",
								 "data": dataArr,
								 "itemStyle":{
										normal:{
											label: {
												show: true,
												textStyle:{
													color:"#000000"
												}
												}
										}
									 }
								 });
				
			});
			
			var orderStatisticsData = [];
			$(".line_number").each(function(i4,ele4){
				orderStatisticsData.push($(ele4).val());
			});
			var dataNum = [];
			$(".line_number").each(function(i5,ele5){
				dataNum.push($(".line_number").eq(i5).val());
			});
			
			
			
			
		require.config({
			paths: {
				echarts: '../../../js/dist'
			}
		});
		// 使用
		require(
				[
					'echarts',
					'echarts/chart/bar',
					'echarts/chart/line'
				],
				drawEcharts
		);
		 
		function drawEcharts(ec){
			drawBar(ec);  //柱状图
			drawLine(ec); //折线图
		}
		function drawBar(ec){
			var myBarChart = ec.init(document.getElementById('barMain'));
			var option = {
			tooltip: {
				show: true
			},
            title : {
				text: '订单状态：'+$("#timeSlot").val()
			},
			xAxis:[{type : 'category',
				data : chart_address,
				axisLabel:{
                  interval:0,
                  rotate:45
	        	 }
				}],
				grid: { // 控制图的大小，调整下面这些值就可以，
		             x: 50,
		             x2: 70,
		             y2: 300// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
		         },
			yAxis :[{type : 'value'}],
			series : [{
				"name":"订单总数",
				"type":"bar",
				"barMaxWidth": 50,
				"data": orderStatisticsData,
				itemStyle: {
	                normal: {
	                	label: {
	                         show: true,
	                         position:"top",
	                         textStyle: {
	                         	 fontSize: 10,
	                             color: "#000"
	                         }
	                     },
	                    color: function(params) {
	                        var colorList = [
									"#ff7f50","#87cefa","#da70d6","#32cd32","#6495ed","#ff69b4","#ba55d3","#cd5c5c",
									"#ffa500","#40e0d0","#1e90ff","#ff6347","#7b68ee","#00fa9a","#ffd700","#6699ff","#ff6666",
									"#3cb371","#b8860b","#30e0e0"
	                        ];
	                        return colorList[params.dataIndex];
	                    }
	                }
        		}
				}]
		};
		myBarChart.setOption(option,true); //当setOption第二个参数为true时，会阻止数据合并
		}
		 
		 
		function drawLine(ec){
			var myLineChart = ec.init(document.getElementById('lineMain'));
			var option2 = {
			tooltip : {
				show: true
			},
            title : {
				text: '订单状态：'+$("#timeSlot").val()
			},
			legend: {
				x:20,
				y:40,
				data:chart_address
			},
			calculable : true,
			xAxis :[{
						type : 'category',
						data : ${DetailInfo.OrderStatResult.dateList},
						boundaryGap:false,
			        	 splitLine:{
			        		 onGap:false
			        	 },
			        	 axisLabel:{
	                         interval:0,
	                         rotate:45
			        	 }
					}],
					grid: { // 控制图的大小，调整下面这些值就可以，
			             x: 50,
			             x2:70,
			             y:140,//控制图例与图表之间的距离
			             y2: 100// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
			         },
			yAxis : [{
						type : 'value'
					}],
			series : chart_line
		};
		myLineChart.setOption(option2,true);
		}
		
		
		function getdate(){
			var now=new Date();
			y=now.getFullYear();
			m=now.getMonth()+1;
			d=now.getDate();
			m=m<10?"0"+m:m;
			d=d<10?"0"+d:d;
			return y+"-"+m+"-"+d;
		}
		
		
		
		function getdate2(){
			var curDate = new Date(); 
			var preDate = new Date(curDate.getTime() - 24*60*60*1000);  //前一天
			y=preDate.getFullYear();
			m=preDate.getMonth()+1;
			d=preDate.getDate();
			m=m<10?"0"+m:m;
			d=d<10?"0"+d:d;
			return y+"-"+m+"-"+d;
		}
		
 		$(".reportTime").html(getdate());
 		$(".dateEnd").html(getdate2());
 		
 		if(location.hash == "#0"){
 			$(".typeName").html("药店名称：");
 		}else{
 			$(".typeName").html("区域范围：");
 			if(location.hash == "#2"){//全国
 				$("#totalCount").show();
 				var total=0;
				$(".totalOrderCount").each(function(index,item){
					if($(item).html()!="——"){
						total+=parseInt($(item).html());
					}
				})
				$("#totalCount span").html(total);
 			}
 		}
 		
 		$(".titleText2").html($.trim($(".titleText2").html()).substring(0,$.trim($(".titleText2").html()).length-2));
 		$(".Region").html($.trim($(".Region").html()).substring(0,$.trim($(".Region").html()).length-2));
 		
 			/* 处方中乐普药品情况 */
 			$(".tab2").find("tr.active").hide();
 			$(".isShow").on("click",function(){
 				if($(this).hasClass("show")){
 					$(this).removeClass("show").addClass("hide");
 					$(this).parent().next().find("tr.active").hide();
 				}else{
 					$(this).removeClass("hide").addClass("show");
 					$(this).parent().next().find("tr.active").show();
 				}
 			})
		</script>
  </body>
</html>
