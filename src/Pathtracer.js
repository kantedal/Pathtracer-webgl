import { Scene } from './Scene';
import { Renderer } from './Renderer';
import { Camera } from './Camera';
import { Navigator } from './Navigator';

export class Pathtracer {
  constructor() {
    this.scene = new Scene();
    this.camera = new Camera(vec3.fromValues(-1,0,0), vec3.fromValues(1,0,0));
    this.renderer = new Renderer(this.camera);
    this.navigator = new Navigator(this.camera);

    setTimeout(() => this.renderer.addSceneTextures(this.scene.BuildSceneTextures()), 100);
  }
}
