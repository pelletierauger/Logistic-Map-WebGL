let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";
let maxFrames = 20;
let gl, shaderProgram;

let num = 20;
let vertices;
let x;
let y;
let t, t2;
let drawCount = 0;
let startT = 0.00001;
startT = 0.025;
let startT2 = 0.5;
let startX = 0.0001;
let startY = 0.0002;
// startX = 0.000001;
// startY = 0.0000011;
let r = 3.58;
r = 3.58;
// r = 4;
r = 3.5;
// r = 3.9;
// r = 3.6;
// r = 3.65;
// r = 3.2;
// r = 3.59;
let zoom = { x: 1, y: 1 };
zoom = 1;
// 3.569946
let framesToPrints = 0;
// let decrementAcceleration = 0.000001;
let decrement = 0.000001;
// decrement *= 0.1;
let increment = 0.1 + (decrement * 200);

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowHeight, WEBGL);

    gl = canvas.getContext('webgl');
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    gl.viewport(0, 0, canvas.width, canvas.height);
    setShaders();

    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    if (!looping) {
        noLoop();
    }

    x = width / 2;
    t = 0;
    t2 = 0;
}

let xCounter = 0;
let xShifter = 1;

let rIncrement = 0.001;

function draw() {
    // game.initialize(10 + frameCount * 0.001);

    vertices = [];
    // translate(10, -2675);
    // if (drawCount > 30) {
    //     xShifter *= -1;
    //     increment = 0.1 + (decrement * 200);
    //     decrement *= -1;
    //     x = width / 2;
    //     drawCount = 0;
    // } else if (drawCount < -31) {
    //     if (exporting && frameCount < maxFrames) {
    //         frameExport();
    //     }
    //     xShifter *= -1;
    //     decrement *= -1;
    //     framesToPrints++;
    //     background(0);
    //     drawCount = 0;
    //     t = 0;
    //     x = width / 2;
    //     xCounter = 0;
    //     decrement *= 0.99;
    //     increment = 0.1 + (decrement * 200);

    // }
    background(0);

    t = 0;
    x = width / 2;
    xShifter = abs(xShifter);
    decrement = abs(decrement);
    for (let k = 0; k < 4000; k++) {
        t = startT + increment;
        t2 = startT2 + increment;
        for (var i = 0; i < num; i++) {
            t = logisticMap(t);
            // t2 = logisticMap(Math.pow(t2, t));
            y = sin(t) * 6200;
            let y2 = -550 + sin(t) * 1200;
            // rect(x, y2, 0.5, 0.5);

            vertices.push((-640 + x) * 0.0039 * zoom, y2 * 0.005 * zoom, 0.0);
            // vertices.push(0, 0, 0);
            // console.log("Drawing a dot!");
        }
        increment -= decrement;
        x += xShifter * 0.1;
    }
    t = 0;
    x = width / 2;
    xShifter *= -1;
    decrement *= -1;
    increment = 0.1 + (decrement * 200);
    for (let k = 0; k < 4000; k++) {
        t = startT + increment;
        t2 = startT2 + increment;
        for (var i = 0; i < num; i++) {
            t = logisticMap(t);
            // t2 = logisticMap(Math.pow(t2, t));
            y = sin(t) * 6200;
            let y2 = -550 + sin(t) * 1200;
            // rect(x, y2, 0.5, 0.5);

            vertices.push((-640 + x) * 0.0039 * zoom, y2 * 0.005 * zoom, 0.0);
            // vertices.push(0, 0, 0);
            // console.log("Drawing a dot!");
        }
        increment -= decrement;
        x += xShifter * 0.1;
    }



    decrement *= 0.999999;
    increment = 0.1 + (decrement * 200);
    r += rIncrement * 1;
    rIncrement *= 0.999999;
    // drawCount += xShifter;

    // vertices.push(0, 0, 0);


    drawVertices();

    if (exporting && frameCount < maxFrames) {
        frameExport();
    }
}

function logisticMap(n) {
    return r * n * (1 - n);
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
    if (key == 'p' || key == 'P') {
        frameExport();
    }
    if (key == 'r' || key == 'R') {
        window.location.reload();
    }
    if (key == 'm' || key == 'M') {
        redraw();
    }
}