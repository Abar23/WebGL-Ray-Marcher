precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform float fractalIncrementer;

#define NEAR 0.0
#define FAR 100.0
#define EPSILON 0.0001
#define MAX_STEPS 100

float Sphere2Distance(vec3 point) 
{
    vec3 distanceVector = vec3(cos(time), sin(time), 0.0) - point;
    
    float radius = abs(sin(time));
    if(radius < 0.1)
    {
        radius = 0.1;
    }
    
    return length(distanceVector) - radius;
}

float Sphere1Distance(vec3 point)
{
    vec3 distanceVector = vec3(-cos(time), -sin(time), 0.0) - point;
    
    float radius = abs(sin(time));
    if(radius < 0.1)
    {
        radius = 0.1;
    }
    
    return length(distanceVector) - radius;
}

float sceneSDF(vec3 point)
{
    return min(Sphere1Distance(point), Sphere2Distance(point));
}

float rayMarch(vec3 rayOrigin, vec3 rayDirection)
{
    float totalDistance = 0.0;
    int steps;

    for(int i = 0; i < MAX_STEPS; i++)
    {
        steps = i;
        vec3 point = rayOrigin + totalDistance * rayDirection;
        float dist = sceneSDF(point);
        totalDistance += dist;

        if(dist < EPSILON)
        {
            break;
        }

        if(dist > FAR)
        {
            steps = MAX_STEPS;
            break;
        }
    }

    return 1.0 - (float(steps) / float(MAX_STEPS));
}

mat3 viewMatrix(vec3 eye, vec3 center, vec3 up) {
	vec3 f = normalize(center - eye);
	vec3 s = normalize(cross(f, up));
	vec3 u = cross(s, f);
	return mat3(s, u, -f);
}

vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
    vec2 xy = fragCoord - size / 2.0;
    float z = size.y / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
}

void main()
{
    vec3 eyePosition = vec3(0.0, 0.0, 10.0);
    vec3 directionOfRay = rayDirection(45.0, resolution.xy, gl_FragCoord.xy);
    mat3 rayTransform = viewMatrix(eyePosition, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));

    vec3 worldDirection = rayTransform * directionOfRay;

    float greyScale = rayMarch(eyePosition, worldDirection);

    gl_FragColor = vec4(greyScale, greyScale, greyScale, 1.0);
}