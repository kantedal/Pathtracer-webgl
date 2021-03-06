export const MATERIAL_TYPES = {
  lambertian: 0,
  specular: 1,
  emission: 2,
  transmission: 3,
  oren_nayar: 4
}

export class Material {
    constructor(color, material_type) {
      this._material_type = material_type;
      this._color = color;
      this._emission_rate = material_type == 2 ? 10 : 0;
    }

    get material_type() { return this._material_type; }
    get color() { return this._color; }
    get emission_rate() { return this._emission_rate; }
    set emission_rate(rate) { this._emission_rate = rate; }
}
