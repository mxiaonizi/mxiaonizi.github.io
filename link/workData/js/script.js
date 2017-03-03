

function page8Bigport(){
	$(".page8 ").find('img').on('touchstart',function(){
		$(this).addClass('bigport');
		setTimeout(function(){
			$(".page8 ").find('img').removeClass('bigport');
		},5000);
	});
}

function relation(){
	var img = "<img src='images/page6g_gesture.png'>";
	$(".one .fri_near1").append(img);

    var index = 0;
    var imgNum = 0;
    $(".one .fri").on("touchstart",function(){
    	$(".one .fri").find('img').remove();
        index = $(this).index();
   
        $(this).parents(".circle").toggleClass('active');
        
        $(".relate"+index).toggleClass('on');
        

        imgNum = index+1;
        if(imgNum == 6){imgNum = 1;}
        $(".one .fri_near"+imgNum).append(img);
       
    });

    $(".page6g .me").on("touchstart",function(){
        $(".one .circle").toggleClass('active');
        $(".relate"+index).toggleClass('on');
    });

       
}

function ifmove(){
	if(page4timer){clearInterval(page4timer);}
	var span = $(".page4 span");
	for(var i=0;i<span.length;i++){
		span.eq(i).html(array[i]);
	}
} 

function ifpie(){
	if($("#pie").length != 0){
		 if(baseGC.stepNum==1){
		 	 pie(8.00,36.00,57.00);
		 }    
	}

	if($("#page3yg").length != 0){
		 if(baseGC.stepNum==2){
		 	 page3ygWater();
		 }else {
		 	$(".page3 .box .water").height(0);
		 }    
	}

	if($("#page4yg").length != 0){
		 if(baseGC.stepNum==3){
		 	page4Num();
		 	page4NumPercent();
		 	page4Pointer();
		 }else {
		 	$("#page4yg .bottom .line").css({
		 		'transform':'rotate(-90deg)',
		 		'-webkit-transform':'rotate(-90deg)'
			 });
		 	$("#page4yg .bottom .romask").css({
		 		'transform':'rotate(0deg)',
		 		'-webkit-transform':'rotate(0deg)'
			 });
		 	// $("#page4yg span").html('0');
		 }    
	}

	if($("#page4gg").length != 0){
		 if(baseGC.stepNum==2){
		 	page4ggNum();
		 	page4ggPointer(4);
		 }else {
		 	$("#page4gg .bottom .line").css({
		 		'transform':'rotate(-90deg)',
		 		'-webkit-transform':'rotate(-90deg)'
			 });
		 	$("#page4gg .bottom .romask").css({
		 		'transform':'rotate(0deg)',
		 		'-webkit-transform':'rotate(0deg)'
			 });
		 }    
	}
	if($("#page9yg").length != 0){
		if(baseGC.stepNum==8){
			$("#cover").children("footer").hide();
		}else{
			$("#cover").children("footer").show();
		}

	}
	if($("#page9gg").length != 0){
		if(baseGC.stepNum==6){
			$("#cover").children("footer").hide();
		}else{
			$("#cover").children("footer").show();
		}

	}
}
function pie(a,b,c){

    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());

    // Build the chart
    $('#pie').highcharts({
        chart: {
        	backgroundColor:'transparent',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
            
            
        },
        colors:['#6f59ce','#4ca3d4','#3f81ed'],
        navigation:{
        	buttonOptions:{
        		enabled:false
        	}
        },
        loading:{
        	showDuration:4000
        },
        title: {
            text: ''
        },
        tooltip: {
        	enabled:true,
            backgroundColor: '#FCFFC5',   // 背景颜色
		    borderColor: 'black',         // 边框颜色
		    borderRadius: 10,             // 边框圆角
		    borderWidth: 3,               // 边框宽度
		    shadow: true,                 // 是否显示阴影
		    animation: true ,              // 是否启用动画效果
		    style: {                      // 文字内容相关样式
		        color: "#ff0000",
		        fontSize: "12px",
		        fontWeight: "blod",
		        fontFamily: "Courir new"
		    },
	        pointFormatter: function() {
    		return '<span style="color:#f00"></span> : <b>老师21</b>.<br/>'
			}
   

        },
        credits:{
     		enabled:false // 禁用版权信息
		},

        plotOptions: {
            pie: {
                allowPointSelect: true,
                size:'70%',
                startAngle:'0',
                slicedOffset:'15',
                visible:true,
                center:['50%','50%'],
                dataLabels: {
                    enabled: true,
                    defer:true,
                    color:'#ff00ff',
                    fontSize:'13px',
                    fontFamily:'Arial',
                    fontWeight:'normal',
                    connectorColor: '#ffffff',
                    connectorPadding:'3',
                    connectorWidth:'2',
                    overflow:false  ,
                    rotation:'-45',
                    textShadow: false,	
                    shape:'callout',
                    softConnector:'soft ',
                    distance: 20,
                    pointPlacement:'on',
                    style:{
                    	"color": "#f00", "fontSize": "13px", "fontWeight": "bold", "textShadow": "none" 
                    },


                    formatter: function() {
                    	if(this.y == a){
                    		return '<div style="color:#6f59ce;">'+ this.point.name +'<br></div> '+ this.percentage.toFixed(0) +' %';
                    	}else if(this.y == b){
                    		return '<div style="color:#4ca3d4;">'+ this.point.name +'<br></div> '+ this.percentage.toFixed(0) +' %';
                    	}else if(this.y == c){
                    		return '<div style="color:#3f81ed;">'+ this.point.name +'<br></div> '+ this.percentage.toFixed(0) +' %';
                    	}else{
                    		return '<div style="color:#3f81ed;">'+ this.point.name +'<br></div> '+ this.percentage.toFixed(0) +' %';
                    	}
                        
                    }
                    
                }
            }
        },
        series: [{
        	type:"pie",
            name: null,
            data: [
                {name: "朝九晚五", y: a, sliced: true},
                {name: "公司为家", y: b, sliced: false},
                {name: "零点战士", y: c, sliced: false}
            ]
            /*data: [
                {name: "朝九晚五", y: a,color:'#6f59ce', sliced: true},
                {name: "公司为家", y: b,color:'#4ca3d4', sliced: false},
                {name: "零点战士", y: c,color:'#3f81ed', sliced: false}
            ]*/
        }]
    });


	
}


