var shaderText = '';

class Shader
{
    constructor(vertShaderId, fragShaderId)
    {
        this.shaderProgram = gl.createProgram();

        var vertexShader = this.getShader(gl, vertShaderId);
        var fragmentShader = this.getShader(gl, fragShaderId);
    
        gl.attachShader(this.shaderProgram, vertexShader);
        gl.attachShader(this.shaderProgram, fragmentShader);
        gl.linkProgram(this.shaderProgram);
    
        if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
    }

    /**
     * Read the shader file, compile it, and create a WebGL shader
     * @param {WebGLRenderingContext} gl Current WebGL rendering context
     * @param {HTML Class ID} id Class ID of the shader in the active DOM 
     */
    getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }
    
        var k = shaderScript.getAttribute('src');
        this.readTextFile(k);
    
        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }
    
        gl.shaderSource(shader, shaderText);
        gl.compileShader(shader);
    
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
    
        return shader;
    }
    
    readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    shaderText = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
    }

    /**
     * Return the WebGL shader program
     */
    GetProgram()
    {
        return this.shaderProgram;
    }

    /**
     * Set the WebGL shader program to be the active renderer
     */
    UseProgram()
    {
        gl.useProgram(this.shaderProgram);
    }

    /**
     * Set a vec2 uniform in the shader program
     * @param {string} uniformName Name of the uniform in the shader program
     * @param {flat array} vector 2D vector to pass to the shader
     */
    SetUniformVec2(uniformName, vector)
    {
        gl.uniform2fv(gl.getUniformLocation(this.shaderProgram, uniformName), vector);
    }

    /**
     * Set a float uniform in the shader program
     * @param {string} uniformName Name of the uniform in the shader program
     * @param {float} value Float to pass to the shader
     */
    SetUniform1f(uniformName, value)
    {
        gl.uniform1f(gl.getUniformLocation(this.shaderProgram, uniformName), value);
    }
}