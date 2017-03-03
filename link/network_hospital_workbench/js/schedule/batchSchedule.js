//生成日历代码
var infoList=JSON.parse($("#infoList").val());
var isFirstVisit=$("#isFirstVisit").val();
var dateArr=[];//存选中日期
createCode(infoList);
//设置日历每天的状态及样式
sitbg();

//点上一个月按钮
$(".calendar .left li:first-child").click(function(){
	prev_month();
});

// 点下一个月按钮
$(".calendar .left li:last-child").click(function(){
	next_month();
});

//点击确定
$("#schedule").on("click",function(){
	var HospitalID=$("#HospitalList").val();
	if(HospitalID==""){
		layer.msg("请先选择医院",{icon:2});
		return;
	}
	if(dateArr.length==0){
		layer.msg("请选择要排期的日期",{icon:2});
		return;
	}
	$(".bg",document.window).show();
	$(".pop_window",document.window).show();
	$("#am").attr("checked",false);
	$("#pm").attr("checked",false);
	$("#amNum").attr("disabled","disabled");
	$("#pmNum").attr("disabled","disabled");
	$("#amNum").val("");
	$("#pmNum").val("");
})

//生成日历代码
var kalendar_html="";
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
              kalendar_html+="<td DayPeriod='"+infoList.ListInfo[dayIndex].DayPeriod+"' onclick='calender_cli(this)'>"+infoList.ListInfo[dayIndex].Day+"<span class='selected'>√</span></td>";
              dayIndex++; 
            }
        }
        kalendar_html+="</tr>";
    }
    $(".calendar .right table").html(kalendar_html);
}
//单击添加或删除医生排期用
function calender_cli(event) {//单击事件
	var HospitalID=$("#HospitalID").val();
	if(HospitalID==""){
		layer.msg("请先选择医院",{icon:2});
		return;
	}
	if($(event).html()!="" && $(event).attr("dayperiod")==""){
		var year=$(".left li:nth-child(2)").html().slice(0,4);
		var month=$(".left li:nth-child(2)").html().slice(5,7);
		var day=event.childNodes[0].nodeValue;
		var DateTime = year+'-'+month+'-'+day;
		 
		var sysDate = new Date();
		var year1 = sysDate.getFullYear();  //获取年
		var month1 = sysDate.getMonth() + 1;    //获取月
		var day1 = sysDate.getDate(); //获取日
		var time = year1+"-"+month1+"-"+day1;
		var selectTime = new Date(DateTime.replace(/\-/g, "\/"));//当前选中时间
		var systemTime = new Date(time.replace(/\-/g, "\/"));//系统当前时间
		var result = selectTime-systemTime;
		if(result<0){
			return;
		}
//		判断是否超过15天
		if($(event).find(".selected").hasClass("active")){//已选中执行取消操作
			$(event).find(".selected").removeClass("active");
			for(var i=0;i<dateArr.length;i++){
				 if(dateArr[i][0]==$(".left li:nth-child(2)").html() && dateArr[i][1]==day){
					 dateArr.splice(i, 1);
					 return;
				 }
			 }
		}else{//未选中
			if(dateArr.length>=15){
				layer.msg("最多选择15天",{icon:2});
				return;
			}
			 $(event).find(".selected").addClass("active");
			 dateArr.push([year+'-'+month,day,DateTime]);
		}
	}
}

function sitbg(){
    $("td").each(function(){
        var DayPeriod=$(this).attr("DayPeriod");
        if(DayPeriod=="1"){
            $(this).addClass("time_bg1");
        }else if(DayPeriod=="2"){
            $(this).addClass("time_bg2");
        }else if(DayPeriod=="12"){
            $(this).addClass("time_bg12");
        }
    });
}
function prev_month(){
	var HospitalID = $("#HospitalID").val();
	if((HospitalID == '' || HospitalID == null) && isFirstVisit === "0"){
		alert("请选择医院!");
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
			HospitalID : HospitalID
		},
		url : 'getHospitalScheduleData',//服务器地址
		
		success : function(data) {
			if (data.Status == "200") {
				createCode(data);
				$(".calendar .right table").html(kalendar_html);
				sitbg();
				$("#DateMonth").val(year+"-"+month);
				setSelectedDate();
			} else {
				alert("获取专家出诊时间列表失败！");
			}
		}
	});
}

