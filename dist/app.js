(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var Renderer = require("./Renderer").Renderer;

var Scene = require("./Scene").Scene;

global.app = function () {
  //let material = new Material(1, vec3.fromValues(1,1,1));

  var scene = new Scene();
  var renderer = new Renderer();
  setTimeout(function () {
    var tri_data = scene.BuildSceneTextures();
    renderer.addSceneTextures(tri_data);
  }, 100);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxsZXMtZGF0b3IvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsWUFBWSxDQUFDOztBQUViLElBRlMsUUFBUSxHQUFBLE9BQUEsQ0FBUSxZQUFZLENBQUEsQ0FBNUIsUUFBUSxDQUFBOztBQUlqQixJQUhTLEtBQUssR0FBQSxPQUFBLENBQVEsU0FBUyxDQUFBLENBQXRCLEtBQUssQ0FBQTs7QUFFZCxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVk7OztBQUl2QixNQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3hCLE1BQUksUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7QUFDOUIsWUFBVSxDQUFDLFlBQU07QUFDYixRQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUMxQyxZQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDdkMsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNULENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gJy4vU2NlbmUnO1xuXG5nbG9iYWwuYXBwID0gZnVuY3Rpb24gKCkge1xuICAvL2xldCBtYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCgxLCB2ZWMzLmZyb21WYWx1ZXMoMSwxLDEpKTtcblxuXG4gIGxldCBzY2VuZSA9IG5ldyBTY2VuZSgpO1xuICBsZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBsZXQgdHJpX2RhdGEgPSBzY2VuZS5CdWlsZFNjZW5lVGV4dHVyZXMoKTtcbiAgICAgIHJlbmRlcmVyLmFkZFNjZW5lVGV4dHVyZXModHJpX2RhdGEpO1xuICB9LCAxMDApO1xufTtcbiJdfQ==
},{"./Renderer":4,"./Scene":5}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Material = exports.Material = (function () {
  function Material(material_type, color) {
    _classCallCheck(this, Material);

    this._material_type = material_type;
    this._color = color;
    this._emission_rate = material_type == 2 ? 10 : 0;
  }

  _createClass(Material, {
    material_type: {
      get: function get() {
        return this._material_type;
      }
    },
    color: {
      get: function get() {
        return this._material_type;
      }
    },
    emission_rate: {
      get: function get() {
        return this._emission_rate;
      }
    }
  });

  return Material;
})();

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Triangle = (function () {
  function Triangle(v0, v1, v2) {
    _classCallCheck(this, Triangle);

    this._v0 = v0;
    this._v1 = v1;
    this._v2 = v2;

    this._edge1 = vec3.create();
    vec3.subtract(this._edge1, v0, v1);
    this._edge2 = vec3.create();
    vec3.subtract(this._edge2, v0, v2);
  }

  _createClass(Triangle, {
    v0: {
      get: function get() {
        return this._v0;
      }
    },
    v1: {
      get: function get() {
        return this._v1;
      }
    },
    v2: {
      get: function get() {
        return this._v2;
      }
    },
    edge1: {
      get: function get() {
        return this._edge1;
      }
    },
    edge2: {
      get: function get() {
        return this._edge2;
      }
    }
  });

  return Triangle;
})();

var Object3d = exports.Object3d = (function () {
  function Object3d(triangles, material) {
    _classCallCheck(this, Object3d);

    this._triangles = triangles;
    this._material = material;
  }

  _createClass(Object3d, {
    triangles: {
      get: function get() {
        return this._triangles;
      }
    },
    material: {
      get: function get() {
        return this._material;
      }
    }
  }, {
    LoadObj: {
      value: function LoadObj(objData, material) {
        var vertices = [];
        var triangles = [];

        var lines = objData.split("\n");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var line = _step.value;

            var components = line.split(" ");

            switch (components[0]) {
              // Vertex indices
              case "f":
                triangles.push(new Triangle(vertices[components[1] - 1], vertices[components[2] - 1], vertices[components[3] - 1]));
                break;

              // Vertex positions
              case "v":
                vertices.push(vec3.fromValues(components[1], components[2], components[3]));
                break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        console.log(triangles);
        return new Object3d(triangles, material);
      }
    }
  });

  return Object3d;
})();

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LoadShaders = require("./ShaderLoader").LoadShaders;

var gl = null;

var Renderer = exports.Renderer = (function () {
  function Renderer() {
    var _this = this;

    _classCallCheck(this, Renderer);

    this.canvas = null;
    this.buffer;
    this.vertex_shader;
    this.fragment_shader;
    //this.tracerProgram;
    this.renderProgram;
    this.vertex_position;
    this.timeLocation;
    this.resolutionLocation;
    this.parameters = { start_time: new Date().getTime(), time: 0, screenWidth: 0, screenHeight: 0, samples: 0 };

    this.samplesLocation;
    this.renderSamplesLocation;

    this.vertexBuffer = null;
    this.frameBuffer = null;
    this.fb = null;
    this.textures = [];
    this.tracerProgram = null;
    this.renderVertexAttribute = null;

    this.triangleTexture = null;

    this.init();

    this.animate = function (time) {
      //this.resizeCanvas();
      _this.canvas.width = 512;
      _this.canvas.height = 512;
      _this.parameters.screenWidth = _this.canvas.width;
      _this.parameters.screenHeight = _this.canvas.height;
      gl.viewport(0, 0, _this.canvas.width, _this.canvas.height);

      // render to texture
      gl.useProgram(_this.tracerProgram);

      var location1 = gl.getUniformLocation(_this.tracerProgram, "u_buffer_texture");
      var location2 = gl.getUniformLocation(_this.tracerProgram, "u_triangle_texture");

      gl.uniform1i(location1, 0);
      gl.uniform1i(location2, 1);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, _this.textures[0]);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, _this.triangleTexture);

      gl.bindBuffer(gl.ARRAY_BUFFER, _this.vertexBuffer);
      gl.bindFramebuffer(gl.FRAMEBUFFER, _this.fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, _this.textures[1], 0);
      gl.vertexAttribPointer(_this.tracerVertexAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      _this.parameters.time = new Date().getTime() - _this.parameters.start_time;
      _this.parameters.samples += 1;

      gl.uniform1f(_this.timeLocation, _this.parameters.time / 1000);
      gl.uniform1f(_this.samplesLocation, _this.parameters.samples);
      gl.uniform2f(_this.resolutionLocation, _this.parameters.screenWidth, _this.parameters.screenHeight);

      _this.textures.reverse();

      if (_this.parameters.samples % 50 == 0) console.log(_this.parameters.samples);

      gl.useProgram(_this.renderProgram);
      gl.bindTexture(gl.TEXTURE_2D, _this.textures[0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, _this.vertexBuffer);
      gl.vertexAttribPointer(_this.renderVertexAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.uniform1f(_this.renderSamplesLocation, _this.parameters.samples);

      requestAnimationFrame(_this.animate);
    };
  }

  _createClass(Renderer, {
    createRenderProgram: {
      value: function createRenderProgram() {
        console.log("Create render program");

        var vertices = [-1, -1, -1, 1, 1, -1, 1, 1];
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        //this.frameBuffer = gl.createFramebuffer();
        this.fb = gl.createFramebuffer();

        var type = gl.getExtension("OES_texture_float") ? gl.FLOAT : gl.UNSIGNED_BYTE;
        this.textures = [];
        for (var i = 0; i < 2; i++) {
          this.textures.push(gl.createTexture());
          gl.bindTexture(gl.TEXTURE_2D, this.textures[i]);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, type, null);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);

        // create render shader
        var render_vertex_shader = document.getElementById("vs_render").textContent;
        var render_fragment_shader = document.getElementById("fs_render").textContent;
        this.renderProgram = this.createProgram(render_vertex_shader, render_fragment_shader);
        this.renderVertexAttribute = gl.getAttribLocation(this.renderProgram, "vertex");
        gl.enableVertexAttribArray(this.renderVertexAttribute);
      }
    },
    allocateTexture: {
      value: function allocateTexture() {
        this.triangleTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.triangleTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //wtu.glErrorShouldBe(gl, gl.NO_ERROR, "texture parameter setup should succeed");
      }
    },
    addSceneTextures: {
      value: function addSceneTextures(triangleArray) {
        console.log("Create triangle texture");

        this.allocateTexture();
        var width = 1024;
        var height = 1024;
        var format = gl.RGB;

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, format, gl.FLOAT, triangleArray);
      }
    },
    init: {
      value: function init() {
        var _this = this;

        LoadShaders(["./dist/kernels/header.glsl", "./dist/kernels/Ray.glsl", "./dist/kernels/Camera.glsl", "./dist/kernels/Collision.glsl", "./dist/kernels/Material.glsl", "./dist/kernels/Triangle.glsl", "./dist/kernels/Sphere.glsl", "./dist/kernels/Scene.glsl", "./dist/kernels/RayTracer.glsl", "./dist/kernels/main.glsl"], function (kernelData) {
          _this.fragment_shader = kernelData;
          _this.vertex_shader = document.getElementById("vs").textContent;
          _this.canvas = document.querySelector("canvas");

          // Initialise WebGL
          try {
            gl = _this.canvas.getContext("experimental-webgl");
          } catch (error) {}
          if (!gl) throw "cannot create webgl context";

          // BROWSER MUST SUPPORT THIS!!!
          gl.getExtension("OES_texture_float");

          _this.createRenderProgram();

          // Create Vertex buffer (2 triangles)
          _this.buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, _this.buffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW);

          // Create Program
          _this.tracerProgram = _this.createProgram(_this.vertex_shader, _this.fragment_shader);
          _this.tracerVertexAttribute = gl.getAttribLocation(_this.tracerProgram, "vertex");
          gl.enableVertexAttribArray(_this.tracerVertexAttribute);

          _this.timeLocation = gl.getUniformLocation(_this.tracerProgram, "time");
          _this.samplesLocation = gl.getUniformLocation(_this.tracerProgram, "samples");
          _this.resolutionLocation = gl.getUniformLocation(_this.tracerProgram, "resolution");
          _this.renderSamplesLocation = gl.getUniformLocation(_this.renderProgram, "samples");

          _this.animate();
        }, function () {});
      }
    },
    createProgram: {
      value: function createProgram(vertex, fragment) {
        var program = gl.createProgram();

        var vs = this.createShader(vertex, gl.VERTEX_SHADER);
        var fs = this.createShader(fragment, gl.FRAGMENT_SHADER);

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);

        gl.deleteShader(vs);
        gl.deleteShader(fs);

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          return null;
        }

        return program;
      }
    },
    createShader: {
      value: function createShader(src, type) {
        var shader = gl.createShader(type);

        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          return null;
        }
        return shader;
      }

      // resizeCanvas(event) {
      //   if(this.canvas.width != this.canvas.clientWidth || this.canvas.height != this.canvas.clientHeight) {
      // 		this.canvas.width = this.canvas.clientWidth;
      // 		this.canvas.height = this.canvas.clientHeight;
      //
      // 		this.parameters.screenWidth = this.canvas.width;
      // 		this.parameters.screenHeight = this.canvas.height;
      //
      // 		gl.viewport( 0, 0, this.canvas.width, this.canvas.height );
      // 	}
      // }

    }
  });

  return Renderer;
})();

},{"./ShaderLoader":6}],5:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Object3d = require("./Object3d").Object3d;

