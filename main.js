var mesh, timer, shaderProgram;

// start() is the main function that gets called first by index.html
var start = function() {
    
    // Initialize the WebGL 2.0 canvas
    initCanvas();

    // Create timer that will be used for fragment shader
    timer = new Timer();

    // Read in, compile, and create a shader program
    shaderProgram = new Shader('vertShader', 'fragShader');
    // Activate the shader program
    shaderProgram.UseProgram();

    // Set vertices of the mesh to be the canonical screen space
    var vertices = [-1.0, -1.0,
                     1.0,  1.0,
                    -1.0,  1.0,
                     1.0, -1.0];
    
    // Set indices for the vertices above
    var indices = [2, 0, 1,
                   1, 0, 3];

    // Create a mesh based upon the defined vertices and indices
    mesh = new Mesh(vertices, indices, shaderProgram);

    // Render the scene
    drawScene();
};

// starts the canvas and gl
var initCanvas = function() {
	canvas = document.getElementById('game-surface');
    gl = canvas.getContext('webgl2');   // WebGL 2

	gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); 
}

var drawScene = function() {
    normalSceneFrame = window.requestAnimationFrame(drawScene);

    // Adjust scene for any canvas resizing
    resize(gl.canvas);
    // Update the viewport to the current canvas size
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    // Set background color to sky blue, used for debug purposes
    gl.clearColor(0.53, 0.81, 0.92, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Update the timer
    timer.Update();

    // Set uniform values of the fragment shader
    shaderProgram.SetUniformVec2("resolution", [gl.canvas.width, gl.canvas.height]);
    shaderProgram.SetUniform1f("time", timer.GetTicksInRadians());
    shaderProgram.SetUniform1f("fractalIncrementer", timer.GetFractalIncrement());
    
    // Tell WebGL to draw the scene
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
