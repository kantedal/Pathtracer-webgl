struct Sphere {
  vec3 position;
  float radius;
  int material_index;
};
Sphere spheres[3];

bool SphereIntersection(Ray ray, Sphere sphere, inout Collision collision) {
  vec3 position = sphere.position;
  float radius = sphere.radius;

  vec3 op = position - ray.start_position;
  float t, epsilon = 0.0001;
  float b = dot(op, ray.direction);
  float disc = b * b - dot(op, op) + radius * radius;
  if (disc < 0.0) return false;
  else disc = sqrt(disc);


  t = (t = b - disc) > epsilon ? t : ((t = b + disc) > epsilon ? t : 0.0);

  if (t < 0.01)
    return false;

  collision.position = ray.start_position + ray.direction * t;
  collision.normal = normalize(collision.position  - position);
  collision.material_index = sphere.material_index;

  return true;
}
