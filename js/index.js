
function redirect_nota(index_nota) {
	console.log(index_nota);
	if (index_nota)
		window.location = "editNota.html?index_nota="+index_nota;
	else
		window.location = "editNota.html";
}
$(function() {
	$.mobile.loadingMessage = false;
	$('#help').click(function(){
		window.location = "credits.html"
	});
	var moviendoce = false;
	var test = document.getElementById("test");
	var windowWidth=window.innerWidth;
    var windowHeight=window.innerHeight;
    $("body").css('background-size',''+windowWidth+'px '+windowHeight+'px');
	//addTable();

    $('#agregar').click(function(){
    	if (moviendoce == true)
    		moviendoce=false;
    	else 
			redirect_nota();
    });

    $( '#agregar' ).droppable({
		drop: function( event, ui ){
			var id_nota = ui.draggable.attr('id');
			if (id_nota){}
			else{
				return false;
			}
			var r = confirm("¿Seguro?");
        	if (r == true){
        		//alert("muere "+id_nota);
				var params = {
					"index_nota":id_nota,
					"callbackSuccess": function(){
						cargar_notas({
						"callbackSuccess":addTable,
						"callbackError":tableVacia
					});
					},
					"callbackError": function(){
						alert("No se pudo guardar la nota");
					}
				}
				delete_nota(params);
        	}
			
		}
    });

    function startDrag( event, ui ){
		$('#mas').attr("src", "images/menos.png");
		moviendoce = true;
	}

	function stopDrag( event, ui ){
		$('#mas').attr("src", "images/mas.png");
	}

	function drag(){
		$( "#tablaNotas tbody" ).sortable({
			start: startDrag,
			stop: stopDrag
		});

		$( "#tablaNotas tbody" ).disableSelection();
	}

	function tableVacia() {
		$( '#tablaBody' ).empty();
		$( '#tablaBody' ).append('<tr><td></td><td>Sin elementos</td><td></td></tr>');
		//$("#tablaNotas tbody").sortable('cancel');
		// este no deberia estar
		//drag();
	}

	function addTable(data){
		var body = "";
		$( '#tablaBody' ).empty();
		if (data) {
			var contador = 0;
			var puestos = 0;
			var _json;
			eval("_json="+data);
			// alert(data);
			for(i in _json){
				var el = _json[i];
				if (el && contador > 0){
					var text = '<tr id='+i+' onclick="redirect_nota('+i+');" >';
					text += '<td><img src="images/bolitas/bolitas-0'+el.index_fondo+'.png" /></td>';
					text += "<td><div>" + el.nombre + "</div></td>";
					text += "<td><div>" + el.fecha_modif + "</div></td>";
					text += "</tr>";
					body += text;
					puestos++;
				}
				contador++;
			}
			if (puestos == 0){
				body = '<tr ><td></td><td>Sin elementos</td><td></td></tr>';
				$( '#tablaBody' ).append(body);
			}
			else {
				$( '#tablaBody' ).append(body);
				drag();
			}
		}
		else {
			body += '<tr ><td></td><td>Sin elementos</td><td></td></tr>';
			$( '#tablaBody' ).append(body);
			$("#tablaNotas tbody").sortable('cancel');
		}
		// este no deberia estar
		//drag();
	}
	// addTable(JSON.stringify(notas));
	cargar_notas({
		"callbackSuccess":addTable,
		"callbackError":tableVacia
	});

});