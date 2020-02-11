WebGL Ray Marcher
========

Created WebGL fragment shaders that utilize raymarching and signed 
distance functions. To create the fragment shaders, I generated a mesh 
that maps to the canonical screen space coordinates of the viewport. 
I have created four different fragment shaders for the program.

### Spheres.glsl

![Spheres](https://media.giphy.com/media/hQnbZGgSnHtvuz81g3/giphy.gif)



### CubeSphereIntersect.glsl

![Cube Sphere Intersection](https://media.giphy.com/media/Qu0pwRknz6nWYyXY4E/giphy.gif)



### GrayScaleMandelbulb.glsl

![Grey Mandelbulb](https://media.giphy.com/media/SvRnvBGcpO7eJED92k/giphy.gif)



### PurpleGlowMandelbulb.glsl

![Purple Mandelbulb](https://media.giphy.com/media/jqHqYCQARn0kRXjIk9/giphy.gif)

How To Run Project
==================

The best way to run the project is by using a local HTTP server. The 
steps to run this project will use Python's local web server package.

Navigate to the directory where the project has been cloned. Then, run
the following python command:

```
python3 -m http.server
```

Once the server is running locally, connect to the server on the port
that the server is using:

```
localhost:<port number>
```


How To Change Active Shader
===========================

To change out the active fragment shader, modify the line below in the index.html file: 

```javascript 
<script id="fragShader" type="x-shader/x-fragment" src=<desired fragment shader> ></script>
```

Replace `<desired fragment shader>` with one of the specified fragment shaders above. For example:

```javascript 
<script id="fragShader" type="x-shader/x-fragment" src="Spheres.glsl" ></script>
```