function page4ggNum(){
// ===================animation---page4gg==============//	
//数字增加

	var max = array[0];
	for(var i=1;i<array.length;i++){ 
  		if(max<array[i]){max=array[i];}
  	}

  	numPlus();
	function numPlus(){ 

		var j = 0;
		page4timer = setInterval(function(){
			
			if(max == j){
				clearInterval(page4timer);
			}
			if(array[0]>=j ){
				span.eq(0).html(j);
				
			}
			if(array[1]>=j ){
				span.eq(1).html(j);
				
			}
			if(array[2]>=j ){
				span.eq(2).html(j);
				
			}
			if(array[3]>=j  ){
				span.eq(3).html(j);
				
			}
			if(array[4]>=j ){
				span.eq(4).html(j);
				
			}
			
			j++;
	
		},0.23);
	}
}

function page4ggPointer(num){
// ===================animation---page4==============//	
//指针变动
	if(num >=0 && num <= 4){
		if(num == 1){
			num = -52;
		}else if(num ==2){
			num = -19;
		}else if(num ==3){
			num = 19;
		}else if(num ==4){
			num = 53;
		}
	}
	// var num = $("#page4gg .speed span").html();
	// num = parseInt(num)*150/100-90;//180deg=100%
	$("#page4gg .bottom .line").transition({
		rotate:num,
		duration:1000,
		delay:1000
	});

	$("#page4gg .bottom .romask").transition({
		rotate:num+91,
		duration:1000,
		delay:1000
	});
	
}

function page4NumPercent(){
	var span = $('#page4yg .speed span');
	var num = span.html();
	num = parseInt(num);
	var j = 0;
	var timer = setInterval(function(){
		if(j>= num){
			clearInterval(timer);
		}
		span.html(j);
		j++;
	},20)
}


var page4timer = null;

