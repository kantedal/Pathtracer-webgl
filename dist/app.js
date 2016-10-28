(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var Renderer = require("./Renderer").Renderer;

var Scene = require("./Scene").Scene;

global.app = function () {
  //let material = new Material(1, vec3.fromValues(1,1,1));

  var scene = new Scene();
  setTimeout(function () {
    var renderer = new Renderer();
    var tri_data = scene.BuildSceneTextures();
    renderer.addSceneTextures(tri_data);
  }, 100);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxsZS9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxZQUFZLENBQUM7O0FBRWIsSUFGUyxRQUFRLEdBQUEsT0FBQSxDQUFRLFlBQVksQ0FBQSxDQUE1QixRQUFRLENBQUE7O0FBSWpCLElBSFMsS0FBSyxHQUFBLE9BQUEsQ0FBTyxTQUFTLENBQUEsQ0FBckIsS0FBSyxDQUFBOztBQUVkLE1BQU0sQ0FBQyxHQUFHLEdBQUcsWUFBWTs7O0FBSXZCLE1BQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFDeEIsWUFBVSxDQUFDLFlBQU07QUFDYixRQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQzlCLFFBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzFDLFlBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUN2QyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ1QsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7IFNjZW5lfSBmcm9tICcuL1NjZW5lJztcblxuZ2xvYmFsLmFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgLy9sZXQgbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwoMSwgdmVjMy5mcm9tVmFsdWVzKDEsMSwxKSk7XG5cblxuICBsZXQgc2NlbmUgPSBuZXcgU2NlbmUoKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBsZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcbiAgICAgIGxldCB0cmlfZGF0YSA9IHNjZW5lLkJ1aWxkU2NlbmVUZXh0dXJlcygpO1xuICAgICAgcmVuZGVyZXIuYWRkU2NlbmVUZXh0dXJlcyh0cmlfZGF0YSk7XG4gIH0sIDEwMCk7XG59O1xuIl19
},{"./Renderer":3,"./Scene":4}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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
      get: function () {
        return this._v0;
      }
    },
    v1: {
      get: function () {
        return this._v1;
      }
    },
    v2: {
      get: function () {
        return this._v2;
      }
    },
    edge1: {
      get: function () {
        return this._edge1;
      }
    },
    edge2: {
      get: function () {
        return this._edge2;
      }
    }
  });

  return Triangle;
})();

var Material = exports.Material = (function () {
  function Material(material_type, color) {
    _classCallCheck(this, Material);

    this._material_type = material_type;
    this._color = color;
    this._emission_rate = 0;
  }

  _createClass(Material, {
    material_type: {
      get: function () {
        return this._material_type;
      }
    },
    color: {
      get: function () {
        return this._material_type;
      }
    },
    emission_rate: {
      get: function () {
        return this._emission_rate;
      }
    }
  });

  return Material;
})();

