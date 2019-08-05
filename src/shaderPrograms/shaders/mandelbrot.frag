//#version 300 es
precision highp float;

varying vec4 position;

lowp float complexRadius(in vec2 a) {
    return sqrt(a.x * a.x + a.y * a.y);
}

highp vec2 complexSquare(in vec2 a) {
    /*
    a^2 = (a.x + a.y * i)(a.x + a.y * i)
    a * b = (a.x * a.x + a.x * a.y * i) + (a.y * a.x * i + a.y * a.y * i * i)
    a * b = a.x^2 - a.y^2 + 2(a.x * a.y * i)
    */
    return vec2(a.x * a.x - a.y * a.y, 2.0 * (a.x * a.y));
}

void main() {
    const int MAX_ITERATIONS = 100;
    const float STRIPES = 50.5384;
    const int SKIP_ITERATIONS = 6;
    const float ESCAPE_RADIUS = 74468.0;

    vec2 c = vec2(position);
    vec2 z = c;  // mandelbrot set
    if (false) {
        z = vec2(position);
        c = vec2(-0.6, 1.3);
    }
//    vec2 z = vec2(3.0 * (c.x - 0.5), 2.0 * (c.y - 0.5));  // julia set

    float radius = 0.0;
    vec3 color = vec3(0.0);
    float lastRadius;
    vec2 lastZ;
    float orbitCount = 0.0;
    float lastOrbit = 0.0;
    for (int i = 0; i < MAX_ITERATIONS; ++i) {
        if (i >= SKIP_ITERATIONS) {
            lastOrbit = 0.5 + 0.5 * sin(STRIPES * atan(z.y, z.x));
            orbitCount += lastOrbit;
        }


        lastRadius = radius;
        lastZ = z;
        z = complexSquare(z) + c;
        radius = dot(z, z);

        if  (radius > ESCAPE_RADIUS && i >= SKIP_ITERATIONS)
        {
            // smooth gray
//            float co = sqrt((float(i + 1) - log2(0.5 * log2(dot(z, z)))) / 256.0);
//            color = vec3(0.5 + 0.5 * cos(6.2831 * co));

            // stripe average
            float prevAverage = (orbitCount - lastOrbit) / float(i - MAX_ITERATIONS);
            float average = orbitCount / float(i + 1 - MAX_ITERATIONS);
            float frac = -1.0 + log2(0.5 * log(ESCAPE_RADIUS * ESCAPE_RADIUS)) - log2(0.5 * log(radius));
            float colorMix = frac * average + (1.0 - frac) * prevAverage;
            colorMix *= pow(10.0, -0.1098);
            colorMix = abs(colorMix);
//            colorMix = colorMix*10000.0;
//            colorMix = clamp(colorMix,0.0,10000.0);
            color = vec3( .5+.5*cos(6.2831*colorMix),.5+.5*cos(6.2831*colorMix + 0.4),.5+.5*cos(6.2831*colorMix +0.7) );
//            float intensity = fract(0.5 + 0.5 * cos(6.2831 * colorMix));
//            color = intensity * vec3(0.0, 0.4, 0.7);

//            float prevAverage = (orbitCount - lastOrbit) / float(i);
//            float average = orbitCount / float(i + 1);
//            float frac = 1.0 + log2(log(escapeRadius) / log(radiusSquared));
//            float frac = -1.0 + log2(0.5 * log(sqrt(radiusSquared * radiusSquared))) - log2(0.5 * log(sqrt(lastRadius)));
//            float frac = -1.0 + log(1.5 * log(16.0)) / log(2.0) - log(0.5 * log(lastZ.x * lastZ.x + lastZ.y * lastZ.y)) / log(2.0);
//            float colorMix = frac * average + (1.0 - frac) * prevAverage;
//            color = mix(vec3(0.0), vec3(1.0, 0.0, 0.0), colorMix);


//            float colorRegulator = float(i - 1) - log(log(radiusSquared) / log(2.0)) / log(2.0);
//            color = vec3(0.95 + 0.012 * colorRegulator, 1.0, 0.2 + 0.4 * (1.0 + sin(0.3 * colorRegulator)));
//            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//            vec3 m = abs(fract(color.xxx + K.xyz) * 6.0 - K.www);
//            color = color.z * mix(K.xxx, clamp(m - K.xxx, 0.0, 1.0), color.y);

            break;
        }
    }


    gl_FragColor = vec4(color, 1.0);
}
