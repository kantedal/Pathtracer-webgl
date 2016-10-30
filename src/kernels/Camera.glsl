struct Camera {
  vec3 position;
  vec3 v1;
  vec3 v2;
  vec3 v3;
  vec3 v4;
};
Camera camera;

Camera InitCamera() {
  float field_of_view = 3.14 / 4.0;
  float d = 0.5 / tan(field_of_view / 2.0);
  vec3 camera_v1 = vec3(0, -1.0/d, -1.0/d);
  vec3 camera_v2 = vec3(0, 1.0/d, -1.0/d);
  vec3 camera_v3 = vec3(0, 1.0/d, 1.0/d);
  vec3 camera_v4 = vec3(0, -1.0/d, 1.0/d);
  vec3 position = vec3(-1,0,0);

  Camera c = Camera(position, camera_v1, camera_v2, camera_v3, camera_v4);
  return c;
}
