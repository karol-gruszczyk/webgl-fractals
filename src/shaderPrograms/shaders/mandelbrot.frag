varying highp vec4 position;

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

highp vec2 mandelbrot(in vec2 z, in vec2 c) {
    return complexSquare(z) + c;
}

void main() {
    const int MAX_ITERATIONS = 16;

    highp vec2 c = vec2(position.x, position.y);
    highp vec2 number = c;

    int iter;
    lowp float radiusSquared = 0.0;
    for (int i = 0; i < MAX_ITERATIONS; ++i) {
        number = mandelbrot(number, c);
        radiusSquared = number.x * number.x + number.y * number.y;
        iter = i;
        if  (radiusSquared > 4.0)
            break;
    }

    lowp vec3 color;
    lowp vec3 innerColor = vec3(0.0);
    lowp vec3 outerColor = vec3(1.0, 0.0, 0.0);
    if (radiusSquared <= 4.0) {
        color = innerColor;
    }
    else {
        color = mix(innerColor, outerColor, fract(float(iter) / float(MAX_ITERATIONS)));
    }

    gl_FragColor = vec4(color, 1.0);
}
