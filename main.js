var mesh, timer, shaderProgram;

// start() is the main function that gets called first by index.html
var start = function() {
    
    initCanvas();

    timer = new Timer();

    shaderProgram = new Shader('vertShader', 'fragShader');
    shaderProgram.UseProgram();

    var vertices = [-1.0, -1.0,
                     1.0,  1.0,
                    -1.0,  1.0,
                     1.0, -1.0];
    
    var indices = [2, 0, 1,
                   1, 0, 3];

    mesh = new Mesh(vertices, indices, shaderProgram);

    drawScene();
};

// starts the canvas and gl
var initCanvas = function() {
	canvas = document.getElementById('game-surface');
    gl = canvas.getContext('webgl2');   // WebGL 2

    gl.clearColor(0.53, 0.81, 0.92, 1.0);   // sky blue
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); 
}

var drawScene = function() {
    normalSceneFrame = window.requestAnimationFrame(drawScene);

    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    timer.Update();

    shaderProgram.SetUniformVec2("resolution", [gl.canvas.width, gl.canvas.height]);
    shaderProgram.SetUniform1f("time", timer.GetTicksInRadians());
    mesh.Draw();
}

// resizes canvas to fit browser window
var resize = function(canvas) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth || canvas.height !== displayHeight) {
        // Make the canvas the same size
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
        aspectRatio = displayWidth / displayHeight;
    }
}
