/* Project Written by Kyllan Wunder 
* Star drawing function from: Star design from https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5 
* and modified
* Site is visiable here: https://pages.cs.wisc.edu/~kyllan/graphicsProjects/project2/project2.html 
*/

function setup() {
  var canvas = document.getElementById('myCanvas');
  var slider1s = document.getElementById('slider1s');
  slider1s.value = 10;
  var slider2s = document.getElementById('slider2s');
  slider2s.value = 10;
  var slider3s = document.getElementById('slider3s');
  slider3s.value = 10;

  const starArray = [];
  for(let i = 0; i < 300; i++){
    starArray[i] = [ Math.ceil(Math.random() * 1200) * (Math.round(Math.random()) ? 1 : -1),  Math.ceil(Math.random() * 1200) * (Math.round(Math.random()) ? 1 : -1)];
  }
  var inc = 0;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    var s1r = (inc * .1) * 0.005 * Math.PI;
    var s1s = slider1s.value / 10;
    var s2r = (inc * -.2)* 0.005 * Math.PI;
    var s2s = slider2s.value / 10;
    var s3r = (inc * .3) * 0.005 * Math.PI;
    var s3s = slider3s.value / 10;
    if (inc > 4000){
      inc = -4000;
    }
    console.log((inc++) * 0.005 * Math.PI);

    function linkage(color) {
      context.beginPath();
      context.fillStyle = color;
      context.moveTo(0, 0);
      context.lineTo(10, 5);
      context.lineTo(90, 5);
      context.lineTo(100, 0);
      context.lineTo(90, -5);
      context.lineTo(10, -5);
      context.closePath();
      context.fill();
    }

    function drawStar(cx,cy,spikes,outerRadius,innerRadius,color){
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
      context.moveTo(cx,cy-outerRadius)
      for(i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        context.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        context.lineTo(x,y)
        rot+=step
      }
      context.lineTo(cx,cy-outerRadius);
      context.closePath();
      context.lineWidth=5;
      context.strokeStyle=color;
      context.stroke();
      context.fillStyle='light'+color;
      context.fill();
    }
 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.translate(0, 600);
    context.rotate(s1r);
    context.scale(s1s, s1s);
    linkage("black");//set to blue to see
    context.translate(100, 0);
    context.rotate(s2r);
    context.scale(s2s / s1s, s2s / s1s);
    linkage("black");//set to green to see
    context.translate(100, 0);
    context.rotate(s3r);
    context.scale((s3s / (s2s / s1s)) / s1s, (s3s / (s2s / s1s)) / s1s);
    linkage("black");//set to red to see
    context.scale(1/((s3s / (s2s / s1s)) / s1s)/s2s,1/((s3s / (s2s / s1s)) / s1s)/s2s);

    for(let i = 0; i < starArray.length; i++){
      if (i < 100){
        drawStar(starArray[i][0],starArray[i][1],Math.round((s1r/.005/Math.PI)/-50),30*s1s,15*s1s,"blue");
      }else if (i < 200){
        drawStar(starArray[i][0],starArray[i][1],Math.round((s2r/.005/Math.PI)/-50),30*s2s,15*s2s,"green");
      }else{
        drawStar(starArray[i][0],starArray[i][1],Math.round((s3r/.005/Math.PI)/-50),30*s3s,15*s3s,"coral");
      }
    }
    window.requestAnimationFrame(draw)
  }
  window.requestAnimationFrame(draw)
}
window.onload = setup;
