/* WebGL - Textures - Skybox and Environment Map inspired by https://webglfundamentals.org/webgl/webgl-skybox-plus-environment-map.html
*  All images for skyboxes from http://www.humus.name/index.php?page=Textures&start=0 
*
* Code Written by: Kyllan Wunder
*
*  You can not run this code locally, you need to run it on a server.
*  To run it "locally" you can use a python server that comes with python. By opening a terminal and navigating to the folder where this file is located and then type:
*  python3 -m http.server
*  Then open a browser and go to http://localhost:8000
*  
*  Or view this project here: https://pages.cs.wisc.edu/~kyllan/graphicsProjects/project8/project8.html
*/

function startup() {
    //9 CNTower2
    //8 Ryfjallet
    //7 SaintPetersSquare2
    //6 GoldenGateBridge2
    //5 Colosseum
    //4 Yokohama
    //3 IceRiver
    //2 Tantolunden5
    //1 Vindelalven

    const locations = [['CNTower2', 'Ryfjallet', 'SaintPetersSquare2'], ['GoldenGateBridge2', 'Colosseum', 'Yokohama'], ['IceRiver', 'Tantolunden5', 'Vindelalven']];
    const group = document.getElementById('locationButtons');
    group.innerHTML = locations.map(location => `<div><table><tr><td><label><input type="radio" name="location" value="${location[0]}"><img src="images/world/${location[0]}World.jpg" width="100" height="100"></label></td><td><label><input type="radio" name="location" value="${location[1]}"><img src="images/world/${location[1]}World.jpg" width="100" height="100"></label></td><td><label><input type="radio" name="location" value="${location[2]}"><img src="images/world/${location[2]}World.jpg" width="100" height="100"></label></td></tr></table></div>`).join('');
    
    const style = document.createElement('style');
    style.innerHTML = `
    input[type=radio] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }
    input[type=radio]:checked + img {
        border: 2px solid #000;
    }
    `;
    document.head.appendChild(style);

    const radioButtons = document.querySelectorAll('input[name="location"]');
    radioButtons[0].checked = true;
    radioButtons[1].checked = false;
    radioButtons[2].checked = false;
    radioButtons[3].checked = false;
    radioButtons[4].checked = false;
    radioButtons[5].checked = false;
    radioButtons[6].checked = false;
    radioButtons[7].checked = false;
    radioButtons[8].checked = false;

    var sliderx = document.getElementById('sliderx');
    sliderx.value = 0;
    var slidery = document.getElementById('slidery');
    slidery.value = 0;
    var sliderz = document.getElementById('sliderz');
    sliderz.value = 0;

    main();

    function main() {
        if(document.querySelector('input[name="location"]:checked').value == 'CNTower2'){
            document.getElementById("locationName").innerHTML = 'Location: CN Tower, Toronto, Canada';}
        else if(document.querySelector('input[name="location"]:checked').value == 'Ryfjallet'){
            document.getElementById("locationName").innerHTML = 'Location: Ryfjallet, Sweden';}
        else if(document.querySelector('input[name="location"]:checked').value == 'SaintPetersSquare2'){
            document.getElementById("locationName").innerHTML = 'Location: Saint Peters Square, Vatican City, Italy';}
        else if(document.querySelector('input[name="location"]:checked').value == 'GoldenGateBridge2'){
            document.getElementById("locationName").innerHTML = 'Location: Golden Gate Bridge, San Francisco, USA';}
        else if(document.querySelector('input[name="location"]:checked').value == 'Colosseum'){
            document.getElementById("locationName").innerHTML = 'Location: Colosseum, Rome, Italy';}
        else if(document.querySelector('input[name="location"]:checked').value == 'Yokohama'){
            document.getElementById("locationName").innerHTML = 'Location: Yokohama Bay Bridge, Yokohama, Japan';}
        else if(document.querySelector('input[name="location"]:checked').value == 'IceRiver'){
            document.getElementById("locationName").innerHTML = 'Location: Ice River, Somewhere, IDK';}
        else if(document.querySelector('input[name="location"]:checked').value == 'Tantolunden5'){
            document.getElementById("locationName").innerHTML = 'Location: Tantolunden, Stockholm, Sweden';}
        else if(document.querySelector('input[name="location"]:checked').value == 'Vindelalven'){
            document.getElementById("locationName").innerHTML = 'Location: Vindelalven, Sweden';}



        var xrot = sliderx.value/3;
        var yrot = slidery.value/3;
        var zrot = sliderz.value/3;
        var canvas = document.querySelector("#canvas");
        var gl = canvas.getContext("webgl");
        if (!gl) {
            return;
        }

        const envmapProgramInfo = webglUtils.createProgramInfo(
            gl, ["envmap-vertex-shader", "envmap-fragment-shader"]);
        const skyboxProgramInfo = webglUtils.createProgramInfo(
            gl, ["skybox-vertex-shader", "skybox-fragment-shader"]);

        const cubeBufferInfo = primitives.createCubeBufferInfo(gl, 1);
        const quadBufferInfo = primitives.createXYQuadBufferInfo(gl);

        var selected = document.querySelector('input[name="location"]:checked').value;
        console.log(selected);

        var texturearray = ['images/' + selected + '/posx.jpg', 'images/' + selected + '/negx.jpg', 'images/' + selected + '/posy.jpg', 'images/' + selected + '/negy.jpg', 'images/' + selected + '/posz.jpg', 'images/' + selected + '/negz.jpg'];
        console.log(selected);

        var texturesel = gl.createTexture();
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        var faceInfos = [
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                url: texturearray[0],

            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                url: texturearray[1],
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                url: texturearray[2],
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                url: texturearray[3],
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                url: texturearray[4],
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                url: texturearray[5],
            },
        ];

        faceInfos.forEach((faceInfo) => {
            const { target, url } = faceInfo;

            const level = 0;
            const internalFormat = gl.RGBA;
            const width = 512;
            const height = 512;
            const format = gl.RGBA;
            const type = gl.UNSIGNED_BYTE;

            gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

            const image = new Image();
            image.src = url;

            image.addEventListener('load', function () {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, level, internalFormat, format, type, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            });
        });
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        texturesel = texture;

        function degToRad(d) {
            return d * Math.PI / 180;
        }

        var fieldOfViewRadians = degToRad(90);
        var then = 0;

        requestAnimationFrame(drawScene);

        function drawScene(time) {
            time *= 0.001;
            var deltaTime = time - then;
            then = time;

            webglUtils.resizeCanvasToDisplaySize(gl.canvas);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            gl.enable(gl.CULL_FACE);
            gl.enable(gl.DEPTH_TEST);

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            var projectionMatrix =
                m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

            var cameraPosition = [Math.cos(time * .1) * 2, 0, Math.sin(time * .1) * 2];
            var target = [0, 0, 0];
            var up = [0, 1, 0];
            var cameraMatrix = m4.lookAt(cameraPosition, target, up);

            var viewMatrix = m4.inverse(cameraMatrix);

   

            var worldMatrix = m4.xRotation(time * xrot);
            worldMatrix = m4.yRotate(worldMatrix, time * yrot);
            worldMatrix = m4.zRotate(worldMatrix, time * zrot);

            var viewDirectionMatrix = m4.copy(viewMatrix);
            viewDirectionMatrix[12] = 0;
            viewDirectionMatrix[13] = 0;
            viewDirectionMatrix[14] = 0;

            var viewDirectionProjectionMatrix = m4.multiply(
                projectionMatrix, viewDirectionMatrix);
            var viewDirectionProjectionInverseMatrix =
                m4.inverse(viewDirectionProjectionMatrix);

            gl.depthFunc(gl.LESS);
            gl.useProgram(envmapProgramInfo.program);
            webglUtils.setBuffersAndAttributes(gl, envmapProgramInfo, cubeBufferInfo);
            webglUtils.setUniforms(envmapProgramInfo, {
                u_world: worldMatrix,
                u_view: viewMatrix,
                u_projection: projectionMatrix,
                u_texture: texturesel,
                u_worldCameraPosition: cameraPosition,
            });
            webglUtils.drawBufferInfo(gl, cubeBufferInfo);

            gl.depthFunc(gl.LEQUAL);

            gl.useProgram(skyboxProgramInfo.program);
            webglUtils.setBuffersAndAttributes(gl, skyboxProgramInfo, quadBufferInfo);
            webglUtils.setUniforms(skyboxProgramInfo, {
                u_viewDirectionProjectionInverse: viewDirectionProjectionInverseMatrix,
                u_skybox: texturesel,
            });
            webglUtils.drawBufferInfo(gl, quadBufferInfo);

            requestAnimationFrame(drawScene);

        }
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].addEventListener('click', function () {
                main();
                radioButtons[i].checked = true;
                for (let j = 0; j < radioButtons.length; j++) {
                    if (j != i) {
                        radioButtons[j].checked = false;
                    }
                }
            });
        }
        sliderx.addEventListener("input", main);
        slidery.addEventListener("input", main);
        sliderz.addEventListener("input", main);
    }

}
startup();