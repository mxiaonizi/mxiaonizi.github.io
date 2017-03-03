$(function(){
	window.callback = function(_index) {
		// alert(_index);
		if(_index == 1){
			$('.z_psinfo p').find('span').addClass('color');
		}else {
			$('.z_psinfo p').find('span').removeClass('color');
		}
	}
});