vec3 PathTrace(Ray ray) {
  vec3 mask = vec3(1,1,1);
  vec3 accumulated_color = vec3(0,0,0);

  for (int iteration = 0; iteration < 5; iteration++) {
    Collision collision;
    float distribution = 1.0;
  
    if (!SceneIntersections(ray, collision))
      return vec3(0,0,0);


    Material collision_material = GetMaterial(collision.material_index);
    vec3 next_dir = PDF(ray, collision_material, collision.normal, iteration, distribution);
    mask *= BRDF(ray, collision_material, collision.normal, next_dir) * distribution;

    if (collision_material.material_type == 2) {
      accumulated_color += (mask * collision_material.color * collision_material.emission_rate);
      break;
    }

    if (!(next_dir.x == 0.0 && next_dir.y == 0.0 && next_dir.z == 0.0)) {
      ray = Ray(collision.position + next_dir * 0.01, next_dir);
    }
    else {
      break;
    }
  }

  return accumulated_color;
}
