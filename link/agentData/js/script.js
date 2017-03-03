
//测试
var ajaxUrlTestBase = 'http://wxpt-t.taikang.com/mget';
var ajaxUrlTestSub = 'http://wxpt-t.taikang.com/agent-bigdata/comment.do';
var ajaxUrlTestSign = 'http://wxpt-t.taikang.com/agent-bigdata/getSignature.do';
var ajaxUrlTestSignE = 'http://wxpt-t.taikang.com/agent-bigdata/updateTicket.do';

//生产
var ajaxUrlBase = 'http://q.taikang.com/mget';
var ajaxUrlSub = 'http://q.taikang.com/agent-bigdata/comment.do';
var ajaxUrlSign = 'http://q.taikang.com/agent-bigdata/getSignature.do';
var ajaxUrlSignE = 'http://q.taikang.com/agent-bigdata/updateTicket.do';

$(document).ready(function(){
	var urlData = fnUrl();
	
//	console.log(urlData)

	var h = $(window).height();
	var w = $(window).width();
	$('.page').css({
		width: w,
		height: h
	});

	$('#sliderNav').css({
		width: w,
		height:h
	});
	$('#sliderWrap').css({
		width: w,
		height:h
	});

	var outer = document.getElementById('sliderWrap');

	//page1 活动规则弹窗JS
	$('.sliderWrap .page1 .content .fade').height(h);
	$('.sliderWrap .page1 .content').height(h);
	$('.sliderWrap .page1 .rule').on('touchend',function(){
		$('.sliderWrap .page1 .content').show();
		$('#arrow').hide();

		//注销事件
		outer.removeEventListener('touchstart', startHandler);
		outer.removeEventListener('touchmove', moveHandler);
		outer.removeEventListener('touchend', endHandler);

	});
	$('.sliderWrap .page1 .content .box img').on('touchend',function(){
		$('.sliderWrap .page1 .content').hide();
		$('#arrow').show();

		//绑定事件
		outer.addEventListener('touchstart', startHandler);
		outer.addEventListener('touchmove', moveHandler);
		outer.addEventListener('touchend', endHandler);
	});


	//============================================一：设定全局变量
	var NameData = {},                  //代理人微信信息（头像、昵称）
		IntrData = {},                     //代理人基本情况和获奖
		EvaluateData = {},            //代理人评价
		EvaluateStateData = {};   //评价状态


	//==============================================二：请求ajax获取数据
	/*$.ajax({
		url: ajaxUrlTestBase+'?cmd=get&key=agwx_'+urlData.openId,
		type: 'GET',
		dataType: 'json',
		async: false,  //同步请求
		success: function(data) {
			NameData = data;
			modifyPage1();
		},
		error:function() {}
	});*/
	
	/*$.ajax({
		url: ajaxUrlTestBase+'?cmd=get&key=agent_'+urlData.openId,
		type: 'GET',
		dataType: 'json',
		async: false,  //同步请求
		success: function(data) {
			IntrData = data;
			deleDom();
			var slider = new Slider({
				dom : document.getElementById('sliderNav')
			});
		},
		error:function() {}
	});*/

	/*$.ajax({
		url: ajaxUrlTestBase+'?cmd=get&key=agcm_'+urlData.openId,
		type: 'GET',
		dataType: 'json',
		async: false,  //同步请求
		success: function(data) {
			EvaluateData = data;
		},
		error:function() {}
	});*/

	/*$.ajax({
		url: ajaxUrlTestBase+'?cmd=get&key=agcm_'+urlData.state+'_'+urlData.openId,
		type: 'GET',
		dataType: 'json',
		async: false,  //同步请求
		success: function(data) {
			EvaluateStateData = data;
		},
		error:function() {}
	});*/


    var NameData = {                           //33333
        "nickName": "刘苏玲",	//微信昵称
        "headImgUrl": "images/portrait.png"	//微信头像
    };
    var IntrData = {
        "base": {
            "ageRange": "46岁-65岁",	//客户人数最多的年龄段
            "branch": "北京分公司",	//分公司名称
            "center": "北京本部",		//中支名称
            "clientCount": 223,			//客户总数
            "constellation": "狮子",		//星座
            "expense": "16092154.38",	//保费（已缴+未缴）
            "gender": "女",			//性别
            "name": "刘秋平",			//姓名
            "rank": "销售经理",		//职级
            "year": "13",				//年龄
            "mobile": "13011843566",	//手机号
            "warCount": 533,			//保单数
            "famCount": 186,			//家庭数
            "ageCount": "40%"			//年龄占比最多的人数比例
        },
        "honor": {
            "awardCount": 5,			//世纪盛典获奖总数
            "awards":["测试1","测试2","测试3"],		//获奖名称列表（最多3个）
            "elite": "1",				//精英代理人级别
            "f1": "1",				//F1俱乐部级别
            "star": "2星"				//泰康之星级别
        }
    };


    var Base = IntrData.base;
    var Honor = IntrData.honor;


    modifyPage1();//3333
    deleDom();//3333
	var slider = new Slider({//333
		dom : document.getElementById('sliderNav')
	});
	
	//=============================================== 三：页面数据修改和dom元素修改
	//====page1：首页 修改头像和昵称
	function modifyPage1() {
		$('#nickName').text(NameData.nickName);
		$('#headImgUrl').attr('src',NameData.headImgUrl);
	}

	//====判断删除dom元素
	//荣耀之路1：精英代理人级别和F1俱乐部级别没有删除page3
	//荣耀之路2：无荣誉删除page4
	//我的服务：有保单的人才显示，没有删除page6
	function deleDom() {
		//荣耀1 ：无级别
		if(Honor.elite=='否'&&Honor.f1=='否') {
			$('.page3').remove();
		}

		//荣耀2：无荣耀  需要确认是没有荣耀整个页面都不显示，还是只显示星
		/*if() {
			$('.page4').remove();
		}*/
		//我的服务：无保单数
		if(!Base.warCount|| !parseInt(Base.warCount)) {
			$('.page6').remove();
		}
	}

	//=====page2：个人信息  修改个人信息
	modifyInfor();
	function modifyInfor() {

		var imgUrl = {      //男女人物
			female: 'images/z_psGirl.png',
			male: 'images/z_psBg.jpg'
		};
		//星座数据
		var constellation = [
			{
				name: '白羊',
				content:'软萌集中营，||率真可爱的性格里透露出内心的温柔！'
			},
			{
				name: '金牛',
				content:'踏实稳重的外表，||是对内心的坚定和执着！'
			},
			{
				name: '双子',
				content:'精灵古怪又多变，||说到做到不贪玩！'
			},
			{
				name: '巨蟹',
				content:'顾家温柔得迷人，固执倔强得抓狂。||认定目标不放弃，在工作中不断追求完美！'
			},
			{
				name: '狮子',
				content:'正能量满满爆棚，脾气最坏，心最软。||热情、阳光敢爱敢恨！'
			},
			{
				name: '处女',
				content:'认真做事、追求极致完美的你，||总是能引爆全场焦点！'
			},
			{
				name: '天秤',
				content:'绝对的理性又爱心软，普遍的高情商，||在工作中发挥得淋漓尽致！'
			},
			{
				name: '天蝎',
				content:'有性格，有想法，有范儿！||精力旺盛有热情，对自己要求很高，却总是很低调！'
			},
			{
				name: '射手',
				content:'非常乐观和愿意奋斗，精力旺盛有热情。||持家、交友、爱健身！'
			},
			{
				name: '摩羯',
				content:'心思细密爱思考，勤奋努力品位高，||用到在工作中必定是极好的！'
			},
			{
				name: '水瓶',
				content:'爱好和平，勇于创新，善良美丽，||明明可以靠脸吃饭偏偏要靠才华！'
			},
			{
				name: '双鱼',
				content:'情商爆棚的浪漫双鱼，最是那一抹柔情却又坚定，||在工作中必定是一道靓丽的风景！'
			}
		];
		
		var sex = Base.gender;
		var start = Base.constellation;
		var baseInfor = [Base.mobile,'职级：'+Base.rank,'为泰康人寿服务'+Base.year+'年',Base.branch];
		var re = new RegExp(start,'g');
		var startTxt = '';
		

		//姓名，头像，星座和性别
		$('#z_psheader .z_name').text(Base.name);
		$('#z_psheader .z_head img').attr('src',NameData.headImgUrl);
		$('#z_psheader .z_star').text(start+sex);

		//手机，职级，工作年限，公司名称
		$('#z_psinfo span').each(function(i) {
			$(this).text(baseInfor[i]);
		});

		//星座特质
		for(var i=0; i<constellation.length; i++) {
			if(re.test(constellation[i].name)) {
				startTxt = constellation[i].content.split('||').join('<br/>');
				$('.z_psstarinfo p').html(startTxt);
			}
		}

		//更换图片
		if(sex == '男') {
			$('.page .z_imghuman').attr('src',imgUrl.male);
		}else {
			$('.page .z_imghuman').attr('src',imgUrl.female);
		}
	}

	//====page3：荣耀1  如果有荣耀1，就显示对应的金牌和会员
	if($('.page3').length) {
		modifyPage3();
	}
	function modifyPage3() {

		var elite = Honor.elite;
		var f1 = Honor.f1;
		//精英代理人数据和f1俱乐部数据
		var rankData = {
			elite: {
				rank1: {
					content: '金牌精英代理人',
					src:'images/elite1.png'
				},
				rank2: {
					content: '白金精英代理人',
					src:'images/elite2.png'
				},
				rank3: {
					content: '钻石精英代理人',
					src:'images/elite3.png'
				},
				rank4: {
					content: '尊钻精英代理人',
					src:'images/elite4.png'
				}
			},
			member: {
				rank1: {
					content: 'F1俱乐部正式会员',
					src:'images/member1.png'
				},
				rank2: {
					content: 'F1俱乐部顶尖会员',
					src:'images/member2.png'
				},
				rank3: {
					content: 'F1俱乐部尊钻会员',
					src:'images/member3.png'
				}
			}
		};

		//名字修改
		$('.page3 .h_title').text(Base.name+'的荣耀之路');

		if(elite == '1') {
			$('.page3 .h_eliteW .h_eliteImg').attr('src',rankData.elite.rank1.src);
			$('.page3 .h_eliteW .h_eliteTxt').text(rankData.elite.rank1.content);
		}else if(elite == '2') {
			$('.page3 .h_eliteW .h_eliteImg').attr('src',rankData.elite.rank2.src);
			$('.page3 .h_eliteW .h_eliteTxt').text(rankData.elite.rank2.content);
		}else if(elite == '3') {
			$('.page3 .h_eliteW .h_eliteImg').attr('src',rankData.elite.rank3.src);
			$('.page3 .h_eliteW .h_eliteTxt').text(rankData.elite.rank3.content);
		}else if(elite == '4') {
			$('.page3 .h_eliteW .h_eliteImg').attr('src',rankData.elite.rank4.src);
			$('.page3 .h_eliteW .h_eliteTxt').text(rankData.elite.rank4.content);
		}

		if(f1 == '1') {
			$('.page3 .h_memberW .h_memberImg').attr('src',rankData.member.rank1.src);
			$('.page3 .h_memberW .h_memberTxt').text(rankData.member.rank1.content);
		}else if(f1 == '2') {
			$('.page3 .h_memberW .h_memberImg').attr('src',rankData.member.rank2.src);
			$('.page3 .h_memberW .h_memberTxt').text(rankData.member.rank2.content);
		}else if(f1 == '3') {
			$('.page3 .h_memberW .h_memberImg').attr('src',rankData.member.rank3.src);
			$('.page3 .h_memberW .h_memberTxt').text(rankData.member.rank3.content);
		}
	}

	//====page4：荣耀2  如果有荣耀1，就显示对应的金牌和会员
	if($('.page4').length) {
		modifyPage4();
	}
	function modifyPage4() {
		var elem = null;
		var starMember = ['一','二','三','四','五'];
		var num = parseInt(Honor.star) -1;

		//名字修改
		$('.page4 .z_hntitle').text(Base.name+'的荣耀之路');

		//通过世纪盛典获奖总数来判断是否显示世界盛典
		if(Number(Honor.awardCount) == 0|| !Honor.awardCount) {
			$('.page4 .z_hncontk .z_hncontk').hide();
		}else {
			$('.page4 .z_hncontk .z_hndesc span').text('累计获得'+Honor.awardCount+'项荣誉奖项');
			for(var i=0; i<Honor.awards.length; i++) {
				elem = $('<p>'+Honor.awards[i]+'</p>')
				$('.page4 .z_hncontk .z_hndesc').append(elem);
			}
		}

		//泰康之星
		$('.page4 .z_hnconstar .z_hndesc span').text(starMember[num]+'星会员');
		for(var i=0; i<=num; i++) {
			$('.page4 .z_hnconstar .z_hnstars img').eq(i).attr('src','images/z_hnStarOrg.png').addClass('light');
		}
		for(var i=num+1; i<5; i++) {
			$('.page4 .z_hnconstar .z_hnstars img').eq(i).attr('src','images/z_hnStarGray.png').removeClass('light');
		}
	}
	
	//====page5：保费贡献  每人必有，保单数为0，显示特殊页面
	modifyPage5();
	function modifyPage5() {
		var chit = Number(Base.warCount);
		var premium = parseFloat(Base.expense);
		if(!chit||!premium) {
			$('.page5 .contribute').hide();
			$('.page5 .special_wrap').show();
		}else {
			$('.page5 .contribute').hide();
			if(premium>0&&premium<50000) {
				$('.page5 .contribute1').show();
				dataFill('.contribute1');
			}else if(premium>=50000&&premium<100000) {
				$('.page5 .contribute2').show();
				dataFill('.contribute2');
			}else if(premium>=100000&&premium<200000) {
				$('.page5 .contribute3').show();
				dataFill('.contribute3');
			}else if(premium>=200000&&premium<500000) {
				$('.page5 .contribute4').show();
				dataFill('.contribute4');
			}else if(premium>=500000&&premium<1000000) {
				$('.page5 .contribute5').show();
				dataFill('.contribute5');
			}else if(premium>=1000000&&premium<2000000) {
				$('.page5 .contribute6').show();
				dataFill('.contribute6');
			}else if(premium>=2000000&&premium<10000000) {
				$('.page5 .contribute7').show();
				dataFill('.contribute7');
			}else{
				$('.page5 .contribute8').show();
				dataFill('.contribute8');
			}
		}

		function dataFill(className) {
			$('.page5 '+className+' .contri_headU').css('backgroundImg',NameData.headImgUrl);
			$('.page5 '+className+' .contri_nameW em').text(Base.name);
			$('.page5 '+className+' .contri_data span').eq(0).text(chit);
			$('.page5 '+className+' .contri_data span').eq(1).text((premium/10000).toFixed(2));
		}
	}

	//====page6 : 我的服务
	if($('.page6').length>0) {
		modifyPage6();
	}
	function modifyPage6() {
		var arrData = Base.ageRange.match(/\d+/g);
		var str = '';
		var strTxt = '';
		var srtP = '';
		if(arrData.length== 1) {
			if(parseInt(arrData[0])==18) {
				str = '18岁以下';
				srtP = Base.name+'与少年人心连心';
			}else if(parseInt(arrData[0])==65) {
				str = '65岁以上';
				srtP = Base.name+'很合老年人眼缘啊~';
			}
		}else if(arrData.length== 2) {
			if(parseInt(arrData[0])>=18 && parseInt(arrData[1])<=45) {
				str = '18-45岁';
				srtP = Base.name+'跟青年人打得火热~';
			}else if(parseInt(arrData[0])>=46 && parseInt(arrData[1])<=65) {
				str = '46-65岁';
				srtP = Base.name+'跟中年人打成一片';
			}
		}
		var strTxt =Base.name+ '为'+Base.clientCount+'客户,'+Base.famCount+'家庭提供保障服务,其中,<br/>'+str+'客户达到'+Base.ageCount;
		$('.page6 .z_ustitle').html(strTxt);
		$('.page6 .z_usheads p').text(srtP);
	}

	//====page7：评价
	urlData.state = '11';//3333
	EvaluateData = [ //333
	    {
	        "comment": "少年老成",		
	        "count": 1					
	    }, {
	        "comment": "靠谱",
	        "count": 5
	    }, {
	        "comment": "高颜值",
	        "count": 18
	    }, {
	        "comment": "腼腆",
	        "count": 12
	    }, {
	        "comment": "超能侃",
	        "count": 10
	    }, {
            "comment": "超能侃",
            "count": 10
        }, {
            "comment": "超能侃",
            "count": 10
        }, {
            "comment": "超能侃",
            "count": 10
        }
	];

	EvaluateStateData = '';//3333

	modifyPage7();
	function modifyPage7() {
		
		if(!urlData.state) {//表示的是自己进入页面
			$('.page7 .end .assess').hide();
			$('.page7 .end .forward').show();
			var img_w = $('.sliderWrap .page7 .forward img').width();
			var box_w = $('.sliderWrap .page7 .forward .box').width();
			var h1_w = box_w-img_w/2;
			
			$('.sliderWrap .page7 .forward h1').css({width:h1_w,left:img_w/2});
			$('.sliderWrap .page7 .content .fade').height(h);
			
		}else {//表示的是他人进入页面
			$('.page7 .forward').hide();
			$('.page7 .assess').show();

			//他人进入页面是否已评论
			if(EvaluateStateData == 'ok') {
				$('#isEval').prop('disabled',true).val('已评价').css('color','rgba(255,255,255,0.4)');
			}else {
                creareLabel();
            }
		}

		if(!EvaluateData) {//表示没有评论
			$('#hasEval').hide();
			$('.page7 .no_evaluation').show();
		}else {
			$('#impress span').text(Base.name);
			$('.page7 .no_evaluation').hide();
			$('#hasEval').show();

			//生成评价
			createEvalu();
		}
	}
	//生成评价
	function createEvalu() {
		//var classArr = ['text_y','text_e','text_t','text_f','text_fi','text_s','text_se','text_ei'];
        var classArr = ['text_s','text_f','text_fi','text_y','text_ei','text_t','text_e','text_se'];
		var obj = null;
		EvaluateData.sort(function(a,b) {
			return parseInt(b.count) - parseInt(a.count);
		})
		//评价数据
		var evaluData = {
			male: {
				young: '少年老成，保险专家，靠谱，超能侃，贴心，高颜值，阳光男孩，腼腆',
				middle: '成熟稳重，雷利风行，保险专家，靠谱，超能侃，贴心，儒雅'
			},
			female: {
				young: '贴心，保险专家，靠谱，口若悬河，卡哇伊，腼腆，高颜值，鬼马精灵',
				middle: '知心大姐，雷利风行，保险专家，靠谱，口若悬河，知性，闺蜜'
			}
		};
		for(var i=0; i<EvaluateData.length; i++) {
            obj = $('<div class="'+classArr[i]+'"><div class="box"><h1>'+EvaluateData[i].comment+'</h1><h2>'+EvaluateData[i].count+'</h2></div></div>');
            $('#evalAll ').append(obj);
		}

	}

    //生成评价标签
    function creareLabel() {
        var age = '18';
        var sex = Base.gender;
        var htmlStr = '';
        var data = {
             male: {
                 young: '少年老成，保险专家，靠谱，超能侃，贴心，高颜值，阳光男孩，腼腆',
                 middle: '成熟稳重，雷利风行，保险专家，靠谱，超能侃，贴心，儒雅'
             },
             female: {
                 young: '贴心，保险专家，靠谱，口若悬河，卡哇伊，腼腆，高颜值，鬼马精灵',
                 middle: '知心大姐，雷利风行，保险专家，靠谱，口若悬河，知性，闺蜜'
             }
        };

        $('#phrases_name').text(Base.name);

        if(sex == '男') {
            if(parseInt(age)<30) {
                htmlStr = creareLabelStr(data.male.young);
            }else {
                htmlStr = creareLabelStr(data.male.middle);
            }

        }else {
            if(parseInt(age)<30) {
                htmlStr = creareLabelStr(data.female.young);
            }else {
                htmlStr = creareLabelStr(data.female.middle);
            }
        }

        $('#evalLabel').html(htmlStr);
    }

    function creareLabelStr(str) {
        var htmlStr = '';
        var colorData = ['#fb9292','#e5d255','#6aeba1','#4ed0c2','#738dee','#e373e7','#f58947','#f14d4d','#8ad27c'];
        var data = str.split('，');
        for(var i=0; i<data.length; i++) {
            htmlStr += '<li data-col="'+colorData[i]+'" style="border-color:'+colorData[i]+';color:'+colorData[i]+';">'+data[i]+'</li>'
        }
        return htmlStr;
    }

	$('.page7 .end .forward').on('touchstart',function() {
		$('#share').fadeIn();
		$('#arrow').hide();
	});
	$('#share').on('touchstart',function() {
		$('#share').fadeOut();
		$('#arrow').show();
	});
	$('#isEval').on('touchstart',function() {
		$('.page7 .end').fadeOut();
		$('.page7 .phrases').fadeIn();
	});
    $('#evalLabel li').on('touchstart',function() {
        var col = $(this)[0].dataset.col;
        var num = $('#evalLabel .active').length;
        if($(this).hasClass('active')) {
            $(this).css({
                'border-color':col,
                'background':'none',
                'color': col
            });
            $(this).removeClass('active');
        }else {

            if(num>2) {
                fnInfo('最多评价3条');
                return false;
            }

            $(this).css({
                'border-color':col,
                'background-color':col,
                'color':'#fff'
            });
            $(this).addClass('active');
        }
    });
    $('#evalBtn').on('touchstart',function() {
        var arrTxt = [];
        var len = $('#evalLabel li.active').length;
        if(len<1) {
            fnInfo('最少评价1条');
            return false;
        }

        $('#evalLabel li.active').each(function(i) {
            arrTxt.push($(this).html());
        });
       /* var urlData = {
            "openId1": urlData.state,
            "openId2": urlData.openId
        };*/
        fnInfo('提交成功！');
        /*$.ajax({
            url: ajaxUrlTestSub,
            type: 'POST',
            dataType: 'json',
            data:data,
            async: false,  //同步请求
            success: function(data) {
                if(data == 'true') {
                    fnInfo('提交成功！');
                }else {
                    fnInfo('提交失败！');
                }
            },
            error:function() {}
        });*/
    });

    function fnInfo(sInfo){
        $('#evalTip').html(sInfo);

        $('#evalTip').css({
            'WebkitTransform':'scale(1)',
            'transform':'scale(1)',
            'opacity':1
        });
        setTimeout(function(){
            $('#evalTip').css({
                'WebkitTransform':'scale(0)',
                'transform':'scale(0)',
                'opacity':1
            });
        },1000);
    }

	
});

//获取地址栏信息
function fnUrl() {
	var location = window.location.search.substring(1);

	var urlData = {};
	var arr = location.split('&');
	for(var i=0; i<arr.length; i++) {
		var arr1 = arr[i].split('=');
		urlData[arr1[0]] = arr1[1];
	}
	return urlData;
}