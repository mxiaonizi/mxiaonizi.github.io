/* 
* @Author: anchen
* @Date:   2015-04-24 11:18:21
* @Last Modified by:   anchen
* @Last Modified time: 2015-05-26 19:39:16
*/
var kalendar_html="";
//var pathName = window.document.location.pathname;
//服务器未配置项目名，获取项目绝对路径与本地不一样
//var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
function time_plan(e,obj){
    var pointX = e.pageX;
    var pointY = e.pageY;
    var box = obj;
    var pos = box.getBoundingClientRect();
    var top=pos.top;
    var left=pos.left;
    var width=pos.width;
    var height=pos.height;
    if((pointX-left)<(width*0.5) && (pointY-top)<(height*0.5)){
        alert("上午");
    }
    else if((pointX-left)>(width*0.5) && (pointY-top)>(height*0.5)){
        alert("下午");
    }
}

//生成日历代码
function createCode(infoList){
	kalendar_html="<tr><th>星期日</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th></tr>";
    //获得某月第一天是周几
    var firstDay=(infoList.ListInfo[0].DateWeek=="7")?0:infoList.ListInfo[0].DateWeek;
    // 本月日历有几行
    var dateLine=infoList.ListInfo.length;
    var line_number=Math.ceil((dateLine-(7-firstDay))/7+1);

    var dayIndex=0;
    for(i=0;i<line_number;i++){
        kalendar_html+="<tr>";
        for(j=0;j<7;j++){
            if( (i*7+j) < firstDay  || (i*7+j)>=(parseInt(firstDay)+parseInt(dateLine))){
                kalendar_html+="<td></td>";
            }
            else{
              kalendar_html+="<td DayPeriod='"+infoList.ListInfo[dayIndex].DayPeriod+"'>"+infoList.ListInfo[dayIndex].Day+"</td>";
              dayIndex++; 
            }
        }
        kalendar_html+="</tr>";
    }
}

function sitbg(){
    $("td").each(function(){
        var DayPeriod=$(this).attr("DayPeriod");
        if(DayPeriod=="1"){
            $(this).addClass("time_bg1");
        }
        else if(DayPeriod=="2"){
            $(this).addClass("time_bg2");
        }
        else if(DayPeriod=="12"){
            $(this).addClass("time_bg12");
        }
    });
}

//单击添加或删除医生排期用
function calender_cli(e) {//单击事件 
	var DocotorID = $("#expertList").val();
	var DocotorName = $("#expertList option:selected").text();
	if(DocotorID == '' || DocotorID == null){
		alert("请先选择专家,查询排期!");
		return;
	}
    var object=$(this);
   // clearTimeout(timer); //在双击事件中，先清除前面click事件的时间处理
    var year=$(".left li:nth-child(2)").html().slice(0,4);
    var month=$(".left li:nth-child(2)").html().slice(5,7);
    var day=object.html().slice(0,2);
    DateTime = year+'-'+month+'-'+day;
    var sysDate = new Date()
    var year1 = sysDate.getFullYear();  //获取年
    var month1 = sysDate.getMonth() + 1;    //获取月
    var day1 = sysDate.getDate(); //获取日
    var time = year1+"-"+month1+"-"+day1
    
    var selectTime = new Date(DateTime.replace(/\-/g, "\/"));//当前选中时间
    var systemTime = new Date(time.replace(/\-/g, "\/"));//系统当前时间
    var result = selectTime-systemTime
    if(result<0){
    	return;
    }
    var DayPeriod = '';
    if(object.html()!="" && object.attr("DayPeriod")!=undefined){
    	DayPeriod = object.attr("DayPeriod")
    }else{
    	return;
    };
    $(".bg").height($(document).height());
    $(".bg").width($(window).width());
    $(".bg").css("display","block");
	$(this).parent(".option").css("display","none");
    $(".pop_window").html("<iframe src='getDoctorScheduleDetail?DateTime="+DateTime+"&DoctorName="+encodeURI(encodeURI(DocotorName))+"&DayPeriod="+DayPeriod+"&DoctorID="+DocotorID+"' width='100%' height='100%' scrolling='no' frameborder='0'></iframe>");
    $(".pop_window").css("display","block");
  }
$(function(){
    //设置日历每天的状态（即背景图片）
	sitbg();
    function prev_month(){
    	var DoctorID = $("#expertList").val();
    	if(DoctorID == '' || DoctorID == null){
    		alert("请选择医生!");
    		return;
    	}
       var year=$(".left li:nth-child(2)").html().slice(0,4);
        var month=$(".left li:nth-child(2)").html().slice(5,7);
        if(month.slice(0,1)=="0"){
            var month_last=month.slice(1,2);
            if(parseInt(month_last)>1){
                month="0"+(parseInt(month_last)-1);
            }
            else{
              month="12";
              year=parseInt(year)-1;  
            }
        }
        else if(month=="10"){
            month="09";
        }
        else{
            month=parseInt(month)-1;
        }
        $(".left li:nth-child(2)").html(year+"-"+month);
		$.ajax({
			type : "post",//无此配置，提交中文乱码
			cache : false,
			dataType : "json",
			data : {
				DateMonth : year+"-"+month,
				DoctorID : $("#expertList").val()//获取当前选中专家ID
			},
			//url : projectName+'/doctorAppointment/getDocScheduleTimeData',//本地地址
			url : 'getDocScheduleTimeData',//服务器地址
			
			success : function(data) {
				if (data.Status == "200") {
					createCode(data);
					$(".calendar .right table").html(kalendar_html);
					sitbg();
					$("td").bind("click", calender_cli);
					$("#DateMonth").val(year+"-"+month);
				} else {
					alert("获取专家出诊时间列表失败！");
				}
			}
		});
    }

    function next_month(){
    	var DoctorID = $("#expertList").val();
    	if(DoctorID == '' || DoctorID == null){
    		alert("请选择医生!");
    		return;
    	}
       var year=$(".left li:nth-child(2)").html().slice(0,4);
        var month=$(".left li:nth-child(2)").html().slice(5,7);
        if(month.slice(0,1)=="0"){
            var month_last=month.slice(1,2);
            if(parseInt(month_last)<9){
                month="0"+(parseInt(month_last)+1);
            }
            else{
              month="10";
            }
        }
        else if(month=="12"){
           year=parseInt(year)+1;  
           month="01";
        }
        else{
            month=parseInt(month)+1;
        }
        $(".left li:nth-child(2)").html(year+"-"+month);
		$.ajax({
			type : "post",//无此配置，提交中文乱码
			cache : false,
			dataType : "json",
			data : {
				DateMonth : year+"-"+month,
				DoctorID : $("#expertList").val()//获取当前选中专家ID
			},
			url : 'getDocScheduleTimeData',//服务器地址
			//url : projectName+'/doctorAppointment/getDocScheduleTimeData',//本地地址

			success : function(data) {
				if (data.Status == "200") {
					createCode(data);
					$(".calendar .right table").html(kalendar_html);
					sitbg();
					$("td").bind("click", calender_cli);
					$("#DateMonth").val(year+"-"+month);
				} else {
					alert("获取专家出诊时间列表失败！");
				}
			}
		});
    }

    // 点上一个月按钮
    $(".calendar .left li:first-child").click(function(){
        prev_month();
    });

    // 点下一个月按钮
    $(".calendar .left li:last-child").click(function(){
        next_month();
    });
    //生成日历代码
    var infoList=JSON.parse($("#infoList").val());
    createCode(infoList);
    $(".calendar .right table").html(kalendar_html);

    //设置日历每天的状态及样式
    sitbg();
   
	$("td").bind("click", calender_cli);
});