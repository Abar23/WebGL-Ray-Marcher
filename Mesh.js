class Mesh
{
    constructor(verticesArray, indicesArray, shader)
    {
        this.numberOfIndices = indicesArray.length;
        // Create vao, vbo, and ebo
        this.vao = gl.createVertexArray();
        this.verticesVBO = gl.createBuffer();
        this.ebo = gl.createBuffer();

        const positionAttribute = gl.getAttribLocation(shader.GetProgram(), 'position');

        gl.bindVertexArray(this.vao);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesArray), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(positionAttribute);
        gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 8, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indicesArray), gl.STATIC_DRAW);
    
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    /**
     * Draw the geometry of the mesh
     */
    Draw()
    {
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.drawElements(gl.TRIANGLES, this.numberOfIndices, gl.UNSIGNED_INT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }
}