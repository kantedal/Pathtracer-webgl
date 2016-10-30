bool SceneIntersections(Ray ray, inout Collision collision) {
  //Collision collision = Collision(vec3(0,0,0), vec3(0,0,0), 0);

  //Check sphere collision
  for (int sphere_idx = 0; sphere_idx < 3; sphere_idx++) {
    Sphere sphere = spheres[sphere_idx];
    if (SphereIntersection(ray, sphere, collision)) {
      return true;
    }
  }

  // Check triangle collision
  for (int tri_idx = 0; tri_idx < 25; tri_idx++) {
    Triangle triangle = GetTriangleFromIndex(tri_idx);
    if (TriangleIntersection(ray, triangle, collision)) {
      return true;
    }
  }

  // Triangle triangle = GetTriangleFromIndex(0);
  return false;
}

// vec3 TraceRay(Ray ray) {
//   Collision collision = Collision(vec3(0,0,0), vec3(0,0,0), 0);
//   bool test = SceneIntersections(ray, collision);
//
//   Material mat = GetMaterial(collision.material_index);
//   //return BRDF(ray, mat, collision.normal);
//
//   return vec3(0,0,0);
// }
