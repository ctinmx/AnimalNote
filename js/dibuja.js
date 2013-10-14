document.getElementById("bloqueo").hidden="true";
document.getElementById("containerdibuja").hidden="true";

var bandera= false;
var cont=0;
	 function activadibuja()
		{ 
			document.getElementById("bloqueo").hidden="true";
			document.getElementById("containerdibuja").hidden="";
			if(cont==0){
			bandera=true;
 			initialize();
 			cont=10;}
 			else{bandera=true;}
		}


		function desactivadibuja()
		{
			document.getElementById("bloqueo").hidden="";
			document.getElementById("containerdibuja").hidden="true";
			bandera=false;
			 $(sigCanvas).unbind("initialize();");
		}
		
		
        window.context=2;
		var background = false;
		var borrar = false;
		var canvasatras = document.getElementById("canvasatras");
		var ctx = canvasatras.getContext("2d");
		$(document).ready(function () {
			
		});
		function eliminar(){
			window.context.clearRect(0,0,322,414);
			ctx.clearRect(0,0,322,414);
			background = false;
		}
          var contborrar=0;
        	function borrando(){
        	if(contborrar==0)
        	{
			  borrar = !borrar;
			  contborrar=1;
		    }
		}
			function dibujando(){
			 if(contborrar==1)
			 {
			  borrar = !borrar;
			  contborrar=0;
			 }
		}

		function getPosition(mouseEvent, sigCanvas) {
			var x, y;
			if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
				x = mouseEvent.pageX;
				y = mouseEvent.pageY;
	         } else {
	            x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	            y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	         }
	         return { X: x - sigCanvas.offsetLeft, Y: y - sigCanvas.offsetTop };
	      }

		function initialize() {

			//-------------------------------------------------

	         sigCanvas = document.getElementById("canvasSignature");
	         window.context = sigCanvas.getContext("2d");
	         window.context.strokeStyle = '#000000';
			 window.context.lineWidth = 2;

	         var is_touch_device = 'ontouchstart' in document.documentElement;

	         if (is_touch_device) {
	            var drawer = {
	               isDrawing: false,
	               touchstart: function (coors) {
	                  window.context.beginPath();
	                  window.context.moveTo(coors.x, coors.y);
	                  this.isDrawing = true;
	               },
	               //--------
	               touchmove: function (coors) {
	                  if (this.isDrawing) {
						if(borrar){
						    window.context.clearRect(coors.x,coors.y,10,10);					
						}
						else{
	                     window.context.lineTo(coors.x, coors.y);
	                     window.context.stroke();
						}
	                  }
	               },
	               //-------
	               touchend: function (coors) {
	                  if (this.isDrawing) {
	                     this.touchmove(coors);
	                     this.isDrawing = false;
	                  }
	               }
	            };
	      

	        
	            function draw(event) {

	               var coors = {
	                  x: event.targetTouches[0].pageX,
	                  y: event.targetTouches[0].pageY
	               };

	              
	               var obj = sigCanvas;

	               if (obj.offsetParent) {
	                  do {
	                     coors.x -= obj.offsetLeft;
	                     coors.y -= obj.offsetTop;
	                  }

	                  while ((obj = obj.offsetParent) != null);
	               }

	               drawer[event.type](coors);
	            };

 				sigCanvas.addEventListener('touchstart', draw, false);
	            sigCanvas.addEventListener('touchmove', draw, false);
	            sigCanvas.addEventListener('touchend', draw, false);
	            sigCanvas.addEventListener('touchmove', function (event) {
	               event.preventDefault();
	            }, false);
	            
	         }
	         else {

	            $("#canvasSignature").mousedown(function (mouseEvent) {
	               var position = getPosition(mouseEvent, sigCanvas);

	               window.context.moveTo(position.X, position.Y);
	               window.context.beginPath();

	               $(this).mousemove(function (mouseEvent) {
	                  drawLine(mouseEvent, sigCanvas, window.context);
	               }).mouseup(function (mouseEvent) {
	                  finishDrawing(mouseEvent, sigCanvas, window.context);
	               }).mouseout(function (mouseEvent) {
	                  finishDrawing(mouseEvent, sigCanvas, window.context);
	               });
	            });
	         }


	      }
	      //-----------------------------------------------------

	      function drawLine(mouseEvent, sigCanvas) {
if(bandera){
	         var position = getPosition(mouseEvent, sigCanvas);
	 			if(borrar){
				    window.context.clearRect(position.X,position.Y,20,20);					
				}
				else{
	         		window.context.lineTo(position.X, position.Y);
	         		window.context.stroke();
				}
			}
	      }
	      function finishDrawing(mouseEvent, sigCanvas) {
	      if(bandera){   
	         drawLine(mouseEvent, sigCanvas, window.context);
	         window.context.closePath();

	         $(sigCanvas).unbind("mousemove")
	                     .unbind("mouseup")
	                     .unbind("mouseout");
	                 }
	      }