function next_month(){
	var HospitalID = $("#HospitalID").val();
	if((HospitalID == '' || HospitalID == null) && isFirstVisit === "0"){
		alert("请选择医院!");
		return;
	}
	var year=$(".left li:nth-child(2)").html().slice(0,4);
	var month=$(".left li:nth-child(2)").html().slice(5,7);
	if(month.slice(0,1)=="0"){
	    var month_last=month.slice(1,2);
	    if(parseInt(month_last)<9){
	        month="0"+(parseInt(month_last)+1);
	    }else{
	      month="10";
	    }
	}else if(month=="12"){
	   year=parseInt(year)+1;  
	   month="01";
	}else{
	    month=parseInt(month)+1;
	}
	$(".left li:nth-child(2)").html(year+"-"+month);
	$.ajax({
		type : "post",//无此配置，提交中文乱码
		cache : false,
		dataType : "json",
		data : {
			DateMonth : year+"-"+month,
			HospitalID : HospitalID
		},
		url : 'getHospitalScheduleData',//服务器地址
		success : function(data) {
			if (data.Status == "200") {
				createCode(data);
				$(".calendar .right table").html(kalendar_html);
				sitbg();
				$("#DateMonth").val(year+"-"+month);
				setSelectedDate();
			} else {
				alert("获取专家出诊时间列表失败！");
			}
		}
	});
}

//点击上下月，选中日期回显
function setSelectedDate(){
	$(".calendar td").each(function(index,item){
		if($(item).html()!=""){
			var day=item.childNodes[0].nodeValue;
			for(var i=0;i<dateArr.length;i++){
				if(dateArr[i][0]==$(".left li:nth-child(2)").html() && dateArr[i][1]==day){
					$(item).find("span.selected").addClass("active");
				}
			}
		}
	})
}
function saveForm(event){
	if(!$("#am").is(":checked") && !$("#pm").is(":checked")){
		layer.msg("请选择上下午",{icon:2});
		return;
	}
	if($("#am").is(":checked") && $("#amNum").val()=="" || $("#pm").is(":checked") && $("#pmNum").val()==""){
		layer.msg("请输入出诊号数",{icon:2});
		return;
	}
	var am=$("#am").is(":checked")?1:0;
	var amNum=$("#am").is(":checked")?$("#amNum").val():"";
	var pm=$("#pm").is(":checked")?1:0;
	var pmNum=$("#pm").is(":checked")?$("#pmNum").val():"";
	var re=/^[1-9]\d*$/;
	if(re.test(amNum) || re.test(pmNum)){
		if(amNum.length>2 || pmNum.length>2){
			layer.msg("您的出诊号数过大，请重新输入",{icon:2});
			return;
		}
	}else{
		layer.msg("您的出诊号数输入格式有误，请重新输入",{icon:2});
		return;
	}
	$(event).attr("disabled","disabled");
	var scheduleDate="";
	for(var i=0;i<dateArr.length;i++){
		scheduleDate+=dateArr[i][2]+",";
	}
	scheduleDate=scheduleDate.substr(0,scheduleDate.length-1);
	var HospitalID = $("#HospitalList").val();
	$.ajaxSettings.async = false;
	$.ajaxSetup({cache:false});
	$.post("saveScheduleBatch", {am:am,amNum:amNum,pm:pm,pmNum:pmNum,scheduleDate:scheduleDate,HospitalID:HospitalID,
		r:Math.random()
	}, function(data) {
		if (data.Status == "200") {
			$(event).removeAttr("disabled");
            dateArr=[];
			layer.msg(data.Message,{icon:1});
			$(".bg").css("display","none");
            $(".pop_window").css("display","none");
            selectTimeList($("#DateMonth").val(),HospitalID);
		} else if(data.Status=="-2") {
			$(event).removeAttr("disabled");
			layer.msg("没有分配诊室，请完善诊室信息后排期！",{icon:2});
		}else{
			$(event).removeAttr("disabled");
			layer.msg(data.Message,{icon:2});
		}
	});
}
