function isNull(str) {
	if(str == null || str == "" || str.length < 1)
		return true;
	else
		return false;
}


//对话框消息提示
function errMsgBox(msg, ctrlName) {
	alert(msg);
	$("#" + ctrlName).focus();
}

//获取不带参数的URL
function getUrl()
{
	var url = document.location.href.toLowerCase();
	var pos = url.indexOf("?");
	if(pos > 0) url = url.substring(1, pos);
	return url;
}

//获取随机数
function getRandomNum(minNum,maxNum)
{
    return Math.floor(Math.random()*(maxNum-minNum+1))+minNum;
}

//生成Ajax随机参数
function getRnd()
{
    var mydate = new Date();
    var rnd = mydate.getHours().toString() + mydate.getMinutes().toString() + getRandomNum(1,9999).toString();
    return rnd;
}

//重置验证码
function changeCode(objId) {
    $("#" + objId).attr("src", $("#" + objId).attr("src") + "&rnd=" + getRnd());
}

//对cookie的操作
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//对Date的扩展，将 Date 转化为指定格式的String
Date.prototype.format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}


function enterKeydown(id){
	document.onkeydown = function (e) {
	    var ev = e ? e : window.event;
	    if (ev.keyCode == 13) {
	    	document.getElementById(id).click();
	    }
	};
}
