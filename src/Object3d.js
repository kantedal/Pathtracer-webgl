class Triangle {
  constructor(v0, v1, v2) {
    this._v0 = v0;
    this._v1 = v1;
    this._v2 = v2;

    this._edge1 = vec3.create();
    vec3.subtract(this._edge1, v0, v1);
    this._edge2 = vec3.create();
    vec3.subtract(this._edge2, v0, v2);
  }

  get v0() { return this._v0; }
  get v1() { return this._v1; }
  get v2() { return this._v2; }
  get edge1() { return this._edge1; }
  get edge2() { return this._edge2; }
}

export class Material {
  constructor(material_type, color) {
    this._material_type = material_type;
    this._color = color;
    this._emission_rate = 0;
  }

  get material_type() { return this._material_type; }
  get color() { return this._material_type; }
  get emission_rate() { return this._emission_rate; }
}

export class Object3d {
  constructor(triangles, material_index) {
    this._triangles = triangles;
    this._material_index = material_index;
  }

  static LoadObj(filename, material_index) {
    return new Promise((resolve, reject) => {
      let vertices = [];
      let triangles = [];

      jQuery.get(filename, (data) => {
        let lines = data.split('\n');
        for (let line of lines) {
          let components = line.split(' ');

          switch (components[0]) {
            // Vertex indices
            case 'f':
              triangles.push(new Triangle(vertices[components[1] - 1], vertices[components[2] - 1], vertices[components[3] - 1]));
              break;

            // Vertex positions
            case 'v':
              vertices.push(vec3.fromValues(components[1], components[2], components[3]));
              break;
          }
        }

        resolve(new Object3d(triangles, material_index));
      });
    });
  }

  get triangles() { return this._triangles; }
  get material_index() { return this._material_index; }
}