function page4Num(){
// ===================animation---page4==============//	
//数字增加
	var deg = 10;
	var span = $("#page4yg .box span");

	var max = array[0];
	for(var i=1;i<array.length;i++){ 
  		if(max<array[i]){max=array[i];}
  	}

  	if(max > 5000){
  		deg = 200;
  	}

  	numPlus();

	function numPlus(){ 
		var j = 10;
		var num =0;
		
		page4timer = setInterval(function(){
			
			if(max <= j - deg){
				clearInterval(page4timer);
			}
			if(array[0]>=j-deg ){
				span.eq(0).html(j);
				num = span.eq(0).html();
				if(array[0]-num < deg ){
					span.eq(0).html(array[0]);
				}

				
			}
			if(array[1]>=j ){
				span.eq(1).html(j);
				num = span.eq(1).html();
				if(array[1]-num < deg ){
					span.eq(1).html(array[1]);
				}
				
			}
			if(array[2]>=j ){
				span.eq(2).html(j);
				num = span.eq(2).html();
				if(array[2]-num < deg ){
					span.eq(2).html(array[2]);
				}
				
			}
			if(array[3]>=j  ){
				span.eq(3).html(j);
				num = span.eq(3).html();
				if(array[3]-num < deg ){
					span.eq(3).html(array[3]);
				}
				
			}
			if(array[4]>=j ){
				span.eq(4).html(j);
				num = span.eq(4).html();
				if(array[4]-num < deg ){
					span.eq(4).html(array[4]);
				}
				
			}
			
			j = j+deg;
	
		},50);
	}
}

function page4Pointer(){
// ===================animation---page4==============//	
//指针变动
	var num = $("#page4yg .speed span").html();
	num = parseInt(num)*150/100-90;//180deg=100%
	$("#page4yg .bottom .line").transition({
		rotate:num,
		duration:1000,
		delay:1000
	});

	$("#page4yg .bottom .romask").transition({
		rotate:num+91,
		duration:1000,
		delay:1000
	});
	
}

	
function page3ygWater(){
// ===================animation---page3==============//
//水柱
	var waterH = page3Water(9); 
	$(".page3 .box .water").animate({
		height:waterH+'px'
	},1500);

}


function page3Water(h){
	var wH = $(window).height();
	var boxH = wH*0.65;
	var liH = boxH*0.9/8;
	var ulMB = boxH*0.05;
	var waterH = 0;
	var waterSun= $('.page3 .sun');
	var bg = $('.page3 .bg');
	bg.children('div').hide();

	if(h>=7 && h<14 ){
		waterH = liH*(h-6)+ulMB;
		var num = Math.floor(h-6);
		var liLen = $('.page3 .num').find('li').length;
		for(var i=1;i<=num;i++){
			$('.page3 .num').find('li').eq(liLen-i).addClass('mark');
		}
		
		if(h>=7 && h<9){
			waterSun.html("朝九晚五");
			bg.children('div').eq(0).show();

		}else if(h>=9 && h<10){
			waterSun.html("公司为家");
			bg.children('div').eq(1).show();
		}else {
			waterSun.html("零点战士");
			bg.children('div').eq(2).show();
		}
	}
	return waterH;
}

