//$(document).on( "ready", iniciar);
if (window.screen.mozLockOrientation("portrait"))
{
  // orientation was locked
} else {
  // orientation lock failed
}
$(document).ready( iniciar );

var index_nota = null;
var titulo_nota = null;
var fondo_nota = 1;

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
var block_events = true;
function blocking_events() {
  block_events = true;
  // $('#cont_escribir textarea').attr('disabled','disabled');
  desactivapostics();
  desactivadibuja();
  $('#container').fadeOut();
  $( '#cfondo' ).fadeOut();
  offMap();
  // Desactivar elementos ya metidos
  // $('.imgDrag').unbind('mousedown');
  // $('.div_cescribe').unbind('mousedown');
  // $('.item').unbind('mousedown');
  // $('.escribe').attr('disabled', 'disabled');
  // $('.flecha').css("visibility","hidden");
}
function activateEvents() {
  block_events = false;
  // $('#cont_escribir textarea').attr('readonly','');
  $('#container').show('blind');
  $( '#cfondo' ).show();

  // desactivar elementos ya metidos
  // $('.imgDrag').draggable();
  // $('.div_cescribe').draggable();
  // $('.item').draggable();
  // $('#cont_escribir textarea').attr('disabled','false');
}

function guarda_nota( params) {
  // alert(titulo_nota);
  if (titulo_nota == undefined || titulo_nota == null){
    titulo_nota = prompt("Nombre de la nota:", null);
    if (titulo_nota == null)
      return; 
  }
  var escribeArray = get_textos();
  var imagenArray = get_images();
  var postitsArray = get_postits();
  var ubicaArray = get_ubicas();
  var dibujo = get_dibujo();
  var callbackSuccess = params.callbackSuccess;
  var callbackError = params.callbackError;
  //$('#cont_escribir').append(dibujo);
  var nota = {}
  if (escribeArray) {
    nota ["escribe"] = escribeArray;
  }
  if (imagenArray) {
    nota ["imagen"] = imagenArray;
  }
  if (postitsArray) {
    nota ["postits"] = postitsArray;
  }
  if (ubicaArray) {
    nota ["ubica"] = ubicaArray;
  }
  if (dibujo) {
    nota ["dibuja"] = dibujo;
  }
  nota ["nombre"] = titulo_nota;
  var d = new Date();
  nota ["fecha_modif"] = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
  nota ["index_fondo"] = fondo_nota;
  if (callbackError) {
    save_nota({
      "data_json":nota, 
      "index_nota":index_nota,
      "callbackSuccess":callbackSuccess, 
      "callbackError":callbackError
    });
  }
  else {
    save_nota({
      "data_json":nota, 
      "index_nota":index_nota,
      "callbackSuccess":callbackSuccess, 
      "callbackError":function() { 
        alert("Hubo un error al guardar la nota"); 
      }
    });
  }
}

