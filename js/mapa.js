function mapa() {
  var output = document.getElementById("mapa");

  if (!navigator.geolocation){
    output.innerHTML = "<p>No esta soportada la geolocalizacion</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitud = ' + latitude + '° <br>Longitud = ' + longitude + '°</p>';

    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  }

	function getMap(position) {
		if (window.map) {
			window.map.dispose();
		}

		var options={
			elt:document.getElementById('mapa'),
			zoom:13,
			latLng:{lat:position.coords.latitude, lng:position.coords.longitude},
			mtype:'osm'
		};

		window.map = new MQA.TileMap(options);

		MQA.withModule('largezoom', function() {
			map.addControl(
				new MQA.LargeZoom(),
				new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT, new MQA.Size(5,5))
				);
		});

		var whereiam = new MQA.Poi( {lat:position.coords.latitude, lng:position.coords.longitude} );

		map.addShape(whereiam);
	}

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(getMap, error);
}