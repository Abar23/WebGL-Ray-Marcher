precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform float fractalIncrementer;

#define NEAR 0.0
#define FAR 100.0
#define EPSILON 0.0001
#define MAX_STEPS 50

mat3 rotateY(float theta) {
    float cosTheta = cos(theta);
    float sinTheta = sin(theta);
    return mat3(
        vec3(cosTheta, 0.0, sinTheta),
        vec3(0.0, 1.0, 0.0),
        vec3(-sinTheta, 0.0, cosTheta)
    );
}

mat3 rotateX(float theta) {
    float cosTheta = cos(theta);
    float sinTheta = sin(theta);
    return mat3(
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, cosTheta, -sinTheta),
        vec3(0.0, sinTheta, cosTheta)
    );
}

float CubeDistance(vec3 point) 
{
    return length(max(abs(point)-vec3(1.0, 1.0, 1.0),0.0));
}

float SphereDistance(vec3 point, vec3 position)
{   
    vec3 distanceVector = point - position;

    float radius = abs(sin(time)) * 2.0;
    if(radius < 0.1)
    {
        radius = 0.1;
    }
    
    return length(distanceVector) - radius;
}

float sceneSDF(vec3 point)
{
    point = rotateX(time) * rotateY(time) * point;
    return max(-SphereDistance(point, vec3(0.0, -1.5, 0.0)), max(-SphereDistance(point, vec3(0.0, 1.5, 0.0)), CubeDistance(point)));
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
    vec3 eyePosition = vec3(10.0, 10.0, 10.0);
    vec3 directionOfRay = rayDirection(45.0, resolution.xy, gl_FragCoord.xy);
    mat3 rayTransform = viewMatrix(eyePosition, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));

    vec3 worldDirection = rayTransform * directionOfRay;

    float greyScale = rayMarch(eyePosition, worldDirection);

    gl_FragColor = vec4(greyScale, greyScale, greyScale, 1.0);
}