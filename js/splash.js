function cambiarFondo(){
	
	var output = document.getElementById("puerco");
	var path = "images/splash/";
	var fondo = "backgrounds-0";
	var puerco = "cerdito-0";

	var indexFondo = Math.floor((Math.random()*8)+1);
	var indexPuerco = Math.floor((Math.random()*8)+1);

	var urlFondo = "url(" + path + fondo + indexFondo + ".png)";
	var urlPuerco = path + puerco + indexPuerco + ".png";

	var windowWidth=window.innerWidth;
    var windowHeight=window.innerHeight;
    $("body").css('background-size',''+windowWidth+'px '+windowHeight+'px');
    
	document.body.style.backgroundImage = urlFondo;

    var img = new Image();
    img.src = urlPuerco;

    output.appendChild(img);

    setTimeout(function(){
		window.location = "index.html";
    }, 3000);
}