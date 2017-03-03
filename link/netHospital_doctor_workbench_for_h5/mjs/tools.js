//处理文本框输入文字个数
function checkTextNum(elemNum,elemText,totalNum){
	var num=elemText[0].value.length;
	if(num>totalNum){
		num=totalNum;
		var str=elemText[0].value.substring(0,totalNum);
		elemText[0].value=str;
	}
	elemNum.html(num+"/"+totalNum);
}

//判断输入内容是否是数字并限制数字个数
function limitNumber(obj){
	var re=/^[0-9]{1,}$/;
	var value=$(obj).val();
	if($(obj).parent().attr("class").indexOf("records_item")!=-1){//收缩压、舒张压、心率2-3位
		if($(obj).val()!=""){
			if(!re.test(value)){
				$(obj).addClass("errorLepuInfo");
				layer.msg("必须是数字",{icon:2});
			}else if($(obj).val()>999||$(obj).val()<10){
				$(obj).addClass("errorLepuInfo");
				layer.msg("请输入2-3位数字",{icon:2});
			}else{
				$(obj).removeClass("errorLepuInfo");
			}
		}else{
			$(obj).removeClass("errorLepuInfo");
		}
	}else{//药品验证
		if(value!="" && !re.test(value)){
			$(obj).addClass("errorLepuInfo");
			layer.msg("必须是数字",{icon:2});
		}else if(value.length>3){
			$(obj).addClass("errorLepuInfo");
			layer.msg("字数长度限制在3位数之间",{icon:2});
		}else{
			$(obj).removeClass("errorLepuInfo");
		}
	}
}
//字符串转数组
function strToArray(str){
	if(!!str){
		return str.split(",");
	}else{
		return new Array();
	}
}
function dataFormat(JsonStr){
	var medicineKey=["HR53_01_037_04","Lepu_Medicine_UnitPrice","Lepu_Medicine_TotalPrice"];
	medicineKey.forEach(function(item){
		JsonStr.S_09.forEach(function(medicine){
			if(!!medicine[item]){
				medicine[item]=parseFloat(medicine[item]);
			}
		});		
	});
}