var array = [];var span =null;
$(function(){
	span = $(".page4 .box span");
	
	for(var i=0;i<span.length;i++){
		var val = span.eq(i).html();
		val = parseInt(val);
		array.push(val);
	}

    relation();
	var wH = $(window).height();
	var wW = $(window).width();
	$("section").height(wH+'px');
	

// ===========page3
var waterTuW = $(".page3 .box .water .tu").width();
var waterAuW =  $(".page3 .box .water .ao").width();
$(".page3 .box .water .tu").height(waterTuW);
$(".page3 .box .water .ao").height(waterAuW);


// ===========page4
	var romaskW = wW*0.8;
	$(".page4 .romask").height(romaskW/2).css({
		'border-top-left-radius':'0',
		'border-top-right-radius':'0',
		'border-bottom-right-radius':romaskW/2+'px',
		'border-bottom-left-radius':romaskW/2+'px',
		'bottom':-romaskW/2+'px'
	});

// ===========page5
	$(".page5 .circle").height(wW).css({"margin-left":-wW/2+"px","margin-top":-wW/2+"px"});;
	$(".page5 .circle .me").height(wW*0.28);
	var cir1W =  wW*0.345;
	var cir2W =  wW*0.345;
	var cir3W =  wW*0.4;
	var cir4W =  wW*0.475;
	var cir5W =  wW*0.5125;
	var cir6W =  wW*0.5875;
	 $(".page5 .circle .cir1").outerHeight(cir1W).css({"margin-left":-cir1W/2+"px","margin-top":-cir1W/2+"px"});
	 $(".page5 .circle .cir2").outerHeight(cir2W).css({"margin-left":-cir2W/2+"px","margin-top":-cir2W/2+"px"});
	 $(".page5 .circle .cir3").outerHeight(cir3W).css({"margin-left":-cir3W/2+"px","margin-top":-cir3W/2+"px"});
	 $(".page5 .circle .cir4").outerHeight(cir4W).css({"margin-left":-cir4W/2+"px","margin-top":-cir4W/2+"px"});
	 $(".page5 .circle .cir5").outerHeight(cir5W).css({"margin-left":-cir5W/2+"px","margin-top":-cir5W/2+"px"});
	 $(".page5 .circle .cir6").outerHeight(cir6W).css({"margin-left":-cir6W/2+"px","margin-top":-cir6W/2+"px"});
	 $(".page5 .circle .yd").height(cir6W);

// ===========page6
	$(".page6 .circle").height(wW);
	var meW =  wW*0.3;
	$(".page6 .me").height(meW);
	var fri_farW =  wW*0.12;
	$(".page6 .fri_far").height(fri_farW).css({
		"margin-top":-fri_farW/2+"px"
	});
	var fri_near1W = wW*0.16;
	 $(".page6 .fri_near1").height(fri_near1W).css({
		"margin-top":-fri_near1W/2+"px"
	});	
	 var fri_near2W =  wW*0.14;
	 $(".page6 .fri_near2").height(fri_near2W).css({
		"margin-top":-fri_near2W/2+"px"
	});
	 var fri_near3W =  wW*0.12;
	 $(".page6 .fri_near3").height(fri_near3W).css({
		"margin-top":-fri_near3W/2+"px"
	});
	 var fri_near4W =  wW*0.10;
	 $(".page6 .fri_near4").height(fri_near4W).css({
		"margin-top":-fri_near4W/2+"px"
	});
	 var fri_near5W = wW*0.10;
	 $(".page6 .fri_near5").height(fri_near5W).css({
		"margin-top":-fri_near5W/2+"px"
	});
	
// ===========page6gao
	$(".page6gao .circle").height(wW);
	var meW =  wW*0.3;
	$(".page6gao .me").height(meW);
	var fri_farW =  wW*0.12;
	$(".page6gao .fri_far").height(fri_farW).css({
		"margin-top":-fri_farW/2+"px"
	});
	var fri_near1W = wW*0.186;
	 $(".page6gao .fri").height(fri_near1W).css({
		"margin-top":-fri_near1W/2+"px"
	});	
	/* var fri_near2W =  wW*0.158;
	 $(".page6gao .fri_near2").height(fri_near2W).css({
		"margin-top":-fri_near2W/2+"px"
	});
	 var fri_near3W =  wW*0.186;
	 $(".page6gao .fri_near3").height(fri_near3W).css({
		"margin-top":-fri_near3W/2+"px"
	});
	 var fri_near4W =  wW*0.158;
	 $(".page6gao .fri_near4").height(fri_near4W).css({
		"margin-top":-fri_near4W/2+"px"
	});
	 var fri_near5W =  wW*0.158;
	 $(".page6gao .fri_near5").height(fri_near5W).css({
		"margin-top":-fri_near5W/2+"px"
	});	
*/
	 var friLen = $(".page6gao .circle").find('.fri').length;
	 for(var i =0;i<friLen;i++){
	 	var thisFri = $(".page6gao .fri").eq(i);
        var friW = thisFri.outerHeight();
	 	var text = thisFri.find("span").html();
	 	thisFri.find("span").outerWidth(friW*1.2).outerHeight(friW*1.2).css({"margin-top":-friW*1.2/2,"margin-left":-friW*1.2/2});
	 }


// ===========page6g
	$(".page6g .circle .bgcenter").height(wW*0.46); 
	$(".page6g .fri_near4").height(wW*0.16).css({'margin-top':-wW*0.16/2});
	$(".page6g .fri_near4 span").outerHeight(wW*0.16*1.2).outerWidth(wW*0.16*1.2).css({'margin-top':-wW*0.16*1.2/2,'margin-left':-wW*0.16*1.2/2});
	$(".page6g .fri_near5").height(wW*0.14).css({'margin-top':-wW*0.14/2});
		$(".page6g .fri_near5 span").outerHeight(wW*0.14*1.2).outerWidth(wW*0.14*1.2).css({'margin-top':-wW*0.14*1.2/2,'margin-left':-wW*0.14*1.2/2});
    



// ===========page2g
	var bg2H = wW*578/640;
	var bg2T = (wH-bg2H)/2;
	$(".page2g .main ").height(wW*1.3).css("max-height",wW*1.9+"px"); 
	
	$(".page2g ").children("img").css("top",bg2T+"px");

	
	
//=============page8
	page8Bigport();
});	


   

