function showLocation(province , city , town) {
	var loc	= new Location();
	var title = "";
	if(province == "" || province == null){
		title = ['省份' , '地级市' , '市、县、区'];
	}else{
		if(city == "" || city == null){
			title = [province , '地级市' , '市、县、区'];
		}else{
			if(town == "" || town == null){
				title = [province , city , '市、县、区'];
			}else{
				title = [province , city , town];
			}
		}
	}
	
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	});
	
	
	$('#loc_province').append(title[0]);
	$('#loc_city').append(title[1]);
	$('#loc_town').append(title[2]);
	
	title = ['省份' , '地级市' , '市、县、区'];
	
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	});
	
	$("#loc_province,#loc_city,#loc_town").select2();
	
	$('#loc_province').change(function() {
		$('#loc_city').empty();
		$('#loc_city').append(title[1]);
		loc.fillOption('loc_city' , '0,'+$('#loc_province').val());
		$('#loc_city').change();
	});
	
	$('#loc_city').change(function() {
		$('#loc_town').empty();
		$('#loc_town').append(title[2]);
		loc.fillOption('loc_town' , '0,' + $('#loc_province').val() + ',' + $('#loc_city').val());
	});
	
	$('#loc_town').change(function() {
		$('input[name=location_id]').val($(this).val());
	});
	
	if (province) {
		loc.fillOption('loc_province' , '0' , province);
		
		if (city) {
			loc.fillOption('loc_city' , '0,'+province , city);
			
			if (town) {
				loc.fillOption('loc_town' , '0,'+province+','+city , town);
			}
		}
		
	} else {
		loc.fillOption('loc_province' , '0');
	}
		
}
var institutionAjax=function(){};
var refereeAjax=function(){};
function showLocation2(province , city , town) {
	
	var loc	= new Location();
	var title = "";
	if(province == "" || province == null){
		title = ['省份' , '地级市' , '市、县、区'];
	}else{
		if(city == "" || city == null){
			title = [province , '地级市' , '市、县、区'];
		}else{
			if(town == "" || town == null){
				title = [province , city , '市、县、区'];
			}else{
				title = [province , city , town];
			}
		}
	}
	
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	});
	
	
	$('#loc_province_2').append(title[0]);
	$('#loc_city_2').append(title[1]);
	$('#loc_town_2').append(title[2]);
	
	title = ['省份' , '地级市' , '市、县、区'];
	
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	});
	
	$("#loc_province_2,#loc_city_2,#loc_town_2").select2();
	$("#institute").append("<option value=\"\">来源机构</option>");
	$("#referee").append("<option value=\"\">推荐人</option>");
	$("#institute,#referee").select2();
	
	$('#loc_province_2').change(function() {
		$('#loc_city_2').empty();
		$('#loc_city_2').append(title[1]);
		loc.fillOption('loc_city_2' , '0,'+$('#loc_province_2').val());
		$('#loc_city_2').change();
	});
	
	$('#loc_city_2').change(function() {
		$('#RefereeAreaID').val($(this).val());
		$('#institute').empty();
		$("#institute").append("<option value=\"\">来源机构</option>");
		institutionAjax();
		$('#institute').change();
		
	});
	
	$('#loc_town_2').change(function() {
		$('input[name=location_id]').val($(this).val());
	});
	
	$("#institute").change(function(){
		$("#referee").empty();
		$("#referee").append("<option value=\"\">推荐人</option>");
		refereeAjax();
		$("#referee").change();
	});
	
	
	if (province) {
		loc.fillOption('loc_province_2' , '0' , province);
		
		if (city) {
			loc.fillOption('loc_city_2' , '0,'+province , city);
			
			if (town) {
				loc.fillOption('loc_town_2' , '0,'+province+','+city , town);
			}
		}
		
	} else {
		loc.fillOption('loc_province_2' , '0');
	}
		
}

