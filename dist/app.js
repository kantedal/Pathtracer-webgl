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

var Material = exports.Material = (function () {
  function Material(material_type, color) {
    _classCallCheck(this, Material);

    this._material_type = material_type;
    this._color = color;
    this._emission_rate = 0;
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

var Object3d = exports.Object3d = (function () {
  function Object3d(triangles, material_index) {
    _classCallCheck(this, Object3d);

    this._triangles = triangles;
    this._material_index = material_index;
  }

  _createClass(Object3d, {
    triangles: {
      get: function get() {
        return this._triangles;
      }
    },
    material_index: {
      get: function get() {
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
    this.currentProgram;
    this.vertex_position;
    this.timeLocation;
    this.resolutionLocation;
    this.parameters = { start_time: new Date().getTime(), time: 0, screenWidth: 0, screenHeight: 0 };
    this.time = 0;

    this.vertexBuffer = null;
    this.frameBuffer = null;

    //Framebuffers
    this.rttFramebuffer = null;
    this.rttTexture = null;

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

      _this.render();
      requestAnimationFrame(_this.animate);
    };

    setTimeout(function () {
      _this.animate();
    }, 2000);
  }

  _createClass(Renderer, {
    allocateTexture: {
      value: function allocateTexture() {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //wtu.glErrorShouldBe(gl, gl.NO_ERROR, "texture parameter setup should succeed");
        return texture;
      }
    },
    addSceneTextures: {
      value: function addSceneTextures(triangleArray) {
        var texture = this.allocateTexture();
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

        // Create Vertex buffer (2 triangles)
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW);

        // Create Program
        this.currentProgram = this.createProgram(this.vertex_shader, this.fragment_shader);
        this.timeLocation = gl.getUniformLocation(this.currentProgram, "time");
        this.resolutionLocation = gl.getUniformLocation(this.currentProgram, "resolution");
      }
    },
    createProgram: {
      value: function createProgram(vertex, fragment) {
        var program = gl.createProgram();

        var vs = this.createShader(vertex, gl.VERTEX_SHADER);
        var fs = this.createShader("#ifdef GL_ES\nprecision highp float;\n#endif\n\n" + fragment, gl.FRAGMENT_SHADER);

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
    },
    initFramebuffer: {

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

      value: function initFramebuffer() {
        this.rttFramebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rttFramebuffer);
        this.rttFramebuffer.width = 1024;
        this.rttFramebuffer.height = 1024;

        this.rttTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.rttTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
      }
    },
    render: {
      value: function render() {
        if (!this.currentProgram) {
          return;
        }this.parameters.time = new Date().getTime() - this.parameters.start_time;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Load program into GPU
        gl.useProgram(this.currentProgram);

        // Set values to program variables
        gl.uniform1f(this.timeLocation, this.parameters.time / 1000);
        gl.uniform2f(this.resolutionLocation, this.parameters.screenWidth, this.parameters.screenHeight);

        // Render geometry
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(this.vertex_position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.vertex_position);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.disableVertexAttribArray(this.vertex_position);
      }
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

        Object3d.LoadObj("./dist/models/light_plane.txt", 5).then(function (object) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9PYmplY3QzZC5qcyIsIi9Vc2Vycy9maWxsZS9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvUmVuZGVyZXIuanMiLCIvVXNlcnMvZmlsbGUvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL1NjZW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkEsWUFBWSxDQUFDOztBQUViLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO0FBQUUsVUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUFFLE1BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FBRSxPQUFRLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUssV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxPQUFRLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFaGMsSUFBSSxlQUFl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Q0FBQyxFQUFFLENBQUM7YUFDdkI7V0FDRixTQUFTO0FBQ1IsZ0JBQUksaUJBQWlCLEVBQUU7QUFDckIsb0JBQU0sY0FBYyxDQUFDO2FBQ3RCO1dBQ0Y7U0FDRjs7QUFsRUwsZUFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRWpDLFlBQUksSUFBSSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0MsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDbEMsY0FBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUcsQ0FBQztTQUNqQjs7QUFFRCxZQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDbEIsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7O0FBRTVDLGNBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7O1NBRTNCOztBQUVELGVBQU8sSUFBSSxDQUFDO09BQ2I7S0FxRUU7R0FDRixDQUFDLENBQUM7O0FBRUgsU0FySVcsS0FBSyxDQUFBO0NBc0lqQixDQUFBLEVBQUcsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFJlbmRlcmVyID0gcmVxdWlyZShcIi4vUmVuZGVyZXJcIikuUmVuZGVyZXI7XG5cbnZhciBTY2VuZSA9IHJlcXVpcmUoXCIuL1NjZW5lXCIpLlNjZW5lO1xuXG5nbG9iYWwuYXBwID0gZnVuY3Rpb24gKCkge1xuICAvL2xldCBtYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCgxLCB2ZWMzLmZyb21WYWx1ZXMoMSwxLDEpKTtcblxuICB2YXIgc2NlbmUgPSBuZXcgU2NlbmUoKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKCk7XG4gICAgdmFyIHRyaV9kYXRhID0gc2NlbmUuQnVpbGRTY2VuZVRleHR1cmVzKCk7XG4gICAgcmVuZGVyZXIuYWRkU2NlbmVUZXh0dXJlcyh0cmlfZGF0YSk7XG4gIH0sIDEwMCk7XG59O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpOVZjMlZ5Y3k5bWFXeHNaUzlIYVhSb2RXSXZWMlZpUjB4ZlVHRjBhSFJ5WVdObGNpOXpjbU12WVhCd0xtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVN4WlFVRlpMRU5CUVVNN08wRkJSV0lzU1VGR1V5eFJRVUZSTEVkQlFVRXNUMEZCUVN4RFFVRlJMRmxCUVZrc1EwRkJRU3hEUVVFMVFpeFJRVUZSTEVOQlFVRTdPMEZCU1dwQ0xFbEJTRk1zUzBGQlN5eEhRVUZCTEU5QlFVRXNRMEZCVHl4VFFVRlRMRU5CUVVFc1EwRkJja0lzUzBGQlN5eERRVUZCT3p0QlFVVmtMRTFCUVUwc1EwRkJReXhIUVVGSExFZEJRVWNzV1VGQldUczdPMEZCU1haQ0xFMUJRVWtzUzBGQlN5eEhRVUZITEVsQlFVa3NTMEZCU3l4RlFVRkZMRU5CUVVNN1FVRkRlRUlzV1VGQlZTeERRVUZETEZsQlFVMDdRVUZEWWl4UlFVRkpMRkZCUVZFc1IwRkJSeXhKUVVGSkxGRkJRVkVzUlVGQlJTeERRVUZETzBGQlF6bENMRkZCUVVrc1VVRkJVU3hIUVVGSExFdEJRVXNzUTBGQlF5eHJRa0ZCYTBJc1JVRkJSU3hEUVVGRE8wRkJRekZETEZsQlFWRXNRMEZCUXl4blFrRkJaMElzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0SFFVTjJReXhGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzBOQlExUXNRMEZCUXlJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lhVzF3YjNKMElIc2dVbVZ1WkdWeVpYSWdmU0JtY205dElDY3VMMUpsYm1SbGNtVnlKenRjYm1sdGNHOXlkQ0I3SUZOalpXNWxmU0JtY205dElDY3VMMU5qWlc1bEp6dGNibHh1WjJ4dlltRnNMbUZ3Y0NBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0x5OXNaWFFnYldGMFpYSnBZV3dnUFNCdVpYY2dUV0YwWlhKcFlXd29NU3dnZG1Wak15NW1jbTl0Vm1Gc2RXVnpLREVzTVN3eEtTazdYRzVjYmx4dUlDQnNaWFFnYzJObGJtVWdQU0J1WlhjZ1UyTmxibVVvS1R0Y2JpQWdjMlYwVkdsdFpXOTFkQ2dvS1NBOVBpQjdYRzRnSUNBZ0lDQnNaWFFnY21WdVpHVnlaWElnUFNCdVpYY2dVbVZ1WkdWeVpYSW9LVHRjYmlBZ0lDQWdJR3hsZENCMGNtbGZaR0YwWVNBOUlITmpaVzVsTGtKMWFXeGtVMk5sYm1WVVpYaDBkWEpsY3lncE8xeHVJQ0FnSUNBZ2NtVnVaR1Z5WlhJdVlXUmtVMk5sYm1WVVpYaDBkWEpsY3loMGNtbGZaR0YwWVNrN1hHNGdJSDBzSURFd01DazdYRzU5TzF4dUlsMTkiLCJjbGFzcyBUcmlhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKHYwLCB2MSwgdjIpIHtcbiAgICB0aGlzLl92MCA9IHYwO1xuICAgIHRoaXMuX3YxID0gdjE7XG4gICAgdGhpcy5fdjIgPSB2MjtcblxuICAgIHRoaXMuX2VkZ2UxID0gdmVjMy5jcmVhdGUoKTtcbiAgICB2ZWMzLnN1YnRyYWN0KHRoaXMuX2VkZ2UxLCB2MCwgdjEpO1xuICAgIHRoaXMuX2VkZ2UyID0gdmVjMy5jcmVhdGUoKTtcbiAgICB2ZWMzLnN1YnRyYWN0KHRoaXMuX2VkZ2UyLCB2MCwgdjIpO1xuICB9XG5cbiAgZ2V0IHYwKCkgeyByZXR1cm4gdGhpcy5fdjA7IH1cbiAgZ2V0IHYxKCkgeyByZXR1cm4gdGhpcy5fdjE7IH1cbiAgZ2V0IHYyKCkgeyByZXR1cm4gdGhpcy5fdjI7IH1cbiAgZ2V0IGVkZ2UxKCkgeyByZXR1cm4gdGhpcy5fZWRnZTE7IH1cbiAgZ2V0IGVkZ2UyKCkgeyByZXR1cm4gdGhpcy5fZWRnZTI7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsIHtcbiAgY29uc3RydWN0b3IobWF0ZXJpYWxfdHlwZSwgY29sb3IpIHtcbiAgICB0aGlzLl9tYXRlcmlhbF90eXBlID0gbWF0ZXJpYWxfdHlwZTtcbiAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuX2VtaXNzaW9uX3JhdGUgPSAwO1xuICB9XG5cbiAgZ2V0IG1hdGVyaWFsX3R5cGUoKSB7IHJldHVybiB0aGlzLl9tYXRlcmlhbF90eXBlOyB9XG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIHRoaXMuX21hdGVyaWFsX3R5cGU7IH1cbiAgZ2V0IGVtaXNzaW9uX3JhdGUoKSB7IHJldHVybiB0aGlzLl9lbWlzc2lvbl9yYXRlOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBPYmplY3QzZCB7XG4gIGNvbnN0cnVjdG9yKHRyaWFuZ2xlcywgbWF0ZXJpYWxfaW5kZXgpIHtcbiAgICB0aGlzLl90cmlhbmdsZXMgPSB0cmlhbmdsZXM7XG4gICAgdGhpcy5fbWF0ZXJpYWxfaW5kZXggPSBtYXRlcmlhbF9pbmRleDtcbiAgfVxuXG4gIHN0YXRpYyBMb2FkT2JqKGZpbGVuYW1lLCBtYXRlcmlhbF9pbmRleCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgdmVydGljZXMgPSBbXTtcbiAgICAgIGxldCB0cmlhbmdsZXMgPSBbXTtcblxuICAgICAgalF1ZXJ5LmdldChmaWxlbmFtZSwgKGRhdGEpID0+IHtcbiAgICAgICAgbGV0IGxpbmVzID0gZGF0YS5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgICAgICBsZXQgY29tcG9uZW50cyA9IGxpbmUuc3BsaXQoJyAnKTtcblxuICAgICAgICAgIHN3aXRjaCAoY29tcG9uZW50c1swXSkge1xuICAgICAgICAgICAgLy8gVmVydGV4IGluZGljZXNcbiAgICAgICAgICAgIGNhc2UgJ2YnOlxuICAgICAgICAgICAgICB0cmlhbmdsZXMucHVzaChuZXcgVHJpYW5nbGUodmVydGljZXNbY29tcG9uZW50c1sxXSAtIDFdLCB2ZXJ0aWNlc1tjb21wb25lbnRzWzJdIC0gMV0sIHZlcnRpY2VzW2NvbXBvbmVudHNbM10gLSAxXSkpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gVmVydGV4IHBvc2l0aW9uc1xuICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVjMy5mcm9tVmFsdWVzKGNvbXBvbmVudHNbMV0sIGNvbXBvbmVudHNbMl0sIGNvbXBvbmVudHNbM10pKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZShuZXcgT2JqZWN0M2QodHJpYW5nbGVzLCBtYXRlcmlhbF9pbmRleCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgdHJpYW5nbGVzKCkgeyByZXR1cm4gdGhpcy5fdHJpYW5nbGVzOyB9XG4gIGdldCBtYXRlcmlhbF9pbmRleCgpIHsgcmV0dXJuIHRoaXMuX21hdGVyaWFsX2luZGV4OyB9XG59XG4iLCJ2YXIgZ2wgPSBudWxsO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgdGhpcy5idWZmZXI7XG4gICAgdGhpcy52ZXJ0ZXhfc2hhZGVyO1xuICAgIHRoaXMuZnJhZ21lbnRfc2hhZGVyO1xuICAgIHRoaXMuY3VycmVudFByb2dyYW07XG4gICAgdGhpcy52ZXJ0ZXhfcG9zaXRpb247XG4gICAgdGhpcy50aW1lTG9jYXRpb247XG4gICAgdGhpcy5yZXNvbHV0aW9uTG9jYXRpb247XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0geyBzdGFydF90aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSwgdGltZTogMCwgc2NyZWVuV2lkdGggOiAwLCBzY3JlZW5IZWlnaHQ6IDAgfTtcbiAgICB0aGlzLnRpbWUgPSAwLjA7XG5cbiAgICB0aGlzLnZlcnRleEJ1ZmZlciA9IG51bGw7XG4gICAgdGhpcy5mcmFtZUJ1ZmZlciA9IG51bGw7XG5cbiAgICAvL0ZyYW1lYnVmZmVyc1xuICAgIHRoaXMucnR0RnJhbWVidWZmZXIgPSBudWxsO1xuICAgIHRoaXMucnR0VGV4dHVyZSA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIC8vIE9CUyBPQlMgQnJvd3NlciBtdXN0IHN1cHBvcnQgT0VTIHRleHR1cmUgZmxvYXQgZXh0ZW5zaW9uISFcbiAgICBpZiAoZ2wuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRcIikpIHtcblxuICAgIH1cblxuICAgIHRoaXMuYW5pbWF0ZSA9ICh0aW1lKSA9PiB7XG4gICAgICAvL2NvbnNvbGUubG9nKHRpbWUpO1xuICAgICAgLy90aGlzLnJlc2l6ZUNhbnZhcygpO1xuICAgICAgdGhpcy5jYW52YXMud2lkdGggPSA1MTI7XG4gICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA1MTI7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuV2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICBcdHRoaXMucGFyYW1ldGVycy5zY3JlZW5IZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICBnbC52aWV3cG9ydCggMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCApO1xuXG5cdFx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB0aGlzLmFuaW1hdGUgKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYW5pbWF0ZSgpO1xuICAgIH0sIDIwMDApO1xuXG4gIH1cblxuICBhbGxvY2F0ZVRleHR1cmUoKSB7XG4gICAgICBsZXQgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAgIC8vd3R1LmdsRXJyb3JTaG91bGRCZShnbCwgZ2wuTk9fRVJST1IsIFwidGV4dHVyZSBwYXJhbWV0ZXIgc2V0dXAgc2hvdWxkIHN1Y2NlZWRcIik7XG4gICAgICByZXR1cm4gdGV4dHVyZTtcbiAgfVxuXG4gIGFkZFNjZW5lVGV4dHVyZXModHJpYW5nbGVBcnJheSkge1xuICAgIGxldCB0ZXh0dXJlID0gdGhpcy5hbGxvY2F0ZVRleHR1cmUoKTtcbiAgICBsZXQgd2lkdGggPSAyMDQ4O1xuICAgIGxldCBoZWlnaHQgPSAyMDQ4O1xuICAgIGxldCBmb3JtYXQgPSBnbC5SR0I7XG5cbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQiwgd2lkdGgsIGhlaWdodCwgMCwgZm9ybWF0LCBnbC5GTE9BVCwgdHJpYW5nbGVBcnJheSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMudmVydGV4X3NoYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2cycpLnRleHRDb250ZW50O1xuXHRcdHRoaXMuZnJhZ21lbnRfc2hhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZzJykudGV4dENvbnRlbnQ7XG5cdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcblxuXHRcdC8vIEluaXRpYWxpc2UgV2ViR0xcblx0XHR0cnkgeyBnbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoICdleHBlcmltZW50YWwtd2ViZ2wnICk7IH0gY2F0Y2goIGVycm9yICkgeyB9XG5cdFx0aWYgKCAhZ2wgKSB0aHJvdyBcImNhbm5vdCBjcmVhdGUgd2ViZ2wgY29udGV4dFwiO1xuXG5cdFx0Ly8gQ3JlYXRlIFZlcnRleCBidWZmZXIgKDIgdHJpYW5nbGVzKVxuXHRcdHRoaXMuYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG5cdFx0Z2wuYmluZEJ1ZmZlciggZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmJ1ZmZlciApO1xuXHRcdGdsLmJ1ZmZlckRhdGEoIGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSggWyAtMS4wLCAtMS4wLCAtMS4wLCAxLjAsIDEuMCwgLTEuMCwgMS4wLCAtIDEuMCwgMS4wLCAxLjAsIC0gMS4wLCAxLjAgXSApLCBnbC5TVEFUSUNfRFJBVyApO1xuXG5cblx0XHQvLyBDcmVhdGUgUHJvZ3JhbVxuXHRcdHRoaXMuY3VycmVudFByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oIHRoaXMudmVydGV4X3NoYWRlciwgdGhpcy5mcmFnbWVudF9zaGFkZXIgKTtcblx0XHR0aGlzLnRpbWVMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy5jdXJyZW50UHJvZ3JhbSwgJ3RpbWUnICk7XG5cdFx0dGhpcy5yZXNvbHV0aW9uTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMuY3VycmVudFByb2dyYW0sICdyZXNvbHV0aW9uJyApO1xuICB9XG5cbiAgY3JlYXRlUHJvZ3JhbSh2ZXJ0ZXgsIGZyYWdtZW50KSB7XG4gICAgbGV0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cblx0XHRsZXQgdnMgPSB0aGlzLmNyZWF0ZVNoYWRlciggdmVydGV4LCBnbC5WRVJURVhfU0hBREVSICk7XG5cdFx0bGV0IGZzID0gdGhpcy5jcmVhdGVTaGFkZXIoICcjaWZkZWYgR0xfRVNcXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuI2VuZGlmXFxuXFxuJyArIGZyYWdtZW50LCBnbC5GUkFHTUVOVF9TSEFERVIgKTtcblxuXHRcdGdsLmF0dGFjaFNoYWRlciggcHJvZ3JhbSwgdnMgKTtcblx0XHRnbC5hdHRhY2hTaGFkZXIoIHByb2dyYW0sIGZzICk7XG5cblx0XHRnbC5kZWxldGVTaGFkZXIoIHZzICk7XG5cdFx0Z2wuZGVsZXRlU2hhZGVyKCBmcyApO1xuXG5cdFx0Z2wubGlua1Byb2dyYW0oIHByb2dyYW0gKTtcblxuXHRcdGlmICggIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHByb2dyYW0sIGdsLkxJTktfU1RBVFVTICkgKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvZ3JhbTtcbiAgfVxuXG4gIGNyZWF0ZVNoYWRlcihzcmMsIHR5cGUpIHtcbiAgICBsZXQgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKCB0eXBlICk7XG5cblx0XHRnbC5zaGFkZXJTb3VyY2UoIHNoYWRlciwgc3JjICk7XG5cdFx0Z2wuY29tcGlsZVNoYWRlciggc2hhZGVyICk7XG5cblx0XHRpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlciggc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgLy8gcmVzaXplQ2FudmFzKGV2ZW50KSB7XG4gIC8vICAgaWYodGhpcy5jYW52YXMud2lkdGggIT0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggfHwgdGhpcy5jYW52YXMuaGVpZ2h0ICE9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCkge1xuXHQvLyBcdFx0dGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcblx0Ly8gXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgLy9cblx0Ly8gXHRcdHRoaXMucGFyYW1ldGVycy5zY3JlZW5XaWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuXHQvLyBcdFx0dGhpcy5wYXJhbWV0ZXJzLnNjcmVlbkhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgLy9cblx0Ly8gXHRcdGdsLnZpZXdwb3J0KCAwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0ICk7XG5cdC8vIFx0fVxuICAvLyB9XG5cbiAgaW5pdEZyYW1lYnVmZmVyKCkge1xuICAgIHRoaXMucnR0RnJhbWVidWZmZXIgPSBnbC5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5ydHRGcmFtZWJ1ZmZlcik7XG4gICAgdGhpcy5ydHRGcmFtZWJ1ZmZlci53aWR0aCA9IDEwMjQ7XG4gICAgdGhpcy5ydHRGcmFtZWJ1ZmZlci5oZWlnaHQgPSAxMDI0O1xuXG4gICAgdGhpcy5ydHRUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMucnR0VGV4dHVyZSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCk7XG4gICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRQcm9ncmFtKSByZXR1cm47XG5cblx0XHR0aGlzLnBhcmFtZXRlcnMudGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5wYXJhbWV0ZXJzLnN0YXJ0X3RpbWU7XG5cblx0XHRnbC5jbGVhciggZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQgKTtcblxuXHRcdC8vIExvYWQgcHJvZ3JhbSBpbnRvIEdQVVxuXHRcdGdsLnVzZVByb2dyYW0oIHRoaXMuY3VycmVudFByb2dyYW0gKTtcblxuXHRcdC8vIFNldCB2YWx1ZXMgdG8gcHJvZ3JhbSB2YXJpYWJsZXNcblx0XHRnbC51bmlmb3JtMWYoIHRoaXMudGltZUxvY2F0aW9uLCB0aGlzLnBhcmFtZXRlcnMudGltZSAvIDEwMDAgKTtcblx0XHRnbC51bmlmb3JtMmYoIHRoaXMucmVzb2x1dGlvbkxvY2F0aW9uLCB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuV2lkdGgsIHRoaXMucGFyYW1ldGVycy5zY3JlZW5IZWlnaHQgKTtcblxuXHRcdC8vIFJlbmRlciBnZW9tZXRyeVxuXHRcdGdsLmJpbmRCdWZmZXIoIGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5idWZmZXIgKTtcblx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCB0aGlzLnZlcnRleF9wb3NpdGlvbiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwICk7XG5cdFx0Z2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIHRoaXMudmVydGV4X3Bvc2l0aW9uICk7XG5cdFx0Z2wuZHJhd0FycmF5cyggZ2wuVFJJQU5HTEVTLCAwLCA2ICk7XG5cdFx0Z2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KCB0aGlzLnZlcnRleF9wb3NpdGlvbiApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBPYmplY3QzZCB9IGZyb20gJy4vT2JqZWN0M2QnXG5cbmV4cG9ydCBjbGFzcyBTY2VuZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuQ3JlYXRlRGVmYXVsdFNjZW5lKCk7XG4gIH1cblxuICBDcmVhdGVEZWZhdWx0U2NlbmUoKSB7XG4gICAgT2JqZWN0M2QuTG9hZE9iaignLi9kaXN0L21vZGVscy9saWdodF9wbGFuZS50eHQnLCA1KS50aGVuKChvYmplY3QpID0+IHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCkpO1xuICAgIE9iamVjdDNkLkxvYWRPYmooJy4vZGlzdC9tb2RlbHMvZmxvb3IudHh0JywgMykudGhlbigob2JqZWN0KSA9PiB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpKTtcbiAgICBPYmplY3QzZC5Mb2FkT2JqKCcuL2Rpc3QvbW9kZWxzL3JpZ2h0X3dhbGwudHh0JywgMCkudGhlbigob2JqZWN0KSA9PiB0aGlzLm9iamVjdHMucHVzaChvYmplY3QpKTtcbiAgICBPYmplY3QzZC5Mb2FkT2JqKCcuL2Rpc3QvbW9kZWxzL2xlZnRfd2FsbC50eHQnLCAyKS50aGVuKChvYmplY3QpID0+IHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCkpO1xuICAgIE9iamVjdDNkLkxvYWRPYmooJy4vZGlzdC9tb2RlbHMvcm9vZi50eHQnLCAzKS50aGVuKChvYmplY3QpID0+IHRoaXMub2JqZWN0cy5wdXNoKG9iamVjdCkpO1xuICB9XG5cbiAgQnVpbGRTY2VuZVRleHR1cmVzKCkge1xuICAgIGxldCB0cmlhbmdsZURhdGEgPSBbXTtcbiAgICBmb3IgKGxldCBvYmplY3Qgb2YgdGhpcy5vYmplY3RzKSB7XG4gICAgICBmb3IgKGxldCB0cmlhbmdsZSBvZiBvYmplY3QudHJpYW5nbGVzKSB7XG4gICAgICAgIC8vIHYwXG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYwWzBdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjBbMV0pO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MFsyXSk7XG5cbiAgICAgICAgLy8gRWRnZSAxXG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYxWzBdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjFbMV0pO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MVsyXSk7XG5cbiAgICAgICAgLy8gRWRnZSAyXG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYyWzBdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjJbMV0pO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MlsyXSk7XG5cbiAgICAgICAgLy8gRXh0cmEgZGF0YVxuICAgICAgICB0cmlhbmdsZURhdGEucHVzaChvYmplY3QubWF0ZXJpYWxfaW5kZXgpO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCgwKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2goMCk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJUcmlhbmdsZTogXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInYwOiBcIiArIHRyaWFuZ2xlLnYwWzBdICsgXCIgXCIgKyB0cmlhbmdsZS52MFsxXSArIFwiIFwiICsgdHJpYW5nbGUudjBbMl0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInYxOiBcIiArIHRyaWFuZ2xlLnYxWzBdICsgXCIgXCIgKyB0cmlhbmdsZS52MVsxXSArIFwiIFwiICsgdHJpYW5nbGUudjFbMl0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInYyOiBcIiArIHRyaWFuZ2xlLnYyWzBdICsgXCIgXCIgKyB0cmlhbmdsZS52MlsxXSArIFwiIFwiICsgdHJpYW5nbGUudjJbMl0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyh0cmlhbmdsZURhdGEubGVuZ3RoKTtcblxuICAgIGxldCBkYXRhID0gbmV3IEZsb2F0MzJBcnJheSgyMDQ4ICogMjA0OCAqIDMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICBkYXRhW2ldID0gMC4wO1xuICAgIH1cblxuICAgIGxldCB0cmlfY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYW5nbGVEYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAvL2lmIChpICUgMyA9PSAwKSB0cmlfY291bnQrKztcbiAgICAgIGRhdGFbaV0gPSB0cmlhbmdsZURhdGFbaV07XG4gICAgICAvL2NvbnNvbGUubG9nKHRyaWFuZ2xlRGF0YVtpXSArIFwiIFwiICsgdHJpX2NvdW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19
