// esta no sirve
// function init_objects() {
// 	if (objects == null)
// 		objects = {};
// 	objects["escribe"] = {};
// 	objects["postits"] = {};
// 	objects["dibuja"] = {};
// 	objects["imagenes"] = {};
// 	objects["ubica"] = {};
// }
var _FILENAME = "animal.note";

function save_data(params) {
	var data_json = params.data_json;
	var callbackSuccess = params.callbackSuccess;
	var callbackError = params.callbackError;
	var stringData = JSON.stringify(data_json);
	// var stringData = "ola ke ase";
	var sdcard = navigator.getDeviceStorage('sdcard');
	var file   = new Blob([stringData], {type: "text/plain"});
	// var url  = URL.createObjectURL(file);
	var request = sdcard.addNamed(file, _FILENAME);
	request.onsuccess = callbackSuccess;

	// An error typically occur if a file with the same name already exist
	request.onerror = callbackError;
}

function save_nota(params){
	var data_json = params.data_json;
	var index_nota = params.index_nota;
	var callbackSuccess = params.callbackSuccess;
	var callbackError = params.callbackError;
	function lista_cargada(lista_notas){
		var json_list;
		//alert(lista_notas);
		eval("json_list="+lista_notas+";");
		if (index_nota)
			json_list[index_nota] = data_json;
		else 
			json_list.push(data_json);
  		//alert("guardando");
		overwrite_data({
			"data_json":json_list, 
			"callbackSuccess":callbackSuccess, 
			"callbackError":callbackError
		});
	}
	function notFound() {
		lista_cargada("[{}]");
	}
	cargar_data({
		"callbackSuccess":lista_cargada, 
		"callbackError":notFound
	});
}

function delete_nota(params){
	var index_nota = params.index_nota;
	if (index_nota) {
		var callbackSuccess = params.callbackSuccess;
		var callbackError = params.callbackError;
		function lista_cargada(lista_notas){
			var json_list;
			eval("json_list="+lista_notas+";");
			if (index_nota){
				json_list[index_nota] = null;
				json_list.splice(index_nota,1);
			}
				
	  		//alert("guardando");
			overwrite_data({
				"data_json":json_list, 
				"callbackSuccess":callbackSuccess, 
				"callbackError":callbackError
			});
		}
		function notFound() {
			lista_cargada("[{}]");
		}
		cargar_data({
			"callbackSuccess":lista_cargada, 
			"callbackError":notFound
		});
	}
}

function cargar_data(params){
	var callbackSuccess = params.callbackSuccess;
	var callbackError = params.callbackError;
	var sdcard = navigator.getDeviceStorage('sdcard');
	var reader = new FileReader();
	try {
		var request = sdcard.get(_FILENAME);
		request.onsuccess = function () {
			var file = this.result;
			console.log("Get the file: " + file.name);
			function loadText(event){
	  			callbackSuccess(event.target.result);
			}
			reader.onload = loadText;
			reader.readAsText(file);
		}
		request.onerror = function () {
			console.warn("Unable to get the file: " + this.error.name);
			if (callbackError)
				callbackError(this.error.name);
		}
	}
	catch(err){
		callbackError("No se pudo leer");
	}
}

function cargar_notas(params){
	return cargar_data(params);
}

function cargar_nota(params){
	function todas(notas){
		var json_notas;
		eval("json_notas="+notas+";");
		var not_exist = true;
		for(i in json_notas) {
			var nota = json_notas[i];
			if (nota && i == params.index_nota) {
				params.callbackSuccess(nota);
				not_exist = false;
				break;
			}
		}
		if(not_exist && params.callbackError){
			params.callbackError();
		}
	}
	cargar_notas({
		"callbackSuccess":todas, "callbackError":params.callbackError});
}

function borrar_data(params){
	var callbackSuccess = params.callbackSuccess;
	var callbackError = params.callbackError;
	var sdcard = navigator.getDeviceStorage('sdcard');

	var request = sdcard.delete(_FILENAME);

	request.onsuccess = function () {
		//console.log("Puta madre"+mierda);
  		if (callbackSuccess)
	  		callbackSuccess();
	}

	request.onerror = function () {
		console.warn("Unable to delete the file: " + this.error);
		if (callbackError)
			callbackError(this.error.name);
	}
}

function overwrite_data(params){
	var data_json = params.data_json;
	var callbackSuccess = params.callbackSuccess;
	var callbackError = params.callbackError;

	var stringData = JSON.stringify(data_json);
	// var stringData = "ola ke ase";
	var sdcard = navigator.getDeviceStorage('sdcard');
	var file   = new Blob([stringData], {type: "text/plain"});
	// var url  = URL.createObjectURL(file);
	//alert(stringData);
	var request = sdcard.addNamed(file, _FILENAME);

	request.onsuccess = callbackSuccess;

	// An error typically occur if a file with the same name already exist
	request.onerror = function () {
		borrar_data({
			"callbackSuccess":function() {
					save_data({
						"data_json":data_json, 
						"callbackSuccess":callbackSuccess, 
						"callbackError":callbackError
					});
				}, 
			"callbackError":callbackError
		});
	}
}
// var nota = {
// 	"nombre":"Esta chingon",
// 	"fecha_modif":"01/02/2013",

// 	"escribe":[
// 		{
// 			"texto":"peluche en el estuche",
// 			"left":"3",
// 			"top":"200"
// 		},
// 		{
// 			"texto":"peluche en el estuche 2",
// 			"left":"30",
// 			"top":"4"
// 		}
// 	],
	
// 	"dibuja":{
// 		"data":"data:image/png;base64,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"
// 	},
	
// 	"postits":[
// 		{
// 			"url":"images/etiquetas/item1.png",
// 			"left":"200",
// 			"top":"200"
// 		},
// 		{
// 			"url":"images/etiquetas/item2.png",
// 			"left":"210",
// 			"top":"200"
// 		},
// 		{
// 			"url":"images/etiquetas/item3.png",
// 			"left":"200",
// 			"top":"240"
// 		},
// 		{
// 			"url":"images/etiquetas/item4.png",
// 			"left":"100",
// 			"top":"300"
// 		}
// 	],
	
// 	"imagen":[
// 		// { 
// 		// 	"url":"",
// 		// 	"left":"",
// 		// 	"top":""
// 		// }
// 	],

// 	"ubica":[
// 		{
// 			"tipo":1,
// 			"left":"",
// 			"top":"",
// 			"altitud":"",
// 			"latitud":"",
// 		}
// 	]
// }
// notas = [];
// notas[12] = nota;
// carga_textos(nota.escribe);
// carga_postits(nota.postits);
// carga_dibuja(nota.dibuja.data);

// overwrite_data({
// 	"data_json":notas, 
// 	"callbackSuccess":function(){
// 		alert("primer");
// 		cargar_data({
// 			"callbackSuccess":function(texto){ alert(texto);}, 
// 			"callbackError":function(){ alert("pifia2");}});
// 	},
// 	"callbackError":function(){ alert("pifia1");}
// });
// borrar_data({});
