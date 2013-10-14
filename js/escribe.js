var textos = [];
function get_textos() {
	var result = [];
	for (t in textos) {
		var cont_texto = textos[t];
		var e = {};
		e["texto"] = $("textarea", cont_texto).val();
		var offset = cont_texto.offset();
		e["left"] = offset.left;
		e["top"] = offset.top;
		result.push(e);
	}
	return result;
}
function carga_textos(array){
	var n = 1;
	textos = [];
	for (i in array) {
		var el = array[i];
		$('#cont_escribir').append(
			'<div id="escribe'+n+'">'+
				'<div><img class="flecha" src="images/flechas.png"/></div>'+
				'<textarea class="escribe" placeholder="texto ...">'+el.texto+'</textarea><'+
			'/div>');
		//$('#escribe'+n+' img').css('position', 'relative'); 
		var last_escribe = $('#escribe'+n);
		last_escribe.draggable();
		last_escribe.css({position:'absolute', left:''+el.left+'px', top:''+el.top+'px'});
		textos.push(last_escribe);
		var last_textarea = $('textarea', last_escribe);
		last_textarea.autoResize();
		last_textarea.focusout(function(event){
			var target = event.target;
			$(target).css('z-index', '5'); 
			$(target).css('background', 'transparent');
			$('.flecha').css("visibility","hidden");
			$('.flecha').css('z-index', '4');
			//alert("focus out");
		});

		last_textarea.focus(function(event){
			var target = event.target;
			$(target).css('z-index', '9999');
			$(target).css('background', '');
			$('.flecha').css ("visibility","visible");
			$('.flecha').css('z-index', '9998');
			//$(this).focus();
			// alert("focus in");
		});
		last_textarea.focusout()
		n++;
	}
}
$("#escribe").click( function(event){
	var n = $('#cont_escribir textarea').length+1;
	$("div textarea").css('background', 'transparent');
	$('#cont_escribir').append(
		'<div id="escribe'+n+'">'+
			'<div><img class="flecha" src="images/flechas.png"/></div>'+
			'<textarea class="escribe" placeholder="Introduce tu texto ..."></textarea><'+
		'/div>');
	//$('#escribe'+n+' img').css('position', 'relative'); 
	var last_escribe = $('#escribe'+n);
	last_escribe.css({position:'absolute', left:'10px', top:'100px'});
	if (textos.indexOf(last_escribe) == -1) {
		textos.push(last_escribe);
	}
	last_escribe.draggable();
	//$('textarea', last_escribe).css('position', 'relative'); 
	var last_textarea = $('textarea', last_escribe);
	last_textarea.autoResize();
	// last_escribe.css ()
	//$("div textarea").resizable();
	last_textarea.focusout(function(event){
		var target = event.target;
		$(target).css('z-index', '5'); 
		$(target).css('background', 'transparent');
		$('.flecha').css("visibility","hidden");
		$('.flecha').css('z-index', '4');
		//alert("focus out");
	});

	last_textarea.focus(function(event){
		var target = event.target;
		$(target).css('z-index', '9999');
		$(target).css('background', '');
		$('.flecha').css ("visibility","visible");
		$('.flecha').css('z-index', '9998');
		//$(this).focus();
		// alert("focus in");
	});
	
	// $('textarea', last_escribe).focus();
	//$(document).focus();
});
