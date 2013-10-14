var pines = [];
var latitud;
var longitud;
var data;

// $( '#mapa' ).hide();
// $( '#cerrar' ).hide();
offMap();

function get_ubicas() {
	//var result = [];

	// for (i in imagenes) {
	// 	var cont_img = imagenes[i];
	// 	var e = {};
	// 	e["url"] = $("img", cont_texto).attr('src');
	// 	var offset = cont_img.offset();
	// 	e["left"] = offset.left;
	// 	e["top"] = offset.top;
	// 	result.push(e);
	// }

	// for(var i=0; i<pines.length; i++){
	// 	var str = "";
	// 	str += "lugar" + i + ":{";
	// 	str += '"latitud":' + pines[i][0] + ",";
	// 	str += '"longitud":' + pines[i][1] + ",";
	// 	str += '"titulo":"' + pines[i][2] + '",';
	// 	str += '"descripcion":"' + pines[i][3] + '"';
	// 	if( i === (pines.length-1)){
	// 		str += '}';
	// 	}else{
	// 		str += '},';
	// 	}
	// 	result.push(str);
	// }
	//alert(result);
	return pines;
}

function carga_ubicas(array) {
	//alert(JSON.stringify(array));
	pines = array;
	//alert(pines);
}

function mapa() {
	$( '#mapa' ).show();
	$( '#cerrar' ).show();

	$( '#cerrar' ).click(function(){
		offMap();
	});

  var output = document.getElementById("mapa");

  if (!navigator.geolocation){
    output.innerHTML = "<p>No esta soportada la geolocalizacion</p>";
    return;
  }

	function getMap(position) {
		var lt;
		var lg;

		if (window.map) {
			window.map.dispose();
		}

		if (pines.length > 0){
			lt = pines[0][0];
			lg = pines[0][1];
		}else{
			lt = position.coords.latitude;
			lg = position.coords.longitude;
		}

		var options={
			elt:document.getElementById("mapa"),
			zoom:13,
			latLng:{lat:lt, lng:lg},
			mtype:'osm'
		};

		window.map = new MQA.TileMap(options);

		MQA.withModule('largezoom', function() {
			map.addControl(
				new MQA.LargeZoom(),
				new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5,5))
				);
		});

		if(pines.length >= 1){
			for(var i=0; i<pines.length; i++) {
				var nuevo = new MQA.Poi( {lat:pines[i][0], lng:pines[i][1]} );

				nuevo.draggable = true;
				nuevo.setInfoContentHTML(pines[i][2]);
				map.addShape(nuevo);
				nuevo.toggleInfoWindow();
			}
		}else{
			var whereiam = new MQA.Poi( {lat:lt, lng:lg} );
			map.addShape(whereiam);
			pines.push([lt, lg, "TU", "Aqui estas!"]);
		}

		MQA.EventManager.addListener(map, 'click', addMaker);
	}

	function addMaker( event ){
		data = event.ll;
		var mylt = data.getLatitude();
		var mylg = data.getLongitude();

		var titulo = "Marcador"+pines.length;
		var descripcion = "nuevo marcador";

		var whereiam = new MQA.Poi( {lat:mylt, lng:mylg} );

		whereiam.draggable = true;
		whereiam.setInfoContentHTML(titulo);
		map.addShape(whereiam);
		whereiam.toggleInfoWindow();

		pines.push([mylt, mylg, titulo, descripcion]);
		get_ubicas();
	}

	function movePin( event ){

	}

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(getMap, error);
}



function offMap(){
	$( '#mapa' ).hide();
	$( '#cerrar' ).hide();
}