precision highp float;

varying vec2 position;

uniform vec2 uPixelSize;

const int MAX_ITERATIONS = 500;
const float STRIPES = 5.0;
const int SKIP_ITERATIONS = 2;
const float ESCAPE_RADIUS = 1e3;
const float BOUNDARY_WIDTH = 5.0;
const vec3 INTERIOR_COLOR = vec3(0.0);//vec3(0.7, 1.0, 1.0);
const vec3 BOUNDARY_COLOR = vec3(0.7, 1.0, 1.0);
const vec3 BASE_COLOR = vec3(0.0, 0.4, 0.7);


vec2 complexSquare(in vec2 a) {
    return vec2(a.x * a.x - a.y * a.y, 2.0 * (a.x * a.y));
}

vec2 complexMul(in vec2 a, in vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

vec3 getColor(float intensivity) {
    return vec3(0.5) + 0.5 * cos(6.2831 * intensivity + BASE_COLOR);
}

float getOrbit(vec2 z) {
    return 0.5 + 0.5 * sin(STRIPES * atan(z.y, z.x));
}

void main() {
    vec2 z = vec2(0.0);
    vec2 c = position;

    float radius = 0.0;
    vec3 color = INTERIOR_COLOR;
    vec2 derivative = vec2(0.0);
    float orbitSum = 0.0;
    float lastOrbit = 0.0;
    for (int i = 0; i < MAX_ITERATIONS; ++i) {
        derivative = 2.0 * complexMul(z, derivative) + 1.0;
        z = complexSquare(z) + c;
        if (i > SKIP_ITERATIONS) {
            lastOrbit = getOrbit(z);
            orbitSum += lastOrbit;

            radius = sqrt(dot(z, z));

            if (radius > ESCAPE_RADIUS)
            {
                // stripe average
                float average = orbitSum / float(i + 1 - SKIP_ITERATIONS);
                float prevAverage = (orbitSum - lastOrbit) / float(i - SKIP_ITERATIONS);
                float frac = fract(float(i + 1) + log(log(ESCAPE_RADIUS) / log(radius)) / log(2.0));
                float colorMix = frac * average + (1.0 - frac) * prevAverage;
                color = getColor(colorMix);

                // intensify boundaries
                float de = 2.0 * radius * log(radius) / sqrt(dot(derivative, derivative));
                float boundary = uPixelSize.x * BOUNDARY_WIDTH;
                if (de <= boundary) {
                    color = mix(BOUNDARY_COLOR, color, de / boundary);
                }
                break;
            }
        }
    }

    gl_FragColor = vec4(color, 1.0);
}
