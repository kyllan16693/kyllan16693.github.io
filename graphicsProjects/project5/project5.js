/* drawWireDodecahedron made with help from: https://stackoverflow.com/questions/18581445/how-do-i-create-a-dodecahedron-with-polyhedrongeometry
*  drawWireIcosahedron made with help from: https://codepen.io/mcdorli/pen/LZdoeo 
*  radio buttons made with help from: https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/
*
*  Code written by Kyllan Wunder
*
* A more updated version of this code can be found at: https://pages.cs.wisc.edu/~kyllan/graphicsProjects/project5/project5.html
*/

function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    
    var rotateYSlider = document.getElementById('rotateYSlider');
    rotateYSlider.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;

    var twoDcanvas = document.getElementById('twodcanvas');
    var twodSlider = document.getElementById('twodSlider');
    twodSlider.value = 3;
    var twoDcontext = twoDcanvas.getContext('2d');

    var context = cameraContext; // default to drawing in the camera window
    const shapes = ['tetrahedron', 'cube', 'octahedron', 'dodecahedron', 'icosahedron'];

    const group = document.getElementById('shapeButtons');
    group.innerHTML = shapes.map(shape => `<div><input type="radio" name="shape" value="${shape}">${shape}</div>`).join('');

  
    const radioButtons = document.querySelectorAll('input[name="shape"]');

    //set the default shape to tetrahedron
    radioButtons[0].checked = true;
    radioButtons[1].checked = false;
    radioButtons[2].checked = false;
    radioButtons[3].checked = false;
    radioButtons[4].checked = false;
    
    
   //if the radio button is clicked, change the radioButtons[i].checked = true;


   //console.log(radioButtons[0].checked);


    function draw() {

    //2d canvas
    //draw a shape with the number of sides specified by the slider
    function drawShape() {
        //clear the canvas
        twoDcontext.clearRect(0, 0, twoDcanvas.width, twoDcanvas.height);
        twoDcontext.strokeStyle="black";
        var sides = twodSlider.value;
        var angle = 2 * Math.PI / sides;
        var radius = 200;
        //center the shape at 200,200
        twoDcontext.translate(200, 200);
        //rotate the shape -90 degrees so that the first point is at the top
        twoDcontext.rotate(-Math.PI / 2);
        twoDcontext.beginPath();
        twoDcontext.moveTo(radius, 0);
        for (var i = 1; i < sides; i++) {
            twoDcontext.lineTo(radius * Math.cos(angle * i), radius * Math.sin(angle * i));
            if(sides == 3){
                twoDcontext.strokeStyle="green";
            } else if(sides == 4){
                twoDcontext.strokeStyle="red";
            } else if(sides == 5){
                twoDcontext.strokeStyle="blue";
            }

        }
        twoDcontext.closePath();
        //thicker line
        twoDcontext.lineWidth = 5;
        twoDcontext.stroke();
        twoDcontext.translate(-200, -200);

    }




    drawShape();


    


      
    // clear both canvas instances
	observerCanvas.width = observerCanvas.width;
	cameraCanvas.width = cameraCanvas.width;

	// use the sliders to get the angles
    var viewAngle = slider2.value*0.02*Math.PI;
     
	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}

	
    function drawCamera(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
	    context.strokeStyle = color;
        // Twelve edges of a cropped pyramid
        moveToTx([-3,-3,-2],Tx);lineToTx([3,-3,-2],Tx);
        lineToTx([3,3,-2],Tx);lineToTx([-3,3,-2],Tx);
        moveToTx([3,-3,-2],Tx);lineToTx([2,-2,0],Tx);
        lineToTx([2,2,0],Tx);lineToTx([3,3,-2],Tx);
        moveToTx([2,-2,0],Tx);lineToTx([-2,-2,0],Tx);
        lineToTx([-2,2,0],Tx);lineToTx([2,2,0],Tx);
        moveToTx([-2,-2,0],Tx);lineToTx([-3,-3,-2],Tx);
        lineToTx([-3,3,-2],Tx);lineToTx([-2,2,0],Tx);
        context.stroke();
    }
      
    function draw3DAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
	    // Arrowheads
	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
	    // X-label
	    moveToTx([1.3,-.05,0],Tx);lineToTx([1.4,.05,0],Tx);
	    moveToTx([1.3,.05,0],Tx);lineToTx([1.4,-.05,0],Tx);
        // Y-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.35,0],Tx);lineToTx([.05,1.4,0],Tx);
        moveToTx([0,1.35,0],Tx);lineToTx([0,1.28,0],Tx);
	    // Z-label
	    moveToTx([-.05,0,1.3],Tx);
	    lineToTx([.05,0,1.3],Tx);
	    lineToTx([-.05,0,1.4],Tx);
	    lineToTx([.05,0,1.4],Tx);

	    context.stroke();
	}


    var CameraCurve = function(angle) {
        var distance = 120.0;
        var eye = vec3.create();
        eye[0] = distance*Math.sin(viewAngle);
        eye[1] = 100;
        eye[2] = distance*Math.cos(viewAngle);  
        return [eye[0],eye[1],eye[2]];
    }


    function drawWireCube(Tx,size) {

        var s = size;
        context.strokeStyle="red";
        context.beginPath();
        moveToTx([s,s,s],Tx);lineToTx([-s,s,s],Tx);lineToTx([-s,-s,s],Tx);
        lineToTx([s,-s,s],Tx);lineToTx([s,s,s],Tx);
        moveToTx([s,s,-s],Tx);lineToTx([-s,s,-s],Tx);lineToTx([-s,-s,-s],Tx);
        lineToTx([s,-s,-s],Tx);lineToTx([s,s,-s],Tx);
        moveToTx([s,s,s],Tx);lineToTx([s,s,-s],Tx);
        moveToTx([-s,s,s],Tx);lineToTx([-s,s,-s],Tx);
        moveToTx([-s,-s,s],Tx);lineToTx([-s,-s,-s],Tx);
        moveToTx([s,-s,s],Tx);lineToTx([s,-s,-s],Tx);
        context.stroke();

    }

    function drawWireOctahedron(Tx,size) {
        var s = size;
        context.strokeStyle="green";
        context.beginPath();
        moveToTx([s,0,0],Tx);lineToTx([0,s,0],Tx);lineToTx([-s,0,0],Tx);
        lineToTx([0,-s,0],Tx);lineToTx([s,0,0],Tx);
        moveToTx([0,s,0],Tx);lineToTx([0,0,s],Tx);lineToTx([0,-s,0],Tx);
        lineToTx([0,0,-s],Tx);lineToTx([0,s,0],Tx);
        moveToTx([s,0,0],Tx);lineToTx([0,0,s],Tx);lineToTx([-s,0,0],Tx);
        lineToTx([0,0,-s],Tx);lineToTx([s,0,0],Tx);
        context.stroke();

    }


    function drawWireTetrahedron(Tx, size){
        var s = size;
        context.strokeStyle="green";
        context.beginPath();
        moveToTx([s,s,s],Tx);lineToTx([-s,-s,s],Tx);lineToTx([-s,s,-s],Tx);
        lineToTx([s,-s,-s],Tx);lineToTx([s,s,s],Tx);
        moveToTx([s,s,s],Tx);lineToTx([-s,-s,s],Tx);lineToTx([s,-s,-s],Tx);
        moveToTx([-s,s,-s],Tx);lineToTx([-s,-s,s],Tx);lineToTx([s,-s,-s],Tx);
        moveToTx([s,s,s],Tx);lineToTx([-s,s,-s],Tx);
        context.stroke();
    }



    function drawWireDodecahedron(Tx, size){
        //
        var s = size;
        context.strokeStyle="blue";
        context.beginPath();

        var faces = [
            [16,0,2,18,6],
    
            [16,10,8,12,0],
            [0,12,4,14,2],
            [2,14,9,11,18],
            [18,11,19,7,6],
            [6,7,17,10,16],
    
            [1,17,10,8,13],
            [13,8,12,4,5],
            [5,4,14,9,15],
            [15,9,11,19,3],
            [3,19,7,17,1],
    
            [1,13,5,15,3]
        ]
        var p = (1 + Math.sqrt(5))/2,
        q = 1/p;

        var dodecahedronVertices = [
            [0, q, p],
            [0, q, -p],
            [0, -q, p],
            [0, -q, -p],
            [p, 0, q],
            [p, 0, -q],
            [-p, 0, q],
            [-p, 0, -q],
            [q, p, 0],
            [q, -p, 0],
            [-q, p, 0],
            [-q, -p, 0],
            [1, 1, 1],
            [1, 1, -1],
            [1, -1, 1],
            [1, -1, -1],
            [-1, 1, 1],
            [-1, 1, -1],
            [-1, -1, 1],
            [-1, -1, -1]

        ]
        

        for (var i = 0; i < faces.length; i++){
            var face = faces[i];
            for (var j = 0; j < face.length; j++){
                var v = face[j];
                var x = dodecahedronVertices[v][0];
                var y = dodecahedronVertices[v][1];
                var z = dodecahedronVertices[v][2];
                if (j == 0){
                    moveToTx([x*s,y*s,z*s],Tx);
                } else {
                    lineToTx([x*s,y*s,z*s],Tx);
                }
            }
            lineToTx([dodecahedronVertices[face[0]][0]*s,dodecahedronVertices[face[0]][1]*s,dodecahedronVertices[face[0]][2]*s],Tx);
        }

        

        context.stroke();
    }

    function drawWireIcosahedron(Tx, size){
        var s = size;
        context.strokeStyle="green";
        context.beginPath();
        
        var X = 0.525731112119133606*s;
        var Z = 0.85065080835203993*s;
        vertices = [
            [-X, 0.0, Z],
            [X, 0.0, Z],
            [-X, 0.0, -Z],
            [X, 0.0, -Z],
            [0.0, Z, X],
            [0.0, Z, -X],
            [0.0, -Z, X],
            [0.0, -Z, -X],
            [Z, X, 0.0],
            [-Z, X, 0.0],
            [Z, -X, 0.0],
            [-Z, -X, 0.0]
          ];
        
          indices = [
            [0, 4, 1],
            [0, 9, 4],
            [9, 5, 4],
            [4, 5, 8],
            [4, 8, 1],
            [8, 10, 1],
            [8, 3, 10],
            [5, 3, 8],
            [5, 2, 3],
            [2, 7, 3],
            [7, 10, 3],
            [7, 6, 10],
            [7, 11, 6],
            [11, 0, 6],
            [0, 1, 6],
            [6, 1, 10],
            [9, 0, 11],
            [9, 11, 2],
            [9, 2, 5],
            [7, 2, 11]
          ];
          

            for (var i = 0; i < indices.length; i++) {
                var index = indices[i];
                moveToTx(vertices[index[0]],Tx);
                lineToTx(vertices[index[1]],Tx);
                lineToTx(vertices[index[2]],Tx);
                lineToTx(vertices[index[0]],Tx);
            }
            context.stroke();



    } 


   
 
    // create two lookAt transforms; one for the camera
    // and one for the "external observer"

    // Create Camera (lookAt) transform
    var eyeCamera = CameraCurve(viewAngle);
    var targetCamera = vec3.fromValues(0,0,0); // Aim at the origin of the world coords
    var upCamera = vec3.fromValues(0,100,0); // Y-axis of world coords to be vertical
	var TlookAtCamera = mat4.create();
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);
      
    // Create Camera (lookAt) transform
    var eyeObserver = vec3.fromValues(500,300,500);
    var targetObserver = vec3.fromValues(0,50,0); // Observer still looks at origin
    var upObserver = vec3.fromValues(0,1,0); // Y-axis of world coords to be vertical
	var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);
      
    // Create ViewPort transform (assumed the same for both canvas instances)
    var Tviewport = mat4.create();
	mat4.fromTranslation(Tviewport,[200,300,0]);  // Move the center of the
                                                  // "lookAt" transform (where
                                                  // the camera points) to the
                                                  // canvas coordinates (200,300)
	mat4.scale(Tviewport,Tviewport,[100,-100,1]); // Flip the Y-axis,
                                                  // scale everything by 100x
    // make sure you understand these    

    context = cameraContext;

    // Create Camera projection transform
    // (orthographic for now)
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);
    //mat4.perspective(TprojectionCamera,Math.PI/4,1,-1,1); // Use for perspective teaser!

    // Create Observer projection transform
    // (orthographic for now)
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);
     
    // Create transform t_VP_PROJ_CAM that incorporates
    // Viewport, projection and camera transforms
    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
    mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);
      
	// Create model(ing) transform
    // (from moving object to world)
    var Tmodel = mat4.create();
	
    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
	var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera,TlookAtCamera);
    mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);

    //rotate the shown object around the z-axis based on the rotateYSlider value
    mat4.rotateZ(tVP_PROJ_VIEW_MOD1_Observer,tVP_PROJ_VIEW_MOD1_Observer,rotateYSlider.value*Math.PI/180);
    //also rotate in the camera's frame of reference
    mat4.rotateZ(tVP_PROJ_VIEW_MOD_Camera,tVP_PROJ_VIEW_MOD_Camera,rotateYSlider.value*Math.PI/180);


    // Draw the following in the Camera window
    function drawCameraView(){
        context = cameraContext;
        if(radioButtons[0].checked){
            drawWireTetrahedron(tVP_PROJ_VIEW_MOD_Camera,100.0,5);
            
        } else if (radioButtons[1].checked){
            drawWireCube(tVP_PROJ_VIEW_MOD_Camera,100.0,5);
        } else if (radioButtons[2].checked){
            drawWireOctahedron(tVP_PROJ_VIEW_MOD_Camera,100.0,5);
        } else if (radioButtons[3].checked){
            drawWireDodecahedron(tVP_PROJ_VIEW_MOD_Camera,100.0,5);
        } else if (radioButtons[4].checked){
            drawWireIcosahedron(tVP_PROJ_VIEW_MOD_Camera,100.0,5);
        }


        
        
    }
    // Draw the following in the Observer window
    function drawObserverView(){
        context = observerContext;
        draw3DAxes("grey",tVP_PROJ_VIEW_Observer,100.0);  

        if(radioButtons[0].checked){
            drawWireTetrahedron(tVP_PROJ_VIEW_MOD1_Observer,100.0,5);
        } else if (radioButtons[1].checked){
            drawWireCube(tVP_PROJ_VIEW_MOD1_Observer,100.0,5);
        } else if (radioButtons[2].checked){
            drawWireOctahedron(tVP_PROJ_VIEW_MOD1_Observer,100.0,5);
        } else if (radioButtons[3].checked){
            drawWireDodecahedron(tVP_PROJ_VIEW_MOD1_Observer,100.0,5);
        } else if (radioButtons[4].checked){
            drawWireIcosahedron(tVP_PROJ_VIEW_MOD1_Observer,100.0,5);
        }
       
        drawCamera("purple",tVP_PROJ_VIEW_MOD2_Observer,10.0); 
    }
    
    drawCameraView();
    drawObserverView();
    }
    
    twodSlider.addEventListener("input",draw);
    rotateYSlider.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('click', function() {
            draw();
            radioButtons[i].checked = true;
            for (let j = 0; j < radioButtons.length; j++) {
                if (j != i) {
                    radioButtons[j].checked = false;
                }
            }
        });
    } 
    draw();
}
window.onload = setup;

