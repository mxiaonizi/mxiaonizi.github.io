<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="<%=path%>/css/osms_base_161101.css" />
        <%-- <link rel="stylesheet" href="../../../css/appointment/list.css" /> --%>
        <link rel="stylesheet" href="../../../css/schedule/time_modify.css" />
        <link rel="stylesheet" href="../../../css/schedule/time_set.css" />
        <script type="text/javascript" src="<%=path%>/js/jquery-1.11.1.min.js"></script>
        <script type="text/javascript" src="<%=path%>/js/layer/layer.js"></script>
        <script type="text/javascript">
			var avalue = "";
	        var pvalue = "";
	        <c:if test="${not empty amNum}">avalue = ${amNum}</c:if>
			<c:if test="${not empty pmNum}">pvalue = ${pmNum}</c:if>
	         $(function(){
	        	 $(".window .close,.window input[type=button]:first-child").click(function(){
	               $(window.parent.document).find(".bg").css("display","none");
	               $(window.parent.document).find(".pop_window").css("display","none");
	             });
	        	 
	        	 $("#am").change(function () {
	                 if ($('#am').is(":checked")) {
	                	 $("#amNum").removeAttr("disabled");
	                 } else {
	                	 $("#amNum").attr("disabled","disabled");
	                 }
	             });
	        	 
	        	 $("#pm").change(function () {
	                 if ($('#pm').is(":checked")) {
	                	 $("#pmNum").removeAttr("disabled");
	                 } else {
	                	 $("#pmNum").attr("disabled","disabled");
	                 }
	             });
	 			$("#amNum").change(function(){
	 				avalue = $.trim($("#amNum").val());
	  			});
	  			$("#pmNum").change(function(){
	  				pvalue = $.trim($("#pmNum").val());
	  			});
	 			
	 			if(avalue === ""||avalue==null){
	 				 $("#amNum").attr("disabled","disabled");
	 			}
	 			
	 			if(pvalue === ""||pvalue==null){
					$("#pmNum").attr("disabled","disabled");
				}
	        });
	        
	        function saveForm(){
	            var regular =/^([1-9]\d*|[0]{1,1})$/;
	            //上午为str1,下午为str2
	            var str1="1";
	            var str2="2";
	            var str="";//str
	            
	            //判断上误操作
	            if(document.getElementById("am").checked){
	            	//拼接是否选择上午
	                if(avalue === ""){
	                    alert("请输入正确的出诊号数...");
	                    $("#amNum").val("");
	                    $("#amNum").focus();
	                    return;
	                } else{
	                    var bool = regular.test(avalue);
	                    if(bool == false){
	                        alert("您的出诊号数输入格式有误，请重新输入");
	                        $("#amNum").focus();
	                        return;
	                    }else if(avalue.length>2){
	                	 alert("您的出诊号数过大，请重新输入");
	                	 $("#amNum").focus();
	                	 return;
	                 }
	                }
	                str1 += "-1";
	                //拼接诊号
	                str1 += "-" + document.getElementById("amNum").value;
	            }else{
	                str1 += "-0-0";
	            }
	            
	            //判断下午操作
	            if(document.getElementById("pm").checked){
	            	if(pvalue === ""){
	                    alert("请输入正确的出诊号数...");
	                    $("#pmNum").val("");
	                    $("#pmNum").focus();
	                    return;
	                } else{
	                    var bool = regular.test(pvalue);
	                    if(bool == false){
	                        alert("您的出诊号数输入格式有误，请重新输入");
	                        $("#pmNum").focus();
	                        return;
	                    }else if(pvalue.length>2){
	                	 alert("您的出诊号数过大，请重新输入");
	                	 $("#pmNum").focus();
	                	 return;
	                 }
	                }
	                str2 += "-1";
	                //拼接诊号数量
	                str2 += "-" + document.getElementById("pmNum").value;
	            }else{
	                str2 += "-0-0";
	            }
	            
	           //拼接操作类型：0 添加操作  其他：更新操作(包含逻辑删除)
	           str1 += "-"+$("#amOperStatus").val();
	           str2 += "-"+$("#pmOperStatus").val();
	           
	            str += str1+":"+str2;
	            $.post("saveDocScheduleData", {
	            	DoctorID:"${DoctorID}",
	            	scheduleDate:"${DateTime}",
	    			scheduleInfo:str,
	    			r:Math.random()
	    		}, function(data) {
	    			var result = data.Status;
	    			if(result == "200"){
	    				alert(data.Message);
	    				window.parent.selectTimeList("${DateMonth}",${DoctorID});
	    				$(window.parent.document).find(".bg").css("display","none");
			            $(window.parent.document).find(".pop_window").css("display","none");
	    			}else if(data.Message=="没有获取到医生的诊室ID,请先确保医生有诊室ID"){
	    				layer.msg("该医生没有分配诊室，请完善诊室信息后排期！",{icon:2})
	    			}else{
	    				layer.msg(data.Message,{icon:2});
	    			}
	    		});
	        }
        </script>
    </head>
    <body>
    <div class="window">
        <img src="../images/schedule/close.png" height="25" width="25" alt="" class="close" />
        <input type="hidden" id="amOperStatus" name="amOperStatus"value="${amOperStatus}"/>
        <input type="hidden" id="pmOperStatus" name="pmOperStatus"value="${pmOperStatus}"/>
        <div class="caption">医生出诊时间排期</div>
        <div class="time_info">
            <div class="top">
            	<span>${DoctorName}</span>
                <span>${DateTime}</span>
                <span>${DateWeekCH}</span>
            </div>
            <div class="timeOrder" style="font-size:16px;">
            	<table>
				    <tr>
				        <td></td>
				        <td><label><input id="am" type="checkbox" <c:if test="${am eq 1 }" >checked="checked" </c:if>/>上午</label></td>
				        <td><label><input id="pm" type="checkbox" <c:if test="${pm eq 2 }" >checked="checked" </c:if>/>下午</label></td>
				    </tr>
				    <tr>
		                <td>出诊号数：</td>
                		<td><span>（</span><span><input id="amNum" type="text" value="${amNum}"/></span><span>）</span></td>
                		<td><span>（</span><span><input id="pmNum" type="text" value="${pmNum}"/></span><span>）</span></td>
		            </tr>
				</table>
            </div>
            <div class="bottom btn">
                <input type="button" value="取消" />
                <input type="button" value="确定" onclick="saveForm();"/>
            </div>
        </div>
    </div>
    </body>
</html>