var Object3d = exports.Object3d = (function () {
  function Object3d(triangles, material_index) {
    _classCallCheck(this, Object3d);

    this._triangles = triangles;
    this._material_index = material_index;
  }

  _createClass(Object3d, {
    triangles: {
      get: function () {
        return this._triangles;
      }
    },
    material_index: {
      get: function () {
        return this._material_index;
      }
    }
  }, {
    LoadObj: {
      value: function LoadObj(filename, material_index) {
        return new Promise(function (resolve, reject) {
          var vertices = [];
          var triangles = [];

          jQuery.get(filename, function (data) {
            var lines = data.split("\n");
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

            resolve(new Object3d(triangles, material_index));
          });
        });
      }
    }
  });

  return Object3d;
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

    // OBS OBS Browser must support OES texture float extension!!
    if (gl.getExtension("OES_texture_float")) {}

    this.animate = function (time) {
      //console.log(time);
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

    setTimeout(function () {
      _this.animate();
    }, 2000);
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
        var width = 2048;
        var height = 2048;
        var format = gl.RGB;

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, format, gl.FLOAT, triangleArray);
      }
    },
    init: {
      value: function init() {

        this.vertex_shader = document.getElementById("vs").textContent;
        this.fragment_shader = document.getElementById("fs").textContent;
        this.canvas = document.querySelector("canvas");

        // Initialise WebGL
        try {
          gl = this.canvas.getContext("experimental-webgl");
        } catch (error) {}
        if (!gl) throw "cannot create webgl context";

        this.createRenderProgram();

        // Create Vertex buffer (2 triangles)
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW);

        // Create Program
        this.tracerProgram = this.createProgram(this.vertex_shader, this.fragment_shader);
        this.tracerVertexAttribute = gl.getAttribLocation(this.tracerProgram, "vertex");
        gl.enableVertexAttribArray(this.tracerVertexAttribute);

        this.timeLocation = gl.getUniformLocation(this.tracerProgram, "time");
        this.samplesLocation = gl.getUniformLocation(this.tracerProgram, "samples");
        this.resolutionLocation = gl.getUniformLocation(this.tracerProgram, "resolution");

        this.renderSamplesLocation = gl.getUniformLocation(this.renderProgram, "samples");
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

var Object3d = require("./Object3d").Object3d;

var Scene = exports.Scene = (function () {
  function Scene() {
    _classCallCheck(this, Scene);

    this.objects = [];
    this.CreateDefaultScene();
  }

  _createClass(Scene, {
    CreateDefaultScene: {
      value: function CreateDefaultScene() {
        var _this = this;

        Object3d.LoadObj("./dist/models/light_plane.txt", 6).then(function (object) {
          return _this.objects.push(object);
        });
        Object3d.LoadObj("./dist/models/floor.txt", 3).then(function (object) {
          return _this.objects.push(object);
        });
        Object3d.LoadObj("./dist/models/right_wall.txt", 0).then(function (object) {
          return _this.objects.push(object);
        });
        Object3d.LoadObj("./dist/models/left_wall.txt", 2).then(function (object) {
          return _this.objects.push(object);
        });
        Object3d.LoadObj("./dist/models/roof.txt", 3).then(function (object) {
          return _this.objects.push(object);
        });
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

},{"./Object3d":2}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9PYmplY3QzZC5qcyIsIi9Vc2Vycy9maWxsZS9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvUmVuZGVyZXIuanMiLCIvVXNlcnMvZmlsbGUvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL1NjZW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0lDbkJNLFFBQVE7QUFDRCxXQURQLFFBQVEsQ0FDQSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTswQkFEcEIsUUFBUTs7QUFFVixRQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2QsUUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O0FBRWQsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDNUIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNuQyxRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1QixRQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0dBQ3BDOztlQVZHLFFBQVE7QUFZUixNQUFFO1dBQUEsWUFBRztBQUFFLGVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztPQUFFOztBQUN6QixNQUFFO1dBQUEsWUFBRztBQUFF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QUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdDLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQ2xDLGNBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFHLENBQUM7U0FDakI7O0FBRUQsWUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFOztBQUU1QyxjQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDOztTQUUzQjs7QUFFRCxlQUFPLElBQUksQ0FBQztPQUNiO0tBcUVFO0dBQ0YsQ0FBQyxDQUFDOztBQUVILFNBcklXLEtBQUssQ0FBQTtDQXNJakIsQ0FBQSxFQUFHLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSZW5kZXJlciA9IHJlcXVpcmUoXCIuL1JlbmRlcmVyXCIpLlJlbmRlcmVyO1xuXG52YXIgU2NlbmUgPSByZXF1aXJlKFwiLi9TY2VuZVwiKS5TY2VuZTtcblxuZ2xvYmFsLmFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgLy9sZXQgbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwoMSwgdmVjMy5mcm9tVmFsdWVzKDEsMSwxKSk7XG5cbiAgdmFyIHNjZW5lID0gbmV3IFNjZW5lKCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHZhciByZW5kZXJlciA9IG5ldyBSZW5kZXJlcigpO1xuICAgIHZhciB0cmlfZGF0YSA9IHNjZW5lLkJ1aWxkU2NlbmVUZXh0dXJlcygpO1xuICAgIHJlbmRlcmVyLmFkZFNjZW5lVGV4dHVyZXModHJpX2RhdGEpO1xuICB9LCAxMDApO1xufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OW1hV3hzWlM5SGFYUm9kV0l2VjJWaVIweGZVR0YwYUhSeVlXTmxjaTl6Y21NdllYQndMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFTeFpRVUZaTEVOQlFVTTdPMEZCUldJc1NVRkdVeXhSUVVGUkxFZEJRVUVzVDBGQlFTeERRVUZSTEZsQlFWa3NRMEZCUVN4RFFVRTFRaXhSUVVGUkxFTkJRVUU3TzBGQlNXcENMRWxCU0ZNc1MwRkJTeXhIUVVGQkxFOUJRVUVzUTBGQlR5eFRRVUZUTEVOQlFVRXNRMEZCY2tJc1MwRkJTeXhEUVVGQk96dEJRVVZrTEUxQlFVMHNRMEZCUXl4SFFVRkhMRWRCUVVjc1dVRkJXVHM3TzBGQlNYWkNMRTFCUVVrc1MwRkJTeXhIUVVGSExFbEJRVWtzUzBGQlN5eEZRVUZGTEVOQlFVTTdRVUZEZUVJc1dVRkJWU3hEUVVGRExGbEJRVTA3UVVGRFlpeFJRVUZKTEZGQlFWRXNSMEZCUnl4SlFVRkpMRkZCUVZFc1JVRkJSU3hEUVVGRE8wRkJRemxDTEZGQlFVa3NVVUZCVVN4SFFVRkhMRXRCUVVzc1EwRkJReXhyUWtGQmEwSXNSVUZCUlN4RFFVRkRPMEZCUXpGRExGbEJRVkVzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dEhRVU4yUXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8wTkJRMVFzUTBGQlF5SXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpYVcxd2IzSjBJSHNnVW1WdVpHVnlaWElnZlNCbWNtOXRJQ2N1TDFKbGJtUmxjbVZ5Snp0Y2JtbHRjRzl5ZENCN0lGTmpaVzVsZlNCbWNtOXRJQ2N1TDFOalpXNWxKenRjYmx4dVoyeHZZbUZzTG1Gd2NDQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdMeTlzWlhRZ2JXRjBaWEpwWVd3Z1BTQnVaWGNnVFdGMFpYSnBZV3dvTVN3Z2RtVmpNeTVtY205dFZtRnNkV1Z6S0RFc01Td3hLU2s3WEc1Y2JseHVJQ0JzWlhRZ2MyTmxibVVnUFNCdVpYY2dVMk5sYm1Vb0tUdGNiaUFnYzJWMFZHbHRaVzkxZENnb0tTQTlQaUI3WEc0Z0lDQWdJQ0JzWlhRZ2NtVnVaR1Z5WlhJZ1BTQnVaWGNnVW1WdVpHVnlaWElvS1R0Y2JpQWdJQ0FnSUd4bGRDQjBjbWxmWkdGMFlTQTlJSE5qWlc1bExrSjFhV3hrVTJObGJtVlVaWGgwZFhKbGN5Z3BPMXh1SUNBZ0lDQWdjbVZ1WkdWeVpYSXVZV1JrVTJObGJtVlVaWGgwZFhKbGN5aDBjbWxmWkdGMFlTazdYRzRnSUgwc0lERXdNQ2s3WEc1OU8xeHVJbDE5IiwiY2xhc3MgVHJpYW5nbGUge1xuICBjb25zdHJ1Y3Rvcih2MCwgdjEsIHYyKSB7XG4gICAgdGhpcy5fdjAgPSB2MDtcbiAgICB0aGlzLl92MSA9IHYxO1xuICAgIHRoaXMuX3YyID0gdjI7XG5cbiAgICB0aGlzLl9lZGdlMSA9IHZlYzMuY3JlYXRlKCk7XG4gICAgdmVjMy5zdWJ0cmFjdCh0aGlzLl9lZGdlMSwgdjAsIHYxKTtcbiAgICB0aGlzLl9lZGdlMiA9IHZlYzMuY3JlYXRlKCk7XG4gICAgdmVjMy5zdWJ0cmFjdCh0aGlzLl9lZGdlMiwgdjAsIHYyKTtcbiAgfVxuXG4gIGdldCB2MCgpIHsgcmV0dXJuIHRoaXMuX3YwOyB9XG4gIGdldCB2MSgpIHsgcmV0dXJuIHRoaXMuX3YxOyB9XG4gIGdldCB2MigpIHsgcmV0dXJuIHRoaXMuX3YyOyB9XG4gIGdldCBlZGdlMSgpIHsgcmV0dXJuIHRoaXMuX2VkZ2UxOyB9XG4gIGdldCBlZGdlMigpIHsgcmV0dXJuIHRoaXMuX2VkZ2UyOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XG4gIGNvbnN0cnVjdG9yKG1hdGVyaWFsX3R5cGUsIGNvbG9yKSB7XG4gICAgdGhpcy5fbWF0ZXJpYWxfdHlwZSA9IG1hdGVyaWFsX3R5cGU7XG4gICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLl9lbWlzc2lvbl9yYXRlID0gMDtcbiAgfVxuXG4gIGdldCBtYXRlcmlhbF90eXBlKCkgeyByZXR1cm4gdGhpcy5fbWF0ZXJpYWxfdHlwZTsgfVxuICBnZXQgY29sb3IoKSB7IHJldHVybiB0aGlzLl9tYXRlcmlhbF90eXBlOyB9XG4gIGdldCBlbWlzc2lvbl9yYXRlKCkgeyByZXR1cm4gdGhpcy5fZW1pc3Npb25fcmF0ZTsgfVxufVxuXG5leHBvcnQgY2xhc3MgT2JqZWN0M2Qge1xuICBjb25zdHJ1Y3Rvcih0cmlhbmdsZXMsIG1hdGVyaWFsX2luZGV4KSB7XG4gICAgdGhpcy5fdHJpYW5nbGVzID0gdHJpYW5nbGVzO1xuICAgIHRoaXMuX21hdGVyaWFsX2luZGV4ID0gbWF0ZXJpYWxfaW5kZXg7XG4gIH1cblxuICBzdGF0aWMgTG9hZE9iaihmaWxlbmFtZSwgbWF0ZXJpYWxfaW5kZXgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHZlcnRpY2VzID0gW107XG4gICAgICBsZXQgdHJpYW5nbGVzID0gW107XG5cbiAgICAgIGpRdWVyeS5nZXQoZmlsZW5hbWUsIChkYXRhKSA9PiB7XG4gICAgICAgIGxldCBsaW5lcyA9IGRhdGEuc3BsaXQoJ1xcbicpO1xuICAgICAgICBmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBsaW5lLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgICBzd2l0Y2ggKGNvbXBvbmVudHNbMF0pIHtcbiAgICAgICAgICAgIC8vIFZlcnRleCBpbmRpY2VzXG4gICAgICAgICAgICBjYXNlICdmJzpcbiAgICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2gobmV3IFRyaWFuZ2xlKHZlcnRpY2VzW2NvbXBvbmVudHNbMV0gLSAxXSwgdmVydGljZXNbY29tcG9uZW50c1syXSAtIDFdLCB2ZXJ0aWNlc1tjb21wb25lbnRzWzNdIC0gMV0pKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIFZlcnRleCBwb3NpdGlvbnNcbiAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlYzMuZnJvbVZhbHVlcyhjb21wb25lbnRzWzFdLCBjb21wb25lbnRzWzJdLCBjb21wb25lbnRzWzNdKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlc29sdmUobmV3IE9iamVjdDNkKHRyaWFuZ2xlcywgbWF0ZXJpYWxfaW5kZXgpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHRyaWFuZ2xlcygpIHsgcmV0dXJuIHRoaXMuX3RyaWFuZ2xlczsgfVxuICBnZXQgbWF0ZXJpYWxfaW5kZXgoKSB7IHJldHVybiB0aGlzLl9tYXRlcmlhbF9pbmRleDsgfVxufVxuIiwidmFyIGdsID0gbnVsbDtcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jYW52YXMgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyO1xuICAgIHRoaXMudmVydGV4X3NoYWRlcjtcbiAgICB0aGlzLmZyYWdtZW50X3NoYWRlcjtcbiAgICAvL3RoaXMudHJhY2VyUHJvZ3JhbTtcbiAgICB0aGlzLnJlbmRlclByb2dyYW07XG4gICAgdGhpcy52ZXJ0ZXhfcG9zaXRpb247XG4gICAgdGhpcy50aW1lTG9jYXRpb247XG4gICAgdGhpcy5yZXNvbHV0aW9uTG9jYXRpb247XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0geyBzdGFydF90aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSwgdGltZTogMCwgc2NyZWVuV2lkdGggOiAwLCBzY3JlZW5IZWlnaHQ6IDAsIHNhbXBsZXM6IDAgfTtcblxuICAgIHRoaXMuc2FtcGxlc0xvY2F0aW9uO1xuICAgIHRoaXMucmVuZGVyU2FtcGxlc0xvY2F0aW9uO1xuXG4gICAgdGhpcy52ZXJ0ZXhCdWZmZXIgPSBudWxsO1xuICAgIHRoaXMuZnJhbWVCdWZmZXIgPSBudWxsO1xuICAgIHRoaXMuZmIgPSBudWxsO1xuICAgIHRoaXMudGV4dHVyZXMgPSBbXTtcbiAgICB0aGlzLnRyYWNlclByb2dyYW0gPSBudWxsO1xuICAgIHRoaXMucmVuZGVyVmVydGV4QXR0cmlidXRlID0gbnVsbDtcblxuICAgIHRoaXMudHJpYW5nbGVUZXh0dXJlID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgLy8gT0JTIE9CUyBCcm93c2VyIG11c3Qgc3VwcG9ydCBPRVMgdGV4dHVyZSBmbG9hdCBleHRlbnNpb24hIVxuICAgIGlmIChnbC5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdFwiKSkge1xuXG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRlID0gKHRpbWUpID0+IHtcbiAgICAgIC8vY29uc29sZS5sb2codGltZSk7XG4gICAgICAvL3RoaXMucmVzaXplQ2FudmFzKCk7XG4gICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDUxMjtcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDUxMjtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zY3JlZW5XaWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgIFx0dGhpcy5wYXJhbWV0ZXJzLnNjcmVlbkhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgIGdsLnZpZXdwb3J0KCAwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0ICk7XG5cblxuICAgICAgLy8gcmVuZGVyIHRvIHRleHR1cmVcbiAgICAgIGdsLnVzZVByb2dyYW0odGhpcy50cmFjZXJQcm9ncmFtKTtcblxuICAgICAgdmFyIGxvY2F0aW9uMSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sIFwidV9idWZmZXJfdGV4dHVyZVwiKTtcbiAgICAgIHZhciBsb2NhdGlvbjIgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy50cmFjZXJQcm9ncmFtLCBcInVfdHJpYW5nbGVfdGV4dHVyZVwiKTtcblxuICAgICAgZ2wudW5pZm9ybTFpKGxvY2F0aW9uMSwgMCk7XG4gICAgICBnbC51bmlmb3JtMWkobG9jYXRpb24yLCAxKTtcblxuICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmVzWzBdKTtcbiAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTEpO1xuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50cmlhbmdsZVRleHR1cmUpO1xuXG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXIpO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLmZiKTtcbiAgICAgIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKGdsLkZSQU1FQlVGRkVSLCBnbC5DT0xPUl9BVFRBQ0hNRU5UMCwgZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlc1sxXSwgMCk7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMudHJhY2VyVmVydGV4QXR0cmlidXRlLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRV9TVFJJUCwgMCwgNCk7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xuXG4gICAgICB0aGlzLnBhcmFtZXRlcnMudGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5wYXJhbWV0ZXJzLnN0YXJ0X3RpbWU7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2FtcGxlcyArPSAxO1xuXG4gICAgICBnbC51bmlmb3JtMWYoIHRoaXMudGltZUxvY2F0aW9uLCB0aGlzLnBhcmFtZXRlcnMudGltZSAvIDEwMDAgKTtcbiAgICAgIGdsLnVuaWZvcm0xZiggdGhpcy5zYW1wbGVzTG9jYXRpb24sICB0aGlzLnBhcmFtZXRlcnMuc2FtcGxlcyApO1xuICAgICAgZ2wudW5pZm9ybTJmKCB0aGlzLnJlc29sdXRpb25Mb2NhdGlvbiwgdGhpcy5wYXJhbWV0ZXJzLnNjcmVlbldpZHRoLCB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSGVpZ2h0ICk7XG5cbiAgICAgIHRoaXMudGV4dHVyZXMucmV2ZXJzZSgpO1xuXG4gICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLnNhbXBsZXMgJSA1MCA9PSAwKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcmFtZXRlcnMuc2FtcGxlcyk7XG5cbiAgICAgIGdsLnVzZVByb2dyYW0odGhpcy5yZW5kZXJQcm9ncmFtKTtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZXNbMF0pO1xuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydGV4QnVmZmVyKTtcbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5yZW5kZXJWZXJ0ZXhBdHRyaWJ1dGUsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgICAgIGdsLnVuaWZvcm0xZiggdGhpcy5yZW5kZXJTYW1wbGVzTG9jYXRpb24sICB0aGlzLnBhcmFtZXRlcnMuc2FtcGxlcyApO1xuXG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMuYW5pbWF0ZSApO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRlKCk7XG4gICAgfSwgMjAwMCk7XG5cbiAgfVxuXG4gIGNyZWF0ZVJlbmRlclByb2dyYW0oKSB7XG4gICAgY29uc29sZS5sb2coXCJDcmVhdGUgcmVuZGVyIHByb2dyYW1cIik7XG5cbiAgICBsZXQgdmVydGljZXMgPSBbLTEsIC0xLCAtMSwgMSwgMSwgLTEsIDEsIDFdO1xuICAgIHRoaXMudmVydGV4QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydGV4QnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh2ZXJ0aWNlcyksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIC8vdGhpcy5mcmFtZUJ1ZmZlciA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG4gICAgdGhpcy5mYiA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG5cbiAgICBsZXQgdHlwZSA9IGdsLmdldEV4dGVuc2lvbignT0VTX3RleHR1cmVfZmxvYXQnKSA/IGdsLkZMT0FUIDogZ2wuVU5TSUdORURfQllURTtcbiAgICB0aGlzLnRleHR1cmVzID0gW107XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgICAgdGhpcy50ZXh0dXJlcy5wdXNoKGdsLmNyZWF0ZVRleHR1cmUoKSk7XG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmVzW2ldKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCLCA1MTIsIDUxMiwgMCwgZ2wuUkdCLCB0eXBlLCBudWxsKTtcbiAgICB9XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG5cbiAgICAvLyBjcmVhdGUgcmVuZGVyIHNoYWRlclxuICAgIGxldCByZW5kZXJfdmVydGV4X3NoYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2c19yZW5kZXInKS50ZXh0Q29udGVudDtcbiAgICBsZXQgcmVuZGVyX2ZyYWdtZW50X3NoYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmc19yZW5kZXInKS50ZXh0Q29udGVudDtcbiAgICB0aGlzLnJlbmRlclByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0ocmVuZGVyX3ZlcnRleF9zaGFkZXIsIHJlbmRlcl9mcmFnbWVudF9zaGFkZXIpO1xuICAgIHRoaXMucmVuZGVyVmVydGV4QXR0cmlidXRlID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5yZW5kZXJQcm9ncmFtLCAndmVydGV4Jyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5yZW5kZXJWZXJ0ZXhBdHRyaWJ1dGUpO1xuICB9XG5cbiAgYWxsb2NhdGVUZXh0dXJlKCkge1xuICAgICAgdGhpcy50cmlhbmdsZVRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRyaWFuZ2xlVGV4dHVyZSk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgICAgLy93dHUuZ2xFcnJvclNob3VsZEJlKGdsLCBnbC5OT19FUlJPUiwgXCJ0ZXh0dXJlIHBhcmFtZXRlciBzZXR1cCBzaG91bGQgc3VjY2VlZFwiKTtcbiAgfVxuXG4gIGFkZFNjZW5lVGV4dHVyZXModHJpYW5nbGVBcnJheSkge1xuICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlIHRyaWFuZ2xlIHRleHR1cmVcIik7XG5cbiAgICB0aGlzLmFsbG9jYXRlVGV4dHVyZSgpO1xuICAgIGxldCB3aWR0aCA9IDIwNDg7XG4gICAgbGV0IGhlaWdodCA9IDIwNDg7XG4gICAgbGV0IGZvcm1hdCA9IGdsLlJHQjtcblxuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCLCB3aWR0aCwgaGVpZ2h0LCAwLCBmb3JtYXQsIGdsLkZMT0FULCB0cmlhbmdsZUFycmF5KTtcbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgICB0aGlzLnZlcnRleF9zaGFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndnMnKS50ZXh0Q29udGVudDtcblx0XHR0aGlzLmZyYWdtZW50X3NoYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcycpLnRleHRDb250ZW50O1xuXHRcdHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG5cblx0XHQvLyBJbml0aWFsaXNlIFdlYkdMXG5cdFx0dHJ5IHsgZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCAnZXhwZXJpbWVudGFsLXdlYmdsJyApOyB9IGNhdGNoKCBlcnJvciApIHsgfVxuXHRcdGlmICggIWdsICkgdGhyb3cgXCJjYW5ub3QgY3JlYXRlIHdlYmdsIGNvbnRleHRcIjtcblxuICAgIHRoaXMuY3JlYXRlUmVuZGVyUHJvZ3JhbSgpO1xuXG5cdFx0Ly8gQ3JlYXRlIFZlcnRleCBidWZmZXIgKDIgdHJpYW5nbGVzKVxuXHRcdHRoaXMuYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG5cdFx0Z2wuYmluZEJ1ZmZlciggZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmJ1ZmZlciApO1xuXHRcdGdsLmJ1ZmZlckRhdGEoIGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSggWyAtMS4wLCAtMS4wLCAtMS4wLCAxLjAsIDEuMCwgLTEuMCwgMS4wLCAtIDEuMCwgMS4wLCAxLjAsIC0gMS4wLCAxLjAgXSApLCBnbC5TVEFUSUNfRFJBVyApO1xuXG5cdFx0Ly8gQ3JlYXRlIFByb2dyYW1cblx0XHR0aGlzLnRyYWNlclByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oIHRoaXMudmVydGV4X3NoYWRlciwgdGhpcy5mcmFnbWVudF9zaGFkZXIgKTtcbiAgICB0aGlzLnRyYWNlclZlcnRleEF0dHJpYnV0ZSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMudHJhY2VyUHJvZ3JhbSwgJ3ZlcnRleCcpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMudHJhY2VyVmVydGV4QXR0cmlidXRlKTtcblxuICAgIHRoaXMudGltZUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICd0aW1lJyApO1xuICAgIHRoaXMuc2FtcGxlc0xvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICdzYW1wbGVzJyApO1xuXHRcdHRoaXMucmVzb2x1dGlvbkxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICdyZXNvbHV0aW9uJyApO1xuXG4gICAgdGhpcy5yZW5kZXJTYW1wbGVzTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMucmVuZGVyUHJvZ3JhbSwgJ3NhbXBsZXMnICk7XG4gIH1cblxuICBjcmVhdGVQcm9ncmFtKHZlcnRleCwgZnJhZ21lbnQpIHtcbiAgICBsZXQgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcblxuXHRcdGxldCB2cyA9IHRoaXMuY3JlYXRlU2hhZGVyKCB2ZXJ0ZXgsIGdsLlZFUlRFWF9TSEFERVIgKTtcblx0XHRsZXQgZnMgPSB0aGlzLmNyZWF0ZVNoYWRlciggZnJhZ21lbnQsIGdsLkZSQUdNRU5UX1NIQURFUiApO1xuXG5cdFx0Z2wuYXR0YWNoU2hhZGVyKCBwcm9ncmFtLCB2cyApO1xuXHRcdGdsLmF0dGFjaFNoYWRlciggcHJvZ3JhbSwgZnMgKTtcblxuXHRcdGdsLmRlbGV0ZVNoYWRlciggdnMgKTtcblx0XHRnbC5kZWxldGVTaGFkZXIoIGZzICk7XG5cblx0XHRnbC5saW5rUHJvZ3JhbSggcHJvZ3JhbSApO1xuXG5cdFx0aWYgKCAhZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggcHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMgKSApIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiBwcm9ncmFtO1xuICB9XG5cbiAgY3JlYXRlU2hhZGVyKHNyYywgdHlwZSkge1xuICAgIGxldCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoIHR5cGUgKTtcblxuXHRcdGdsLnNoYWRlclNvdXJjZSggc2hhZGVyLCBzcmMgKTtcblx0XHRnbC5jb21waWxlU2hhZGVyKCBzaGFkZXIgKTtcblxuXHRcdGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKCBzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiBzaGFkZXI7XG4gIH1cblxuICAvLyByZXNpemVDYW52YXMoZXZlbnQpIHtcbiAgLy8gICBpZih0aGlzLmNhbnZhcy53aWR0aCAhPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCB8fCB0aGlzLmNhbnZhcy5oZWlnaHQgIT0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KSB7XG5cdC8vIFx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xuXHQvLyBcdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAvL1xuXHQvLyBcdFx0dGhpcy5wYXJhbWV0ZXJzLnNjcmVlbldpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XG5cdC8vIFx0XHR0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAvL1xuXHQvLyBcdFx0Z2wudmlld3BvcnQoIDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQgKTtcblx0Ly8gXHR9XG4gIC8vIH1cblxufVxuIiwiaW1wb3J0IHsgT2JqZWN0M2QgfSBmcm9tICcuL09iamVjdDNkJ1xuXG5leHBvcnQgY2xhc3MgU2NlbmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9iamVjdHMgPSBbXTtcbiAgICB0aGlzLkNyZWF0ZURlZmF1bHRTY2VuZSgpO1xuICB9XG5cbiAgQ3JlYXRlRGVmYXVsdFNjZW5lKCkge1xuICAgIE9iamVjdDNkLkxvYWRPYmooJy4vZGlzdC9tb2RlbHMvbGlnaHRfcGxhbmUudHh0JywgNikudGhlbigob2JqZWN0KSA9PiB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpKTtcbiAgICBPYmplY3QzZC5Mb2FkT2JqKCcuL2Rpc3QvbW9kZWxzL2Zsb29yLnR4dCcsIDMpLnRoZW4oKG9iamVjdCkgPT4gdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KSk7XG4gICAgT2JqZWN0M2QuTG9hZE9iaignLi9kaXN0L21vZGVscy9yaWdodF93YWxsLnR4dCcsIDApLnRoZW4oKG9iamVjdCkgPT4gdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KSk7XG4gICAgT2JqZWN0M2QuTG9hZE9iaignLi9kaXN0L21vZGVscy9sZWZ0X3dhbGwudHh0JywgMikudGhlbigob2JqZWN0KSA9PiB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpKTtcbiAgICBPYmplY3QzZC5Mb2FkT2JqKCcuL2Rpc3QvbW9kZWxzL3Jvb2YudHh0JywgMykudGhlbigob2JqZWN0KSA9PiB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpKTtcbiAgfVxuXG4gIEJ1aWxkU2NlbmVUZXh0dXJlcygpIHtcbiAgICBsZXQgdHJpYW5nbGVEYXRhID0gW107XG4gICAgZm9yIChsZXQgb2JqZWN0IG9mIHRoaXMub2JqZWN0cykge1xuICAgICAgZm9yIChsZXQgdHJpYW5nbGUgb2Ygb2JqZWN0LnRyaWFuZ2xlcykge1xuICAgICAgICAvLyB2MFxuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MFswXSk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYwWzFdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjBbMl0pO1xuXG4gICAgICAgIC8vIEVkZ2UgMVxuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MVswXSk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYxWzFdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjFbMl0pO1xuXG4gICAgICAgIC8vIEVkZ2UgMlxuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MlswXSk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYyWzFdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjJbMl0pO1xuXG4gICAgICAgIC8vIEV4dHJhIGRhdGFcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2gob2JqZWN0Lm1hdGVyaWFsX2luZGV4KTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2goMCk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKDApO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVHJpYW5nbGU6IFwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2MDogXCIgKyB0cmlhbmdsZS52MFswXSArIFwiIFwiICsgdHJpYW5nbGUudjBbMV0gKyBcIiBcIiArIHRyaWFuZ2xlLnYwWzJdKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2MTogXCIgKyB0cmlhbmdsZS52MVswXSArIFwiIFwiICsgdHJpYW5nbGUudjFbMV0gKyBcIiBcIiArIHRyaWFuZ2xlLnYxWzJdKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ2MjogXCIgKyB0cmlhbmdsZS52MlswXSArIFwiIFwiICsgdHJpYW5nbGUudjJbMV0gKyBcIiBcIiArIHRyaWFuZ2xlLnYyWzJdKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2codHJpYW5nbGVEYXRhLmxlbmd0aCk7XG5cbiAgICBsZXQgZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoMjA0OCAqIDIwNDggKiAzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZGF0YVtpXSA9IDAuMDtcbiAgICB9XG5cbiAgICBsZXQgdHJpX2NvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFuZ2xlRGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgLy9pZiAoaSAlIDMgPT0gMCkgdHJpX2NvdW50Kys7XG4gICAgICBkYXRhW2ldID0gdHJpYW5nbGVEYXRhW2ldO1xuICAgICAgLy9jb25zb2xlLmxvZyh0cmlhbmdsZURhdGFbaV0gKyBcIiBcIiArIHRyaV9jb3VudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiJdfQ==
