(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var Pathtracer = require("./Pathtracer").Pathtracer;

global.app = function () {
  //let material = new Material(1, vec3.fromValues(1,1,1));
  var pathtracer = new Pathtracer();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxsZS9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxZQUFZLENBQUM7O0FBRWIsSUFGUyxVQUFVLEdBQUEsT0FBQSxDQUFRLGNBQWMsQ0FBQSxDQUFoQyxVQUFVLENBQUE7O0FBRW5CLE1BQU0sQ0FBQyxHQUFHLEdBQUcsWUFBWTs7QUFFdkIsTUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztDQUNuQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYXRodHJhY2VyIH0gZnJvbSAnLi9QYXRodHJhY2VyJztcblxuZ2xvYmFsLmFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgLy9sZXQgbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwoMSwgdmVjMy5mcm9tVmFsdWVzKDEsMSwxKSk7XG4gIGxldCBwYXRodHJhY2VyID0gbmV3IFBhdGh0cmFjZXIoKTtcbn07XG4iXX0=
},{"./Pathtracer":6}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Camera = exports.Camera = (function () {
  function Camera(position, direction) {
    _classCallCheck(this, Camera);

    this._position = position;
    this._look_at = vec3.fromValues(5, 0, 0);
    this._direction = vec3.fromValues(0, 0, 0);
    this._hasChanged = false;
    this.update();
  }

  _createClass(Camera, {
    update: {
      value: function update() {
        var distance = vec3.distance(this._look_at, this._position);

        vec3.subtract(this._direction, this._look_at, this._position);
        vec3.normalize(this._direction, this._direction);

        var up_vector = vec3.fromValues(0, 0, 1);
        this._camera_right = vec3.fromValues(0, 0, 0);
        this._camera_up = vec3.fromValues(0, 0, 0);
        vec3.cross(this._camera_right, this._direction, up_vector);
        vec3.cross(this._camera_up, this._camera_right, this._direction);

        this._position = vec3.fromValues(this._look_at[0], this._look_at[1], this._look_at[2]);
        var negative_direction = vec3.fromValues(0, 0, 0);
        vec3.scale(negative_direction, this._direction, -distance);
        vec3.add(this._position, this._position, negative_direction);
      }
    },
    camera_up: {
      get: function () {
        return this._camera_up;
      }
    },
    camera_right: {
      get: function () {
        return this._camera_right;
      }
    },
    look_at: {
      get: function () {
        return this._look_at;
      },
      set: function (look_at) {
        this._look_at = look_at;
      }
    },
    position: {
      get: function () {
        return this._position;
      },
      set: function (new_position) {
        this._position = new_position;
      }
    },
    direction: {
      get: function () {
        return this._direction;
      }
    },
    hasChanged: {
      get: function () {
        return this._hasChanged;
      },
      set: function (changed) {
        this._hasChanged = changed;
      }
    }
  });

  return Camera;
})();

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MATERIAL_TYPES = {
  lambertian: 0,
  specular: 1,
  emission: 2,
  transmission: 3,
  oren_nayar: 4
};

exports.MATERIAL_TYPES = MATERIAL_TYPES;

var Material = exports.Material = (function () {
  function Material(color, material_type) {
    _classCallCheck(this, Material);

    this._material_type = material_type;
    this._color = color;
    this._emission_rate = material_type == 2 ? 10 : 0;
  }

  _createClass(Material, {
    material_type: {
      get: function () {
        return this._material_type;
      }
    },
    color: {
      get: function () {
        return this._color;
      }
    },
    emission_rate: {
      get: function () {
        return this._emission_rate;
      },
      set: function (rate) {
        this._emission_rate = rate;
      }
    }
  });

  return Material;
})();

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Navigator = exports.Navigator = (function () {
  function Navigator(camera) {
    _classCallCheck(this, Navigator);

    this.render_canvas = $("#render-canvas");
    this.camera = camera;

    this.setupCameraMove();
    this.setupCameraZoom();
    this.setupCameraRotation();
  }

  _createClass(Navigator, {
    setupCameraMove: {
      value: function setupCameraMove() {
        var _this = this;

        this.middle_mouse_down = false;
        this.start_camera_position = vec3.fromValues(0, 0, 0);
        this.start_lookat_position = vec3.fromValues(0, 0, 0);
        this.start_mouse_position = { x: 0, y: 0 };

        // Mouse move
        this.render_canvas.mousemove(function (event) {
          if (_this.middle_mouse_down) {
            var uv = vec3.fromValues(0, 0, 0);
            var u = vec3.fromValues(0, 0, 0);
            var v = vec3.fromValues(0, 0, 0);

            vec3.scale(u, _this.camera.camera_right, -5 * (event.pageX / 512 - 0.5) - _this.start_mouse_position.x);
            vec3.scale(v, _this.camera.camera_up, 5 * (event.pageY / 512 - 0.5) - _this.start_mouse_position.y);

            vec3.add(uv, u, v);
            vec3.add(_this.camera.position, _this.start_camera_position, uv);
            vec3.add(_this.camera.look_at, _this.start_lookat_position, uv);

            _this.camera.hasChanged = true;
          }
        });

        this.render_canvas.mousedown(function (event) {
          if (event.which == 2) {
            _this.start_mouse_position.x = -5 * (event.pageX / 512 - 0.5);
            _this.start_mouse_position.y = 5 * (event.pageY / 512 - 0.5);
            _this.start_camera_position = vec3.fromValues(_this.camera.position[0], _this.camera.position[1], _this.camera.position[2]);
            _this.start_lookat_position = vec3.fromValues(_this.camera.look_at[0], _this.camera.look_at[1], _this.camera.look_at[2]);

            _this.middle_mouse_down = true;
          }
        });

        this.render_canvas.mouseup(function (event) {
          return _this.middle_mouse_down = false;
        });
        this.render_canvas.mouseout(function (event) {
          return _this.middle_mouse_down = false;
        });
      }
    },
    setupCameraZoom: {
      value: function setupCameraZoom() {
        var _this = this;

        this.render_canvas.on("mousewheel", function (event) {
          var new_direction = vec3.fromValues(0, 0, 0);
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            vec3.scale(new_direction, _this.camera.direction, 0.5);
            vec3.add(_this.camera.position, _this.camera.position, new_direction);
          } else {
            vec3.scale(new_direction, _this.camera.direction, -0.5);
            vec3.add(_this.camera.position, _this.camera.position, new_direction);
          }
          _this.camera.hasChanged = true;
        });
      }
    },
    setupCameraRotation: {
      value: function setupCameraRotation() {
        var _this = this;

        this.left_mouse_down = false;
        this.start_camera_position = vec3.fromValues(0, 0, 0);
        this.start_mouse_position = { x: 0, y: 0 };

        // Mouse move
        this.render_canvas.mousemove(function (event) {
          if (_this.left_mouse_down) {
            var uv = vec3.fromValues(0, 0, 0);
            var u = vec3.fromValues(0, 0, 0);
            var v = vec3.fromValues(0, 0, 0);

            vec3.scale(u, _this.camera.camera_right, -8 * (event.pageX / 512 - 0.5) - _this.start_mouse_position.x);
            vec3.scale(v, _this.camera.camera_up, 8 * (event.pageY / 512 - 0.5) - _this.start_mouse_position.y);

            vec3.add(uv, u, v);
            vec3.add(_this.camera.position, _this.start_camera_position, uv);

            _this.camera.update();
            _this.camera.hasChanged = true;
          }
        });

        this.render_canvas.mousedown(function (event) {
          if (event.which == 1) {
            _this.start_mouse_position.x = -8 * (event.pageX / 512 - 0.5);
            _this.start_mouse_position.y = 8 * (event.pageY / 512 - 0.5);
            _this.start_camera_position = vec3.fromValues(_this.camera.position[0], _this.camera.position[1], _this.camera.position[2]);
            _this.left_mouse_down = true;
          }
        });

        this.render_canvas.mouseup(function (event) {
          return _this.left_mouse_down = false;
        });
        this.render_canvas.mouseout(function (event) {
          return _this.left_mouse_down = false;
        });
      }
    }
  });

  return Navigator;
})();

},{}],5:[function(require,module,exports){
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

var Object3d = exports.Object3d = (function () {
  function Object3d(triangles, material) {
    _classCallCheck(this, Object3d);

    this._triangles = triangles;
    this._material = material;
  }

  _createClass(Object3d, {
    triangles: {
      get: function () {
        return this._triangles;
      }
    },
    material: {
      get: function () {
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

        return new Object3d(triangles, material);
      }
    }
  });

  return Object3d;
})();

},{}],6:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Scene = require("./Scene").Scene;

var Renderer = require("./Renderer").Renderer;

var Camera = require("./Camera").Camera;

var Navigator = require("./Navigator").Navigator;

var Pathtracer = exports.Pathtracer = function Pathtracer() {
  var _this = this;

  _classCallCheck(this, Pathtracer);

  this.scene = new Scene();
  this.camera = new Camera(vec3.fromValues(-1, 0, 0), vec3.fromValues(1, 0, 0));
  this.renderer = new Renderer(this.camera);
  this.navigator = new Navigator(this.camera);

  setTimeout(function () {
    return _this.renderer.addSceneTextures(_this.scene.BuildSceneTextures());
  }, 100);
};

},{"./Camera":2,"./Navigator":4,"./Renderer":7,"./Scene":8}],7:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LoadShaders = require("./ShaderLoader").LoadShaders;

function throwOnGLError(err, funcName, args) {
  throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
};

var gl = null;

