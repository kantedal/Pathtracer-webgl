import { Object3d } from './Object3d'

export class Scene {
  constructor() {
    this.objects = [];
    this.CreateDefaultScene();
  }

  CreateDefaultScene() {
    Object3d.LoadObj('./dist/models/light_plane.txt', 6).then((object) => this.objects.push(object));
    Object3d.LoadObj('./dist/models/floor.txt', 3).then((object) => this.objects.push(object));
    Object3d.LoadObj('./dist/models/right_wall.txt', 0).then((object) => this.objects.push(object));
    Object3d.LoadObj('./dist/models/left_wall.txt', 2).then((object) => this.objects.push(object));
    Object3d.LoadObj('./dist/models/roof.txt', 3).then((object) => this.objects.push(object));
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

        // Extra data
        triangleData.push(object.material_index);
        triangleData.push(0);
        triangleData.push(0);

        // console.log("Triangle: ");
        // console.log("v0: " + triangle.v0[0] + " " + triangle.v0[1] + " " + triangle.v0[2]);
        // console.log("v1: " + triangle.v1[0] + " " + triangle.v1[1] + " " + triangle.v1[2]);
        // console.log("v2: " + triangle.v2[0] + " " + triangle.v2[1] + " " + triangle.v2[2]);
        // console.log("---------------------");
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
