import { Object3d } from './Object3d';
import { LoadObjects } from './ShaderLoader';
import { Material } from './Material';

export class Scene {
  constructor() {
    this.objects = [];
    this.materials = [];
    this.CreateDefaultScene();
  }

  CreateDefaultScene() {
    let red_material = new Material(vec3.fromValues(1,0,0), 0);
    let green_material = new Material(vec3.fromValues(1,0,0), 0);
    let blue_material = new Material(vec3.fromValues(1,0,0), 0);
    let white_material = new Material(vec3.fromValues(1,1,1), 0);
    let emission_material = new Material(vec3.fromValues(1,1,1), 2);

    this.materials.push(red_material);
    this.materials.push(green_material);
    this.materials.push(blue_material);
    this.materials.push(white_material);
    this.materials.push(emission_material);

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
  }

  BuildSceneTextures() {
    let triangleData = [];
    for (let object of this.objects) {
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

        let material_index = 0;
        for (let mat_idx = 0; mat_idx < this.materials.length; mat_idx++) {
          if (this.materials[mat_idx] === object.material) {
            material_index = mat_idx;
            break;
          }
        }

        // Extra data
        triangleData.push(material_index);
        triangleData.push(0);
        triangleData.push(0);
      }
    }

    console.log(triangleData.length);

    let data = new Float32Array(2048 * 2048 * 3);
    for (let i = 0; i < data.length; ++i) {
        data[i] = 0.0;
    }

    let tri_count = 0;
    for (let i = 0; i < triangleData.length; ++i) {
      //if (i % 3 == 0) tri_count++;
      data[i] = triangleData[i];
      //console.log(triangleData[i] + " " + tri_count);
    }

    return data;
  }
}