var Renderer = exports.Renderer = (function () {
  function Renderer(camera) {
    var _this = this;

    _classCallCheck(this, Renderer);

    this.camera = camera;

    this.canvas = null;
    this.buffer;
    this.vertex_shader;
    this.fragment_shader;
    this.renderProgram;
    this.vertex_position;
    this.timeLocation;
    this.resolutionLocation;
    this.parameters = { start_time: new Date().getTime(), time: 0, screenWidth: 0, screenHeight: 0, samples: 0 };

    this.samplesLocation;
    this.renderSamplesLocation;
    this.accumulated_buffer_location;

    this.vertexBuffer = null;
    this.frameBuffer = null;
    this.textures = [];
    this.tracerProgram = null;
    this.renderVertexAttribute = null;

    this.triangle_location;
    this.triangleTexture = null;
    this.light_location;
    this.lightTexture = null;
    this.material_location;
    this.materialTexture = null;
    this.sphereLocation;
    this.sphereTexture = null;

    this.rendererReady = false;

    this.elapsedTime = 0;
    this.frameCount = 0;
    this.lastTime = new Date().getTime();

    this.init();

    this.animate = function (time) {
      if (_this.rendererReady) {
        //this.resizeCanvas();
        _this.canvas.width = 512;
        _this.canvas.height = 512;
        _this.parameters.screenWidth = _this.canvas.width;
        _this.parameters.screenHeight = _this.canvas.height;
        gl.viewport(0, 0, _this.canvas.width, _this.canvas.height);

        // render to texture
        gl.useProgram(_this.tracerProgram);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, _this.textures[0]);

        // Set camera position
        _this.setCameraPosition();

        gl.bindBuffer(gl.ARRAY_BUFFER, _this.vertexBuffer);
        gl.bindFramebuffer(gl.FRAMEBUFFER, _this.frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, _this.textures[1], 0);
        gl.vertexAttribPointer(_this.tracerVertexAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        _this.parameters.time = new Date().getTime() - _this.parameters.start_time;
        _this.parameters.samples += 1;

        gl.uniform1f(_this.timeLocation, _this.parameters.time / 100000);
        gl.uniform2f(_this.resolutionLocation, _this.parameters.screenWidth, _this.parameters.screenHeight);

        _this.textures.reverse();

        gl.useProgram(_this.renderProgram);
        gl.bindTexture(gl.TEXTURE_2D, _this.textures[0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, _this.vertexBuffer);
        gl.vertexAttribPointer(_this.renderVertexAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.uniform1f(_this.renderSamplesLocation, _this.parameters.samples);
      }

      _this.calculateSPS();
      document.getElementById("total-samples").innerHTML = _this.parameters.samples;
      requestAnimationFrame(_this.animate);
      //setTimeout(this.animate, 1000/120);
    };
  }

  _createClass(Renderer, {
    setCameraPosition: {
      value: function setCameraPosition() {
        if (this.camera != null) {
          gl.uniform3f(gl.getUniformLocation(this.tracerProgram, "camera_right"), this.camera.camera_right[0], this.camera.camera_right[1], this.camera.camera_right[2]);
          gl.uniform3f(gl.getUniformLocation(this.tracerProgram, "camera_up"), this.camera.camera_up[0], this.camera.camera_up[1], this.camera.camera_up[2]);
          gl.uniform3f(gl.getUniformLocation(this.tracerProgram, "camera_position"), this.camera.position[0], this.camera.position[1], this.camera.position[2]);
          gl.uniform3f(gl.getUniformLocation(this.tracerProgram, "camera_direction"), this.camera.direction[0], this.camera.direction[1], this.camera.direction[2]);

          if (this.camera.hasChanged) {
            this.resetBufferTextures();
            this.parameters.samples = 0;
            this.camera.hasChanged = false;
          }
        }
      }
    },
    calculateSPS: {

      // Calcuate samples per second

      value: function calculateSPS() {
        var now = new Date().getTime();
        this.frameCount++;
        this.elapsedTime += now - this.lastTime;
        this.lastTime = now;

        if (this.elapsedTime >= 1000) {
          var fps = this.frameCount;
          this.frameCount = 0;
          this.elapsedTime -= 1000;
          document.getElementById("fps-count").innerHTML = fps;
        }
      }
    },
    resetBufferTextures: {
      value: function resetBufferTextures() {
        this.textures = [];
        for (var i = 0; i < 2; i++) {
          this.textures.push(gl.createTexture());
          gl.bindTexture(gl.TEXTURE_2D, this.textures[i]);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, gl.FLOAT, null);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
      }
    },
    createRenderProgram: {
      value: function createRenderProgram() {
        var vertices = [-1, -1, -1, 1, 1, -1, 1, 1];
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.frameBuffer = gl.createFramebuffer();
        this.resetBufferTextures();

        // create render shader
        var render_vertex_shader = document.getElementById("vs_render").textContent;
        var render_fragment_shader = document.getElementById("fs_render").textContent;
        this.renderProgram = this.createProgram(render_vertex_shader, render_fragment_shader);
        this.renderVertexAttribute = gl.getAttribLocation(this.renderProgram, "vertex");
        gl.enableVertexAttribArray(this.renderVertexAttribute);
      }
    },
    addSceneTextures: {
      value: function addSceneTextures(textureData) {
        // Create triangle texture
        this.triangleTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.triangleTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1024, 1024, 0, gl.RGB, gl.FLOAT, textureData.triangles);

        // Create light texture
        this.lightTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.lightTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 128, 128, 0, gl.RGB, gl.FLOAT, textureData.light_triangles);

        this.sphereTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.sphereTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, gl.FLOAT, textureData.spheres);

        // Create material texture
        this.materialTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.materialTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, gl.FLOAT, textureData.materials);

        gl.useProgram(this.tracerProgram);
        gl.uniform1i(this.accumulated_buffer_location, 0);
        gl.uniform1i(this.triangle_location, 1);
        gl.uniform1i(this.light_location, 2);
        gl.uniform1i(this.sphere_location, 3);
        gl.uniform1i(this.material_location, 4);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.triangleTexture);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.lightTexture);
        gl.activeTexture(gl.TEXTURE3);
        gl.bindTexture(gl.TEXTURE_2D, this.sphereTexture);
        gl.activeTexture(gl.TEXTURE4);
        gl.bindTexture(gl.TEXTURE_2D, this.materialTexture);

        gl.uniform1i(gl.getUniformLocation(this.tracerProgram, "triangle_count"), textureData.triangle_count);
        gl.uniform1i(gl.getUniformLocation(this.tracerProgram, "sphere_count"), textureData.sphere_count);

        this.rendererReady = true;
      }
    },
    init: {
      value: function init() {
        var _this = this;

        LoadShaders(["./dist/kernels/header.glsl", "./dist/kernels/Ray.glsl", "./dist/kernels/Collision.glsl", "./dist/kernels/Material.glsl", "./dist/kernels/Triangle.glsl", "./dist/kernels/Sphere.glsl", "./dist/kernels/Scene.glsl", "./dist/kernels/RayTracer.glsl", "./dist/kernels/main.glsl"], function (kernelData) {
          _this.fragment_shader = kernelData;
          _this.vertex_shader = document.getElementById("vs").textContent;
          _this.canvas = document.querySelector("canvas");

          // Initialise WebGL
          try {
            gl = _this.canvas.getContext("webgl");
            //gl = WebGLDebugUtils.makeDebugContext(gl, throwOnGLError);
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
          _this.resolutionLocation = gl.getUniformLocation(_this.tracerProgram, "resolution");

          _this.accumulated_buffer_location = gl.getUniformLocation(_this.tracerProgram, "u_buffer_texture");
          _this.triangle_location = gl.getUniformLocation(_this.tracerProgram, "u_triangle_texture");
          _this.light_location = gl.getUniformLocation(_this.tracerProgram, "u_light_texture");
          _this.sphere_location = gl.getUniformLocation(_this.tracerProgram, "u_sphere_texture");
          _this.material_location = gl.getUniformLocation(_this.tracerProgram, "u_material_texture");

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

},{"./ShaderLoader":9}],8:[function(require,module,exports){
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

var _Material = require("./Material");

var Material = _Material.Material;
var MATERIAL_TYPES = _Material.MATERIAL_TYPES;

var Sphere = require("./Sphere").Sphere;

var Camera = require("./Camera").Camera;

var Scene = exports.Scene = (function () {
  function Scene() {
    _classCallCheck(this, Scene);

    this.objects = [];
    this.spheres = [];
    this.materials = [];

    this.CreateDefaultScene();
  }

  _createClass(Scene, {
    CreateDefaultScene: {
      value: function CreateDefaultScene() {
        var _this = this;

        var red_material = new Material(vec3.fromValues(1, 0, 0), MATERIAL_TYPES.oren_nayar);
        var green_material = new Material(vec3.fromValues(0, 1, 0), MATERIAL_TYPES.oren_nayar);
        var blue_material = new Material(vec3.fromValues(0, 0, 1), MATERIAL_TYPES.oren_nayar);
        var white_material = new Material(vec3.fromValues(1, 1, 1), MATERIAL_TYPES.oren_nayar);
        var green_glass = new Material(vec3.fromValues(0.5, 1, 0.5), MATERIAL_TYPES.transmission);
        var specular_red_material = new Material(vec3.fromValues(1, 0, 5, 0.5), MATERIAL_TYPES.specular);

        var emission_material = new Material(vec3.fromValues(1, 1, 1), MATERIAL_TYPES.emission);
        emission_material.emission_rate = 10;
        var emission_red_material = new Material(vec3.fromValues(1, 0.7, 0.7), MATERIAL_TYPES.emission);
        emission_red_material.emission_rate = 20;

        this.materials.push(red_material);
        this.materials.push(green_material);
        this.materials.push(blue_material);
        this.materials.push(white_material);
        this.materials.push(green_glass);
        this.materials.push(specular_red_material);
        this.materials.push(emission_material);
        this.materials.push(emission_red_material);

        // Load objects from .obj files
        LoadObjects([{ fileName: "./dist/models/light_plane.obj", material: emission_material }, { fileName: "./dist/models/floor.obj", material: white_material }, { fileName: "./dist/models/right_wall.obj", material: blue_material }, { fileName: "./dist/models/left_wall.obj", material: red_material }, { fileName: "./dist/models/roof.obj", material: white_material }], function (objects) {
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

        this.spheres.push(new Sphere(vec3.fromValues(5, -3, -3.5), 0.5, emission_red_material));
        this.spheres.push(new Sphere(vec3.fromValues(8, 1.8, -3), 1.8, green_glass));
        this.spheres.push(new Sphere(vec3.fromValues(9, -1.8, -3), 1.8, white_material));
      }
    },
    BuildSceneTextures: {
      value: function BuildSceneTextures() {
        var textureData = {
          triangles: new Float32Array(2048 * 2048 * 3),
          triangle_count: 0,
          materials: new Float32Array(512 * 512 * 3),
          material_count: 0,
          spheres: new Float32Array(512 * 512 * 3),
          sphere_count: 0,
          light_triangles: new Float32Array(128 * 128 * 3),
          light_count: 0
        };

        // Build material data
        var materialData = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.materials[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var material = _step.value;

            // Color
            materialData.push(material.color[0]);
            materialData.push(material.color[1]);
            materialData.push(material.color[2]);

            // Extra data
            materialData.push(material.material_type);
            materialData.push(material.emission_rate);
            materialData.push(0);
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

        textureData.material_count = this.materials.length;
        for (var i = 0; i < materialData.length; i++) {
          textureData.materials[i] = materialData[i];
        }

        // Build sphere data
        var sphereData = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.spheres[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var sphere = _step2.value;

            // Find material index for current object
            var material_index = 0;
            for (var mat_idx = 0; mat_idx < this.materials.length; mat_idx++) {
              if (this.materials[mat_idx] === sphere.material) {
                material_index = mat_idx;
                break;
              }
            }

            // Position
            sphereData.push(sphere.position[0]);
            sphereData.push(sphere.position[1]);
            sphereData.push(sphere.position[2]);

            // Extra data
            sphereData.push(sphere.radius);
            sphereData.push(material_index);
            sphereData.push(0);
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

        textureData.sphere_count = this.spheres.length;
        for (var i = 0; i < materialData.length; i++) {
          textureData.spheres[i] = sphereData[i];
        }

        // Build triangle data
        var triangleData = [];
        var lightData = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.objects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var object = _step3.value;

            // Find material index for current object
            var material_index = 0;
            for (var mat_idx = 0; mat_idx < this.materials.length; mat_idx++) {
              if (this.materials[mat_idx] === object.material) {
                material_index = mat_idx;
                break;
              }
            }

            // Add triangle data
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = object.triangles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var triangle = _step4.value;

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
                triangleData.push(material_index);
                triangleData.push(0);
                triangleData.push(0);

                // Add light data
                if (object.material.material_type == MATERIAL_TYPES.emission) {
                  // v0
                  lightData.push(triangle.v0[0]);
                  lightData.push(triangle.v0[1]);
                  lightData.push(triangle.v0[2]);

                  // Edge 1
                  lightData.push(triangle.v1[0]);
                  lightData.push(triangle.v1[1]);
                  lightData.push(triangle.v1[2]);

                  // Edge 2
                  lightData.push(triangle.v2[0]);
                  lightData.push(triangle.v2[1]);
                  lightData.push(triangle.v2[2]);

                  // Extra data
                  lightData.push(material_index);
                  lightData.push(0);
                  lightData.push(0);
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        var tri_count = 0;
        for (var i = 0; i < triangleData.length; ++i) {
          if (i % 12 == 0) tri_count++;
          textureData.triangles[i] = triangleData[i];
        }
        textureData.triangle_count = tri_count;

        var light_count = 0;
        for (var i = 0; i < lightData.length; ++i) {
          if (i % 12 == 0) light_count++;
          textureData.light_triangles[i] = lightData[i];
        }
        textureData.light_count = light_count;

        return textureData;
      }
    }
  });

  return Scene;
})();

},{"./Camera":2,"./Material":3,"./Object3d":5,"./ShaderLoader":9,"./Sphere":10}],9:[function(require,module,exports){
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
        callback(object_files);
      }
    });
  }
}

},{"./Object3d":5}],10:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Sphere = exports.Sphere = (function () {
  function Sphere(position, radius, material) {
    _classCallCheck(this, Sphere);

    this._position = position;
    this._radius = radius;
    this._material = material;
  }

  _createClass(Sphere, {
    position: {
      get: function () {
        return this._position;
      }
    },
    radius: {
      get: function () {
        return this._radius;
      }
    },
    material: {
      get: function () {
        return this._material;
      }
    }
  });

  return Sphere;
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9DYW1lcmEuanMiLCIvVXNlcnMvZmlsbGUvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL01hdGVyaWFsLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9OYXZpZ2F0b3IuanMiLCIvVXNlcnMvZmlsbGUvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL09iamVjdDNkLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9QYXRodHJhY2VyLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9maWxsZS9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvU2NlbmUuanMiLCIvVXNlcnMvZmlsbGUvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL1NoYWRlckxvYWRlci5qcyIsIi9Vc2Vycy9maWxsZS9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvU3BoZXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7SUNYYSxNQUFNLFdBQU4sTUFBTTtBQUNOLFdBREEsTUFBTSxDQUNMLFFBQVEsRUFBRSxTQUFTLEVBQUU7MEJBRHRCLE1BQU07O0FBRWYsUUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7QUFDMUIsUUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkMsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFB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QUMsYUFBYSxDQUFDLENBQUM7QUFDckUsVUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3JFLFVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7QUFHNUYsWUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDMUMsVUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNwRCxVQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuRSxVQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuRSxVQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckUsVUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3JFLFVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVB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RUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEUsa0JBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDcEMsa0JBQVksRUFBRSxDQUFDO0FBQ2YsVUFBSSxZQUFZLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNwQyxnQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO09BQ3hCO0tBQ0YsQ0FBQyxDQUFDO0dBRU47Q0FDSjs7Ozs7Ozs7Ozs7OztJQzNDWSxNQUFNLFdBQU4sTUFBTTtBQUNOLFdBREEsTUFBTSxDQUNMLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFOzBCQUQ3QixNQUFNOztBQUVmLFFBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBQzFCLFFBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0dBQzNCOztlQUxVLE1BQU07QUFPYixZQUFRO1dBQUEsWUFBRztBQUFFLGVBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztPQUFFOztBQUNyQyxVQUFNO1dBQUEsWUFBRztBQUFFLGVBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztPQUFFOztBQUNqQyxZQUFRO1dBQUEsWUFBRztBQUFFLGVBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztPQUFFOzs7O1NBVDlCLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQYXRodHJhY2VyID0gcmVxdWlyZShcIi4vUGF0aHRyYWNlclwiKS5QYXRodHJhY2VyO1xuXG5nbG9iYWwuYXBwID0gZnVuY3Rpb24gKCkge1xuICAvL2xldCBtYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCgxLCB2ZWMzLmZyb21WYWx1ZXMoMSwxLDEpKTtcbiAgdmFyIHBhdGh0cmFjZXIgPSBuZXcgUGF0aHRyYWNlcigpO1xufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OW1hV3hzWlM5SGFYUm9kV0l2VjJWaVIweGZVR0YwYUhSeVlXTmxjaTl6Y21NdllYQndMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFTeFpRVUZaTEVOQlFVTTdPMEZCUldJc1NVRkdVeXhWUVVGVkxFZEJRVUVzVDBGQlFTeERRVUZSTEdOQlFXTXNRMEZCUVN4RFFVRm9ReXhWUVVGVkxFTkJRVUU3TzBGQlJXNUNMRTFCUVUwc1EwRkJReXhIUVVGSExFZEJRVWNzV1VGQldUczdRVUZGZGtJc1RVRkJTU3hWUVVGVkxFZEJRVWNzU1VGQlNTeFZRVUZWTEVWQlFVVXNRMEZCUXp0RFFVTnVReXhEUVVGRElpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpwYlhCdmNuUWdleUJRWVhSb2RISmhZMlZ5SUgwZ1puSnZiU0FuTGk5UVlYUm9kSEpoWTJWeUp6dGNibHh1WjJ4dlltRnNMbUZ3Y0NBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0x5OXNaWFFnYldGMFpYSnBZV3dnUFNCdVpYY2dUV0YwWlhKcFlXd29NU3dnZG1Wak15NW1jbTl0Vm1Gc2RXVnpLREVzTVN3eEtTazdYRzRnSUd4bGRDQndZWFJvZEhKaFkyVnlJRDBnYm1WM0lGQmhkR2gwY21GalpYSW9LVHRjYm4wN1hHNGlYWDA9IiwiZXhwb3J0IGNsYXNzIENhbWVyYSB7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uLCBkaXJlY3Rpb24pIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuX2xvb2tfYXQgPSB2ZWMzLmZyb21WYWx1ZXMoNSwwLDApO1xuICAgIHRoaXMuX2RpcmVjdGlvbiA9IHZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgdGhpcy5faGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgbGV0IGRpc3RhbmNlID0gdmVjMy5kaXN0YW5jZSh0aGlzLl9sb29rX2F0LCB0aGlzLl9wb3NpdGlvbik7XG5cbiAgICB2ZWMzLnN1YnRyYWN0KHRoaXMuX2RpcmVjdGlvbiwgdGhpcy5fbG9va19hdCwgdGhpcy5fcG9zaXRpb24pO1xuICAgIHZlYzMubm9ybWFsaXplKHRoaXMuX2RpcmVjdGlvbiwgdGhpcy5fZGlyZWN0aW9uKTtcblxuICAgIGxldCB1cF92ZWN0b3IgPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDEpO1xuICAgIHRoaXMuX2NhbWVyYV9yaWdodCA9IHZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgdGhpcy5fY2FtZXJhX3VwID0gdmVjMy5mcm9tVmFsdWVzKDAsMCwwKTtcbiAgICB2ZWMzLmNyb3NzKHRoaXMuX2NhbWVyYV9yaWdodCwgdGhpcy5fZGlyZWN0aW9uLCB1cF92ZWN0b3IpO1xuICAgIHZlYzMuY3Jvc3ModGhpcy5fY2FtZXJhX3VwLCB0aGlzLl9jYW1lcmFfcmlnaHQsIHRoaXMuX2RpcmVjdGlvbik7XG5cbiAgICB0aGlzLl9wb3NpdGlvbiA9IHZlYzMuZnJvbVZhbHVlcyh0aGlzLl9sb29rX2F0WzBdLCB0aGlzLl9sb29rX2F0WzFdLCB0aGlzLl9sb29rX2F0WzJdKTtcbiAgICBsZXQgbmVnYXRpdmVfZGlyZWN0aW9uID0gdmVjMy5mcm9tVmFsdWVzKDAsMCwwKTtcbiAgICB2ZWMzLnNjYWxlKG5lZ2F0aXZlX2RpcmVjdGlvbiwgdGhpcy5fZGlyZWN0aW9uLCAtZGlzdGFuY2UpO1xuICAgIHZlYzMuYWRkKHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9wb3NpdGlvbiwgbmVnYXRpdmVfZGlyZWN0aW9uKTtcbiAgfVxuXG4gIGdldCBjYW1lcmFfdXAoKSB7IHJldHVybiB0aGlzLl9jYW1lcmFfdXA7IH1cbiAgZ2V0IGNhbWVyYV9yaWdodCgpIHsgcmV0dXJuIHRoaXMuX2NhbWVyYV9yaWdodDsgfVxuICBnZXQgbG9va19hdCgpIHsgcmV0dXJuIHRoaXMuX2xvb2tfYXQ7IH1cbiAgZ2V0IHBvc2l0aW9uKCkgeyByZXR1cm4gdGhpcy5fcG9zaXRpb247IH1cbiAgZ2V0IGRpcmVjdGlvbigpIHsgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjsgfVxuICBnZXQgaGFzQ2hhbmdlZCgpIHsgcmV0dXJuIHRoaXMuX2hhc0NoYW5nZWQ7IH1cblxuICBzZXQgcG9zaXRpb24obmV3X3Bvc2l0aW9uKSB7IHRoaXMuX3Bvc2l0aW9uID0gbmV3X3Bvc2l0aW9uOyB9XG4gIHNldCBoYXNDaGFuZ2VkKGNoYW5nZWQpIHsgdGhpcy5faGFzQ2hhbmdlZCA9IGNoYW5nZWQ7IH1cbiAgc2V0IGxvb2tfYXQobG9va19hdCkgeyB0aGlzLl9sb29rX2F0ID0gbG9va19hdDsgfVxufVxuIiwiZXhwb3J0IGNvbnN0IE1BVEVSSUFMX1RZUEVTID0ge1xuICBsYW1iZXJ0aWFuOiAwLFxuICBzcGVjdWxhcjogMSxcbiAgZW1pc3Npb246IDIsXG4gIHRyYW5zbWlzc2lvbjogMyxcbiAgb3Jlbl9uYXlhcjogNFxufVxuXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWwge1xuICAgIGNvbnN0cnVjdG9yKGNvbG9yLCBtYXRlcmlhbF90eXBlKSB7XG4gICAgICB0aGlzLl9tYXRlcmlhbF90eXBlID0gbWF0ZXJpYWxfdHlwZTtcbiAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG4gICAgICB0aGlzLl9lbWlzc2lvbl9yYXRlID0gbWF0ZXJpYWxfdHlwZSA9PSAyID8gMTAgOiAwO1xuICAgIH1cblxuICAgIGdldCBtYXRlcmlhbF90eXBlKCkgeyByZXR1cm4gdGhpcy5fbWF0ZXJpYWxfdHlwZTsgfVxuICAgIGdldCBjb2xvcigpIHsgcmV0dXJuIHRoaXMuX2NvbG9yOyB9XG4gICAgZ2V0IGVtaXNzaW9uX3JhdGUoKSB7IHJldHVybiB0aGlzLl9lbWlzc2lvbl9yYXRlOyB9XG4gICAgc2V0IGVtaXNzaW9uX3JhdGUocmF0ZSkgeyB0aGlzLl9lbWlzc2lvbl9yYXRlID0gcmF0ZTsgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgTmF2aWdhdG9yIHtcbiAgY29uc3RydWN0b3IoY2FtZXJhKSB7XG4gICAgdGhpcy5yZW5kZXJfY2FudmFzID0gJCgnI3JlbmRlci1jYW52YXMnKTtcbiAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcblxuICAgIHRoaXMuc2V0dXBDYW1lcmFNb3ZlKCk7XG4gICAgdGhpcy5zZXR1cENhbWVyYVpvb20oKTtcbiAgICB0aGlzLnNldHVwQ2FtZXJhUm90YXRpb24oKTtcbiAgfVxuXG4gIHNldHVwQ2FtZXJhTW92ZSgpIHtcbiAgICB0aGlzLm1pZGRsZV9tb3VzZV9kb3duID0gZmFsc2U7XG4gICAgdGhpcy5zdGFydF9jYW1lcmFfcG9zaXRpb24gPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgIHRoaXMuc3RhcnRfbG9va2F0X3Bvc2l0aW9uID0gdmVjMy5mcm9tVmFsdWVzKDAsMCwwKTtcbiAgICB0aGlzLnN0YXJ0X21vdXNlX3Bvc2l0aW9uID0ge3g6IDAsIHk6IDB9O1xuXG4gICAgLy8gTW91c2UgbW92ZVxuICAgIHRoaXMucmVuZGVyX2NhbnZhcy5tb3VzZW1vdmUoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5taWRkbGVfbW91c2VfZG93bikge1xuICAgICAgICBsZXQgdXYgPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgICAgICBsZXQgdSA9IHZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgICAgIGxldCB2ID0gdmVjMy5mcm9tVmFsdWVzKDAsMCwwKTtcblxuICAgICAgICB2ZWMzLnNjYWxlKHUsIHRoaXMuY2FtZXJhLmNhbWVyYV9yaWdodCwgLTUgKiAoZXZlbnQucGFnZVggLyA1MTIgLSAwLjUpIC0gdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi54KTtcbiAgICAgICAgdmVjMy5zY2FsZSh2LCB0aGlzLmNhbWVyYS5jYW1lcmFfdXAsIDUgKiAoZXZlbnQucGFnZVkgLyA1MTIgLSAwLjUpIC0gdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi55KTtcblxuICAgICAgICB2ZWMzLmFkZCh1diwgdSwgdik7XG4gICAgICAgIHZlYzMuYWRkKHRoaXMuY2FtZXJhLnBvc2l0aW9uLCB0aGlzLnN0YXJ0X2NhbWVyYV9wb3NpdGlvbiwgdXYpO1xuICAgICAgICB2ZWMzLmFkZCh0aGlzLmNhbWVyYS5sb29rX2F0LCB0aGlzLnN0YXJ0X2xvb2thdF9wb3NpdGlvbiwgdXYpO1xuXG4gICAgICAgIHRoaXMuY2FtZXJhLmhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNlZG93bigoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC53aGljaCA9PSAyKSB7XG4gICAgICAgIHRoaXMuc3RhcnRfbW91c2VfcG9zaXRpb24ueCA9IC01ICogKGV2ZW50LnBhZ2VYIC8gNTEyIC0gMC41KTtcbiAgICAgICAgdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi55ID0gNSAqIChldmVudC5wYWdlWSAvIDUxMiAtIDAuNSk7XG4gICAgICAgIHRoaXMuc3RhcnRfY2FtZXJhX3Bvc2l0aW9uID0gdmVjMy5mcm9tVmFsdWVzKHRoaXMuY2FtZXJhLnBvc2l0aW9uWzBdLCB0aGlzLmNhbWVyYS5wb3NpdGlvblsxXSwgdGhpcy5jYW1lcmEucG9zaXRpb25bMl0pO1xuICAgICAgICB0aGlzLnN0YXJ0X2xvb2thdF9wb3NpdGlvbiA9IHZlYzMuZnJvbVZhbHVlcyh0aGlzLmNhbWVyYS5sb29rX2F0WzBdLCB0aGlzLmNhbWVyYS5sb29rX2F0WzFdLCB0aGlzLmNhbWVyYS5sb29rX2F0WzJdKTtcblxuICAgICAgICB0aGlzLm1pZGRsZV9tb3VzZV9kb3duID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVuZGVyX2NhbnZhcy5tb3VzZXVwKChldmVudCkgPT4gdGhpcy5taWRkbGVfbW91c2VfZG93biA9IGZhbHNlICk7XG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNlb3V0KChldmVudCkgPT4gdGhpcy5taWRkbGVfbW91c2VfZG93biA9IGZhbHNlICk7XG4gIH1cblxuICBzZXR1cENhbWVyYVpvb20oKSB7XG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm9uKCdtb3VzZXdoZWVsJywgKGV2ZW50KSA9PiB7XG4gICAgICBsZXQgbmV3X2RpcmVjdGlvbiA9IHZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudC53aGVlbERlbHRhID4gMCB8fCBldmVudC5vcmlnaW5hbEV2ZW50LmRldGFpbCA8IDApIHtcbiAgICAgICAgdmVjMy5zY2FsZShuZXdfZGlyZWN0aW9uLCB0aGlzLmNhbWVyYS5kaXJlY3Rpb24sIDAuNSk7XG4gICAgICAgIHZlYzMuYWRkKHRoaXMuY2FtZXJhLnBvc2l0aW9uLCB0aGlzLmNhbWVyYS5wb3NpdGlvbiwgbmV3X2RpcmVjdGlvbik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmVjMy5zY2FsZShuZXdfZGlyZWN0aW9uLCB0aGlzLmNhbWVyYS5kaXJlY3Rpb24sIC0wLjUpO1xuICAgICAgICB2ZWMzLmFkZCh0aGlzLmNhbWVyYS5wb3NpdGlvbiwgdGhpcy5jYW1lcmEucG9zaXRpb24sIG5ld19kaXJlY3Rpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5jYW1lcmEuaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBzZXR1cENhbWVyYVJvdGF0aW9uKCkge1xuICAgIHRoaXMubGVmdF9tb3VzZV9kb3duID0gZmFsc2U7XG4gICAgdGhpcy5zdGFydF9jYW1lcmFfcG9zaXRpb24gPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgIHRoaXMuc3RhcnRfbW91c2VfcG9zaXRpb24gPSB7eDogMCwgeTogMH07XG5cbiAgICAvLyBNb3VzZSBtb3ZlXG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNlbW92ZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLmxlZnRfbW91c2VfZG93bikge1xuICAgICAgICBsZXQgdXYgPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgICAgICBsZXQgdSA9IHZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgICAgIGxldCB2ID0gdmVjMy5mcm9tVmFsdWVzKDAsMCwwKTtcblxuICAgICAgICB2ZWMzLnNjYWxlKHUsIHRoaXMuY2FtZXJhLmNhbWVyYV9yaWdodCwgLTggKiAoZXZlbnQucGFnZVggLyA1MTIgLSAwLjUpIC0gdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi54KTtcbiAgICAgICAgdmVjMy5zY2FsZSh2LCB0aGlzLmNhbWVyYS5jYW1lcmFfdXAsIDggKiAoZXZlbnQucGFnZVkgLyA1MTIgLSAwLjUpIC0gdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi55KTtcblxuICAgICAgICB2ZWMzLmFkZCh1diwgdSwgdik7XG4gICAgICAgIHZlYzMuYWRkKHRoaXMuY2FtZXJhLnBvc2l0aW9uLCB0aGlzLnN0YXJ0X2NhbWVyYV9wb3NpdGlvbiwgdXYpO1xuXG4gICAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmNhbWVyYS5oYXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVuZGVyX2NhbnZhcy5tb3VzZWRvd24oKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMSkge1xuICAgICAgICB0aGlzLnN0YXJ0X21vdXNlX3Bvc2l0aW9uLnggPSAtOCAqIChldmVudC5wYWdlWCAvIDUxMiAtIDAuNSk7XG4gICAgICAgIHRoaXMuc3RhcnRfbW91c2VfcG9zaXRpb24ueSA9IDggKiAoZXZlbnQucGFnZVkgLyA1MTIgLSAwLjUpO1xuICAgICAgICB0aGlzLnN0YXJ0X2NhbWVyYV9wb3NpdGlvbiA9IHZlYzMuZnJvbVZhbHVlcyh0aGlzLmNhbWVyYS5wb3NpdGlvblswXSwgdGhpcy5jYW1lcmEucG9zaXRpb25bMV0sIHRoaXMuY2FtZXJhLnBvc2l0aW9uWzJdKTtcbiAgICAgICAgdGhpcy5sZWZ0X21vdXNlX2Rvd24gPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNldXAoKGV2ZW50KSA9PiB0aGlzLmxlZnRfbW91c2VfZG93biA9IGZhbHNlICk7XG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNlb3V0KChldmVudCkgPT4gdGhpcy5sZWZ0X21vdXNlX2Rvd24gPSBmYWxzZSApO1xuICB9XG59XG4iLCJjbGFzcyBUcmlhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKHYwLCB2MSwgdjIpIHtcbiAgICB0aGlzLl92MCA9IHYwO1xuICAgIHRoaXMuX3YxID0gdjE7XG4gICAgdGhpcy5fdjIgPSB2MjtcblxuICAgIHRoaXMuX2VkZ2UxID0gdmVjMy5jcmVhdGUoKTtcbiAgICB2ZWMzLnN1YnRyYWN0KHRoaXMuX2VkZ2UxLCB2MCwgdjEpO1xuICAgIHRoaXMuX2VkZ2UyID0gdmVjMy5jcmVhdGUoKTtcbiAgICB2ZWMzLnN1YnRyYWN0KHRoaXMuX2VkZ2UyLCB2MCwgdjIpO1xuICB9XG5cbiAgZ2V0IHYwKCkgeyByZXR1cm4gdGhpcy5fdjA7IH1cbiAgZ2V0IHYxKCkgeyByZXR1cm4gdGhpcy5fdjE7IH1cbiAgZ2V0IHYyKCkgeyByZXR1cm4gdGhpcy5fdjI7IH1cbiAgZ2V0IGVkZ2UxKCkgeyByZXR1cm4gdGhpcy5fZWRnZTE7IH1cbiAgZ2V0IGVkZ2UyKCkgeyByZXR1cm4gdGhpcy5fZWRnZTI7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE9iamVjdDNkIHtcbiAgY29uc3RydWN0b3IodHJpYW5nbGVzLCBtYXRlcmlhbCkge1xuICAgIHRoaXMuX3RyaWFuZ2xlcyA9IHRyaWFuZ2xlcztcbiAgICB0aGlzLl9tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICB9XG5cbiAgc3RhdGljIExvYWRPYmoob2JqRGF0YSwgbWF0ZXJpYWwpIHtcbiAgICAgIGxldCB2ZXJ0aWNlcyA9IFtdO1xuICAgICAgbGV0IHRyaWFuZ2xlcyA9IFtdO1xuXG4gICAgICBsZXQgbGluZXMgPSBvYmpEYXRhLnNwbGl0KCdcXG4nKTtcbiAgICAgIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBsaW5lLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgc3dpdGNoIChjb21wb25lbnRzWzBdKSB7XG4gICAgICAgICAgLy8gVmVydGV4IGluZGljZXNcbiAgICAgICAgICBjYXNlICdmJzpcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKG5ldyBUcmlhbmdsZSh2ZXJ0aWNlc1tjb21wb25lbnRzWzFdIC0gMV0sIHZlcnRpY2VzW2NvbXBvbmVudHNbMl0gLSAxXSwgdmVydGljZXNbY29tcG9uZW50c1szXSAtIDFdKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vIFZlcnRleCBwb3NpdGlvbnNcbiAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVjMy5mcm9tVmFsdWVzKGNvbXBvbmVudHNbMV0sIGNvbXBvbmVudHNbMl0sIGNvbXBvbmVudHNbM10pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgT2JqZWN0M2QodHJpYW5nbGVzLCBtYXRlcmlhbCk7XG4gIH1cblxuICBnZXQgdHJpYW5nbGVzKCkgeyByZXR1cm4gdGhpcy5fdHJpYW5nbGVzOyB9XG4gIGdldCBtYXRlcmlhbCgpIHsgcmV0dXJuIHRoaXMuX21hdGVyaWFsOyB9XG59XG4iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gJy4vU2NlbmUnO1xuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gJy4vQ2FtZXJhJztcbmltcG9ydCB7IE5hdmlnYXRvciB9IGZyb20gJy4vTmF2aWdhdG9yJztcblxuZXhwb3J0IGNsYXNzIFBhdGh0cmFjZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKCk7XG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhKHZlYzMuZnJvbVZhbHVlcygtMSwwLDApLCB2ZWMzLmZyb21WYWx1ZXMoMSwwLDApKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKHRoaXMuY2FtZXJhKTtcbiAgICB0aGlzLm5hdmlnYXRvciA9IG5ldyBOYXZpZ2F0b3IodGhpcy5jYW1lcmEpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcmVyLmFkZFNjZW5lVGV4dHVyZXModGhpcy5zY2VuZS5CdWlsZFNjZW5lVGV4dHVyZXMoKSksIDEwMCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IExvYWRTaGFkZXJzIH0gZnJvbSAnLi9TaGFkZXJMb2FkZXInO1xuXG5mdW5jdGlvbiB0aHJvd09uR0xFcnJvcihlcnIsIGZ1bmNOYW1lLCBhcmdzKSB7XG4gIHRocm93IFdlYkdMRGVidWdVdGlscy5nbEVudW1Ub1N0cmluZyhlcnIpICsgXCIgd2FzIGNhdXNlZCBieSBjYWxsIHRvOiBcIiArIGZ1bmNOYW1lO1xufTtcblxudmFyIGdsID0gbnVsbDtcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoY2FtZXJhKSB7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG5cbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgdGhpcy5idWZmZXI7XG4gICAgdGhpcy52ZXJ0ZXhfc2hhZGVyO1xuICAgIHRoaXMuZnJhZ21lbnRfc2hhZGVyO1xuICAgIHRoaXMucmVuZGVyUHJvZ3JhbTtcbiAgICB0aGlzLnZlcnRleF9wb3NpdGlvbjtcbiAgICB0aGlzLnRpbWVMb2NhdGlvbjtcbiAgICB0aGlzLnJlc29sdXRpb25Mb2NhdGlvbjtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7IHN0YXJ0X3RpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLCB0aW1lOiAwLCBzY3JlZW5XaWR0aCA6IDAsIHNjcmVlbkhlaWdodDogMCwgc2FtcGxlczogMCB9O1xuXG4gICAgdGhpcy5zYW1wbGVzTG9jYXRpb247XG4gICAgdGhpcy5yZW5kZXJTYW1wbGVzTG9jYXRpb247XG4gICAgdGhpcy5hY2N1bXVsYXRlZF9idWZmZXJfbG9jYXRpb247XG5cbiAgICB0aGlzLnZlcnRleEJ1ZmZlciA9IG51bGw7XG4gICAgdGhpcy5mcmFtZUJ1ZmZlciA9IG51bGw7XG4gICAgdGhpcy50ZXh0dXJlcyA9IFtdO1xuICAgIHRoaXMudHJhY2VyUHJvZ3JhbSA9IG51bGw7XG4gICAgdGhpcy5yZW5kZXJWZXJ0ZXhBdHRyaWJ1dGUgPSBudWxsO1xuXG4gICAgdGhpcy50cmlhbmdsZV9sb2NhdGlvbjtcbiAgICB0aGlzLnRyaWFuZ2xlVGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5saWdodF9sb2NhdGlvbjtcbiAgICB0aGlzLmxpZ2h0VGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5tYXRlcmlhbF9sb2NhdGlvbjtcbiAgICB0aGlzLm1hdGVyaWFsVGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5zcGhlcmVMb2NhdGlvbjtcbiAgICB0aGlzLnNwaGVyZVRleHR1cmUgPSBudWxsO1xuXG4gICAgdGhpcy5yZW5kZXJlclJlYWR5ID0gZmFsc2U7XG5cbiAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5hbmltYXRlID0gKHRpbWUpID0+IHtcbiAgICAgIGlmICh0aGlzLnJlbmRlcmVyUmVhZHkpIHtcbiAgICAgICAgLy90aGlzLnJlc2l6ZUNhbnZhcygpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDUxMjtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gNTEyO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuV2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgIFx0dGhpcy5wYXJhbWV0ZXJzLnNjcmVlbkhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgZ2wudmlld3BvcnQoIDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQgKTtcblxuICAgICAgICAvLyByZW5kZXIgdG8gdGV4dHVyZVxuICAgICAgICBnbC51c2VQcm9ncmFtKHRoaXMudHJhY2VyUHJvZ3JhbSk7XG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmVzWzBdKTtcblxuICAgICAgICAvLyBTZXQgY2FtZXJhIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuc2V0Q2FtZXJhUG9zaXRpb24oKTtcblxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXIpO1xuICAgICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuZnJhbWVCdWZmZXIpO1xuICAgICAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgZ2wuQ09MT1JfQVRUQUNITUVOVDAsIGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZXNbMV0sIDApO1xuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMudHJhY2VyVmVydGV4QXR0cmlidXRlLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKTtcblxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5wYXJhbWV0ZXJzLnN0YXJ0X3RpbWU7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zYW1wbGVzICs9IDE7XG5cbiAgICAgICAgZ2wudW5pZm9ybTFmKCB0aGlzLnRpbWVMb2NhdGlvbiwgdGhpcy5wYXJhbWV0ZXJzLnRpbWUgLyAxMDAwMDAgKTtcbiAgICAgICAgZ2wudW5pZm9ybTJmKCB0aGlzLnJlc29sdXRpb25Mb2NhdGlvbiwgdGhpcy5wYXJhbWV0ZXJzLnNjcmVlbldpZHRoLCB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSGVpZ2h0ICk7XG5cbiAgICAgICAgdGhpcy50ZXh0dXJlcy5yZXZlcnNlKCk7XG5cbiAgICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnJlbmRlclByb2dyYW0pO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmVzWzBdKTtcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydGV4QnVmZmVyKTtcbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnJlbmRlclZlcnRleEF0dHJpYnV0ZSwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRV9TVFJJUCwgMCwgNCk7XG4gICAgICAgIGdsLnVuaWZvcm0xZiggdGhpcy5yZW5kZXJTYW1wbGVzTG9jYXRpb24sICB0aGlzLnBhcmFtZXRlcnMuc2FtcGxlcyApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNhbGN1bGF0ZVNQUygpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsLXNhbXBsZXMnKS5pbm5lckhUTUwgPSB0aGlzLnBhcmFtZXRlcnMuc2FtcGxlcztcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy5hbmltYXRlICk7XG4gICAgICAvL3NldFRpbWVvdXQodGhpcy5hbmltYXRlLCAxMDAwLzEyMCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2FtZXJhUG9zaXRpb24oKSB7XG4gICAgaWYgKHRoaXMuY2FtZXJhICE9IG51bGwpIHtcbiAgICAgIGdsLnVuaWZvcm0zZihnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMudHJhY2VyUHJvZ3JhbSwgJ2NhbWVyYV9yaWdodCcpLCB0aGlzLmNhbWVyYS5jYW1lcmFfcmlnaHRbMF0sIHRoaXMuY2FtZXJhLmNhbWVyYV9yaWdodFsxXSwgdGhpcy5jYW1lcmEuY2FtZXJhX3JpZ2h0WzJdICk7XG4gICAgICBnbC51bmlmb3JtM2YoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICdjYW1lcmFfdXAnKSwgdGhpcy5jYW1lcmEuY2FtZXJhX3VwWzBdLCB0aGlzLmNhbWVyYS5jYW1lcmFfdXBbMV0sIHRoaXMuY2FtZXJhLmNhbWVyYV91cFsyXSApO1xuICAgICAgZ2wudW5pZm9ybTNmKGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy50cmFjZXJQcm9ncmFtLCAnY2FtZXJhX3Bvc2l0aW9uJyksIHRoaXMuY2FtZXJhLnBvc2l0aW9uWzBdLCB0aGlzLmNhbWVyYS5wb3NpdGlvblsxXSwgdGhpcy5jYW1lcmEucG9zaXRpb25bMl0gKTtcbiAgICAgIGdsLnVuaWZvcm0zZihnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMudHJhY2VyUHJvZ3JhbSwgJ2NhbWVyYV9kaXJlY3Rpb24nKSwgdGhpcy5jYW1lcmEuZGlyZWN0aW9uWzBdLCB0aGlzLmNhbWVyYS5kaXJlY3Rpb25bMV0sIHRoaXMuY2FtZXJhLmRpcmVjdGlvblsyXSApO1xuXG4gICAgICBpZiAodGhpcy5jYW1lcmEuaGFzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLnJlc2V0QnVmZmVyVGV4dHVyZXMoKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNhbXBsZXMgPSAwO1xuICAgICAgICB0aGlzLmNhbWVyYS5oYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsY3VhdGUgc2FtcGxlcyBwZXIgc2Vjb25kXG4gIGNhbGN1bGF0ZVNQUygpIHtcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgdGhpcy5lbGFwc2VkVGltZSArPSAobm93IC0gdGhpcy5sYXN0VGltZSk7XG4gICAgdGhpcy5sYXN0VGltZSA9IG5vdztcblxuICAgIGlmKHRoaXMuZWxhcHNlZFRpbWUgPj0gMTAwMCkge1xuICAgICAgbGV0IGZwcyA9IHRoaXMuZnJhbWVDb3VudDtcbiAgICAgIHRoaXMuZnJhbWVDb3VudCA9IDA7XG4gICAgICB0aGlzLmVsYXBzZWRUaW1lIC09IDEwMDA7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnBzLWNvdW50JykuaW5uZXJIVE1MID0gZnBzO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0QnVmZmVyVGV4dHVyZXMoKSB7XG4gICAgdGhpcy50ZXh0dXJlcyA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgIHRoaXMudGV4dHVyZXMucHVzaChnbC5jcmVhdGVUZXh0dXJlKCkpO1xuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlc1tpXSk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQiwgNTEyLCA1MTIsIDAsIGdsLlJHQiwgZ2wuRkxPQVQsIG51bGwpO1xuICAgIH1cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlclByb2dyYW0oKSB7XG4gICAgbGV0IHZlcnRpY2VzID0gWy0xLCAtMSwgLTEsIDEsIDEsIC0xLCAxLCAxXTtcbiAgICB0aGlzLnZlcnRleEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEJ1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMpLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgdGhpcy5mcmFtZUJ1ZmZlciA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG4gICAgdGhpcy5yZXNldEJ1ZmZlclRleHR1cmVzKCk7XG5cbiAgICAvLyBjcmVhdGUgcmVuZGVyIHNoYWRlclxuICAgIGxldCByZW5kZXJfdmVydGV4X3NoYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2c19yZW5kZXInKS50ZXh0Q29udGVudDtcbiAgICBsZXQgcmVuZGVyX2ZyYWdtZW50X3NoYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmc19yZW5kZXInKS50ZXh0Q29udGVudDtcbiAgICB0aGlzLnJlbmRlclByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0ocmVuZGVyX3ZlcnRleF9zaGFkZXIsIHJlbmRlcl9mcmFnbWVudF9zaGFkZXIpO1xuICAgIHRoaXMucmVuZGVyVmVydGV4QXR0cmlidXRlID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5yZW5kZXJQcm9ncmFtLCAndmVydGV4Jyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5yZW5kZXJWZXJ0ZXhBdHRyaWJ1dGUpO1xuICB9XG5cbiAgYWRkU2NlbmVUZXh0dXJlcyh0ZXh0dXJlRGF0YSkge1xuICAgIC8vIENyZWF0ZSB0cmlhbmdsZSB0ZXh0dXJlXG4gICAgdGhpcy50cmlhbmdsZVRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50cmlhbmdsZVRleHR1cmUpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0IsIDEwMjQsIDEwMjQsIDAsIGdsLlJHQiwgZ2wuRkxPQVQsIHRleHR1cmVEYXRhLnRyaWFuZ2xlcyk7XG5cbiAgICAvLyBDcmVhdGUgbGlnaHQgdGV4dHVyZVxuICAgIHRoaXMubGlnaHRUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMubGlnaHRUZXh0dXJlKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCLCAxMjgsIDEyOCwgMCwgZ2wuUkdCLCBnbC5GTE9BVCwgdGV4dHVyZURhdGEubGlnaHRfdHJpYW5nbGVzKTtcblxuICAgIHRoaXMuc3BoZXJlVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnNwaGVyZVRleHR1cmUpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0IsIDUxMiwgNTEyLCAwLCBnbC5SR0IsIGdsLkZMT0FULCB0ZXh0dXJlRGF0YS5zcGhlcmVzKTtcblxuICAgIC8vIENyZWF0ZSBtYXRlcmlhbCB0ZXh0dXJlXG4gICAgdGhpcy5tYXRlcmlhbFRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5tYXRlcmlhbFRleHR1cmUpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0IsIDUxMiwgNTEyLCAwLCBnbC5SR0IsIGdsLkZMT0FULCB0ZXh0dXJlRGF0YS5tYXRlcmlhbHMpO1xuXG4gICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnRyYWNlclByb2dyYW0pO1xuICAgIGdsLnVuaWZvcm0xaSh0aGlzLmFjY3VtdWxhdGVkX2J1ZmZlcl9sb2NhdGlvbiwgMCk7XG4gICAgZ2wudW5pZm9ybTFpKHRoaXMudHJpYW5nbGVfbG9jYXRpb24sIDEpO1xuICAgIGdsLnVuaWZvcm0xaSh0aGlzLmxpZ2h0X2xvY2F0aW9uLCAyKTtcbiAgICBnbC51bmlmb3JtMWkodGhpcy5zcGhlcmVfbG9jYXRpb24sIDMpO1xuICAgIGdsLnVuaWZvcm0xaSh0aGlzLm1hdGVyaWFsX2xvY2F0aW9uLCA0KTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTEpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudHJpYW5nbGVUZXh0dXJlKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUyKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLmxpZ2h0VGV4dHVyZSk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMyk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5zcGhlcmVUZXh0dXJlKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkU0KTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLm1hdGVyaWFsVGV4dHVyZSk7XG5cbiAgICBnbC51bmlmb3JtMWkoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICd0cmlhbmdsZV9jb3VudCcpLCB0ZXh0dXJlRGF0YS50cmlhbmdsZV9jb3VudCApO1xuICAgIGdsLnVuaWZvcm0xaShnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMudHJhY2VyUHJvZ3JhbSwgJ3NwaGVyZV9jb3VudCcpLCB0ZXh0dXJlRGF0YS5zcGhlcmVfY291bnQgKTtcblxuICAgIHRoaXMucmVuZGVyZXJSZWFkeSA9IHRydWU7XG4gIH1cblxuICBpbml0KCkge1xuICAgIExvYWRTaGFkZXJzKFtcbiAgICAgICcuL2Rpc3Qva2VybmVscy9oZWFkZXIuZ2xzbCcsXG4gICAgICAnLi9kaXN0L2tlcm5lbHMvUmF5Lmdsc2wnLFxuICAgICAgJy4vZGlzdC9rZXJuZWxzL0NvbGxpc2lvbi5nbHNsJyxcbiAgICAgICcuL2Rpc3Qva2VybmVscy9NYXRlcmlhbC5nbHNsJyxcbiAgICAgICcuL2Rpc3Qva2VybmVscy9UcmlhbmdsZS5nbHNsJyxcbiAgICAgICcuL2Rpc3Qva2VybmVscy9TcGhlcmUuZ2xzbCcsXG4gICAgICAnLi9kaXN0L2tlcm5lbHMvU2NlbmUuZ2xzbCcsXG4gICAgICAnLi9kaXN0L2tlcm5lbHMvUmF5VHJhY2VyLmdsc2wnLFxuICAgICAgJy4vZGlzdC9rZXJuZWxzL21haW4uZ2xzbCcsXG4gICAgXSwgKGtlcm5lbERhdGEpID0+IHtcbiAgICAgICAgdGhpcy5mcmFnbWVudF9zaGFkZXIgPSBrZXJuZWxEYXRhO1xuICAgICAgICB0aGlzLnZlcnRleF9zaGFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndnMnKS50ZXh0Q29udGVudDtcbiAgICBcdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcblxuICAgIFx0XHQvLyBJbml0aWFsaXNlIFdlYkdMXG4gICAgXHRcdHRyeSB7XG4gICAgICAgICAgIGdsID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCggJ3dlYmdsJyApO1xuICAgICAgICAgICAvL2dsID0gV2ViR0xEZWJ1Z1V0aWxzLm1ha2VEZWJ1Z0NvbnRleHQoZ2wsIHRocm93T25HTEVycm9yKTtcbiAgICAgICAgIH0gY2F0Y2goIGVycm9yICkgeyB9XG4gICAgXHRcdGlmICggIWdsICkgdGhyb3cgXCJjYW5ub3QgY3JlYXRlIHdlYmdsIGNvbnRleHRcIjtcblxuICAgICAgICAvLyBCUk9XU0VSIE1VU1QgU1VQUE9SVCBUSElTISEhXG4gICAgICAgIGdsLmdldEV4dGVuc2lvbihcIk9FU190ZXh0dXJlX2Zsb2F0XCIpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlUmVuZGVyUHJvZ3JhbSgpO1xuXG4gICAgXHRcdC8vIENyZWF0ZSBWZXJ0ZXggYnVmZmVyICgyIHRyaWFuZ2xlcylcbiAgICBcdFx0dGhpcy5idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBcdFx0Z2wuYmluZEJ1ZmZlciggZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmJ1ZmZlciApO1xuICAgIFx0XHRnbC5idWZmZXJEYXRhKCBnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoIFsgLTEuMCwgLTEuMCwgLTEuMCwgMS4wLCAxLjAsIC0xLjAsIDEuMCwgLSAxLjAsIDEuMCwgMS4wLCAtIDEuMCwgMS4wIF0gKSwgZ2wuU1RBVElDX0RSQVcgKTtcblxuICAgIFx0XHQvLyBDcmVhdGUgUHJvZ3JhbVxuICAgIFx0XHR0aGlzLnRyYWNlclByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oIHRoaXMudmVydGV4X3NoYWRlciwgdGhpcy5mcmFnbWVudF9zaGFkZXIgKTtcbiAgICAgICAgdGhpcy50cmFjZXJWZXJ0ZXhBdHRyaWJ1dGUgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sICd2ZXJ0ZXgnKTtcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy50cmFjZXJWZXJ0ZXhBdHRyaWJ1dGUpO1xuXG4gICAgICAgIHRoaXMudGltZUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICd0aW1lJyApO1xuICAgICAgICB0aGlzLnJlc29sdXRpb25Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy50cmFjZXJQcm9ncmFtLCAncmVzb2x1dGlvbicgKTtcblxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX2J1ZmZlcl9sb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sIFwidV9idWZmZXJfdGV4dHVyZVwiKTtcbiAgICAgICAgdGhpcy50cmlhbmdsZV9sb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sIFwidV90cmlhbmdsZV90ZXh0dXJlXCIpO1xuICAgICAgICB0aGlzLmxpZ2h0X2xvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMudHJhY2VyUHJvZ3JhbSwgXCJ1X2xpZ2h0X3RleHR1cmVcIik7XG4gICAgICAgIHRoaXMuc3BoZXJlX2xvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMudHJhY2VyUHJvZ3JhbSwgXCJ1X3NwaGVyZV90ZXh0dXJlXCIpO1xuICAgICAgICB0aGlzLm1hdGVyaWFsX2xvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMudHJhY2VyUHJvZ3JhbSwgXCJ1X21hdGVyaWFsX3RleHR1cmVcIik7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJTYW1wbGVzTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMucmVuZGVyUHJvZ3JhbSwgJ3NhbXBsZXMnICk7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlKCk7XG4gICAgfSxcbiAgICAoKSA9PiB7fSk7XG4gIH1cblxuICBjcmVhdGVQcm9ncmFtKHZlcnRleCwgZnJhZ21lbnQpIHtcbiAgICBsZXQgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcblxuXHRcdGxldCB2cyA9IHRoaXMuY3JlYXRlU2hhZGVyKCB2ZXJ0ZXgsIGdsLlZFUlRFWF9TSEFERVIgKTtcblx0XHRsZXQgZnMgPSB0aGlzLmNyZWF0ZVNoYWRlciggZnJhZ21lbnQsIGdsLkZSQUdNRU5UX1NIQURFUiApO1xuXG5cdFx0Z2wuYXR0YWNoU2hhZGVyKCBwcm9ncmFtLCB2cyApO1xuXHRcdGdsLmF0dGFjaFNoYWRlciggcHJvZ3JhbSwgZnMgKTtcblxuXHRcdGdsLmRlbGV0ZVNoYWRlciggdnMgKTtcblx0XHRnbC5kZWxldGVTaGFkZXIoIGZzICk7XG5cblx0XHRnbC5saW5rUHJvZ3JhbSggcHJvZ3JhbSApO1xuXG5cdFx0aWYgKCAhZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggcHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMgKSApIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiBwcm9ncmFtO1xuICB9XG5cbiAgY3JlYXRlU2hhZGVyKHNyYywgdHlwZSkge1xuICAgIGxldCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoIHR5cGUgKTtcblxuXHRcdGdsLnNoYWRlclNvdXJjZSggc2hhZGVyLCBzcmMgKTtcblx0XHRnbC5jb21waWxlU2hhZGVyKCBzaGFkZXIgKTtcblxuXHRcdGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKCBzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiBzaGFkZXI7XG4gIH1cblxuICAvLyByZXNpemVDYW52YXMoZXZlbnQpIHtcbiAgLy8gICBpZih0aGlzLmNhbnZhcy53aWR0aCAhPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCB8fCB0aGlzLmNhbnZhcy5oZWlnaHQgIT0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0KSB7XG5cdC8vIFx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xuXHQvLyBcdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAvL1xuXHQvLyBcdFx0dGhpcy5wYXJhbWV0ZXJzLnNjcmVlbldpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XG5cdC8vIFx0XHR0aGlzLnBhcmFtZXRlcnMuc2NyZWVuSGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAvL1xuXHQvLyBcdFx0Z2wudmlld3BvcnQoIDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQgKTtcblx0Ly8gXHR9XG4gIC8vIH1cblxufVxuIiwiaW1wb3J0IHsgT2JqZWN0M2QgfSBmcm9tICcuL09iamVjdDNkJztcbmltcG9ydCB7IExvYWRPYmplY3RzIH0gZnJvbSAnLi9TaGFkZXJMb2FkZXInO1xuaW1wb3J0IHsgTWF0ZXJpYWwsIE1BVEVSSUFMX1RZUEVTIH0gZnJvbSAnLi9NYXRlcmlhbCc7XG5pbXBvcnQgeyBTcGhlcmUgfSBmcm9tICcuL1NwaGVyZSc7XG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tICcuL0NhbWVyYSc7XG5cbmV4cG9ydCBjbGFzcyBTY2VuZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub2JqZWN0cyA9IFtdO1xuICAgIHRoaXMuc3BoZXJlcyA9IFtdO1xuICAgIHRoaXMubWF0ZXJpYWxzID0gW107XG5cbiAgICB0aGlzLkNyZWF0ZURlZmF1bHRTY2VuZSgpO1xuICB9XG5cbiAgQ3JlYXRlRGVmYXVsdFNjZW5lKCkge1xuICAgIGxldCByZWRfbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwodmVjMy5mcm9tVmFsdWVzKDEsMCwwKSwgTUFURVJJQUxfVFlQRVMub3Jlbl9uYXlhcik7XG4gICAgbGV0IGdyZWVuX21hdGVyaWFsID0gbmV3IE1hdGVyaWFsKHZlYzMuZnJvbVZhbHVlcygwLDEsMCksIE1BVEVSSUFMX1RZUEVTLm9yZW5fbmF5YXIpO1xuICAgIGxldCBibHVlX21hdGVyaWFsID0gbmV3IE1hdGVyaWFsKHZlYzMuZnJvbVZhbHVlcygwLDAsMSksIE1BVEVSSUFMX1RZUEVTLm9yZW5fbmF5YXIpO1xuICAgIGxldCB3aGl0ZV9tYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCh2ZWMzLmZyb21WYWx1ZXMoMSwxLDEpLCBNQVRFUklBTF9UWVBFUy5vcmVuX25heWFyKTtcbiAgICBsZXQgZ3JlZW5fZ2xhc3MgPSBuZXcgTWF0ZXJpYWwodmVjMy5mcm9tVmFsdWVzKDAuNSwxLDAuNSksIE1BVEVSSUFMX1RZUEVTLnRyYW5zbWlzc2lvbik7XG4gICAgbGV0IHNwZWN1bGFyX3JlZF9tYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCh2ZWMzLmZyb21WYWx1ZXMoMSwwLDUsMC41KSwgTUFURVJJQUxfVFlQRVMuc3BlY3VsYXIpO1xuXG4gICAgbGV0IGVtaXNzaW9uX21hdGVyaWFsID0gbmV3IE1hdGVyaWFsKHZlYzMuZnJvbVZhbHVlcygxLDEsMSksIE1BVEVSSUFMX1RZUEVTLmVtaXNzaW9uKTtcbiAgICBlbWlzc2lvbl9tYXRlcmlhbC5lbWlzc2lvbl9yYXRlID0gMTAuMDtcbiAgICBsZXQgZW1pc3Npb25fcmVkX21hdGVyaWFsID0gbmV3IE1hdGVyaWFsKHZlYzMuZnJvbVZhbHVlcygxLDAuNywwLjcpLCBNQVRFUklBTF9UWVBFUy5lbWlzc2lvbik7XG4gICAgZW1pc3Npb25fcmVkX21hdGVyaWFsLmVtaXNzaW9uX3JhdGUgPSAyMC4wO1xuXG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaChyZWRfbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goZ3JlZW5fbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goYmx1ZV9tYXRlcmlhbCk7XG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaCh3aGl0ZV9tYXRlcmlhbCk7XG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaChncmVlbl9nbGFzcyk7XG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaChzcGVjdWxhcl9yZWRfbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goZW1pc3Npb25fbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goZW1pc3Npb25fcmVkX21hdGVyaWFsKTtcblxuICAgIC8vIExvYWQgb2JqZWN0cyBmcm9tIC5vYmogZmlsZXNcbiAgICBMb2FkT2JqZWN0cyhbXG4gICAgICB7ZmlsZU5hbWU6ICcuL2Rpc3QvbW9kZWxzL2xpZ2h0X3BsYW5lLm9iaicsIG1hdGVyaWFsOiBlbWlzc2lvbl9tYXRlcmlhbCB9LFxuICAgICAge2ZpbGVOYW1lOiAnLi9kaXN0L21vZGVscy9mbG9vci5vYmonLCBtYXRlcmlhbDogd2hpdGVfbWF0ZXJpYWwgfSxcbiAgICAgIHtmaWxlTmFtZTogJy4vZGlzdC9tb2RlbHMvcmlnaHRfd2FsbC5vYmonLCBtYXRlcmlhbDogYmx1ZV9tYXRlcmlhbCB9LFxuICAgICAge2ZpbGVOYW1lOiAnLi9kaXN0L21vZGVscy9sZWZ0X3dhbGwub2JqJywgbWF0ZXJpYWw6IHJlZF9tYXRlcmlhbH0sXG4gICAgICB7ZmlsZU5hbWU6ICcuL2Rpc3QvbW9kZWxzL3Jvb2Yub2JqJywgbWF0ZXJpYWw6IHdoaXRlX21hdGVyaWFsfSxcbiAgICBdLCAob2JqZWN0cykgPT4ge1xuICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIG9iamVjdHMpIHtcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgICgpID0+IHt9KTtcblxuICAgIHRoaXMuc3BoZXJlcy5wdXNoKG5ldyBTcGhlcmUodmVjMy5mcm9tVmFsdWVzKDUuMCwgLTMsIC0zLjUpLCAwLjUsIGVtaXNzaW9uX3JlZF9tYXRlcmlhbCkpO1xuICAgIHRoaXMuc3BoZXJlcy5wdXNoKG5ldyBTcGhlcmUodmVjMy5mcm9tVmFsdWVzKDguMCwgMS44LCAtMy4wKSwgMS44LCBncmVlbl9nbGFzcykpO1xuICAgIHRoaXMuc3BoZXJlcy5wdXNoKG5ldyBTcGhlcmUodmVjMy5mcm9tVmFsdWVzKDkuMCwgLTEuOCwgLTMuMCksIDEuOCwgd2hpdGVfbWF0ZXJpYWwpKTtcbiAgfVxuXG4gIEJ1aWxkU2NlbmVUZXh0dXJlcygpIHtcbiAgICBsZXQgdGV4dHVyZURhdGEgPSB7XG4gICAgICB0cmlhbmdsZXM6IG5ldyBGbG9hdDMyQXJyYXkoMjA0OCAqIDIwNDggKiAzKSxcbiAgICAgIHRyaWFuZ2xlX2NvdW50OiAwLFxuICAgICAgbWF0ZXJpYWxzOiBuZXcgRmxvYXQzMkFycmF5KDUxMiAqIDUxMiAqIDMpLFxuICAgICAgbWF0ZXJpYWxfY291bnQ6IDAsXG4gICAgICBzcGhlcmVzOiBuZXcgRmxvYXQzMkFycmF5KDUxMiAqIDUxMiAqIDMpLFxuICAgICAgc3BoZXJlX2NvdW50OiAwLFxuICAgICAgbGlnaHRfdHJpYW5nbGVzOiBuZXcgRmxvYXQzMkFycmF5KDEyOCAqIDEyOCAqIDMpLFxuICAgICAgbGlnaHRfY291bnQ6IDBcbiAgICB9O1xuXG4gICAgLy8gQnVpbGQgbWF0ZXJpYWwgZGF0YVxuICAgIGxldCBtYXRlcmlhbERhdGEgPSBbXTtcbiAgICBmb3IgKGxldCBtYXRlcmlhbCBvZiB0aGlzLm1hdGVyaWFscykge1xuICAgICAgLy8gQ29sb3JcbiAgICAgIG1hdGVyaWFsRGF0YS5wdXNoKG1hdGVyaWFsLmNvbG9yWzBdKTtcbiAgICAgIG1hdGVyaWFsRGF0YS5wdXNoKG1hdGVyaWFsLmNvbG9yWzFdKTtcbiAgICAgIG1hdGVyaWFsRGF0YS5wdXNoKG1hdGVyaWFsLmNvbG9yWzJdKTtcblxuICAgICAgLy8gRXh0cmEgZGF0YVxuICAgICAgbWF0ZXJpYWxEYXRhLnB1c2gobWF0ZXJpYWwubWF0ZXJpYWxfdHlwZSk7XG4gICAgICBtYXRlcmlhbERhdGEucHVzaChtYXRlcmlhbC5lbWlzc2lvbl9yYXRlKTtcbiAgICAgIG1hdGVyaWFsRGF0YS5wdXNoKDApO1xuICAgIH1cblxuICAgIHRleHR1cmVEYXRhLm1hdGVyaWFsX2NvdW50ID0gdGhpcy5tYXRlcmlhbHMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0ZXJpYWxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0ZXh0dXJlRGF0YS5tYXRlcmlhbHNbaV0gPSBtYXRlcmlhbERhdGFbaV07XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgc3BoZXJlIGRhdGFcbiAgICBsZXQgc3BoZXJlRGF0YSA9IFtdO1xuICAgIGZvciAobGV0IHNwaGVyZSBvZiB0aGlzLnNwaGVyZXMpIHtcbiAgICAgIC8vIEZpbmQgbWF0ZXJpYWwgaW5kZXggZm9yIGN1cnJlbnQgb2JqZWN0XG4gICAgICBsZXQgbWF0ZXJpYWxfaW5kZXggPSAwO1xuICAgICAgZm9yIChsZXQgbWF0X2lkeCA9IDA7IG1hdF9pZHggPCB0aGlzLm1hdGVyaWFscy5sZW5ndGg7IG1hdF9pZHgrKykge1xuICAgICAgICBpZiAodGhpcy5tYXRlcmlhbHNbbWF0X2lkeF0gPT09IHNwaGVyZS5tYXRlcmlhbCkge1xuICAgICAgICAgIG1hdGVyaWFsX2luZGV4ID0gbWF0X2lkeDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBQb3NpdGlvblxuICAgICAgc3BoZXJlRGF0YS5wdXNoKHNwaGVyZS5wb3NpdGlvblswXSk7XG4gICAgICBzcGhlcmVEYXRhLnB1c2goc3BoZXJlLnBvc2l0aW9uWzFdKTtcbiAgICAgIHNwaGVyZURhdGEucHVzaChzcGhlcmUucG9zaXRpb25bMl0pO1xuXG4gICAgICAvLyBFeHRyYSBkYXRhXG4gICAgICBzcGhlcmVEYXRhLnB1c2goc3BoZXJlLnJhZGl1cyk7XG4gICAgICBzcGhlcmVEYXRhLnB1c2gobWF0ZXJpYWxfaW5kZXgpO1xuICAgICAgc3BoZXJlRGF0YS5wdXNoKDApO1xuICAgIH1cblxuICAgIHRleHR1cmVEYXRhLnNwaGVyZV9jb3VudCA9IHRoaXMuc3BoZXJlcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRlcmlhbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRleHR1cmVEYXRhLnNwaGVyZXNbaV0gPSBzcGhlcmVEYXRhW2ldO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIHRyaWFuZ2xlIGRhdGFcbiAgICBsZXQgdHJpYW5nbGVEYXRhID0gW107XG4gICAgbGV0IGxpZ2h0RGF0YSA9IFtdO1xuICAgIGZvciAobGV0IG9iamVjdCBvZiB0aGlzLm9iamVjdHMpIHtcblxuICAgICAgLy8gRmluZCBtYXRlcmlhbCBpbmRleCBmb3IgY3VycmVudCBvYmplY3RcbiAgICAgIGxldCBtYXRlcmlhbF9pbmRleCA9IDA7XG4gICAgICBmb3IgKGxldCBtYXRfaWR4ID0gMDsgbWF0X2lkeCA8IHRoaXMubWF0ZXJpYWxzLmxlbmd0aDsgbWF0X2lkeCsrKSB7XG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsc1ttYXRfaWR4XSA9PT0gb2JqZWN0Lm1hdGVyaWFsKSB7XG4gICAgICAgICAgbWF0ZXJpYWxfaW5kZXggPSBtYXRfaWR4O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0cmlhbmdsZSBkYXRhXG4gICAgICBmb3IgKGxldCB0cmlhbmdsZSBvZiBvYmplY3QudHJpYW5nbGVzKSB7XG4gICAgICAgIC8vIHYwXG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYwWzBdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjBbMV0pO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MFsyXSk7XG5cbiAgICAgICAgLy8gRWRnZSAxXG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYxWzBdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjFbMV0pO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MVsyXSk7XG5cbiAgICAgICAgLy8gRWRnZSAyXG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYyWzBdKTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjJbMV0pO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MlsyXSk7XG5cbiAgICAgICAgLy8gRXh0cmEgZGF0YVxuICAgICAgICB0cmlhbmdsZURhdGEucHVzaChtYXRlcmlhbF9pbmRleCk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKDApO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCgwKTtcblxuICAgICAgICAvLyBBZGQgbGlnaHQgZGF0YVxuICAgICAgICBpZiAob2JqZWN0Lm1hdGVyaWFsLm1hdGVyaWFsX3R5cGUgPT0gTUFURVJJQUxfVFlQRVMuZW1pc3Npb24pIHtcbiAgICAgICAgICAvLyB2MFxuICAgICAgICAgIGxpZ2h0RGF0YS5wdXNoKHRyaWFuZ2xlLnYwWzBdKTtcbiAgICAgICAgICBsaWdodERhdGEucHVzaCh0cmlhbmdsZS52MFsxXSk7XG4gICAgICAgICAgbGlnaHREYXRhLnB1c2godHJpYW5nbGUudjBbMl0pO1xuXG4gICAgICAgICAgLy8gRWRnZSAxXG4gICAgICAgICAgbGlnaHREYXRhLnB1c2godHJpYW5nbGUudjFbMF0pO1xuICAgICAgICAgIGxpZ2h0RGF0YS5wdXNoKHRyaWFuZ2xlLnYxWzFdKTtcbiAgICAgICAgICBsaWdodERhdGEucHVzaCh0cmlhbmdsZS52MVsyXSk7XG5cbiAgICAgICAgICAvLyBFZGdlIDJcbiAgICAgICAgICBsaWdodERhdGEucHVzaCh0cmlhbmdsZS52MlswXSk7XG4gICAgICAgICAgbGlnaHREYXRhLnB1c2godHJpYW5nbGUudjJbMV0pO1xuICAgICAgICAgIGxpZ2h0RGF0YS5wdXNoKHRyaWFuZ2xlLnYyWzJdKTtcblxuICAgICAgICAgIC8vIEV4dHJhIGRhdGFcbiAgICAgICAgICBsaWdodERhdGEucHVzaChtYXRlcmlhbF9pbmRleCk7XG4gICAgICAgICAgbGlnaHREYXRhLnB1c2goMCk7XG4gICAgICAgICAgbGlnaHREYXRhLnB1c2goMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdHJpX2NvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFuZ2xlRGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGkgJSAxMiA9PSAwKSB0cmlfY291bnQrKztcbiAgICAgIHRleHR1cmVEYXRhLnRyaWFuZ2xlc1tpXSA9IHRyaWFuZ2xlRGF0YVtpXTtcbiAgICB9XG4gICAgdGV4dHVyZURhdGEudHJpYW5nbGVfY291bnQgPSB0cmlfY291bnQ7XG5cbiAgICBsZXQgbGlnaHRfY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlnaHREYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoaSAlIDEyID09IDApIGxpZ2h0X2NvdW50Kys7XG4gICAgICB0ZXh0dXJlRGF0YS5saWdodF90cmlhbmdsZXNbaV0gPSBsaWdodERhdGFbaV07XG4gICAgfVxuICAgIHRleHR1cmVEYXRhLmxpZ2h0X2NvdW50ID0gbGlnaHRfY291bnQ7XG5cbiAgICByZXR1cm4gdGV4dHVyZURhdGE7XG4gIH1cbn1cbiIsImltcG9ydCB7IE9iamVjdDNkIH0gZnJvbSAnLi9PYmplY3QzZCc7XG5cbmZ1bmN0aW9uIExvYWRTaGFkZXIoZmlsZU5hbWUsIGluZGV4LCBjYWxsYmFjaykge1xuICBqUXVlcnkuZ2V0KGZpbGVOYW1lLCAoZGF0YSkgPT4ge1xuICAgIGNhbGxiYWNrKGRhdGEsIGluZGV4KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMb2FkU2hhZGVycyhmaWxlTmFtZXMsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gIGxldCBsb2FkZWRfZmlsZXMgPSAwO1xuICBsZXQgc2hhZGVyX2ZpbGVzID0gW107XG4gIGZvciAobGV0IGZpbGVfaW5kZXggPSAwOyBmaWxlX2luZGV4IDwgZmlsZU5hbWVzLmxlbmd0aDsgZmlsZV9pbmRleCsrKSB7XG4gICAgICBMb2FkU2hhZGVyKGZpbGVOYW1lc1tmaWxlX2luZGV4XSwgZmlsZV9pbmRleCwgKGRhdGEsIHNoYWRlcl9pbmRleCkgPT4ge1xuICAgICAgICBzaGFkZXJfZmlsZXNbc2hhZGVyX2luZGV4XSA9IGRhdGE7XG5cbiAgICAgICAgbG9hZGVkX2ZpbGVzKys7XG4gICAgICAgIGlmIChsb2FkZWRfZmlsZXMgPT0gZmlsZU5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgIGxldCB0b3RhbF9zaGFkZXJfZGF0YSA9ICcnO1xuICAgICAgICAgIGZvciAobGV0IHNoYWRlcl9kYXRhIG9mIHNoYWRlcl9maWxlcykge1xuICAgICAgICAgICAgdG90YWxfc2hhZGVyX2RhdGEgKz0gc2hhZGVyX2RhdGE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhbGxiYWNrKHRvdGFsX3NoYWRlcl9kYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBMb2FkT2JqZWN0cyhmaWxlTmFtZXMsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgbGV0IGxvYWRlZF9maWxlcyA9IDA7XG4gICAgbGV0IG9iamVjdF9maWxlcyA9IFtdO1xuICAgIGZvciAobGV0IGZpbGVfaW5kZXggPSAwOyBmaWxlX2luZGV4IDwgZmlsZU5hbWVzLmxlbmd0aDsgZmlsZV9pbmRleCsrKSB7XG4gICAgICAgIExvYWRTaGFkZXIoZmlsZU5hbWVzW2ZpbGVfaW5kZXhdLmZpbGVOYW1lLCBmaWxlX2luZGV4LCAoZGF0YSwgc2hhZGVyX2luZGV4KSA9PiB7XG4gICAgICAgICAgbGV0IG9iamVjdCA9IE9iamVjdDNkLkxvYWRPYmooZGF0YSwgZmlsZU5hbWVzW3NoYWRlcl9pbmRleF0ubWF0ZXJpYWwpO1xuICAgICAgICAgIG9iamVjdF9maWxlc1tzaGFkZXJfaW5kZXhdID0gb2JqZWN0O1xuICAgICAgICAgIGxvYWRlZF9maWxlcysrO1xuICAgICAgICAgIGlmIChsb2FkZWRfZmlsZXMgPT0gZmlsZU5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FsbGJhY2sob2JqZWN0X2ZpbGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFNwaGVyZSB7XG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uLCByYWRpdXMsIG1hdGVyaWFsKSB7XG4gICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy5fbWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgfVxuXG4gIGdldCBwb3NpdGlvbigpIHsgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uOyB9XG4gIGdldCByYWRpdXMoKSB7IHJldHVybiB0aGlzLl9yYWRpdXM7IH1cbiAgZ2V0IG1hdGVyaWFsKCkgeyByZXR1cm4gdGhpcy5fbWF0ZXJpYWw7IH1cbn1cbiJdfQ==
