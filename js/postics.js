document.getElementById("containerpostics").hidden="true";
var funcionesMouseDown = {};
var sigPostit = 11;
var postits = [];
function activapostics()
{ 
	$("#contenido").prepend($( "#containerpostics" ));
	$( "#containerpostics" ).show( "blind");
}


function desactivapostics()
{
	//document.getElementById("containerpostics").hidden="true";
	$( "#containerpostics" ).fadeOut();
}
function mousedown(event){
	var target = event.target;
	var dragged = $(target).data('dragged');
	if (dragged == undefined || !dragged){
		creaPostit($(target).data('n'));
		var offset = $(target).offset();
		var left = offset.left;
		var top = offset.top + 35;
		$(target).appendTo($('#cont_escribir'));
		$(target).css ({"left":left, "top":top});
		$(target).data('dragged', true);
	}
}
function configPostit(n) {
	$(".item"+n).data('n', n);
	$(".item"+n).mousedown(mousedown);
}
function configura() {
	$( ".item" ).draggable({
		start:function(){
			$(this).data('dragged', true);
			if (postits.indexOf($(this)) == -1){
				postits.push($(this));
			}
		}
	});
	$( ".item" ).css("z-index", "6");
	//$(".item").css ("position", "absolute");
	for (var i = 1; i <= 7; i++) {
		configPostit(i);
	};
}
function creaPostit(tipo) {
	var item = "item"+tipo;
	var imageTipo = "images/etiquetas/"+item+".png";
	// $('#containerpostics').prepend('<img id=postit'+sigPostit+' src="'+imageTipo+'" class="item"/>');
	$('#containerpostics img:eq('+(tipo-1)+')').after('<img id=postit'+sigPostit+' src="'+imageTipo+'" class="item"/>');
	var nuevo_postit = $('#postit'+sigPostit);
	nuevo_postit.draggable({
		stop:function(){
			$(this).data('dragged', true);
			if (postits.indexOf($(this)) == -1){
				postits.push($(this));
			}
		}
	});
	nuevo_postit.data('n', tipo);
	nuevo_postit.css("z-index", "6");
	nuevo_postit.mousedown(mousedown);
	sigPostit++;
}

$(function() {
	configura();
});
function get_postits() {
	var result = [];
	for (i in postits) {
		var postit_img = postits[i];
		var e = {};
		e["url"] = $(postit_img).attr('src');
		var offset = postit_img.offset();
		e["left"] = offset.left;
		e["top"] = offset.top;
		result.push(e);
	}
	return result;
}
function carga_postits(array) {
	var n = 8;
	postits = [];
	for (i in array) {
		var el = array[i];
		var imageTipo = el.url;
		// $('#containerpostics').prepend('<img id=postit'+sigPostit+' src="'+imageTipo+'" class="item"/>');
		$('#cont_escribir').append('<img id=postit'+n+' src="'+imageTipo+'" class="item"/>');
		var nuevo_postit = $('#postit'+n);
		nuevo_postit.draggable();
		postits.push(nuevo_postit);
		nuevo_postit.css ({position:'absolute', left:''+el.left+'px', top:''+el.top+'px'});
		nuevo_postit.data('dragged', true);
		n++;
	}
}
//$("objedtoDestino").append($("objetoamover"))


