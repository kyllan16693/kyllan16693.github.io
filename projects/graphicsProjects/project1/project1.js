/* All code was writen by Kyllan Wunder
* Some concetps were taken from these websites to implement the game features
* No drawing code was taken from these websites
* https://medium.com/dev-compendium/creating-a-bouncing-ball-animation-using-javascript-and-canvas-1076a09482e0
* https://inventinggames.github.io/posts/gameloopjs/
* https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
* 
*
* View this project at https://pages.cs.wisc.edu/~kyllan/graphicsProjects/project1/project1.html
*/

function setup() {
    "use strict";
    var canvas = document.getElementById('myCanvas');
    var slider1 = document.getElementById('slider1');
    var width = canvas.width;
    var height = canvas.height;
    slider1.value = 0;
    var context = canvas.getContext('2d');
    var dx = slider1.value;
    var xblocks = 15;
    var yblocks = 5;
    var sum = 0;
    var blocks = [];
    for (var i = 0; i < xblocks; i++) {
        blocks[i] = [];
    }
    var blockHitStatus = [];
    for (var i = 0; i < xblocks; i++) {
        blockHitStatus[i] = [];
        for (var j = 0; j < yblocks; j++) {
            blockHitStatus[i][j] = 0;
        }
    }
    var blockcord = [];
    for (var i = 0; i < xblocks; i++) {
        blockcord[i] = [];
        for (var j = 0; j < yblocks; j++) {
            blockcord[i][j] = [];
        }
    }

    var ball = {
        x: width / 2,
        y: width / 2,
        color: "blue",
        velx: -2,
        vely: 2,
        radius: 5
    }

    function DrawBlockOutline(startx, starty) {
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(startx, starty);
        context.lineTo(startx, starty + 10);
        context.lineTo(startx + 20, starty + 10);
        context.lineTo(startx + 20, starty);
        context.closePath();
        context.stroke();
    }

    function DrawBlockFill(startx, starty) {
        context.fillStyle = "red";
        context.beginPath();
        context.moveTo(startx, starty);
        context.lineTo(startx, starty + 10);
        context.lineTo(startx + 20, starty + 10);
        context.lineTo(startx + 20, starty);
        context.closePath();
        context.fill();
    }

    function draw() {
        //clear canvas
        context.clearRect(0, 0, width, height)
        //draw circle
        context.fillStyle = ball.color;
        context.beginPath();
        context.arc(ball.x + ball.velx, ball.y + ball.vely, ball.radius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();

        function DrawPlayer(color) {
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(25, 400);
            context.lineTo(0, 400);
            context.lineTo(0, 390);
            context.lineTo(50, 390);
            context.lineTo(50, 400);
            context.closePath();
            context.fill();
        }

        function DrawOutline(color) {
            context.strokeStyle = color;
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(0, 400);
            context.lineTo(0, 0);
            context.lineTo(400, 0);
            context.lineTo(400, 400);
            //context.closePath();    
            context.stroke();
        }

        DrawOutline("black");

        for (let j = 1; j < yblocks; j++) {
            for (let i = 1; i < xblocks; i++) {
                if (blockHitStatus[i][j] == 0) {
                    blocks[i][j] = DrawBlockFill(i * 25, j * 25);
                    blockcord[i][0][0] = i * 25;
                    blockcord[i][0][1] = 50;
                }
                if (blockHitStatus[i][j] == 1) {
                    blocks[i][j] = DrawBlockOutline(i * 25, j * 25);
                    blockcord[i][0][0] = i * 25;
                    blockcord[i][0][1] = 50;
                }
                if (blockHitStatus[i][j] == 2) {
                    context.clearRect(blockcord[i][j][0] - 1, blockcord[i][j][1] - 1, 20 + 2, 10 + 2);
                }
            }
        }

        context.save();
        context.translate(dx, 0);
        DrawPlayer("black");
        context.restore();
    }

    function update(progress) {

        dx = slider1.value;
        dx = parseInt(dx);

        if (ball.y + ball.vely >= 390) {
            if (ball.x + ball.velx + ball.radius > dx && ball.x + ball.velx + ball.radius < dx + 50) {
                ball.vely = -ball.vely;
            }
            else {
                alert("GAME OVER\nYOUR SCORE IS: " + sum + "\nRELOAD PAGE TO PLAY AGAIN");
                document.location.reload();
                clearInterval(interval);
            }
        }

        //if ball hits left or right wall bounce off
        if (ball.x + ball.velx > canvas.width - ball.radius || ball.x + ball.velx < ball.radius) {
            ball.velx = -ball.velx;
        }
        //if ball hits top wall bounce off
        if (ball.y + ball.vely < ball.radius) {
            ball.vely = -ball.vely;
        }

        //if ball hits block bounce off and update blockHitStatus + 1 and dont bouce off if blockHitStatus >= 2
        for (let j = 1; j < yblocks; j++) {
            for (let i = 1; i < xblocks; i++) {
                if (ball.x + ball.velx + ball.radius > i * 25 && ball.x + ball.velx - ball.radius < i * 25 + 20 && ball.y + ball.vely + ball.radius > j * 25 && ball.y + ball.vely - ball.radius < j * 25 + 10 && blockHitStatus[i][j] < 2) {
                    ball.vely = -ball.vely;
                    blockHitStatus[i][j] += 1;
                }
            }
        }


        
        sum = 0;
        for (let j = 1; j < yblocks; j++) {
            for (let i = 1; i < xblocks; i++) {
                sum += blockHitStatus[i][j];
            }
        }
        document.getElementById("score").innerHTML = sum;

        if(sum == 112){
            alert("YOU WIN\nYOUR SCORE IS: " + sum + "\nRELOAD TO PLAY AGAIN");
            document.location.reload();
            clearInterval(interval);
        }

        //update ball position
        ball.x += ball.velx;
        ball.y += ball.vely;
    }

    function loop(timestamp) {
        var progress = timestamp - lastRender;

        update(progress);
        draw();
        slider1.addEventListener("input", draw);
        lastRender = timestamp;
        window.requestAnimationFrame(loop);

    }
    var lastRender = 0;
    window.requestAnimationFrame(loop);

}
window.onload = setup;