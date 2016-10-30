import { Renderer } from './Renderer';
import { Scene } from './Scene';

global.app = function () {
  //let material = new Material(1, vec3.fromValues(1,1,1));


  let scene = new Scene();
  let renderer = new Renderer();
  setTimeout(() => {
      let tri_data = scene.BuildSceneTextures();
      renderer.addSceneTextures(tri_data);
  }, 100);
};