function showLocation3(province , city , town) {
	
	var loc	= new Location();
	var title = "";
	if(province == "" || province == null){
		title = ['省份' , '地级市' , '市、县、区'];
	}else{
		if(city == "" || city == null){
			title = [province , '地级市' , '市、县、区'];
		}else{
			if(town == "" || town == null){
				title = [province , city , '市、县、区'];
			}else{
				title = [province , city , town];
			}
		}
	}
	
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	});
	
	
	$('#loc_province3').append(title[0]);
	$('#loc_city3').append(title[1]);
	$('#loc_town3').append(title[2]);
	
	title = ['省份' , '地级市' , '市、县、区'];
	
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	});
	
	$("#loc_province3,#loc_city3,#loc_town3").select2();
	
	$('#loc_province3').change(function() {
		$('#loc_city3').empty();
		$('#loc_city3').append(title[1]);
		loc.fillOption('loc_city3' , '0,'+$('#loc_province3').val());
		$('#loc_city3').change();
	});
	
	$('#loc_city3').change(function() {
		$('#loc_town3').empty();
		$('#loc_town3').append(title[2]);
		loc.fillOption('loc_town3' , '0,' + $('#loc_province3').val() + ',' + $('#loc_city3').val());
	});
	
	$('#loc_town3').change(function() {
		$('input[name=location_id]').val($(this).val());
	});
	
	if (province) {
		loc.fillOption('loc_province3' , '0' , province);
		
		if (city) {
			loc.fillOption('loc_city3' , '0,'+province , city);
			
			if (town) {
				loc.fillOption('loc_town3' , '0,'+province+','+city , town);
			}
		}
		
	} else {
		loc.fillOption('loc_province3' , '0');
	}
		
}

/*
function showLocationByDocId(province_id,city_id,town_id,province , city , town) {
	
	var loc	= new Location();
	var title = "";
	if(province == "" || province == null){
		title = ['省份' , '地级市' , '市、县、区'];
	}else{
		if(city == "" || city == null){
			title = [province , '地级市' , '市、县、区'];
		}else{
			if(town == "" || town == null){
				title = [province , city , '市、县、区'];
			}else{
				title = [province , city , town];
			}
		}
	}
	
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	});
	var provinceCssId='#'+province_id;
	var cityCssId="#"+city_id;
	var townCssId="#"+town_id;
	$(provinceCssId).append(title[0]);
	$(cityCssId).append(title[1]);
	$(townCssId).append(title[2]);
	
	title = ['省份' , '地级市' , '市、县、区'];
	
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	});
	var select2Id=provinceCssId+","+cityCssId+","+townCssId;
	$(select2Id).select2();
	
	$(provinceCssId).change(function() {
		$(cityCssId).empty();
		$(townCssId).append(title[1]);
		loc.fillOption(city_id , '0,'+$(provinceCssId).val());
		$(cityCssId).change();
	});
	
	$(cityCssId).change(function() {
		$(townCssId).empty();
		$(townCssId).append(title[2]);
		loc.fillOption(town_id , '0,' + $(provinceCssId).val() + ',' + $(cityCssId).val());
	});
	
	$(townCssId).change(function() {
		$('input[name=location_id]').val($(this).val());
	});
	
	if (province) {
		loc.fillOption(province_id , '0' , province);
		
		if (city) {
			loc.fillOption(city_id , '0,'+province , city);
			
			if (town) {
				loc.fillOption(town_id , '0,'+province+','+city , town);
			}
		}
		
	} else {
		loc.fillOption('loc_province' , '0');
	}
		
}
*/
//$(function(){
//		showLocation();
//		$('#btnval').click(function(){
//			alert($('#loc_province').val() + ' - ' + $('#loc_city').val() + ' - ' +  $('#loc_town').val()) 
//		})
//		$('#btntext').click(function(){
//			alert($('#loc_province').select2('data').text + ' - ' + $('#loc_city').select2('data').text + ' - ' +  $('#loc_town').select2('data').text) 
//		})
//	})