function iniciar(){
  //$(function() {
    
    $.fn.left = function( using ) {
      return this.position({
        my: "right middle",
        at: "left+100 middle",
        of: "#container",
        collision: "none",
        using: using
      });
    };

    $.fn.left_back = function( using ) {
      return this.position({
        my: "right middle",
        at: "left+50 middle",
        of: "#container",
        collision: "none",
        using: using
      });
    };

    $.fn.right = function( using ) {
      return this.position({
        my: "left middle",
        at: "right-100 middle",
        of: "#container",
        collision: "none",
        using: using
      });
    };

    $.fn.right_back = function( using ) {
      return this.position({
        my: "left middle",
        at: "right-50 middle",
        of: "#container",
        collision: "none",
        using: using
      });
    };

    $.fn.center = function( using ) {
      return this.position({
        my: "center middle",
        at: "center middle",
        of: "#container",
        using: using
      });
    };

    $( "#container img:eq(0)" ).left_back();
    $( "#container img:eq(1)" ).left();
    $( "#container img:eq(2)" ).center();
    $( "#container img:eq(3)" ).right();
    $( "#container img:eq(4)" ).right_back();

    function animate( to ) {
      $( this ).stop( true, false ).animate( to );
    }

    function next( event ) {
      event.preventDefault();
      $( "#container img:eq(4)" ).right( animate );
      $( "#container img:eq(3)" ).center( animate );
      $( "#container img:eq(2)" ).left( animate );
      $( "#container img:eq(1)" ).left_back( animate );
      $( "#container img:eq(0)" ).right_back().appendTo( "#container" );
      toOpacity();
    }
    function previous( event ) {
      event.preventDefault();
      $( "#container img:eq(0)" ).left( animate );
      $( "#container img:eq(1)" ).center( animate );
      $( "#container img:eq(2)" ).right( animate );
      $( "#container img:eq(3)" ).right_back( animate );
      $( "#container img:eq(4)" ).left_back().prependTo( "#container" );
      toOpacity();
    }

    function primero( event ) {
      event.preventDefault();
      $( "#container img:eq(0)" ).center( animate );
      $( "#container img:eq(1)" ).right( animate );
      $( "#container img:eq(2)" ).right_back( animate );
      $( "#container img:eq(3)" ).left_back( animate );
      $( "#container img:eq(4)" ).left().prependTo( "#container" );
      toOpacity();
    }

    function ultimo( event ) {
      event.preventDefault();
      $( "#container img:eq(4)" ).center( animate );
      $( "#container img:eq(3)" ).left( animate );
      $( "#container img:eq(2)" ).left_back( animate );
      $( "#container img:eq(1)" ).right_back( animate );
      $( "#container img:eq(0)" ).right( ).appendTo( "#container" );
      toOpacity();
    }

    function toOpacity( ){
      $( "#container img:eq(0)" ).css( "opacity", "0.4" );
      $( "#container img:eq(1)" ).css( "opacity", "0.7" );
      $( "#container img:eq(2)" ).css( "opacity", "1" );
      $( "#container img:eq(3)" ).css( "opacity", "0.7" );
      $( "#container img:eq(4)" ).css( "opacity", "0.4" );
    }

    toOpacity();

    $("#container").swiperight(function(e) {
     previous(e);
   });

   $("#container").swipeleft(function(e) {
     next(e);
  });

    function clickImg (event) {
      var index = $( "#container img" ).index( event.target );
      //alert(""+index);
      if(index === 0){
        primero( event );
      }else if(index === 1){
        previous( event );
      }else if(index === 3){
        next( event );
      }else if(index === 4){
        ultimo( event );
      }

    }
    $( "#container img" ).click(function( event ) {
      clickImg(event);
    });

    $( 'div #back' ).click(function(){
      if (block_events)
        window.location = "index.html";
      else {
        var r = confirm("¿Salir sin guardar?");
        if (r == true)
          window.location = "index.html";
      }
    });

    document.getElementById("barraFondo").hidden = "true";

    $( '#cfondo' ).click(function(){
      $( '#barraFondo' ).toggle( "clip");
    });

    $('#barraFondo img').click(function(event){
      var target = event.target;
      var index = $('#barraFondo img').index($(target)) + 1;
      fondo_nota = index;
      $('body').css('background-image','url(images/fondos/'+index+'.png)');
    });

    $( window ).resize(function() {
      $( "#container img:eq(0)" ).left_back( animate );
      $( "#container img:eq(1)" ).left( animate );
      $( "#container img:eq(2)" ).center( animate );
      $( "#container img:eq(3)" ).right( animate );
      $( "#container img:eq(4)" ).right_back( animate );
      toOpacity();
    });
    var windowWidth=window.innerWidth;
    var windowHeight=window.innerHeight;
    $("body").css('background-size',''+windowWidth+'px '+windowHeight+'px');
    var cfondoHeight = $('#cfondo img').height();
    var bloqHeight = $('#bloq').height();
    var backHeight = $('#back img').height();
    var footTop = window.innerHeight -20;
    $('#cfondo').css('top',(footTop-cfondoHeight/2)+'px');
    $('#bloq').css('top',(footTop-bloqHeight/2)+'px');
    $('#back').css('top',(footTop-backHeight/2)+'px');
    $('#barraFondo').css('top',(footTop-50)+'px');
    $('#bloq').click(function(){
        $(this).toggleClass("bloq_abierto");
        if (block_events){
          activateEvents();
        }
        else {
          blocking_events();
          guarda_nota({
            callbackSuccess:function(){ 
              //alert("Nota guardada");
              window.location = "index.html";
            }
          });
        }
    });
    index_nota = getURLParameter("index_nota");
    console.log(index_nota);
    if (index_nota !=null) {
      // alert(index_nota);
      function carga_datos(nota){
        carga_textos(nota.escribe);
        carga_postits(nota.postits);
        carga_dibuja(nota.dibuja);
        carga_imagenes(nota.imagen);
        carga_ubicas(nota.ubica);
        titulo_nota = nota.nombre;
        if (nota.index_fondo) {
          fondo_nota = nota.index_fondo;
          $('body').css('background-image','url(images/fondos/'+fondo_nota+'.png)');
        }
        // blocking_events();
        $(this).toggleClass("bloq_abierto");
        activateEvents();
      }
      cargar_nota({
        "index_nota":index_nota,
        "callbackSuccess":carga_datos,
        "callbackError":function(){
          alert("Error: no se pudo cargar la nota");
        }
      });      
    }
    else {
      $('#bloq').addClass("bloq_abierto");
      block_events = false;
    }
}
