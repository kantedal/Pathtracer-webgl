export class Sphere {
  constructor(position, radius, material) {
    this._position = position;
    this._radius = radius;
    this._material = material;
  }

  get position() { return this._position; }
  get radius() { return this._radius; }
  get material() { return this._material; }
}