var LoadObjects = require("./ShaderLoader").LoadObjects;

var Material = require("./Material").Material;

var Scene = exports.Scene = (function () {
  function Scene() {
    _classCallCheck(this, Scene);

    this.objects = [];
    this.materials = [];
    this.CreateDefaultScene();
  }

  _createClass(Scene, {
    CreateDefaultScene: {
      value: function CreateDefaultScene() {
        var _this = this;

        var red_material = new Material(vec3.fromValues(1, 0, 0), 0);
        var green_material = new Material(vec3.fromValues(1, 0, 0), 0);
        var blue_material = new Material(vec3.fromValues(1, 0, 0), 0);
        var white_material = new Material(vec3.fromValues(1, 1, 1), 0);
        var emission_material = new Material(vec3.fromValues(1, 1, 1), 2);

        this.materials.push(red_material);
        this.materials.push(green_material);
        this.materials.push(blue_material);
        this.materials.push(white_material);
        this.materials.push(emission_material);

        LoadObjects([{ fileName: "./dist/models/light_plane.txt", material: emission_material }, { fileName: "./dist/models/floor.txt", material: white_material }, { fileName: "./dist/models/right_wall.txt", material: blue_material }, { fileName: "./dist/models/left_wall.txt", material: red_material }, { fileName: "./dist/models/roof.txt", material: white_material }], function (objects) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var object = _step.value;

              _this.objects.push(object);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }, function () {});
      }
    },
    BuildSceneTextures: {
      value: function BuildSceneTextures() {
        var triangleData = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var object = _step.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = object.triangles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var triangle = _step2.value;

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

                var material_index = 0;
                for (var mat_idx = 0; mat_idx < this.materials.length; mat_idx++) {
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
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        console.log(triangleData.length);

        var data = new Float32Array(2048 * 2048 * 3);
        for (var i = 0; i < data.length; ++i) {
          data[i] = 0;
        }

        var tri_count = 0;
        for (var i = 0; i < triangleData.length; ++i) {
          //if (i % 3 == 0) tri_count++;
          data[i] = triangleData[i];
          //console.log(triangleData[i] + " " + tri_count);
        }

        return data;
      }
    }
  });

  return Scene;
})();

},{"./Material":2,"./Object3d":3,"./ShaderLoader":6}],6:[function(require,module,exports){
"use strict";

exports.LoadShaders = LoadShaders;
exports.LoadObjects = LoadObjects;
Object.defineProperty(exports, "__esModule", {
  value: true
});

var Object3d = require("./Object3d").Object3d;

function LoadShader(fileName, index, callback) {
  jQuery.get(fileName, function (data) {
    callback(data, index);
  });
}

function LoadShaders(fileNames, callback, errorCallback) {
  var loaded_files = 0;
  var shader_files = [];
  for (var file_index = 0; file_index < fileNames.length; file_index++) {
    LoadShader(fileNames[file_index], file_index, function (data, shader_index) {
      shader_files[shader_index] = data;

      loaded_files++;
      if (loaded_files == fileNames.length) {
        var total_shader_data = "";
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = shader_files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var shader_data = _step.value;

            total_shader_data += shader_data;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        callback(total_shader_data);
      }
    });
  }
}

function LoadObjects(fileNames, callback, errorCallback) {
  var loaded_files = 0;
  var object_files = [];
  for (var file_index = 0; file_index < fileNames.length; file_index++) {
    LoadShader(fileNames[file_index].fileName, file_index, function (data, shader_index) {
      var object = Object3d.LoadObj(data, fileNames[shader_index].material);
      object_files[shader_index] = object;
      loaded_files++;
      if (loaded_files == fileNames.length) {
        console.log(object_files);
        callback(object_files);
      }
    });
  }
}

},{"./Object3d":3}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwiL1VzZXJzL2ZpbGxlcy1kYXRvci9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvTWF0ZXJpYWwuanMiLCIvVXNlcnMvZmlsbGVzLWRhdG9yL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9PYmplY3QzZC5qcyIsIi9Vc2Vycy9maWxsZXMtZGF0b3IvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL1JlbmRlcmVyLmpzIiwiL1VzZXJzL2ZpbGxlcy1kYXRvci9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvU2NlbmUuanMiLCIvVXNlcnMvZmlsbGVzLWRhdG9yL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9TaGFkZXJMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7QUFBRSxVQUFJLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQUUsTUFBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztHQUFFLE9BQVEsVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFD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QTVCQyxnQkFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7T0FDN0I7S0FDRixDQUFDLENBQUM7R0FFTjtDQUNGOztBQUdNLFNBQVMsV0FBVyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFO0FBQzVELE1BQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNyQixNQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDdEIsT0FBSyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUU7QUFDbEUsY0FBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQUMsSUFBSSxFQUFFLFlBQVksRUFBSztBQUM3RSxVQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEUsa0JBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDcEMsa0JBQVksRUFBRSxDQUFDO0FBQ2YsVUFBSSxZQUFZLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNwQyxlQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFCLGdCQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7T0FDeEI7S0FDRixDQUFDLENBQUM7R0FFTjtDQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgUmVuZGVyZXIgPSByZXF1aXJlKFwiLi9SZW5kZXJlclwiKS5SZW5kZXJlcjtcblxudmFyIFNjZW5lID0gcmVxdWlyZShcIi4vU2NlbmVcIikuU2NlbmU7XG5cbmdsb2JhbC5hcHAgPSBmdW5jdGlvbiAoKSB7XG4gIC8vbGV0IG1hdGVyaWFsID0gbmV3IE1hdGVyaWFsKDEsIHZlYzMuZnJvbVZhbHVlcygxLDEsMSkpO1xuXG4gIHZhciBzY2VuZSA9IG5ldyBTY2VuZSgpO1xuICB2YXIgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRyaV9kYXRhID0gc2NlbmUuQnVpbGRTY2VuZVRleHR1cmVzKCk7XG4gICAgcmVuZGVyZXIuYWRkU2NlbmVUZXh0dXJlcyh0cmlfZGF0YSk7XG4gIH0sIDEwMCk7XG59O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpOVZjMlZ5Y3k5bWFXeHNaWE10WkdGMGIzSXZSMmwwYUhWaUwxZGxZa2RNWDFCaGRHaDBjbUZqWlhJdmMzSmpMMkZ3Y0M1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUVzV1VGQldTeERRVUZET3p0QlFVVmlMRWxCUmxNc1VVRkJVU3hIUVVGQkxFOUJRVUVzUTBGQlVTeFpRVUZaTEVOQlFVRXNRMEZCTlVJc1VVRkJVU3hEUVVGQk96dEJRVWxxUWl4SlFVaFRMRXRCUVVzc1IwRkJRU3hQUVVGQkxFTkJRVkVzVTBGQlV5eERRVUZCTEVOQlFYUkNMRXRCUVVzc1EwRkJRVHM3UVVGRlpDeE5RVUZOTEVOQlFVTXNSMEZCUnl4SFFVRkhMRmxCUVZrN096dEJRVWwyUWl4TlFVRkpMRXRCUVVzc1IwRkJSeXhKUVVGSkxFdEJRVXNzUlVGQlJTeERRVUZETzBGQlEzaENMRTFCUVVrc1VVRkJVU3hIUVVGSExFbEJRVWtzVVVGQlVTeEZRVUZGTEVOQlFVTTdRVUZET1VJc1dVRkJWU3hEUVVGRExGbEJRVTA3UVVGRFlpeFJRVUZKTEZGQlFWRXNSMEZCUnl4TFFVRkxMRU5CUVVNc2EwSkJRV3RDTEVWQlFVVXNRMEZCUXp0QlFVTXhReXhaUVVGUkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03UjBGRGRrTXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenREUVVOVUxFTkJRVU1pTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN0lGSmxibVJsY21WeUlIMGdabkp2YlNBbkxpOVNaVzVrWlhKbGNpYzdYRzVwYlhCdmNuUWdleUJUWTJWdVpTQjlJR1p5YjIwZ0p5NHZVMk5sYm1Vbk8xeHVYRzVuYkc5aVlXd3VZWEJ3SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBdkwyeGxkQ0J0WVhSbGNtbGhiQ0E5SUc1bGR5Qk5ZWFJsY21saGJDZ3hMQ0IyWldNekxtWnliMjFXWVd4MVpYTW9NU3d4TERFcEtUdGNibHh1WEc0Z0lHeGxkQ0J6WTJWdVpTQTlJRzVsZHlCVFkyVnVaU2dwTzF4dUlDQnNaWFFnY21WdVpHVnlaWElnUFNCdVpYY2dVbVZ1WkdWeVpYSW9LVHRjYmlBZ2MyVjBWR2x0Wlc5MWRDZ29LU0E5UGlCN1hHNGdJQ0FnSUNCc1pYUWdkSEpwWDJSaGRHRWdQU0J6WTJWdVpTNUNkV2xzWkZOalpXNWxWR1Y0ZEhWeVpYTW9LVHRjYmlBZ0lDQWdJSEpsYm1SbGNtVnlMbUZrWkZOalpXNWxWR1Y0ZEhWeVpYTW9kSEpwWDJSaGRHRXBPMXh1SUNCOUxDQXhNREFwTzF4dWZUdGNiaUpkZlE9PSIsImV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XG4gICAgY29uc3RydWN0b3IobWF0ZXJpYWxfdHlwZSwgY29sb3IpIHtcbiAgICAgIHRoaXMuX21hdGVyaWFsX3R5cGUgPSBtYXRlcmlhbF90eXBlO1xuICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcbiAgICAgIHRoaXMuX2VtaXNzaW9uX3JhdGUgPSBtYXRlcmlhbF90eXBlID09IDIgPyAxMCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IG1hdGVyaWFsX3R5cGUoKSB7IHJldHVybiB0aGlzLl9tYXRlcmlhbF90eXBlOyB9XG4gICAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gdGhpcy5fbWF0ZXJpYWxfdHlwZTsgfVxuICAgIGdldCBlbWlzc2lvbl9yYXRlKCkgeyByZXR1cm4gdGhpcy5fZW1pc3Npb25fcmF0ZTsgfVxufVxuIiwiY2xhc3MgVHJpYW5nbGUge1xuICBjb25zdHJ1Y3Rvcih2MCwgdjEsIHYyKSB7XG4gICAgdGhpcy5fdjAgPSB2MDtcbiAgICB0aGlzLl92MSA9IHYxO1xuICAgIHRoaXMuX3YyID0gdjI7XG5cbiAgICB0aGlzLl9lZGdlMSA9IHZlYzMuY3JlYXRlKCk7XG4gICAgdmVjMy5zdWJ0cmFjdCh0aGlzLl9lZGdlMSwgdjAsIHYxKTtcbiAgICB0aGlzLl9lZGdlMiA9IHZlYzMuY3JlYXRlKCk7XG4gICAgdmVjMy5zdWJ0cmFjdCh0aGlzLl9lZGdlMiwgdjAsIHYyKTtcbiAgfVxuXG4gIGdldCB2MCgpIHsgcmV0dXJuIHRoaXMuX3YwOyB9XG4gIGdldCB2MSgpIHsgcmV0dXJuIHRoaXMuX3YxOyB9XG4gIGdldCB2MigpIHsgcmV0dXJuIHRoaXMuX3YyOyB9XG4gIGdldCBlZGdlMSgpIHsgcmV0dXJuIHRoaXMuX2VkZ2UxOyB9XG4gIGdldCBlZGdlMigpIHsgcmV0dXJuIHRoaXMuX2VkZ2UyOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBPYmplY3QzZCB7XG4gIGNvbnN0cnVjdG9yKHRyaWFuZ2xlcywgbWF0ZXJpYWwpIHtcbiAgICB0aGlzLl90cmlhbmdsZXMgPSB0cmlhbmdsZXM7XG4gICAgdGhpcy5fbWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgfVxuXG4gIHN0YXRpYyBMb2FkT2JqKG9iakRhdGEsIG1hdGVyaWFsKSB7XG4gICAgICBsZXQgdmVydGljZXMgPSBbXTtcbiAgICAgIGxldCB0cmlhbmdsZXMgPSBbXTtcblxuICAgICAgbGV0IGxpbmVzID0gb2JqRGF0YS5zcGxpdCgnXFxuJyk7XG4gICAgICBmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnRzID0gbGluZS5zcGxpdCgnICcpO1xuXG4gICAgICAgIHN3aXRjaCAoY29tcG9uZW50c1swXSkge1xuICAgICAgICAgIC8vIFZlcnRleCBpbmRpY2VzXG4gICAgICAgICAgY2FzZSAnZic6XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChuZXcgVHJpYW5nbGUodmVydGljZXNbY29tcG9uZW50c1sxXSAtIDFdLCB2ZXJ0aWNlc1tjb21wb25lbnRzWzJdIC0gMV0sIHZlcnRpY2VzW2NvbXBvbmVudHNbM10gLSAxXSkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBWZXJ0ZXggcG9zaXRpb25zXG4gICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlYzMuZnJvbVZhbHVlcyhjb21wb25lbnRzWzFdLCBjb21wb25lbnRzWzJdLCBjb21wb25lbnRzWzNdKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2codHJpYW5nbGVzKTtcbiAgICAgIHJldHVybiBuZXcgT2JqZWN0M2QodHJpYW5nbGVzLCBtYXRlcmlhbCk7XG4gIH1cblxuICBnZXQgdHJpYW5nbGVzKCkgeyByZXR1cm4gdGhpcy5fdHJpYW5nbGVzOyB9XG4gIGdldCBtYXRlcmlhbCgpIHsgcmV0dXJuIHRoaXMuX21hdGVyaWFsOyB9XG59XG4iLCJpbXBvcnQgeyBMb2FkU2hhZGVycyB9IGZyb20gJy4vU2hhZGVyTG9hZGVyJztcblxudmFyIGdsID0gbnVsbDtcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jYW52YXMgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyO1xuICAgIHRoaXMudmVydGV4X3NoYWRlcjtcbiAgICB0aGlzLmZyYWdtZW50X3NoYWRlcjtcbiAgICAvL3RoaXMudHJhY2VyUHJvZ3JhbTtcbiAgICB0aGlzLnJlbmRlclByb2dyYW07XG4gICAgdGhpcy52ZXJ0ZXhfcG9zaXRpb247XG4gICAgdGhpcy50aW1lTG9jYXRpb247XG4gICAgdGhpcy5yZXNvbHV0aW9uTG9jYXRpb247XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0geyBzdGFydF90aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSwgdGltZTogMCwgc2NyZWVuV2lkdGggOiAwLCBzY3JlZW5IZWlnaHQ6IDAsIHNhbXBsZXM6IDAgfTtcblxuICAgIHRoaXMuc2FtcGxlc0xvY2F0aW9uO1xuICAgIHRoaXMucmVuZGVyU2FtcGxlc0xvY2F0aW9uO1xuXG4gICAgdGhpcy52ZXJ0ZXhCdWZmZXIgPSBudWxsO1xuICAgIHRoaXMuZnJhbWVCdWZmZXIgPSBudWxsO1xuICAgIHRoaXMuZmIgPSBudWxsO1xuICAgIHRoaXMudGV4dHVyZXMgPSBbXTtcbiAgICB0aGlzLnRyYWNlclByb2dyYW0gPSBudWxsO1xuICAgIHRoaXMucmVuZGVyVmVydGV4QXR0cmlidXRlID0gbnVsbDtcblxuICAgIHRoaXMudHJpYW5nbGVUZXh0dXJlID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5hbmltYXRlID0gKHRpbWUpID0+IHtcbiAgICAgIC8vdGhpcy5yZXNpemVDYW52YXMoKTtcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gNTEyO1xuICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gNTEyO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNjcmVlbldpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XG4gICAgXHR0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgICAgZ2wudmlld3BvcnQoIDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQgKTtcblxuXG4gICAgICAvLyByZW5kZXIgdG8gdGV4dHVyZVxuICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnRyYWNlclByb2dyYW0pO1xuXG4gICAgICB2YXIgbG9jYXRpb24xID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMudHJhY2VyUHJvZ3JhbSwgXCJ1X2J1ZmZlcl90ZXh0dXJlXCIpO1xuICAgICAgdmFyIGxvY2F0aW9uMiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sIFwidV90cmlhbmdsZV90ZXh0dXJlXCIpO1xuXG4gICAgICBnbC51bmlmb3JtMWkobG9jYXRpb24xLCAwKTtcbiAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbjIsIDEpO1xuXG4gICAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZXNbMF0pO1xuICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMSk7XG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRyaWFuZ2xlVGV4dHVyZSk7XG5cbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEJ1ZmZlcik7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuZmIpO1xuICAgICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmVzWzFdLCAwKTtcbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy50cmFjZXJWZXJ0ZXhBdHRyaWJ1dGUsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XG5cbiAgICAgIHRoaXMucGFyYW1ldGVycy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnBhcmFtZXRlcnMuc3RhcnRfdGltZTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zYW1wbGVzICs9IDE7XG5cbiAgICAgIGdsLnVuaWZvcm0xZiggdGhpcy50aW1lTG9jYXRpb24sIHRoaXMucGFyYW1ldGVycy50aW1lIC8gMTAwMCApO1xuICAgICAgZ2wudW5pZm9ybTFmKCB0aGlzLnNhbXBsZXNMb2NhdGlvbiwgIHRoaXMucGFyYW1ldGVycy5zYW1wbGVzICk7XG4gICAgICBnbC51bmlmb3JtMmYoIHRoaXMucmVzb2x1dGlvbkxvY2F0aW9uLCB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuV2lkdGgsIHRoaXMucGFyYW1ldGVycy5zY3JlZW5IZWlnaHQgKTtcblxuICAgICAgdGhpcy50ZXh0dXJlcy5yZXZlcnNlKCk7XG5cbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuc2FtcGxlcyAlIDUwID09IDApXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFyYW1ldGVycy5zYW1wbGVzKTtcblxuICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnJlbmRlclByb2dyYW0pO1xuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlc1swXSk7XG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXIpO1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnJlbmRlclZlcnRleEF0dHJpYnV0ZSwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuICAgICAgZ2wudW5pZm9ybTFmKCB0aGlzLnJlbmRlclNhbXBsZXNMb2NhdGlvbiwgIHRoaXMucGFyYW1ldGVycy5zYW1wbGVzICk7XG5cblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy5hbmltYXRlICk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUmVuZGVyUHJvZ3JhbSgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZSByZW5kZXIgcHJvZ3JhbVwiKTtcblxuICAgIGxldCB2ZXJ0aWNlcyA9IFstMSwgLTEsIC0xLCAxLCAxLCAtMSwgMSwgMV07XG4gICAgdGhpcy52ZXJ0ZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy90aGlzLmZyYW1lQnVmZmVyID0gZ2wuY3JlYXRlRnJhbWVidWZmZXIoKTtcbiAgICB0aGlzLmZiID0gZ2wuY3JlYXRlRnJhbWVidWZmZXIoKTtcblxuICAgIGxldCB0eXBlID0gZ2wuZ2V0RXh0ZW5zaW9uKCdPRVNfdGV4dHVyZV9mbG9hdCcpID8gZ2wuRkxPQVQgOiBnbC5VTlNJR05FRF9CWVRFO1xuICAgIHRoaXMudGV4dHVyZXMgPSBbXTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgMjsgaSsrKSB7XG4gICAgICB0aGlzLnRleHR1cmVzLnB1c2goZ2wuY3JlYXRlVGV4dHVyZSgpKTtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZXNbaV0pO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0IsIDUxMiwgNTEyLCAwLCBnbC5SR0IsIHR5cGUsIG51bGwpO1xuICAgIH1cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcblxuICAgIC8vIGNyZWF0ZSByZW5kZXIgc2hhZGVyXG4gICAgbGV0IHJlbmRlcl92ZXJ0ZXhfc2hhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZzX3JlbmRlcicpLnRleHRDb250ZW50O1xuICAgIGxldCByZW5kZXJfZnJhZ21lbnRfc2hhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZzX3JlbmRlcicpLnRleHRDb250ZW50O1xuICAgIHRoaXMucmVuZGVyUHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbShyZW5kZXJfdmVydGV4X3NoYWRlciwgcmVuZGVyX2ZyYWdtZW50X3NoYWRlcik7XG4gICAgdGhpcy5yZW5kZXJWZXJ0ZXhBdHRyaWJ1dGUgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnJlbmRlclByb2dyYW0sICd2ZXJ0ZXgnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnJlbmRlclZlcnRleEF0dHJpYnV0ZSk7XG4gIH1cblxuICBhbGxvY2F0ZVRleHR1cmUoKSB7XG4gICAgICB0aGlzLnRyaWFuZ2xlVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudHJpYW5nbGVUZXh0dXJlKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICAvL3d0dS5nbEVycm9yU2hvdWxkQmUoZ2wsIGdsLk5PX0VSUk9SLCBcInRleHR1cmUgcGFyYW1ldGVyIHNldHVwIHNob3VsZCBzdWNjZWVkXCIpO1xuICB9XG5cbiAgYWRkU2NlbmVUZXh0dXJlcyh0cmlhbmdsZUFycmF5KSB7XG4gICAgY29uc29sZS5sb2coXCJDcmVhdGUgdHJpYW5nbGUgdGV4dHVyZVwiKTtcblxuICAgIHRoaXMuYWxsb2NhdGVUZXh0dXJlKCk7XG4gICAgbGV0IHdpZHRoID0gMTAyNDtcbiAgICBsZXQgaGVpZ2h0ID0gMTAyNDtcbiAgICBsZXQgZm9ybWF0ID0gZ2wuUkdCO1xuXG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0IsIHdpZHRoLCBoZWlnaHQsIDAsIGZvcm1hdCwgZ2wuRkxPQVQsIHRyaWFuZ2xlQXJyYXkpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBMb2FkU2hhZGVycyhbXG4gICAgICAnLi9kaXN0L2tlcm5lbHMvaGVhZGVyLmdsc2wnLFxuICAgICAgJy4vZGlzdC9rZXJuZWxzL1JheS5nbHNsJyxcbiAgICAgICcuL2Rpc3Qva2VybmVscy9DYW1lcmEuZ2xzbCcsXG4gICAgICAnLi9kaXN0L2tlcm5lbHMvQ29sbGlzaW9uLmdsc2wnLFxuICAgICAgJy4vZGlzdC9rZXJuZWxzL01hdGVyaWFsLmdsc2wnLFxuICAgICAgJy4vZGlzdC9rZXJuZWxzL1RyaWFuZ2xlLmdsc2wnLFxuICAgICAgJy4vZGlzdC9rZXJuZWxzL1NwaGVyZS5nbHNsJyxcbiAgICAgICcuL2Rpc3Qva2VybmVscy9TY2VuZS5nbHNsJyxcbiAgICAgICcuL2Rpc3Qva2VybmVscy9SYXlUcmFjZXIuZ2xzbCcsXG4gICAgICAnLi9kaXN0L2tlcm5lbHMvbWFpbi5nbHNsJyxcbiAgICBdLCAoa2VybmVsRGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmZyYWdtZW50X3NoYWRlciA9IGtlcm5lbERhdGE7XG4gICAgICAgIHRoaXMudmVydGV4X3NoYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2cycpLnRleHRDb250ZW50O1xuICAgIFx0XHR0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuXG4gICAgXHRcdC8vIEluaXRpYWxpc2UgV2ViR0xcbiAgICBcdFx0dHJ5IHsgZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCAnZXhwZXJpbWVudGFsLXdlYmdsJyApOyB9IGNhdGNoKCBlcnJvciApIHsgfVxuICAgIFx0XHRpZiAoICFnbCApIHRocm93IFwiY2Fubm90IGNyZWF0ZSB3ZWJnbCBjb250ZXh0XCI7XG5cbiAgICAgICAgLy8gQlJPV1NFUiBNVVNUIFNVUFBPUlQgVEhJUyEhIVxuICAgICAgICBnbC5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdFwiKTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVJlbmRlclByb2dyYW0oKTtcblxuICAgIFx0XHQvLyBDcmVhdGUgVmVydGV4IGJ1ZmZlciAoMiB0cmlhbmdsZXMpXG4gICAgXHRcdHRoaXMuYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgXHRcdGdsLmJpbmRCdWZmZXIoIGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5idWZmZXIgKTtcbiAgICBcdFx0Z2wuYnVmZmVyRGF0YSggZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KCBbIC0xLjAsIC0xLjAsIC0xLjAsIDEuMCwgMS4wLCAtMS4wLCAxLjAsIC0gMS4wLCAxLjAsIDEuMCwgLSAxLjAsIDEuMCBdICksIGdsLlNUQVRJQ19EUkFXICk7XG5cbiAgICBcdFx0Ly8gQ3JlYXRlIFByb2dyYW1cbiAgICBcdFx0dGhpcy50cmFjZXJQcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKCB0aGlzLnZlcnRleF9zaGFkZXIsIHRoaXMuZnJhZ21lbnRfc2hhZGVyICk7XG4gICAgICAgIHRoaXMudHJhY2VyVmVydGV4QXR0cmlidXRlID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy50cmFjZXJQcm9ncmFtLCAndmVydGV4Jyk7XG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMudHJhY2VyVmVydGV4QXR0cmlidXRlKTtcblxuICAgICAgICB0aGlzLnRpbWVMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy50cmFjZXJQcm9ncmFtLCAndGltZScgKTtcbiAgICAgICAgdGhpcy5zYW1wbGVzTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMudHJhY2VyUHJvZ3JhbSwgJ3NhbXBsZXMnICk7XG4gICAgXHRcdHRoaXMucmVzb2x1dGlvbkxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICdyZXNvbHV0aW9uJyApO1xuICAgICAgICB0aGlzLnJlbmRlclNhbXBsZXNMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy5yZW5kZXJQcm9ncmFtLCAnc2FtcGxlcycgKTtcblxuICAgICAgICB0aGlzLmFuaW1hdGUoKTtcbiAgICB9LFxuICAgICgpID0+IHt9KTtcblxuICB9XG5cbiAgY3JlYXRlUHJvZ3JhbSh2ZXJ0ZXgsIGZyYWdtZW50KSB7XG4gICAgbGV0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cblx0XHRsZXQgdnMgPSB0aGlzLmNyZWF0ZVNoYWRlciggdmVydGV4LCBnbC5WRVJURVhfU0hBREVSICk7XG5cdFx0bGV0IGZzID0gdGhpcy5jcmVhdGVTaGFkZXIoIGZyYWdtZW50LCBnbC5GUkFHTUVOVF9TSEFERVIgKTtcblxuXHRcdGdsLmF0dGFjaFNoYWRlciggcHJvZ3JhbSwgdnMgKTtcblx0XHRnbC5hdHRhY2hTaGFkZXIoIHByb2dyYW0sIGZzICk7XG5cblx0XHRnbC5kZWxldGVTaGFkZXIoIHZzICk7XG5cdFx0Z2wuZGVsZXRlU2hhZGVyKCBmcyApO1xuXG5cdFx0Z2wubGlua1Byb2dyYW0oIHByb2dyYW0gKTtcblxuXHRcdGlmICggIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHByb2dyYW0sIGdsLkxJTktfU1RBVFVTICkgKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvZ3JhbTtcbiAgfVxuXG4gIGNyZWF0ZVNoYWRlcihzcmMsIHR5cGUpIHtcbiAgICBsZXQgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKCB0eXBlICk7XG5cblx0XHRnbC5zaGFkZXJTb3VyY2UoIHNoYWRlciwgc3JjICk7XG5cdFx0Z2wuY29tcGlsZVNoYWRlciggc2hhZGVyICk7XG5cblx0XHRpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlciggc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgLy8gcmVzaXplQ2FudmFzKGV2ZW50KSB7XG4gIC8vICAgaWYodGhpcy5jYW52YXMud2lkdGggIT0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggfHwgdGhpcy5jYW52YXMuaGVpZ2h0ICE9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCkge1xuXHQvLyBcdFx0dGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcblx0Ly8gXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgLy9cblx0Ly8gXHRcdHRoaXMucGFyYW1ldGVycy5zY3JlZW5XaWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuXHQvLyBcdFx0dGhpcy5wYXJhbWV0ZXJzLnNjcmVlbkhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgLy9cblx0Ly8gXHRcdGdsLnZpZXdwb3J0KCAwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0ICk7XG5cdC8vIFx0fVxuICAvLyB9XG5cbn1cbiIsImltcG9ydCB7IE9iamVjdDNkIH0gZnJvbSAnLi9PYmplY3QzZCc7XG5pbXBvcnQgeyBMb2FkT2JqZWN0cyB9IGZyb20gJy4vU2hhZGVyTG9hZGVyJztcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnLi9NYXRlcmlhbCc7XG5cbmV4cG9ydCBjbGFzcyBTY2VuZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMubWF0ZXJpYWxzID0gW107XG4gICAgdGhpcy5DcmVhdGVEZWZhdWx0U2NlbmUoKTtcbiAgfVxuXG4gIENyZWF0ZURlZmF1bHRTY2VuZSgpIHtcbiAgICBsZXQgcmVkX21hdGVyaWFsID0gbmV3IE1hdGVyaWFsKHZlYzMuZnJvbVZhbHVlcygxLDAsMCksIDApO1xuICAgIGxldCBncmVlbl9tYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCh2ZWMzLmZyb21WYWx1ZXMoMSwwLDApLCAwKTtcbiAgICBsZXQgYmx1ZV9tYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCh2ZWMzLmZyb21WYWx1ZXMoMSwwLDApLCAwKTtcbiAgICBsZXQgd2hpdGVfbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwodmVjMy5mcm9tVmFsdWVzKDEsMSwxKSwgMCk7XG4gICAgbGV0IGVtaXNzaW9uX21hdGVyaWFsID0gbmV3IE1hdGVyaWFsKHZlYzMuZnJvbVZhbHVlcygxLDEsMSksIDIpO1xuXG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaChyZWRfbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goZ3JlZW5fbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goYmx1ZV9tYXRlcmlhbCk7XG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaCh3aGl0ZV9tYXRlcmlhbCk7XG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaChlbWlzc2lvbl9tYXRlcmlhbCk7XG5cbiAgICBMb2FkT2JqZWN0cyhbXG4gICAgICB7ZmlsZU5hbWU6ICcuL2Rpc3QvbW9kZWxzL2xpZ2h0X3BsYW5lLnR4dCcsIG1hdGVyaWFsOiBlbWlzc2lvbl9tYXRlcmlhbCB9LFxuICAgICAge2ZpbGVOYW1lOiAnLi9kaXN0L21vZGVscy9mbG9vci50eHQnLCBtYXRlcmlhbDogd2hpdGVfbWF0ZXJpYWwgfSxcbiAgICAgIHtmaWxlTmFtZTogJy4vZGlzdC9tb2RlbHMvcmlnaHRfd2FsbC50eHQnLCBtYXRlcmlhbDogYmx1ZV9tYXRlcmlhbCB9LFxuICAgICAge2ZpbGVOYW1lOiAnLi9kaXN0L21vZGVscy9sZWZ0X3dhbGwudHh0JywgbWF0ZXJpYWw6IHJlZF9tYXRlcmlhbH0sXG4gICAgICB7ZmlsZU5hbWU6ICcuL2Rpc3QvbW9kZWxzL3Jvb2YudHh0JywgbWF0ZXJpYWw6IHdoaXRlX21hdGVyaWFsfSxcbiAgICBdLCAob2JqZWN0cykgPT4ge1xuICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIG9iamVjdHMpIHtcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgICgpID0+IHt9KTtcbiAgfVxuXG4gIEJ1aWxkU2NlbmVUZXh0dXJlcygpIHtcbiAgICBsZXQgdHJpYW5nbGVEYXRhID0gW107XG4gICAgZm9yIChsZXQgb2JqZWN0IG9mIHRoaXMub2JqZWN0cykge1xuICAgICAgZm9yIChsZXQgdHJpYW5nbGUgb2Ygb2JqZWN0LnRyaWFuZ2xlcykge1xuICAgICAgICAvLyB2MFxuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MFswXSk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYwWzFdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjBbMl0pO1xuXG4gICAgICAgIC8vIEVkZ2UgMVxuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MVswXSk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYxWzFdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjFbMl0pO1xuXG4gICAgICAgIC8vIEVkZ2UgMlxuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MlswXSk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYyWzFdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjJbMl0pO1xuXG4gICAgICAgIGxldCBtYXRlcmlhbF9pbmRleCA9IDA7XG4gICAgICAgIGZvciAobGV0IG1hdF9pZHggPSAwOyBtYXRfaWR4IDwgdGhpcy5tYXRlcmlhbHMubGVuZ3RoOyBtYXRfaWR4KyspIHtcbiAgICAgICAgICBpZiAodGhpcy5tYXRlcmlhbHNbbWF0X2lkeF0gPT09IG9iamVjdC5tYXRlcmlhbCkge1xuICAgICAgICAgICAgbWF0ZXJpYWxfaW5kZXggPSBtYXRfaWR4O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXh0cmEgZGF0YVxuICAgICAgICB0cmlhbmdsZURhdGEucHVzaChtYXRlcmlhbF9pbmRleCk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKDApO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCgwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyh0cmlhbmdsZURhdGEubGVuZ3RoKTtcblxuICAgIGxldCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheSgyMDQ4ICogMjA0OCAqIDMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICBkYXRhW2ldID0gMC4wO1xuICAgIH1cblxuICAgIGxldCB0cmlfY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYW5nbGVEYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAvL2lmIChpICUgMyA9PSAwKSB0cmlfY291bnQrKztcbiAgICAgIGRhdGFbaV0gPSB0cmlhbmdsZURhdGFbaV07XG4gICAgICAvL2NvbnNvbGUubG9nKHRyaWFuZ2xlRGF0YVtpXSArIFwiIFwiICsgdHJpX2NvdW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgT2JqZWN0M2QgfSBmcm9tICcuL09iamVjdDNkJztcblxuZnVuY3Rpb24gTG9hZFNoYWRlcihmaWxlTmFtZSwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gIGpRdWVyeS5nZXQoZmlsZU5hbWUsIChkYXRhKSA9PiB7XG4gICAgY2FsbGJhY2soZGF0YSwgaW5kZXgpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExvYWRTaGFkZXJzKGZpbGVOYW1lcywgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgbGV0IGxvYWRlZF9maWxlcyA9IDA7XG4gIGxldCBzaGFkZXJfZmlsZXMgPSBbXTtcbiAgZm9yIChsZXQgZmlsZV9pbmRleCA9IDA7IGZpbGVfaW5kZXggPCBmaWxlTmFtZXMubGVuZ3RoOyBmaWxlX2luZGV4KyspIHtcbiAgICAgIExvYWRTaGFkZXIoZmlsZU5hbWVzW2ZpbGVfaW5kZXhdLCBmaWxlX2luZGV4LCAoZGF0YSwgc2hhZGVyX2luZGV4KSA9PiB7XG4gICAgICAgIHNoYWRlcl9maWxlc1tzaGFkZXJfaW5kZXhdID0gZGF0YTtcblxuICAgICAgICBsb2FkZWRfZmlsZXMrKztcbiAgICAgICAgaWYgKGxvYWRlZF9maWxlcyA9PSBmaWxlTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IHRvdGFsX3NoYWRlcl9kYXRhID0gJyc7XG4gICAgICAgICAgZm9yIChsZXQgc2hhZGVyX2RhdGEgb2Ygc2hhZGVyX2ZpbGVzKSB7XG4gICAgICAgICAgICB0b3RhbF9zaGFkZXJfZGF0YSArPSBzaGFkZXJfZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FsbGJhY2sodG90YWxfc2hhZGVyX2RhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIExvYWRPYmplY3RzKGZpbGVOYW1lcywgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICBsZXQgbG9hZGVkX2ZpbGVzID0gMDtcbiAgICBsZXQgb2JqZWN0X2ZpbGVzID0gW107XG4gICAgZm9yIChsZXQgZmlsZV9pbmRleCA9IDA7IGZpbGVfaW5kZXggPCBmaWxlTmFtZXMubGVuZ3RoOyBmaWxlX2luZGV4KyspIHtcbiAgICAgICAgTG9hZFNoYWRlcihmaWxlTmFtZXNbZmlsZV9pbmRleF0uZmlsZU5hbWUsIGZpbGVfaW5kZXgsIChkYXRhLCBzaGFkZXJfaW5kZXgpID0+IHtcbiAgICAgICAgICBsZXQgb2JqZWN0ID0gT2JqZWN0M2QuTG9hZE9iaihkYXRhLCBmaWxlTmFtZXNbc2hhZGVyX2luZGV4XS5tYXRlcmlhbCk7XG4gICAgICAgICAgb2JqZWN0X2ZpbGVzW3NoYWRlcl9pbmRleF0gPSBvYmplY3Q7XG4gICAgICAgICAgbG9hZGVkX2ZpbGVzKys7XG4gICAgICAgICAgaWYgKGxvYWRlZF9maWxlcyA9PSBmaWxlTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3RfZmlsZXMpO1xuICAgICAgICAgICAgY2FsbGJhY2sob2JqZWN0X2ZpbGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuIl19
