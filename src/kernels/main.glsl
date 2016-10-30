void main( void ) {
    spheres[0] = Sphere(vec3(5.0, -3, -3.5), 0.5, 5);
    spheres[1] = Sphere(vec3(8.0, 1.8, -3.0), 1.8, 3);
    spheres[2] = Sphere(vec3(9.0, -1.8, -3.0), 1.8, 7);

    materials[0] = Material(vec3(1,0,0), 0, 0.0);
    materials[1] = Material(vec3(0,1,0), 0, 0.0);
    materials[2] = Material(vec3(0,0,1), 0, 0.0);
    materials[3] = Material(vec3(1,1,1), 0, 0.0);
    materials[4] = Material(vec3(0.5,0.2,0.2), 1, 0.0);
    materials[5] = Material(vec3(1,0.8,0.8), 2, 5.0); // Light
    materials[6] = Material(vec3(0.5,0.9,1.0), 2, 20.0); // Light
    materials[7] = Material(vec3(0.6,1.0,0.6), 3, 0.0); // Transmission
    materials[8] = Material(vec3(1.0,1.0,1.0), 4, 0.0); // Oren nayar

    camera = InitCamera();

    vec3 color = vec3(0,0,0);
    for (int sample = 0; sample < 4; sample++) {
      Ray ray = CreateRay(gl_FragCoord.xy, sample);
      color += PathTrace(ray);
    }
    color /= 4.0;

    vec3 texture = texture2D(u_buffer_texture, gl_FragCoord.xy / 512.0).rgb;

    vec3 new_clr = texture + color; //mix(color, texture, samples / (samples + 1.0));
    gl_FragColor = vec4(new_clr, 1.0);
}
