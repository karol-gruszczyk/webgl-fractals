//#version 300 es
precision highp float;

varying vec2 position;

const int MAX_ITERATIONS = 100;
const float STRIPES = 50.5384;
const int SKIP_ITERATIONS = 0;
const float ESCAPE_RADIUS = 74468.0;
const vec2 JULIA = vec2(-0.6, 1.3);
const vec3 BASE_COLOR = vec3(0.0, 0.4, 0.7);


highp vec2 complexSquare(in vec2 a) {
    return vec2(a.x * a.x - a.y * a.y, 2.0 * (a.x * a.y));
}

vec3 getColor(float intensivity) {
    vec3 color = 6.2831 * intensivity + BASE_COLOR;
    return vec3(0.5) + 0.5 * vec3(cos(color.x), cos(color.y), cos(color.z));
}

void main() {
    vec2 z = vec2(0.0);
    vec2 c = position;

    float radius = 0.0;
    vec3 color = vec3(0.0);
    float orbitCount = 0.0;
    float lastOrbit = 0.0;
    for (int i = 0; i < MAX_ITERATIONS; ++i) {
        z = complexSquare(z) + c;
        if (i >= SKIP_ITERATIONS) {
            lastOrbit = 0.5 + 0.5 * sin(STRIPES * atan(z.y, z.x));
            orbitCount += lastOrbit;

            radius = dot(z, z);

            if (radius > ESCAPE_RADIUS)
            {
                // stripe average
                float prevAverage = (orbitCount - lastOrbit) / float(i - MAX_ITERATIONS);
                float average = orbitCount / float(i + 1 - MAX_ITERATIONS);
                float frac = -1.0 + log2(0.5 * log(ESCAPE_RADIUS * ESCAPE_RADIUS)) - log2(0.5 * log(radius));
                float colorMix = frac * average + (1.0 - frac) * prevAverage;
                colorMix *= pow(10.0, -0.1098);
                colorMix = abs(colorMix);
                color = getColor(colorMix);
                break;
            }
        }
    }
    gl_FragColor = vec4(color, 1.0);
}
