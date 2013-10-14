var takePicture = $('#fileinput');
var imagenes = [];
var last_imagen;
$('#imagen').click(function (event){
	takePicture.trigger('click');
});

takePicture.change( function(event){
	// Get a reference to the taken picture or chosen file
	var n = $('#cont_escribir .imagen').length+1;
    var files = event.target.files,
        file;
    if (files && files.length > 0) {
        file = files[0];
    }
    $('#cont_escribir').append('<div class="imgDrag" id="cont_img'+n+'"><img id="imagen'+n+'" class="imagen"/></div>');
	var nueva_imagen = $('#cont_img'+n);
	nueva_imagen.draggable();

	if (imagenes.indexOf(nueva_imagen) == -1){
		imagenes.push(nueva_imagen);
	}
    // Image reference
	var showPicture = $('#imagen'+n);

	// Get window.URL object
	var URL = window.URL || window.webkitURL;

	// Create ObjectURL
	var imgURL = URL.createObjectURL(file);

	// Set img src to ObjectURL
	showPicture.attr('src', imgURL);
	// For performance reasons, revoke used ObjectURLs
	URL.revokeObjectURL(imgURL);
});

function get_images() {
	var result = [];
	for (i in imagenes) {
		var cont_img = imagenes[i];
		var e = {};
		e["url"] = $("img", cont_texto).attr('src');
		var offset = cont_img.offset();
		e["left"] = offset.left;
		e["top"] = offset.top;
		result.push(e);
	}
	return result;
}
function carga_imagenes(array) {
	var n = 1;
	imagenes = [];
	for (i in array) {
		var el = array[i];
		$('#cont_escribir').append('<div id="cont_img'+n+'"><img id="imagen'+n+'" class="imagen"/></div>');
		var nueva_imagen = $('#cont_img'+n);
		nueva_imagen.draggable();

		imagenes.push(nueva_imagen);
		var showPicture = $('#imagen'+n);
		showPicture.attr('src', el.url);

		nueva_imagen.css({position:'absolute', left:''+el.left+'px', top:''+el.top+'px'});
		n++;
	}
}