precision highp float;
uniform float samples;
uniform float time;
uniform vec2 resolution;

uniform sampler2D u_buffer_texture;
uniform sampler2D u_triangle_texture;

float random(vec3 scale, float seed) {
  return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}
