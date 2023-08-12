/* Project Written by Kyllan Wunder 
* Star drawing function from: Star design from https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5 
* and modified
* Site is visiable here: https://pages.cs.wisc.edu/~kyllan/graphicsProjects/project3/project3.html
*/

function setup() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  canvas.width = canvas.width;
  canvas.height = canvas.height;


  function moveToTx(x,y,Tx)
{var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.moveTo(res[0],res[1]);}

function lineToTx(x,y,Tx)
{var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.lineTo(res[0],res[1]);}



  function drawStar(cx,cy,spikes,outerRadius,innerRadius,color,Tx){
    spikes = Math.abs(spikes);
    if(spikes < 4){
      spikes = 4;
    }else if(spikes > 20){
      spikes = 20;
    }
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;
  
    context.beginPath();
    moveToTx(cx,cy-outerRadius,Tx);
    for(i=0;i<spikes;i++){
      x=cx+Math.cos(rot)*outerRadius;
      y=cy+Math.sin(rot)*outerRadius;
      lineToTx(x,y,Tx);
      rot+=step
  
      x=cx+Math.cos(rot)*innerRadius;
      y=cy+Math.sin(rot)*innerRadius;
      lineToTx(x,y,Tx);
      rot+=step
    }
    lineToTx(cx,cy-outerRadius,Tx);
    context.closePath();
    context.lineWidth=5;
    context.strokeStyle=color;
    context.stroke();
    context.fillStyle='light'+color;
    context.fill();
  
  
  
  }


  var xconst = 400;
  var yconst = 400;
  var x = [Math.floor(Math.random() * xconst),Math.floor(Math.random() * xconst),Math.floor(Math.random() * xconst),Math.floor(Math.random() * xconst),Math.floor(Math.random() * xconst),Math.floor(Math.random() * xconst),Math.floor(Math.random() * xconst),Math.floor(Math.random() * xconst),Math.floor(Math.random() * xconst),Math.floor(Math.random() * xconst)];
  var y = [Math.floor(Math.random() * yconst),Math.floor(Math.random() * yconst),Math.floor(Math.random() * yconst),Math.floor(Math.random() * yconst),Math.floor(Math.random() * yconst),Math.floor(Math.random() * yconst),Math.floor(Math.random() * yconst),Math.floor(Math.random() * yconst),Math.floor(Math.random() * yconst),Math.floor(Math.random() * yconst)];

  var dxconst = 3;
  var dyconst = -3;
  var dx = [Math.floor(Math.random() * dxconst),Math.floor(Math.random() * dxconst),Math.floor(Math.random() * dxconst),Math.floor(Math.random() * dxconst),Math.floor(Math.random() * dxconst),Math.floor(Math.random() * dxconst),Math.floor(Math.random() * dxconst),Math.floor(Math.random() * dxconst),Math.floor(Math.random() * dxconst),Math.floor(Math.random() * dxconst)];
  var dy = [Math.floor(Math.random() * dyconst),Math.floor(Math.random() * dyconst),Math.floor(Math.random() * dyconst),Math.floor(Math.random() * dyconst),Math.floor(Math.random() * dyconst),Math.floor(Math.random() * dyconst),Math.floor(Math.random() * dyconst),Math.floor(Math.random() * dyconst),Math.floor(Math.random() * dyconst),Math.floor(Math.random() * dyconst)];
  
  animate();
  function animate(){
    
    
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.beginPath();

    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.closePath();

    var colors = ["yellow","blue","green","coral","pink","salmon","seagreen","steelblue","goldenrodyellow","gray",];

    for(var i = 0; i < colors.length; i++){
      var Tstar_to_canvas = mat3.create();
      mat3.fromTranslation(Tstar_to_canvas,[x[i],y[i]]);
      drawStar(0,0,5,20,10,colors[i],Tstar_to_canvas);
      x[i] += dx[i];
      y[i] += dy[i];
    }

    if(Math.floor(Math.random() * 1000) == 0){
      var star = Math.floor(Math.random() * 10);
        dx[star] = -dx[star];
        dy[star] = -dy[star];

    }


    var starRadius = 20;
    for(var i = 0; i < colors.length; i++){
      if(x[i] > canvas.width - starRadius || x[i]  < starRadius){
        dx[i] = -dx[i];
      }
      if(y[i] > canvas.height - starRadius || y[i]  < starRadius){
        dy[i] = -dy[i];
      }
    }
  }
}
window.onload = setup;
