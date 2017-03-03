<%@ page language="java"
	import="java.util.*,com.lepu.nethospital.workbench.util.Constant"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!--主要是针对IE浏览器的一个设置-->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Cache" content="no-cache">
<link rel="stylesheet" href="../css/common.css" />

<link rel="stylesheet" href="../css/reset.css" />
<link rel="stylesheet" href="../css/viewer.css" />
<link rel="stylesheet" href="../css/advice/main.css" />
<script type="text/javascript" src="../js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../assets/js/viewer.js"></script>
<script src="../js/layer/layer.js"></script>
<script type="text/javascript">
	$(function() {
		$("#reply_advice_btn").click(
						function() {
							layer.open({
										type : 1,
										title : false,
										closeBtn : 1,
										shadeClose : false,
										content : '<div class="contentBox"><p>填写处理意见</p><div><textarea id="replyconten_str" rows="5" cols="50"></textarea>'
												+ '<div class="clearfix"><button onclick="reply(this)">提交</button></div></div></div>'
									});
						});
	})
	function reply(ele) {
		$(ele).prop("disabled","disabled");
		$.ajax({
			url : '../advice/replyAdvice',
			type : 'POST',
			dataType : 'json',
			data : {
				adviceID : $("#adviceID").val(),
				replyContent : $("#replyconten_str").val(),
				staffName : $(".staffName", window.parent.document).html()
			},
			success : function(data) {
				if (data.Status == 200) {
					location.reload();
					$(ele).removeAttr("disabled");
				}
			},
			error : function(data) {
				createPopWindow("加载失败");
			},
		});
	}
</script>
<style>
	.clearfix:after{
		content: "";
		display: block;
		clear: both;
	}
	.contentBox{
		padding:10px 20px;
	}
	.contentBox p{
		font:14px/30px "微软雅黑";
	}
	.contentBox button{
		width:50px;
		background:#169bd5;
		display:block;
		border:none;
		border-radius: 2px;
		font:14px/25px "微软雅黑";
		color:#fff;
		text-align: center;
		float:right;
		margin-top:10px;
	}
.wrap .head,.handleRecord_head{font-size: 16px;}
.fl,td,th{font-size: 14px;}
.picBox .pic{cursor: pointer;}
</style>
</head>
<body>
	<input type="hidden" id="adviceID" value="${AdviceDetail.AdviceID }">
	<section class="wrap">
		<header class="head">留言详情</header>
		<div class="main">
			<dl class="clearfix">
				<dt class="fl">留言标题：</dt>
				<dd class="fl">${AdviceDetail.AdviceTitle }</dd>
			</dl>
			<dl class="clearfix">
				<dt class="fl">内容：</dt>
				<dd class="fl adviceContent">${AdviceDetail.AdviceContent }</dd>
			</dl>
			<dl class="clearfix">
				<dt class="fl">附件：</dt>
				<dd class="fl picBox">
					<ul class="clearfix" id="imgBox">
						<c:forEach items="${AdviceDetail.MediaURL}" var="item">
							<li class="fl"><img class="pic" src="<%=Constant.IMG_HOST %>${item }" /></li>
						</c:forEach>
					</ul>
				</dd>
			</dl>
		</div>

	</section>
			<div class="handleRecord wrap">
				<div class="handleRecord_head">
					处理记录
					<button id="reply_advice_btn">添加处理记录</button>
				</div>
				<table style="width: 100%;">
					<thead style="width: 100%;">
						<tr>
							<th style="width: 200px;">时间</th>
							<th>处理内容</th>
							<th style="width: 100px;">操作人</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${AdviceDetail.ReplyList}" var="item">
							<tr>
								<td>${item.ReplyTime }</td>
								<td>${item.ReplyContent }</td>
								<td>${item.StaffName }</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			</div>
	<script>
		$(function(){
			$('#imgBox').viewer(); //图片预览
			var html=$(".adviceContent").html().replace(/\n/g,"</br>").replace(/\s/g,"&nbsp;");
			$(".adviceContent").html(html);
			
		})
	</script>
</body>
</html>
