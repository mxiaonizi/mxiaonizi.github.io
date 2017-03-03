<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="/WEB-INF/authTag.tld" prefix="auth"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE>
<html>
  <head>
    <base href="<%=basePath%>">    
    <title>下载管理</title>    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
    
    <link rel="stylesheet" href="../../../css/reset.css"/>
    <link rel="stylesheet" href="../../../css/bootstrap.min.css"/>
    <script type="text/javascript" src="../../../js/jquery-1.11.1.min.js"></script>
    <link rel="stylesheet" href="../../../css/resource.css"/>
    <link rel="stylesheet" href="../../../css/page.css"/>    
    <!-- 公共  -->
	<script type="text/javascript" src="../../../js/common.js"></script>        
	<link rel="stylesheet" href="../../../css/common.css" />	
  </head>  
  <body>
     <div class="content">
     	<div class="topToolBox">
	     	<auth:authTag authId="6"><div class="handleButton">
		     	<form action="resource/uploadFiles" method="post" enctype="multipart/form-data" id="uploadForm"> 
		     		<input type="hidden" name="parentRID" value="${parentRID}"/>
		     		<input type="hidden" name="path" value="${path}"/>
		     		<input type="file" name="wenjian" id="uploadFile">上传文件(小于10M)
		     	</form>
	     	</div></auth:authTag>
	     	<auth:authTag authId="3">
	     	<button class="handleButton" id="createFolder">新建文件夹</button>
	     	</auth:authTag>
     	</div>
     
        <ol class="breadcrumb" style="margin-bottom:0">${breadcrumb }</ol>
        <div class="table-box">
            <table class="table">
                <thead>
                	<tr>
		                <c:choose>
		                <c:when test="${sortBy eq 'ResourceName'}">
		                	<th style="width:400px" 
		                	 		<c:if test="${sortDirection eq 'ASC'}">class="sortUp"</c:if>  
		                	 		<c:if test="${sortDirection eq 'DESC'}">class="sortDown"</c:if>  
		                	 		data-fieldName="ResourceName">文件名</th>
			                <th class="tools" ></th>
			                <th data-fieldName="Size">大小</th>
			                <th data-fieldName="RecordUpdateTime">修改日期</th>
		                </c:when>
		                <c:when test="${sortBy eq 'Size'}">
		                	<th style="width:400px" data-fieldName="ResourceName">文件名</th>
			                <th class="tools" ></th>
			                <th data-fieldName="Size" 
			                		<c:if test="${sortDirection eq 'ASC'}">class="sortUp"</c:if>  
		                	 		<c:if test="${sortDirection eq 'DESC'}">class="sortDown"</c:if>  >大小</th>
			                <th data-fieldName="RecordUpdateTime">修改日期</th>
		                </c:when>
		                <c:when test="${sortBy eq 'RecordUpdateTime'}">
		                	<th style="width:400px" data-fieldName="ResourceName">文件名</th>
			                <th class="tools" ></th>
			                <th data-fieldName="Size"  >大小</th>
			                <th data-fieldName="RecordUpdateTime"
			                		<c:if test="${sortDirection eq 'ASC'}">class="sortUp"</c:if>  
		                	 		<c:if test="${sortDirection eq 'DESC'}">class="sortDown"</c:if>>修改日期</th>
		                </c:when>
		                
		                </c:choose>		               
		             </tr>
                </thead>
                <tbody>
                <c:forEach items="${ListInfo }" var="item">
						<tr>
							<td><c:choose>
									<c:when test="${item.Type==1 }">
										<a href="resource/list?parentRID=${item.RID }&sortDirection=${sortDirection}&sortBy=${sortBy}"> 
										<img src="images/download/folder.png"> 
										<span class="fileName">${item.ResourceName }</span> 
										<%-- <span class="extensionName">${item.Suffix }</span> --%>
										</a>
									</c:when>
									<c:otherwise>
										<c:choose>
										<c:when test="${fn:containsIgnoreCase('BMP,JPG,JPEG,PNG,GIF',item.Suffix) }"><img src="images/download/png.png"></c:when>
									    <c:when test="${fn:containsIgnoreCase('rar,zip',item.Suffix) }"><img src="images/download/rar.png"></c:when>
									    <c:when test="${fn:containsIgnoreCase('txt',item.Suffix) }"><img src="images/download/txt.png"></c:when>
									    <c:when test="${fn:containsIgnoreCase('doc,docx,',item.Suffix) }"><img src="images/download/doc.png"></c:when>
									    <c:when test="${fn:containsIgnoreCase('xlsx,xls',item.Suffix) }"><img src="images/download/xls.png"></c:when>
									    <c:when test="${fn:containsIgnoreCase('ppt,pptx',item.Suffix) }"><img src="images/download/ppt.png"></c:when>
									    <c:when test="${fn:containsIgnoreCase('pdf',item.Suffix) }"><img src="images/download/pdf.png"></c:when>
										<c:otherwise><img src="images/download/default.png"></c:otherwise>
										</c:choose>
									    
										<span class="fileName">${item.ResourceName }</span>
									</c:otherwise>
								</c:choose>
							</td>
							<td  class="tools">
							<input type="hidden" class="RID" value="${item.RID }"/>
							<auth:authTag authId="4"><c:if test="${item.Type==2 }"><a href="javascript:downloadFile('${item.ResourceName }','${item.URL }')" target="_blank"><button class="download"></button></a></c:if></auth:authTag>
							<auth:authTag authId="7"><button class="edit"></button></auth:authTag>
							<auth:authTag authId="5"><button class="delete"></button></auth:authTag>
							</td>
							<td class="fileSize">${item.Size }</td>
							<td>${item.RecordUpdateTime }</td>
						</tr>
					</c:forEach>
                
                </tbody>
            </table>
            <div class="lepu-m-page">
           <%--  <!-- 分页 -->
	   		<%out.print(request.getAttribute("page").toString()); %>
			<!-- 分页 --> --%>
			</div>
        </div>
    </div>
    <script src="js/layer/layer.js"></script>    
    <script>
    $(function(){
    	$(".fileSize").each(function(){
    		var size = + $(this).text();
    		var kb=Math.round((size/1024)*10)/10;
    		var mb=Math.round((size/1024/1024)*10)/10;
    		if(mb>=1){
    			$(this).text(mb + 'M');			
    		}else if(kb>=1){
    			$(this).text(kb + 'K');	
    		}else if(size>=0){
    			$(this).text(size + 'B');	
    		}else{
    			$(this).text('未知');
    		}
    	});
    	
    	$(".table th").click(function(e){
    		if(!!this.innerText){
    			var p_sortD='';
    			if(this.className=="sortUp" || this.className==""){
    				p_sortD='DESC';
    			}else{
    				p_sortD='ASC';
    			}
    			var p_sortBy=this.getAttribute("data-fieldName");
    			//alert(p_sortBy+"||"+p_sortD);
    			
    			window.location.href="resource/list?parentRID="+${parentRID }+"&sortDirection="+p_sortD+"&sortBy="+p_sortBy;
    		}		
    	});
    	
    	$("#uploadFile").change(function(){
    		if((this.files[0].size/1024/1024)>10){
    			alert("文件大小请控制在10M以内");
    		}else{
    			$("#uploadForm").submit();
    		}
    	}); 
    	
    	$("#createFolder").click(function(){
    		var onoff = true;
    		layer.prompt({
    			  title: '请输入文件夹名，并确认（50字以内）',
    			  formType: 0 
    			}, function(folderName){
    				if(folderName.length>50){
    					alert("文件夹名太长")
    				}else{
    					if(onoff){
    						onoff = false;
    						$.ajax({
		    					url: 'resource/newDirectory',
		    					type: 'POST',
		    					dataType: 'json',
		    					data: {parentRID:${parentRID},name: folderName,path:'${path}'},
		    					success:function(data){
		    						
		    						if(data.Status == 200){									
		    							layer.msg("新建文件夹成功",{icon:1});
		    							location.reload();
		    							window.location.reload();
		    						}else{
		    							layer.msg(data.Message,{icon:2});
		    						}
		    					},
		    					error:function(){
		    						layer.msg("新建文件夹失败",{icon:2});
		    					}
		    				});		
    					}	  
    				}
    			});
    	});
    	
    	$(".edit").click(function(){
    		var onoff = true;
    		var _this=$(this);
    		var v_rid=_this.prevAll(".RID").val();    		
    		layer.prompt({
    			  title: '请输入新的名称，并确认（50字以内）',
    			  formType: 0 
    			}, function(folderName){
    				if(folderName.length>50){
    					alert("文件夹名太长")
    				}else{
    					if(onoff){
    						onoff = false;
    						$.ajax({
    	    					url: 'resource/rename',
    	    					type: 'POST',
    	    					dataType: 'json',
    	    					data: {rid:v_rid ,name:folderName},
    	    					success:function(data){
    	    						if(data.Status == 200){									
    	    							layer.msg("编辑成功",{icon:1});
    	    							_this.parents("tr").find(".fileName").text(folderName);
    	    							window.location.reload();
    	    						}else{
    	    							layer.msg(data.Message,{icon:2});
    	    						}
    	    					},
    	    					error:function(){
    	    						layer.msg("编辑失败",{icon:2});
    	    					}
    	    				});	
    					}
    				}	  
    			});
    	});
    	
    	$(".delete").click(function(){
    		var _this=$(this);
    		var v_rid=_this.prevAll(".RID").val();
    		var fileName=_this.parents("tr").find(".fileName").text();
    		layer.confirm('您确定要删除<font color=red>'+ fileName +'</font>吗？', {
    			  btn: ['确定','取消'] //按钮
    			}, function(){
    				$.ajax({
    					url: 'resource/delete',
    					type: 'POST',
    					dataType: 'json',
    					data: {ridList: v_rid},
    					success:function(data){
    						if(data.Status == 200){									
    							layer.msg("删除成功",{icon:1});
    							_this.parents("tr").remove();
    							window.location.reload();
    						}else{
    							layer.msg(data.Message,{icon:2});
    						}
    					},
    					error:function(){
    						layer.msg("删除失败",{icon:2});
    					}
    				});		
    			});
    	});
    });
    
    function downloadFile(p_name,p_url){
    	window.location.href="resource/downloadFiles?fileName="+p_name+"&fileURL="+p_url;
    }
    
    </script>
  </body>
</html>
