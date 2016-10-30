export class Material {
    constructor(material_type, color) {
      this._material_type = material_type;
      this._color = color;
      this._emission_rate = material_type == 2 ? 10 : 0;
    }

    get material_type() { return this._material_type; }
    get color() { return this._material_type; }
    get emission_rate() { return this._emission_rate; }
}
