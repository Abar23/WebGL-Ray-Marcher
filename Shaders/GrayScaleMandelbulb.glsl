precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform float fractalIncrementer;

#define NEAR 0.0
#define FAR 100.0
#define EPSILON 0.0001
#define MAX_STEPS 250
#define POWER 0.0

mat3 rotateY(float theta) {
    float cosTheta = cos(theta);
    float sinTheta = sin(theta);
    return mat3(
        vec3(cosTheta, 0, sinTheta),
        vec3(0, 1, 0),
        vec3(-sinTheta, 0, cosTheta)
    );
}

mat3 rotateZ(float theta) {
    float cosTheta = cos(theta);
    float sinTheta = sin(theta);
    return mat3(
        vec3(cosTheta, -sinTheta, 0),
        vec3(sinTheta, cosTheta, 0),
        vec3(0, 0, 1)
    );
}

float MandelbulbDistance(vec3 point) 
{
    vec3 z = point;
    float dr = 3.0;
    float r;

    for(int i = 0; i < 30; i++)
    {
        r = length(z);
        if(r > 3.0)
        {
            break;
        }

        float power = POWER + fractalIncrementer;
        float theta = acos(z.z / r) * power;
        float phi = atan(z.y, z.x) * power;
        float zr = pow(r, power);
        dr = pow(r, power - 1.0) * power * dr + 1.0;
        
        z = zr * vec3(sin(theta) * cos(phi), sin(phi) * sin(theta), cos(theta));
        z += point;
    }

    return (0.5 * log(r) * r) / dr;
}

float sceneSignedDistanceFunction(vec3 point)
{
    point = rotateZ(time) * rotateY(3.1415) * point;
    return MandelbulbDistance(point);
}

float rayMarch(vec3 rayOrigin, vec3 raydrection)
{
    float totalDistance = 0.0;
    int steps;

    for(int i = 0; i < MAX_STEPS; i++)
    {
        steps = i;
        vec3 point = rayOrigin + totalDistance * raydrection;
        float dist = sceneSignedDistanceFunction(point);
        totalDistance += dist;

        if(dist < EPSILON)
        {
            break;
        }

        if(dist > FAR)
        {
            return 0.0;
            break;
        }
    }

    return 1.0 - (float(steps) / float(MAX_STEPS));
}

mat3 lookAtViewMatrix(vec3 eye, vec3 center, vec3 up) {
	vec3 f = normalize(center - eye);
	vec3 s = normalize(cross(f, up));
	vec3 u = cross(s, f);
	return mat3(s, u, -f);
}

vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
    vec2 coordinate = fragCoord - (size / 2.0);
    float zCoordComponent = -1.0 * (size.y / tan(radians(fieldOfView) / 2.0));
    return normalize(vec3(coordinate, zCoordComponent));
}

void main()
{
    vec3 eyePosition = vec3(4.0, 4.0, 4.0);
    vec3 drectionOfRay = raydrection(45.0, resolution.xy, gl_FragCoord.xy);
    mat3 rayTransform = lookAtViewMatrix(eyePosition, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));

    vec3 worldDirection = rayTransform * drectionOfRay;

    float grayScale = rayMarch(eyePosition, worldDirection);

    gl_FragColor = vec4(grayScale, grayScale, grayScale, 1.0);
}