<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<base href="<%=basePath%>">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <link rel="stylesheet" type="text/css" href="css/emr/reset.css" />
    <link rel="stylesheet" href="bootstrap-3.3.4/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="assets/css/default.css">
    <link rel="stylesheet" href="assets/css/viewer.css">
    <link rel="stylesheet" href="css/emr/smj.css">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <div class="htmleaf-container">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="docs-galley">
                    	<%-- <p class="title">病例扫描件：${RecordCreateTime }</p> --%>
                        <ul class="docs-pictures clearfix">
                        	<c:forEach	items="${ListInfo }" var="item">
                            	<li>
                            		<img data-original="${IMG_HOST }${item.ThumbnailImagePath_1000 }" src="${IMG_HOST }${item.ThumbnailImagePath }">
                            		<span class="originalimg" data-original="${IMG_HOST }${item.ImagePath }" data-original_s="${IMG_HOST }${item.ThumbnailImagePath_1000 }">
                            			<a href="javascript:void(0);" style="text-decoration:underline;font-size:14px;color:#2fa0ec;">查看原图</a>
                            		</span>
                            	</li>
                            </c:forEach>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Scripts -->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="assets/js/viewer.js"></script>
    <script src="assets/js/main.js"></script>
    <script>
    $(".originalimg").on("click",function(){
    	$(this).prev().click();
    	$(".docs-pictures img").each(function(index,item){
    		var original=$(this).next().attr("data-original");
    		$(this).attr("data-original",original);
    	})
    }) 
    </script>
</body>
</html>