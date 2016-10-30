import { Object3d } from './Object3d';
import { LoadObjects } from './ShaderLoader';
import { Material, MATERIAL_TYPES } from './Material';
import { Sphere } from './Sphere';
import { Camera } from './Camera';

export class Scene {
  constructor() {
    this.objects = [];
    this.spheres = [];
    this.materials = [];

    this.CreateDefaultScene();
  }

  CreateDefaultScene() {
    let red_material = new Material(vec3.fromValues(1,0,0), MATERIAL_TYPES.oren_nayar);
    let green_material = new Material(vec3.fromValues(0,1,0), MATERIAL_TYPES.oren_nayar);
    let blue_material = new Material(vec3.fromValues(0,0,1), MATERIAL_TYPES.oren_nayar);
    let white_material = new Material(vec3.fromValues(1,1,1), MATERIAL_TYPES.oren_nayar);
    let green_glass = new Material(vec3.fromValues(0.5,1,0.5), MATERIAL_TYPES.transmission);
    let specular_red_material = new Material(vec3.fromValues(1,0,5,0.5), MATERIAL_TYPES.specular);

    let emission_material = new Material(vec3.fromValues(1,1,1), MATERIAL_TYPES.emission);
    emission_material.emission_rate = 5.0;
    let emission_red_material = new Material(vec3.fromValues(1,0.7,0.7), MATERIAL_TYPES.emission);
    emission_red_material.emission_rate = 20.0;

    this.materials.push(red_material);
    this.materials.push(green_material);
    this.materials.push(blue_material);
    this.materials.push(white_material);
    this.materials.push(green_glass);
    this.materials.push(specular_red_material);
    this.materials.push(emission_material);
    this.materials.push(emission_red_material);

    // Load objects from .obj files
    LoadObjects([
      {fileName: './dist/models/light_plane.txt', material: emission_material },
      {fileName: './dist/models/floor.txt', material: white_material },
      {fileName: './dist/models/right_wall.txt', material: blue_material },
      {fileName: './dist/models/left_wall.txt', material: red_material},
      {fileName: './dist/models/roof.txt', material: white_material},
    ], (objects) => {
      for (let object of objects) {
        this.objects.push(object);
      }
    },
    () => {});

    this.spheres.push(new Sphere(vec3.fromValues(5.0, -3, -3.5), 0.5, emission_red_material));
    this.spheres.push(new Sphere(vec3.fromValues(8.0, 1.8, -3.0), 1.8, green_glass));
    this.spheres.push(new Sphere(vec3.fromValues(9.0, -1.8, -3.0), 1.8, white_material));
  }

  BuildSceneTextures() {
    let textureData = {
      triangles: new Float32Array(2048 * 2048 * 3),
      triangle_count: 0,
      materials: new Float32Array(512 * 512 * 3),
      material_count: 0,
      spheres: new Float32Array(512 * 512 * 3),
      sphere_count: 0
    };

    // Build material data
    let materialData = [];
    for (let material of this.materials) {
      // Color
      materialData.push(material.color[0]);
      materialData.push(material.color[1]);
      materialData.push(material.color[2]);

      // Extra data
      materialData.push(material.material_type);
      materialData.push(material.emission_rate);
      materialData.push(0);
    }

    textureData.material_count = this.materials.length;
    for (let i = 0; i < materialData.length; i++) {
      textureData.materials[i] = materialData[i];
    }

    // Build sphere data
    let sphereData = [];
    for (let sphere of this.spheres) {
      // Find material index for current object
      let material_index = 0;
      for (let mat_idx = 0; mat_idx < this.materials.length; mat_idx++) {
        if (this.materials[mat_idx] === sphere.material) {
          material_index = mat_idx;
          break;
        }
      }

      // Position
      sphereData.push(sphere.position[0]);
      sphereData.push(sphere.position[1]);
      sphereData.push(sphere.position[2]);

      // Extra data
      sphereData.push(sphere.radius);
      sphereData.push(material_index);
      sphereData.push(0);
    }

    textureData.sphere_count = this.spheres.length;
    for (let i = 0; i < materialData.length; i++) {
      textureData.spheres[i] = sphereData[i];
    }

    // Build triangle data
    let triangleData = [];
    for (let object of this.objects) {

      // Find material index for current object
      let material_index = 0;
      for (let mat_idx = 0; mat_idx < this.materials.length; mat_idx++) {
        if (this.materials[mat_idx] === object.material) {
          material_index = mat_idx;
          break;
        }
      }

      for (let triangle of object.triangles) {
        // v0
        triangleData.push(triangle.v0[0]);
        triangleData.push(triangle.v0[1]);
        triangleData.push(triangle.v0[2]);

        // Edge 1
        triangleData.push(triangle.v1[0]);
        triangleData.push(triangle.v1[1]);
        triangleData.push(triangle.v1[2]);

        // Edge 2
        triangleData.push(triangle.v2[0]);
        triangleData.push(triangle.v2[1]);
        triangleData.push(triangle.v2[2]);

        // Extra data
        triangleData.push(material_index);
        triangleData.push(0);
        triangleData.push(0);
      }
    }

    let tri_count = 0;
    for (let i = 0; i < triangleData.length; ++i) {
      if (i % 12 == 0) tri_count++;
      textureData.triangles[i] = triangleData[i];
    }

    textureData.triangle_count = tri_count;

    return textureData;
  }
}
