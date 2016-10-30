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
        vec3.subtract(this._direction, this._look_at, this._position);
        vec3.normalize(this._direction, this._direction);

        var up_vector = vec3.fromValues(0, 0, 1);
        this._camera_right = vec3.fromValues(0, 0, 0);
        this._camera_up = vec3.fromValues(0, 0, 0);
        vec3.cross(this._camera_right, this._direction, up_vector);
        vec3.cross(this._camera_up, this._camera_right, this._direction);
      }
    },
    camera_up: {
      get: function get() {
        return this._camera_up;
      }
    },
    camera_right: {
      get: function get() {
        return this._camera_right;
      }
    },
    look_at: {
      get: function get() {
        return this._look_at;
      },
      set: function set(look_at) {
        this._look_at = look_at;
      }
    },
    position: {
      get: function get() {
        return this._position;
      },
      set: function set(new_position) {
        this._position = new_position;
      }
    },
    direction: {
      get: function get() {
        return this._direction;
      }
    },
    hasChanged: {
      get: function get() {
        return this._hasChanged;
      },
      set: function set(changed) {
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

        gl.uniform1f(_this.timeLocation, _this.parameters.time / 1000);
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
        gl.uniform1i(this.sphere_location, 2);
        gl.uniform1i(this.material_location, 3);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.triangleTexture);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.sphereTexture);
        gl.activeTexture(gl.TEXTURE3);
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

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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
        emission_material.emission_rate = 5;
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
          sphere_count: 0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9DYW1lcmEuanMiLCIvVXNlcnMvZmlsbGUvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL01hdGVyaWFsLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9OYXZpZ2F0b3IuanMiLCIvVXNlcnMvZmlsbGUvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL09iamVjdDNkLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9QYXRodHJhY2VyLmpzIiwiL1VzZXJzL2ZpbGxlL0dpdGh1Yi9XZWJHTF9QYXRodHJhY2VyL3NyYy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9maWxsZS9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvU2NlbmUuanMiLCIvVXNlcnMvZmlsbGUvR2l0aHViL1dlYkdMX1BhdGh0cmFjZXIvc3JjL1NoYWRlckxvYWRlci5qcyIsIi9Vc2Vycy9maWxsZS9HaXRodWIvV2ViR0xfUGF0aHRyYWNlci9zcmMvU3BoZXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtBQUFFLFVBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEs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QUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsNEJBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLDRCQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O0FBR2xDLDRCQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyw0QkFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsNEJBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUFHbEMsNEJBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLDRCQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyw0QkFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUdsQyw0QkFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsQyw0QkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQiw0QkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUN0Qjs7Ozs7Ozs7Ozs7Ozs7O1dBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxZQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDbEIsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDNUMsY0FBSSxDQUFDLEdBQUcsRUFBRSxJ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QUFDckMsVUFBTTtXQUFBLFlBQUc7QUFBRSxlQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7T0FBRTs7QUFDakMsWUFBUTtXQUFBLFlBQUc7QUFBRSxlQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7T0FBRTs7OztTQVQ5QixNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgUGF0aHRyYWNlciA9IHJlcXVpcmUoXCIuL1BhdGh0cmFjZXJcIikuUGF0aHRyYWNlcjtcblxuZ2xvYmFsLmFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgLy9sZXQgbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwoMSwgdmVjMy5mcm9tVmFsdWVzKDEsMSwxKSk7XG4gIHZhciBwYXRodHJhY2VyID0gbmV3IFBhdGh0cmFjZXIoKTtcbn07XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTltYVd4c1pTOUhhWFJvZFdJdlYyVmlSMHhmVUdGMGFIUnlZV05sY2k5emNtTXZZWEJ3TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRU3haUVVGWkxFTkJRVU03TzBGQlJXSXNTVUZHVXl4VlFVRlZMRWRCUVVFc1QwRkJRU3hEUVVGUkxHTkJRV01zUTBGQlFTeERRVUZvUXl4VlFVRlZMRU5CUVVFN08wRkJSVzVDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRWRCUVVjc1dVRkJXVHM3UVVGRmRrSXNUVUZCU1N4VlFVRlZMRWRCUVVjc1NVRkJTU3hWUVVGVkxFVkJRVVVzUTBGQlF6dERRVU51UXl4RFFVRkRJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKcGJYQnZjblFnZXlCUVlYUm9kSEpoWTJWeUlIMGdabkp2YlNBbkxpOVFZWFJvZEhKaFkyVnlKenRjYmx4dVoyeHZZbUZzTG1Gd2NDQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdMeTlzWlhRZ2JXRjBaWEpwWVd3Z1BTQnVaWGNnVFdGMFpYSnBZV3dvTVN3Z2RtVmpNeTVtY205dFZtRnNkV1Z6S0RFc01Td3hLU2s3WEc0Z0lHeGxkQ0J3WVhSb2RISmhZMlZ5SUQwZ2JtVjNJRkJoZEdoMGNtRmpaWElvS1R0Y2JuMDdYRzRpWFgwPSIsImV4cG9ydCBjbGFzcyBDYW1lcmEge1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLl9sb29rX2F0ID0gdmVjMy5mcm9tVmFsdWVzKDUsMCwwKTtcbiAgICB0aGlzLl9kaXJlY3Rpb24gPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgIHRoaXMuX2hhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHZlYzMuc3VidHJhY3QodGhpcy5fZGlyZWN0aW9uLCB0aGlzLl9sb29rX2F0LCB0aGlzLl9wb3NpdGlvbik7XG4gICAgdmVjMy5ub3JtYWxpemUodGhpcy5fZGlyZWN0aW9uLCB0aGlzLl9kaXJlY3Rpb24pO1xuXG4gICAgbGV0IHVwX3ZlY3RvciA9IHZlYzMuZnJvbVZhbHVlcygwLDAsMSk7XG4gICAgdGhpcy5fY2FtZXJhX3JpZ2h0ID0gdmVjMy5mcm9tVmFsdWVzKDAsMCwwKTtcbiAgICB0aGlzLl9jYW1lcmFfdXAgPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgIHZlYzMuY3Jvc3ModGhpcy5fY2FtZXJhX3JpZ2h0LCB0aGlzLl9kaXJlY3Rpb24sIHVwX3ZlY3Rvcik7XG4gICAgdmVjMy5jcm9zcyh0aGlzLl9jYW1lcmFfdXAsIHRoaXMuX2NhbWVyYV9yaWdodCwgdGhpcy5fZGlyZWN0aW9uKTtcbiAgfVxuXG4gIGdldCBjYW1lcmFfdXAoKSB7IHJldHVybiB0aGlzLl9jYW1lcmFfdXA7IH1cbiAgZ2V0IGNhbWVyYV9yaWdodCgpIHsgcmV0dXJuIHRoaXMuX2NhbWVyYV9yaWdodDsgfVxuICBnZXQgbG9va19hdCgpIHsgcmV0dXJuIHRoaXMuX2xvb2tfYXQ7IH1cbiAgZ2V0IHBvc2l0aW9uKCkgeyByZXR1cm4gdGhpcy5fcG9zaXRpb247IH1cbiAgZ2V0IGRpcmVjdGlvbigpIHsgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjsgfVxuICBnZXQgaGFzQ2hhbmdlZCgpIHsgcmV0dXJuIHRoaXMuX2hhc0NoYW5nZWQ7IH1cblxuICBzZXQgcG9zaXRpb24obmV3X3Bvc2l0aW9uKSB7IHRoaXMuX3Bvc2l0aW9uID0gbmV3X3Bvc2l0aW9uOyB9XG4gIHNldCBoYXNDaGFuZ2VkKGNoYW5nZWQpIHsgdGhpcy5faGFzQ2hhbmdlZCA9IGNoYW5nZWQ7IH1cbiAgc2V0IGxvb2tfYXQobG9va19hdCkgeyB0aGlzLl9sb29rX2F0ID0gbG9va19hdDsgfVxufVxuIiwiZXhwb3J0IGNvbnN0IE1BVEVSSUFMX1RZUEVTID0ge1xuICBsYW1iZXJ0aWFuOiAwLFxuICBzcGVjdWxhcjogMSxcbiAgZW1pc3Npb246IDIsXG4gIHRyYW5zbWlzc2lvbjogMyxcbiAgb3Jlbl9uYXlhcjogNFxufVxuXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWwge1xuICAgIGNvbnN0cnVjdG9yKGNvbG9yLCBtYXRlcmlhbF90eXBlKSB7XG4gICAgICB0aGlzLl9tYXRlcmlhbF90eXBlID0gbWF0ZXJpYWxfdHlwZTtcbiAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG4gICAgICB0aGlzLl9lbWlzc2lvbl9yYXRlID0gbWF0ZXJpYWxfdHlwZSA9PSAyID8gMTAgOiAwO1xuICAgIH1cblxuICAgIGdldCBtYXRlcmlhbF90eXBlKCkgeyByZXR1cm4gdGhpcy5fbWF0ZXJpYWxfdHlwZTsgfVxuICAgIGdldCBjb2xvcigpIHsgcmV0dXJuIHRoaXMuX2NvbG9yOyB9XG4gICAgZ2V0IGVtaXNzaW9uX3JhdGUoKSB7IHJldHVybiB0aGlzLl9lbWlzc2lvbl9yYXRlOyB9XG4gICAgc2V0IGVtaXNzaW9uX3JhdGUocmF0ZSkgeyB0aGlzLl9lbWlzc2lvbl9yYXRlID0gcmF0ZTsgfVxufVxuIiwiXG5leHBvcnQgY2xhc3MgTmF2aWdhdG9yIHtcbiAgY29uc3RydWN0b3IoY2FtZXJhKSB7XG4gICAgdGhpcy5yZW5kZXJfY2FudmFzID0gJCgnI3JlbmRlci1jYW52YXMnKTtcbiAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcblxuICAgIHRoaXMuc2V0dXBDYW1lcmFNb3ZlKCk7XG4gICAgdGhpcy5zZXR1cENhbWVyYVpvb20oKTtcbiAgICB0aGlzLnNldHVwQ2FtZXJhUm90YXRpb24oKTtcbiAgfVxuXG4gIHNldHVwQ2FtZXJhTW92ZSgpIHtcbiAgICB0aGlzLm1pZGRsZV9tb3VzZV9kb3duID0gZmFsc2U7XG4gICAgdGhpcy5zdGFydF9jYW1lcmFfcG9zaXRpb24gPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgIHRoaXMuc3RhcnRfbG9va2F0X3Bvc2l0aW9uID0gdmVjMy5mcm9tVmFsdWVzKDAsMCwwKTtcbiAgICB0aGlzLnN0YXJ0X21vdXNlX3Bvc2l0aW9uID0ge3g6IDAsIHk6IDB9O1xuXG4gICAgLy8gTW91c2UgbW92ZVxuICAgIHRoaXMucmVuZGVyX2NhbnZhcy5tb3VzZW1vdmUoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5taWRkbGVfbW91c2VfZG93bikge1xuICAgICAgICBsZXQgdXYgPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgICAgICBsZXQgdSA9IHZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgICAgIGxldCB2ID0gdmVjMy5mcm9tVmFsdWVzKDAsMCwwKTtcblxuICAgICAgICB2ZWMzLnNjYWxlKHUsIHRoaXMuY2FtZXJhLmNhbWVyYV9yaWdodCwgLTUgKiAoZXZlbnQucGFnZVggLyA1MTIgLSAwLjUpIC0gdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi54KTtcbiAgICAgICAgdmVjMy5zY2FsZSh2LCB0aGlzLmNhbWVyYS5jYW1lcmFfdXAsIDUgKiAoZXZlbnQucGFnZVkgLyA1MTIgLSAwLjUpIC0gdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi55KTtcblxuICAgICAgICB2ZWMzLmFkZCh1diwgdSwgdik7XG4gICAgICAgIHZlYzMuYWRkKHRoaXMuY2FtZXJhLnBvc2l0aW9uLCB0aGlzLnN0YXJ0X2NhbWVyYV9wb3NpdGlvbiwgdXYpO1xuICAgICAgICB2ZWMzLmFkZCh0aGlzLmNhbWVyYS5sb29rX2F0LCB0aGlzLnN0YXJ0X2xvb2thdF9wb3NpdGlvbiwgdXYpO1xuXG4gICAgICAgIHRoaXMuY2FtZXJhLmhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNlZG93bigoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC53aGljaCA9PSAyKSB7XG4gICAgICAgIHRoaXMuc3RhcnRfbW91c2VfcG9zaXRpb24ueCA9IC01ICogKGV2ZW50LnBhZ2VYIC8gNTEyIC0gMC41KTtcbiAgICAgICAgdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi55ID0gNSAqIChldmVudC5wYWdlWSAvIDUxMiAtIDAuNSk7XG4gICAgICAgIHRoaXMuc3RhcnRfY2FtZXJhX3Bvc2l0aW9uID0gdmVjMy5mcm9tVmFsdWVzKHRoaXMuY2FtZXJhLnBvc2l0aW9uWzBdLCB0aGlzLmNhbWVyYS5wb3NpdGlvblsxXSwgdGhpcy5jYW1lcmEucG9zaXRpb25bMl0pO1xuICAgICAgICB0aGlzLnN0YXJ0X2xvb2thdF9wb3NpdGlvbiA9IHZlYzMuZnJvbVZhbHVlcyh0aGlzLmNhbWVyYS5sb29rX2F0WzBdLCB0aGlzLmNhbWVyYS5sb29rX2F0WzFdLCB0aGlzLmNhbWVyYS5sb29rX2F0WzJdKTtcblxuICAgICAgICB0aGlzLm1pZGRsZV9tb3VzZV9kb3duID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVuZGVyX2NhbnZhcy5tb3VzZXVwKChldmVudCkgPT4gdGhpcy5taWRkbGVfbW91c2VfZG93biA9IGZhbHNlICk7XG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNlb3V0KChldmVudCkgPT4gdGhpcy5taWRkbGVfbW91c2VfZG93biA9IGZhbHNlICk7XG4gIH1cblxuICBzZXR1cENhbWVyYVpvb20oKSB7XG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm9uKCdtb3VzZXdoZWVsJywgKGV2ZW50KSA9PiB7XG4gICAgICBsZXQgbmV3X2RpcmVjdGlvbiA9IHZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudC53aGVlbERlbHRhID4gMCB8fCBldmVudC5vcmlnaW5hbEV2ZW50LmRldGFpbCA8IDApIHtcbiAgICAgICAgdmVjMy5zY2FsZShuZXdfZGlyZWN0aW9uLCB0aGlzLmNhbWVyYS5kaXJlY3Rpb24sIDAuNSk7XG4gICAgICAgIHZlYzMuYWRkKHRoaXMuY2FtZXJhLnBvc2l0aW9uLCB0aGlzLmNhbWVyYS5wb3NpdGlvbiwgbmV3X2RpcmVjdGlvbik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmVjMy5zY2FsZShuZXdfZGlyZWN0aW9uLCB0aGlzLmNhbWVyYS5kaXJlY3Rpb24sIC0wLjUpO1xuICAgICAgICB2ZWMzLmFkZCh0aGlzLmNhbWVyYS5wb3NpdGlvbiwgdGhpcy5jYW1lcmEucG9zaXRpb24sIG5ld19kaXJlY3Rpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5jYW1lcmEuaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBzZXR1cENhbWVyYVJvdGF0aW9uKCkge1xuICAgIHRoaXMubGVmdF9tb3VzZV9kb3duID0gZmFsc2U7XG4gICAgdGhpcy5zdGFydF9jYW1lcmFfcG9zaXRpb24gPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgIHRoaXMuc3RhcnRfbW91c2VfcG9zaXRpb24gPSB7eDogMCwgeTogMH07XG5cbiAgICAvLyBNb3VzZSBtb3ZlXG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNlbW92ZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLmxlZnRfbW91c2VfZG93bikge1xuICAgICAgICBsZXQgdXYgPSB2ZWMzLmZyb21WYWx1ZXMoMCwwLDApO1xuICAgICAgICBsZXQgdSA9IHZlYzMuZnJvbVZhbHVlcygwLDAsMCk7XG4gICAgICAgIGxldCB2ID0gdmVjMy5mcm9tVmFsdWVzKDAsMCwwKTtcblxuICAgICAgICB2ZWMzLnNjYWxlKHUsIHRoaXMuY2FtZXJhLmNhbWVyYV9yaWdodCwgLTggKiAoZXZlbnQucGFnZVggLyA1MTIgLSAwLjUpIC0gdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi54KTtcbiAgICAgICAgdmVjMy5zY2FsZSh2LCB0aGlzLmNhbWVyYS5jYW1lcmFfdXAsIDggKiAoZXZlbnQucGFnZVkgLyA1MTIgLSAwLjUpIC0gdGhpcy5zdGFydF9tb3VzZV9wb3NpdGlvbi55KTtcblxuICAgICAgICB2ZWMzLmFkZCh1diwgdSwgdik7XG4gICAgICAgIHZlYzMuYWRkKHRoaXMuY2FtZXJhLnBvc2l0aW9uLCB0aGlzLnN0YXJ0X2NhbWVyYV9wb3NpdGlvbiwgdXYpO1xuXG4gICAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmNhbWVyYS5oYXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucmVuZGVyX2NhbnZhcy5tb3VzZWRvd24oKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMSkge1xuICAgICAgICB0aGlzLnN0YXJ0X21vdXNlX3Bvc2l0aW9uLnggPSAtOCAqIChldmVudC5wYWdlWCAvIDUxMiAtIDAuNSk7XG4gICAgICAgIHRoaXMuc3RhcnRfbW91c2VfcG9zaXRpb24ueSA9IDggKiAoZXZlbnQucGFnZVkgLyA1MTIgLSAwLjUpO1xuICAgICAgICB0aGlzLnN0YXJ0X2NhbWVyYV9wb3NpdGlvbiA9IHZlYzMuZnJvbVZhbHVlcyh0aGlzLmNhbWVyYS5wb3NpdGlvblswXSwgdGhpcy5jYW1lcmEucG9zaXRpb25bMV0sIHRoaXMuY2FtZXJhLnBvc2l0aW9uWzJdKTtcbiAgICAgICAgdGhpcy5sZWZ0X21vdXNlX2Rvd24gPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNldXAoKGV2ZW50KSA9PiB0aGlzLmxlZnRfbW91c2VfZG93biA9IGZhbHNlICk7XG4gICAgdGhpcy5yZW5kZXJfY2FudmFzLm1vdXNlb3V0KChldmVudCkgPT4gdGhpcy5sZWZ0X21vdXNlX2Rvd24gPSBmYWxzZSApO1xuICB9XG59XG4iLCJjbGFzcyBUcmlhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKHYwLCB2MSwgdjIpIHtcbiAgICB0aGlzLl92MCA9IHYwO1xuICAgIHRoaXMuX3YxID0gdjE7XG4gICAgdGhpcy5fdjIgPSB2MjtcblxuICAgIHRoaXMuX2VkZ2UxID0gdmVjMy5jcmVhdGUoKTtcbiAgICB2ZWMzLnN1YnRyYWN0KHRoaXMuX2VkZ2UxLCB2MCwgdjEpO1xuICAgIHRoaXMuX2VkZ2UyID0gdmVjMy5jcmVhdGUoKTtcbiAgICB2ZWMzLnN1YnRyYWN0KHRoaXMuX2VkZ2UyLCB2MCwgdjIpO1xuICB9XG5cbiAgZ2V0IHYwKCkgeyByZXR1cm4gdGhpcy5fdjA7IH1cbiAgZ2V0IHYxKCkgeyByZXR1cm4gdGhpcy5fdjE7IH1cbiAgZ2V0IHYyKCkgeyByZXR1cm4gdGhpcy5fdjI7IH1cbiAgZ2V0IGVkZ2UxKCkgeyByZXR1cm4gdGhpcy5fZWRnZTE7IH1cbiAgZ2V0IGVkZ2UyKCkgeyByZXR1cm4gdGhpcy5fZWRnZTI7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE9iamVjdDNkIHtcbiAgY29uc3RydWN0b3IodHJpYW5nbGVzLCBtYXRlcmlhbCkge1xuICAgIHRoaXMuX3RyaWFuZ2xlcyA9IHRyaWFuZ2xlcztcbiAgICB0aGlzLl9tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICB9XG5cbiAgc3RhdGljIExvYWRPYmoob2JqRGF0YSwgbWF0ZXJpYWwpIHtcbiAgICAgIGxldCB2ZXJ0aWNlcyA9IFtdO1xuICAgICAgbGV0IHRyaWFuZ2xlcyA9IFtdO1xuXG4gICAgICBsZXQgbGluZXMgPSBvYmpEYXRhLnNwbGl0KCdcXG4nKTtcbiAgICAgIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBsaW5lLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgc3dpdGNoIChjb21wb25lbnRzWzBdKSB7XG4gICAgICAgICAgLy8gVmVydGV4IGluZGljZXNcbiAgICAgICAgICBjYXNlICdmJzpcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKG5ldyBUcmlhbmdsZSh2ZXJ0aWNlc1tjb21wb25lbnRzWzFdIC0gMV0sIHZlcnRpY2VzW2NvbXBvbmVudHNbMl0gLSAxXSwgdmVydGljZXNbY29tcG9uZW50c1szXSAtIDFdKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIC8vIFZlcnRleCBwb3NpdGlvbnNcbiAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVjMy5mcm9tVmFsdWVzKGNvbXBvbmVudHNbMV0sIGNvbXBvbmVudHNbMl0sIGNvbXBvbmVudHNbM10pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgT2JqZWN0M2QodHJpYW5nbGVzLCBtYXRlcmlhbCk7XG4gIH1cblxuICBnZXQgdHJpYW5nbGVzKCkgeyByZXR1cm4gdGhpcy5fdHJpYW5nbGVzOyB9XG4gIGdldCBtYXRlcmlhbCgpIHsgcmV0dXJuIHRoaXMuX21hdGVyaWFsOyB9XG59XG4iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gJy4vU2NlbmUnO1xuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gJy4vQ2FtZXJhJztcbmltcG9ydCB7IE5hdmlnYXRvciB9IGZyb20gJy4vTmF2aWdhdG9yJztcblxuZXhwb3J0IGNsYXNzIFBhdGh0cmFjZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKCk7XG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhKHZlYzMuZnJvbVZhbHVlcygtMSwwLDApLCB2ZWMzLmZyb21WYWx1ZXMoMSwwLDApKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKHRoaXMuY2FtZXJhKTtcbiAgICB0aGlzLm5hdmlnYXRvciA9IG5ldyBOYXZpZ2F0b3IodGhpcy5jYW1lcmEpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcmVyLmFkZFNjZW5lVGV4dHVyZXModGhpcy5zY2VuZS5CdWlsZFNjZW5lVGV4dHVyZXMoKSksIDEwMCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IExvYWRTaGFkZXJzIH0gZnJvbSAnLi9TaGFkZXJMb2FkZXInO1xuXG5mdW5jdGlvbiB0aHJvd09uR0xFcnJvcihlcnIsIGZ1bmNOYW1lLCBhcmdzKSB7XG4gIHRocm93IFdlYkdMRGVidWdVdGlscy5nbEVudW1Ub1N0cmluZyhlcnIpICsgXCIgd2FzIGNhdXNlZCBieSBjYWxsIHRvOiBcIiArIGZ1bmNOYW1lO1xufTtcblxudmFyIGdsID0gbnVsbDtcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoY2FtZXJhKSB7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG5cbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgdGhpcy5idWZmZXI7XG4gICAgdGhpcy52ZXJ0ZXhfc2hhZGVyO1xuICAgIHRoaXMuZnJhZ21lbnRfc2hhZGVyO1xuICAgIHRoaXMucmVuZGVyUHJvZ3JhbTtcbiAgICB0aGlzLnZlcnRleF9wb3NpdGlvbjtcbiAgICB0aGlzLnRpbWVMb2NhdGlvbjtcbiAgICB0aGlzLnJlc29sdXRpb25Mb2NhdGlvbjtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7IHN0YXJ0X3RpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLCB0aW1lOiAwLCBzY3JlZW5XaWR0aCA6IDAsIHNjcmVlbkhlaWdodDogMCwgc2FtcGxlczogMCB9O1xuXG4gICAgdGhpcy5zYW1wbGVzTG9jYXRpb247XG4gICAgdGhpcy5yZW5kZXJTYW1wbGVzTG9jYXRpb247XG4gICAgdGhpcy5hY2N1bXVsYXRlZF9idWZmZXJfbG9jYXRpb247XG5cbiAgICB0aGlzLnZlcnRleEJ1ZmZlciA9IG51bGw7XG4gICAgdGhpcy5mcmFtZUJ1ZmZlciA9IG51bGw7XG4gICAgdGhpcy50ZXh0dXJlcyA9IFtdO1xuICAgIHRoaXMudHJhY2VyUHJvZ3JhbSA9IG51bGw7XG4gICAgdGhpcy5yZW5kZXJWZXJ0ZXhBdHRyaWJ1dGUgPSBudWxsO1xuXG4gICAgdGhpcy50cmlhbmdsZV9sb2NhdGlvbjtcbiAgICB0aGlzLnRyaWFuZ2xlVGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5tYXRlcmlhbF9sb2NhdGlvbjtcbiAgICB0aGlzLm1hdGVyaWFsVGV4dHVyZSA9IG51bGw7XG4gICAgdGhpcy5zcGhlcmVMb2NhdGlvbjtcbiAgICB0aGlzLnNwaGVyZVRleHR1cmUgPSBudWxsO1xuXG4gICAgdGhpcy5yZW5kZXJlclJlYWR5ID0gZmFsc2U7XG5cbiAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcbiAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgdGhpcy5hbmltYXRlID0gKHRpbWUpID0+IHtcbiAgICAgIGlmICh0aGlzLnJlbmRlcmVyUmVhZHkpIHtcbiAgICAgICAgLy90aGlzLnJlc2l6ZUNhbnZhcygpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDUxMjtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gNTEyO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2NyZWVuV2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgIFx0dGhpcy5wYXJhbWV0ZXJzLnNjcmVlbkhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgZ2wudmlld3BvcnQoIDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQgKTtcblxuICAgICAgICAvLyByZW5kZXIgdG8gdGV4dHVyZVxuICAgICAgICBnbC51c2VQcm9ncmFtKHRoaXMudHJhY2VyUHJvZ3JhbSk7XG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRleHR1cmVzWzBdKTtcblxuICAgICAgICAvLyBTZXQgY2FtZXJhIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuc2V0Q2FtZXJhUG9zaXRpb24oKTtcblxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXIpO1xuICAgICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuZnJhbWVCdWZmZXIpO1xuICAgICAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgZ2wuQ09MT1JfQVRUQUNITUVOVDAsIGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZXNbMV0sIDApO1xuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMudHJhY2VyVmVydGV4QXR0cmlidXRlLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKTtcblxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5wYXJhbWV0ZXJzLnN0YXJ0X3RpbWU7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zYW1wbGVzICs9IDE7XG5cbiAgICAgICAgZ2wudW5pZm9ybTFmKCB0aGlzLnRpbWVMb2NhdGlvbiwgdGhpcy5wYXJhbWV0ZXJzLnRpbWUgLyAxMDAwICk7XG4gICAgICAgIGdsLnVuaWZvcm0yZiggdGhpcy5yZXNvbHV0aW9uTG9jYXRpb24sIHRoaXMucGFyYW1ldGVycy5zY3JlZW5XaWR0aCwgdGhpcy5wYXJhbWV0ZXJzLnNjcmVlbkhlaWdodCApO1xuXG4gICAgICAgIHRoaXMudGV4dHVyZXMucmV2ZXJzZSgpO1xuXG4gICAgICAgIGdsLnVzZVByb2dyYW0odGhpcy5yZW5kZXJQcm9ncmFtKTtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlc1swXSk7XG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEJ1ZmZlcik7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5yZW5kZXJWZXJ0ZXhBdHRyaWJ1dGUsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuICAgICAgICBnbC51bmlmb3JtMWYoIHRoaXMucmVuZGVyU2FtcGxlc0xvY2F0aW9uLCAgdGhpcy5wYXJhbWV0ZXJzLnNhbXBsZXMgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYWxjdWxhdGVTUFMoKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbC1zYW1wbGVzJykuaW5uZXJIVE1MID0gdGhpcy5wYXJhbWV0ZXJzLnNhbXBsZXM7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMuYW5pbWF0ZSApO1xuICAgICAgLy9zZXRUaW1lb3V0KHRoaXMuYW5pbWF0ZSwgMTAwMC8xMjApO1xuICAgIH1cbiAgfVxuXG4gIHNldENhbWVyYVBvc2l0aW9uKCkge1xuICAgIGlmICh0aGlzLmNhbWVyYSAhPSBudWxsKSB7XG4gICAgICBnbC51bmlmb3JtM2YoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICdjYW1lcmFfcmlnaHQnKSwgdGhpcy5jYW1lcmEuY2FtZXJhX3JpZ2h0WzBdLCB0aGlzLmNhbWVyYS5jYW1lcmFfcmlnaHRbMV0sIHRoaXMuY2FtZXJhLmNhbWVyYV9yaWdodFsyXSApO1xuICAgICAgZ2wudW5pZm9ybTNmKGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy50cmFjZXJQcm9ncmFtLCAnY2FtZXJhX3VwJyksIHRoaXMuY2FtZXJhLmNhbWVyYV91cFswXSwgdGhpcy5jYW1lcmEuY2FtZXJhX3VwWzFdLCB0aGlzLmNhbWVyYS5jYW1lcmFfdXBbMl0gKTtcbiAgICAgIGdsLnVuaWZvcm0zZihnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMudHJhY2VyUHJvZ3JhbSwgJ2NhbWVyYV9wb3NpdGlvbicpLCB0aGlzLmNhbWVyYS5wb3NpdGlvblswXSwgdGhpcy5jYW1lcmEucG9zaXRpb25bMV0sIHRoaXMuY2FtZXJhLnBvc2l0aW9uWzJdICk7XG4gICAgICBnbC51bmlmb3JtM2YoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICdjYW1lcmFfZGlyZWN0aW9uJyksIHRoaXMuY2FtZXJhLmRpcmVjdGlvblswXSwgdGhpcy5jYW1lcmEuZGlyZWN0aW9uWzFdLCB0aGlzLmNhbWVyYS5kaXJlY3Rpb25bMl0gKTtcblxuICAgICAgaWYgKHRoaXMuY2FtZXJhLmhhc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5yZXNldEJ1ZmZlclRleHR1cmVzKCk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zYW1wbGVzID0gMDtcbiAgICAgICAgdGhpcy5jYW1lcmEuaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1YXRlIHNhbXBsZXMgcGVyIHNlY29uZFxuICBjYWxjdWxhdGVTUFMoKSB7XG4gICAgbGV0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMuZnJhbWVDb3VudCsrO1xuICAgIHRoaXMuZWxhcHNlZFRpbWUgKz0gKG5vdyAtIHRoaXMubGFzdFRpbWUpO1xuICAgIHRoaXMubGFzdFRpbWUgPSBub3c7XG5cbiAgICBpZih0aGlzLmVsYXBzZWRUaW1lID49IDEwMDApIHtcbiAgICAgIGxldCBmcHMgPSB0aGlzLmZyYW1lQ291bnQ7XG4gICAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgICAgdGhpcy5lbGFwc2VkVGltZSAtPSAxMDAwO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zwcy1jb3VudCcpLmlubmVySFRNTCA9IGZwcztcbiAgICB9XG4gIH1cblxuICByZXNldEJ1ZmZlclRleHR1cmVzKCkge1xuICAgIHRoaXMudGV4dHVyZXMgPSBbXTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgMjsgaSsrKSB7XG4gICAgICB0aGlzLnRleHR1cmVzLnB1c2goZ2wuY3JlYXRlVGV4dHVyZSgpKTtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudGV4dHVyZXNbaV0pO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0IsIDUxMiwgNTEyLCAwLCBnbC5SR0IsIGdsLkZMT0FULCBudWxsKTtcbiAgICB9XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG4gIH1cblxuICBjcmVhdGVSZW5kZXJQcm9ncmFtKCkge1xuICAgIGxldCB2ZXJ0aWNlcyA9IFstMSwgLTEsIC0xLCAxLCAxLCAtMSwgMSwgMV07XG4gICAgdGhpcy52ZXJ0ZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKSwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIHRoaXMuZnJhbWVCdWZmZXIgPSBnbC5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuICAgIHRoaXMucmVzZXRCdWZmZXJUZXh0dXJlcygpO1xuXG4gICAgLy8gY3JlYXRlIHJlbmRlciBzaGFkZXJcbiAgICBsZXQgcmVuZGVyX3ZlcnRleF9zaGFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndnNfcmVuZGVyJykudGV4dENvbnRlbnQ7XG4gICAgbGV0IHJlbmRlcl9mcmFnbWVudF9zaGFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnNfcmVuZGVyJykudGV4dENvbnRlbnQ7XG4gICAgdGhpcy5yZW5kZXJQcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKHJlbmRlcl92ZXJ0ZXhfc2hhZGVyLCByZW5kZXJfZnJhZ21lbnRfc2hhZGVyKTtcbiAgICB0aGlzLnJlbmRlclZlcnRleEF0dHJpYnV0ZSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMucmVuZGVyUHJvZ3JhbSwgJ3ZlcnRleCcpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMucmVuZGVyVmVydGV4QXR0cmlidXRlKTtcbiAgfVxuXG4gIGFkZFNjZW5lVGV4dHVyZXModGV4dHVyZURhdGEpIHtcbiAgICAvLyBDcmVhdGUgdHJpYW5nbGUgdGV4dHVyZVxuICAgIHRoaXMudHJpYW5nbGVUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMudHJpYW5nbGVUZXh0dXJlKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCLCAxMDI0LCAxMDI0LCAwLCBnbC5SR0IsIGdsLkZMT0FULCB0ZXh0dXJlRGF0YS50cmlhbmdsZXMpO1xuXG4gICAgdGhpcy5zcGhlcmVUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuc3BoZXJlVGV4dHVyZSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQiwgNTEyLCA1MTIsIDAsIGdsLlJHQiwgZ2wuRkxPQVQsIHRleHR1cmVEYXRhLnNwaGVyZXMpO1xuXG4gICAgLy8gQ3JlYXRlIG1hdGVyaWFsIHRleHR1cmVcbiAgICB0aGlzLm1hdGVyaWFsVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLm1hdGVyaWFsVGV4dHVyZSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQiwgNTEyLCA1MTIsIDAsIGdsLlJHQiwgZ2wuRkxPQVQsIHRleHR1cmVEYXRhLm1hdGVyaWFscyk7XG5cbiAgICBnbC51c2VQcm9ncmFtKHRoaXMudHJhY2VyUHJvZ3JhbSk7XG4gICAgZ2wudW5pZm9ybTFpKHRoaXMuYWNjdW11bGF0ZWRfYnVmZmVyX2xvY2F0aW9uLCAwKTtcbiAgICBnbC51bmlmb3JtMWkodGhpcy50cmlhbmdsZV9sb2NhdGlvbiwgMSk7XG4gICAgZ2wudW5pZm9ybTFpKHRoaXMuc3BoZXJlX2xvY2F0aW9uLCAyKTtcbiAgICBnbC51bmlmb3JtMWkodGhpcy5tYXRlcmlhbF9sb2NhdGlvbiwgMyk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUxKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLnRyaWFuZ2xlVGV4dHVyZSk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMik7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5zcGhlcmVUZXh0dXJlKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUzKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLm1hdGVyaWFsVGV4dHVyZSk7XG5cbiAgICBnbC51bmlmb3JtMWkoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICd0cmlhbmdsZV9jb3VudCcpLCB0ZXh0dXJlRGF0YS50cmlhbmdsZV9jb3VudCApO1xuICAgIGdsLnVuaWZvcm0xaShnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMudHJhY2VyUHJvZ3JhbSwgJ3NwaGVyZV9jb3VudCcpLCB0ZXh0dXJlRGF0YS5zcGhlcmVfY291bnQgKTtcblxuICAgIHRoaXMucmVuZGVyZXJSZWFkeSA9IHRydWU7XG4gIH1cblxuICBpbml0KCkge1xuICAgIExvYWRTaGFkZXJzKFtcbiAgICAgICcuL2Rpc3Qva2VybmVscy9oZWFkZXIuZ2xzbCcsXG4gICAgICAnLi9kaXN0L2tlcm5lbHMvUmF5Lmdsc2wnLFxuICAgICAgJy4vZGlzdC9rZXJuZWxzL0NvbGxpc2lvbi5nbHNsJyxcbiAgICAgICcuL2Rpc3Qva2VybmVscy9NYXRlcmlhbC5nbHNsJyxcbiAgICAgICcuL2Rpc3Qva2VybmVscy9UcmlhbmdsZS5nbHNsJyxcbiAgICAgICcuL2Rpc3Qva2VybmVscy9TcGhlcmUuZ2xzbCcsXG4gICAgICAnLi9kaXN0L2tlcm5lbHMvU2NlbmUuZ2xzbCcsXG4gICAgICAnLi9kaXN0L2tlcm5lbHMvUmF5VHJhY2VyLmdsc2wnLFxuICAgICAgJy4vZGlzdC9rZXJuZWxzL21haW4uZ2xzbCcsXG4gICAgXSwgKGtlcm5lbERhdGEpID0+IHtcbiAgICAgICAgdGhpcy5mcmFnbWVudF9zaGFkZXIgPSBrZXJuZWxEYXRhO1xuICAgICAgICB0aGlzLnZlcnRleF9zaGFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndnMnKS50ZXh0Q29udGVudDtcbiAgICBcdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcblxuICAgIFx0XHQvLyBJbml0aWFsaXNlIFdlYkdMXG4gICAgXHRcdHRyeSB7XG4gICAgICAgICAgIGdsID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCggJ3dlYmdsJyApO1xuICAgICAgICAgICAvL2dsID0gV2ViR0xEZWJ1Z1V0aWxzLm1ha2VEZWJ1Z0NvbnRleHQoZ2wsIHRocm93T25HTEVycm9yKTtcbiAgICAgICAgIH0gY2F0Y2goIGVycm9yICkgeyB9XG4gICAgXHRcdGlmICggIWdsICkgdGhyb3cgXCJjYW5ub3QgY3JlYXRlIHdlYmdsIGNvbnRleHRcIjtcblxuICAgICAgICAvLyBCUk9XU0VSIE1VU1QgU1VQUE9SVCBUSElTISEhXG4gICAgICAgIGdsLmdldEV4dGVuc2lvbihcIk9FU190ZXh0dXJlX2Zsb2F0XCIpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlUmVuZGVyUHJvZ3JhbSgpO1xuXG4gICAgXHRcdC8vIENyZWF0ZSBWZXJ0ZXggYnVmZmVyICgyIHRyaWFuZ2xlcylcbiAgICBcdFx0dGhpcy5idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBcdFx0Z2wuYmluZEJ1ZmZlciggZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLmJ1ZmZlciApO1xuICAgIFx0XHRnbC5idWZmZXJEYXRhKCBnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoIFsgLTEuMCwgLTEuMCwgLTEuMCwgMS4wLCAxLjAsIC0xLjAsIDEuMCwgLSAxLjAsIDEuMCwgMS4wLCAtIDEuMCwgMS4wIF0gKSwgZ2wuU1RBVElDX0RSQVcgKTtcblxuICAgIFx0XHQvLyBDcmVhdGUgUHJvZ3JhbVxuICAgIFx0XHR0aGlzLnRyYWNlclByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oIHRoaXMudmVydGV4X3NoYWRlciwgdGhpcy5mcmFnbWVudF9zaGFkZXIgKTtcbiAgICAgICAgdGhpcy50cmFjZXJWZXJ0ZXhBdHRyaWJ1dGUgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sICd2ZXJ0ZXgnKTtcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy50cmFjZXJWZXJ0ZXhBdHRyaWJ1dGUpO1xuXG4gICAgICAgIHRoaXMudGltZUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnRyYWNlclByb2dyYW0sICd0aW1lJyApO1xuICAgICAgICB0aGlzLnJlc29sdXRpb25Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy50cmFjZXJQcm9ncmFtLCAncmVzb2x1dGlvbicgKTtcblxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX2J1ZmZlcl9sb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sIFwidV9idWZmZXJfdGV4dHVyZVwiKTtcbiAgICAgICAgdGhpcy50cmlhbmdsZV9sb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sIFwidV90cmlhbmdsZV90ZXh0dXJlXCIpO1xuICAgICAgICB0aGlzLnNwaGVyZV9sb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sIFwidV9zcGhlcmVfdGV4dHVyZVwiKTtcbiAgICAgICAgdGhpcy5tYXRlcmlhbF9sb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnRyYWNlclByb2dyYW0sIFwidV9tYXRlcmlhbF90ZXh0dXJlXCIpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyU2FtcGxlc0xvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLnJlbmRlclByb2dyYW0sICdzYW1wbGVzJyApO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpO1xuICAgIH0sXG4gICAgKCkgPT4ge30pO1xuICB9XG5cbiAgY3JlYXRlUHJvZ3JhbSh2ZXJ0ZXgsIGZyYWdtZW50KSB7XG4gICAgbGV0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cblx0XHRsZXQgdnMgPSB0aGlzLmNyZWF0ZVNoYWRlciggdmVydGV4LCBnbC5WRVJURVhfU0hBREVSICk7XG5cdFx0bGV0IGZzID0gdGhpcy5jcmVhdGVTaGFkZXIoIGZyYWdtZW50LCBnbC5GUkFHTUVOVF9TSEFERVIgKTtcblxuXHRcdGdsLmF0dGFjaFNoYWRlciggcHJvZ3JhbSwgdnMgKTtcblx0XHRnbC5hdHRhY2hTaGFkZXIoIHByb2dyYW0sIGZzICk7XG5cblx0XHRnbC5kZWxldGVTaGFkZXIoIHZzICk7XG5cdFx0Z2wuZGVsZXRlU2hhZGVyKCBmcyApO1xuXG5cdFx0Z2wubGlua1Byb2dyYW0oIHByb2dyYW0gKTtcblxuXHRcdGlmICggIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHByb2dyYW0sIGdsLkxJTktfU1RBVFVTICkgKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvZ3JhbTtcbiAgfVxuXG4gIGNyZWF0ZVNoYWRlcihzcmMsIHR5cGUpIHtcbiAgICBsZXQgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKCB0eXBlICk7XG5cblx0XHRnbC5zaGFkZXJTb3VyY2UoIHNoYWRlciwgc3JjICk7XG5cdFx0Z2wuY29tcGlsZVNoYWRlciggc2hhZGVyICk7XG5cblx0XHRpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlciggc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgLy8gcmVzaXplQ2FudmFzKGV2ZW50KSB7XG4gIC8vICAgaWYodGhpcy5jYW52YXMud2lkdGggIT0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggfHwgdGhpcy5jYW52YXMuaGVpZ2h0ICE9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCkge1xuXHQvLyBcdFx0dGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcblx0Ly8gXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcbiAgLy9cblx0Ly8gXHRcdHRoaXMucGFyYW1ldGVycy5zY3JlZW5XaWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuXHQvLyBcdFx0dGhpcy5wYXJhbWV0ZXJzLnNjcmVlbkhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgLy9cblx0Ly8gXHRcdGdsLnZpZXdwb3J0KCAwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0ICk7XG5cdC8vIFx0fVxuICAvLyB9XG5cbn1cbiIsImltcG9ydCB7IE9iamVjdDNkIH0gZnJvbSAnLi9PYmplY3QzZCc7XG5pbXBvcnQgeyBMb2FkT2JqZWN0cyB9IGZyb20gJy4vU2hhZGVyTG9hZGVyJztcbmltcG9ydCB7IE1hdGVyaWFsLCBNQVRFUklBTF9UWVBFUyB9IGZyb20gJy4vTWF0ZXJpYWwnO1xuaW1wb3J0IHsgU3BoZXJlIH0gZnJvbSAnLi9TcGhlcmUnO1xuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnLi9DYW1lcmEnO1xuXG5leHBvcnQgY2xhc3MgU2NlbmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9iamVjdHMgPSBbXTtcbiAgICB0aGlzLnNwaGVyZXMgPSBbXTtcbiAgICB0aGlzLm1hdGVyaWFscyA9IFtdO1xuXG4gICAgdGhpcy5DcmVhdGVEZWZhdWx0U2NlbmUoKTtcbiAgfVxuXG4gIENyZWF0ZURlZmF1bHRTY2VuZSgpIHtcbiAgICBsZXQgcmVkX21hdGVyaWFsID0gbmV3IE1hdGVyaWFsKHZlYzMuZnJvbVZhbHVlcygxLDAsMCksIE1BVEVSSUFMX1RZUEVTLm9yZW5fbmF5YXIpO1xuICAgIGxldCBncmVlbl9tYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCh2ZWMzLmZyb21WYWx1ZXMoMCwxLDApLCBNQVRFUklBTF9UWVBFUy5vcmVuX25heWFyKTtcbiAgICBsZXQgYmx1ZV9tYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCh2ZWMzLmZyb21WYWx1ZXMoMCwwLDEpLCBNQVRFUklBTF9UWVBFUy5vcmVuX25heWFyKTtcbiAgICBsZXQgd2hpdGVfbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwodmVjMy5mcm9tVmFsdWVzKDEsMSwxKSwgTUFURVJJQUxfVFlQRVMub3Jlbl9uYXlhcik7XG4gICAgbGV0IGdyZWVuX2dsYXNzID0gbmV3IE1hdGVyaWFsKHZlYzMuZnJvbVZhbHVlcygwLjUsMSwwLjUpLCBNQVRFUklBTF9UWVBFUy50cmFuc21pc3Npb24pO1xuICAgIGxldCBzcGVjdWxhcl9yZWRfbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwodmVjMy5mcm9tVmFsdWVzKDEsMCw1LDAuNSksIE1BVEVSSUFMX1RZUEVTLnNwZWN1bGFyKTtcblxuICAgIGxldCBlbWlzc2lvbl9tYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCh2ZWMzLmZyb21WYWx1ZXMoMSwxLDEpLCBNQVRFUklBTF9UWVBFUy5lbWlzc2lvbik7XG4gICAgZW1pc3Npb25fbWF0ZXJpYWwuZW1pc3Npb25fcmF0ZSA9IDUuMDtcbiAgICBsZXQgZW1pc3Npb25fcmVkX21hdGVyaWFsID0gbmV3IE1hdGVyaWFsKHZlYzMuZnJvbVZhbHVlcygxLDAuNywwLjcpLCBNQVRFUklBTF9UWVBFUy5lbWlzc2lvbik7XG4gICAgZW1pc3Npb25fcmVkX21hdGVyaWFsLmVtaXNzaW9uX3JhdGUgPSAyMC4wO1xuXG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaChyZWRfbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goZ3JlZW5fbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goYmx1ZV9tYXRlcmlhbCk7XG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaCh3aGl0ZV9tYXRlcmlhbCk7XG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaChncmVlbl9nbGFzcyk7XG4gICAgdGhpcy5tYXRlcmlhbHMucHVzaChzcGVjdWxhcl9yZWRfbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goZW1pc3Npb25fbWF0ZXJpYWwpO1xuICAgIHRoaXMubWF0ZXJpYWxzLnB1c2goZW1pc3Npb25fcmVkX21hdGVyaWFsKTtcblxuICAgIC8vIExvYWQgb2JqZWN0cyBmcm9tIC5vYmogZmlsZXNcbiAgICBMb2FkT2JqZWN0cyhbXG4gICAgICB7ZmlsZU5hbWU6ICcuL2Rpc3QvbW9kZWxzL2xpZ2h0X3BsYW5lLnR4dCcsIG1hdGVyaWFsOiBlbWlzc2lvbl9tYXRlcmlhbCB9LFxuICAgICAge2ZpbGVOYW1lOiAnLi9kaXN0L21vZGVscy9mbG9vci50eHQnLCBtYXRlcmlhbDogd2hpdGVfbWF0ZXJpYWwgfSxcbiAgICAgIHtmaWxlTmFtZTogJy4vZGlzdC9tb2RlbHMvcmlnaHRfd2FsbC50eHQnLCBtYXRlcmlhbDogYmx1ZV9tYXRlcmlhbCB9LFxuICAgICAge2ZpbGVOYW1lOiAnLi9kaXN0L21vZGVscy9sZWZ0X3dhbGwudHh0JywgbWF0ZXJpYWw6IHJlZF9tYXRlcmlhbH0sXG4gICAgICB7ZmlsZU5hbWU6ICcuL2Rpc3QvbW9kZWxzL3Jvb2YudHh0JywgbWF0ZXJpYWw6IHdoaXRlX21hdGVyaWFsfSxcbiAgICBdLCAob2JqZWN0cykgPT4ge1xuICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIG9iamVjdHMpIHtcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgICgpID0+IHt9KTtcblxuICAgIHRoaXMuc3BoZXJlcy5wdXNoKG5ldyBTcGhlcmUodmVjMy5mcm9tVmFsdWVzKDUuMCwgLTMsIC0zLjUpLCAwLjUsIGVtaXNzaW9uX3JlZF9tYXRlcmlhbCkpO1xuICAgIHRoaXMuc3BoZXJlcy5wdXNoKG5ldyBTcGhlcmUodmVjMy5mcm9tVmFsdWVzKDguMCwgMS44LCAtMy4wKSwgMS44LCBncmVlbl9nbGFzcykpO1xuICAgIHRoaXMuc3BoZXJlcy5wdXNoKG5ldyBTcGhlcmUodmVjMy5mcm9tVmFsdWVzKDkuMCwgLTEuOCwgLTMuMCksIDEuOCwgd2hpdGVfbWF0ZXJpYWwpKTtcbiAgfVxuXG4gIEJ1aWxkU2NlbmVUZXh0dXJlcygpIHtcbiAgICBsZXQgdGV4dHVyZURhdGEgPSB7XG4gICAgICB0cmlhbmdsZXM6IG5ldyBGbG9hdDMyQXJyYXkoMjA0OCAqIDIwNDggKiAzKSxcbiAgICAgIHRyaWFuZ2xlX2NvdW50OiAwLFxuICAgICAgbWF0ZXJpYWxzOiBuZXcgRmxvYXQzMkFycmF5KDUxMiAqIDUxMiAqIDMpLFxuICAgICAgbWF0ZXJpYWxfY291bnQ6IDAsXG4gICAgICBzcGhlcmVzOiBuZXcgRmxvYXQzMkFycmF5KDUxMiAqIDUxMiAqIDMpLFxuICAgICAgc3BoZXJlX2NvdW50OiAwXG4gICAgfTtcblxuICAgIC8vIEJ1aWxkIG1hdGVyaWFsIGRhdGFcbiAgICBsZXQgbWF0ZXJpYWxEYXRhID0gW107XG4gICAgZm9yIChsZXQgbWF0ZXJpYWwgb2YgdGhpcy5tYXRlcmlhbHMpIHtcbiAgICAgIC8vIENvbG9yXG4gICAgICBtYXRlcmlhbERhdGEucHVzaChtYXRlcmlhbC5jb2xvclswXSk7XG4gICAgICBtYXRlcmlhbERhdGEucHVzaChtYXRlcmlhbC5jb2xvclsxXSk7XG4gICAgICBtYXRlcmlhbERhdGEucHVzaChtYXRlcmlhbC5jb2xvclsyXSk7XG5cbiAgICAgIC8vIEV4dHJhIGRhdGFcbiAgICAgIG1hdGVyaWFsRGF0YS5wdXNoKG1hdGVyaWFsLm1hdGVyaWFsX3R5cGUpO1xuICAgICAgbWF0ZXJpYWxEYXRhLnB1c2gobWF0ZXJpYWwuZW1pc3Npb25fcmF0ZSk7XG4gICAgICBtYXRlcmlhbERhdGEucHVzaCgwKTtcbiAgICB9XG5cbiAgICB0ZXh0dXJlRGF0YS5tYXRlcmlhbF9jb3VudCA9IHRoaXMubWF0ZXJpYWxzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGVyaWFsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgdGV4dHVyZURhdGEubWF0ZXJpYWxzW2ldID0gbWF0ZXJpYWxEYXRhW2ldO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIHNwaGVyZSBkYXRhXG4gICAgbGV0IHNwaGVyZURhdGEgPSBbXTtcbiAgICBmb3IgKGxldCBzcGhlcmUgb2YgdGhpcy5zcGhlcmVzKSB7XG4gICAgICAvLyBGaW5kIG1hdGVyaWFsIGluZGV4IGZvciBjdXJyZW50IG9iamVjdFxuICAgICAgbGV0IG1hdGVyaWFsX2luZGV4ID0gMDtcbiAgICAgIGZvciAobGV0IG1hdF9pZHggPSAwOyBtYXRfaWR4IDwgdGhpcy5tYXRlcmlhbHMubGVuZ3RoOyBtYXRfaWR4KyspIHtcbiAgICAgICAgaWYgKHRoaXMubWF0ZXJpYWxzW21hdF9pZHhdID09PSBzcGhlcmUubWF0ZXJpYWwpIHtcbiAgICAgICAgICBtYXRlcmlhbF9pbmRleCA9IG1hdF9pZHg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUG9zaXRpb25cbiAgICAgIHNwaGVyZURhdGEucHVzaChzcGhlcmUucG9zaXRpb25bMF0pO1xuICAgICAgc3BoZXJlRGF0YS5wdXNoKHNwaGVyZS5wb3NpdGlvblsxXSk7XG4gICAgICBzcGhlcmVEYXRhLnB1c2goc3BoZXJlLnBvc2l0aW9uWzJdKTtcblxuICAgICAgLy8gRXh0cmEgZGF0YVxuICAgICAgc3BoZXJlRGF0YS5wdXNoKHNwaGVyZS5yYWRpdXMpO1xuICAgICAgc3BoZXJlRGF0YS5wdXNoKG1hdGVyaWFsX2luZGV4KTtcbiAgICAgIHNwaGVyZURhdGEucHVzaCgwKTtcbiAgICB9XG5cbiAgICB0ZXh0dXJlRGF0YS5zcGhlcmVfY291bnQgPSB0aGlzLnNwaGVyZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0ZXJpYWxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0ZXh0dXJlRGF0YS5zcGhlcmVzW2ldID0gc3BoZXJlRGF0YVtpXTtcbiAgICB9XG5cbiAgICAvLyBCdWlsZCB0cmlhbmdsZSBkYXRhXG4gICAgbGV0IHRyaWFuZ2xlRGF0YSA9IFtdO1xuICAgIGZvciAobGV0IG9iamVjdCBvZiB0aGlzLm9iamVjdHMpIHtcblxuICAgICAgLy8gRmluZCBtYXRlcmlhbCBpbmRleCBmb3IgY3VycmVudCBvYmplY3RcbiAgICAgIGxldCBtYXRlcmlhbF9pbmRleCA9IDA7XG4gICAgICBmb3IgKGxldCBtYXRfaWR4ID0gMDsgbWF0X2lkeCA8IHRoaXMubWF0ZXJpYWxzLmxlbmd0aDsgbWF0X2lkeCsrKSB7XG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFsc1ttYXRfaWR4XSA9PT0gb2JqZWN0Lm1hdGVyaWFsKSB7XG4gICAgICAgICAgbWF0ZXJpYWxfaW5kZXggPSBtYXRfaWR4O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHRyaWFuZ2xlIG9mIG9iamVjdC50cmlhbmdsZXMpIHtcbiAgICAgICAgLy8gdjBcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjBbMF0pO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MFsxXSk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYwWzJdKTtcblxuICAgICAgICAvLyBFZGdlIDFcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjFbMF0pO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MVsxXSk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYxWzJdKTtcblxuICAgICAgICAvLyBFZGdlIDJcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2godHJpYW5nbGUudjJbMF0pO1xuICAgICAgICB0cmlhbmdsZURhdGEucHVzaCh0cmlhbmdsZS52MlsxXSk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKHRyaWFuZ2xlLnYyWzJdKTtcblxuICAgICAgICAvLyBFeHRyYSBkYXRhXG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKG1hdGVyaWFsX2luZGV4KTtcbiAgICAgICAgdHJpYW5nbGVEYXRhLnB1c2goMCk7XG4gICAgICAgIHRyaWFuZ2xlRGF0YS5wdXNoKDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB0cmlfY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYW5nbGVEYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoaSAlIDEyID09IDApIHRyaV9jb3VudCsrO1xuICAgICAgdGV4dHVyZURhdGEudHJpYW5nbGVzW2ldID0gdHJpYW5nbGVEYXRhW2ldO1xuICAgIH1cblxuICAgIHRleHR1cmVEYXRhLnRyaWFuZ2xlX2NvdW50ID0gdHJpX2NvdW50O1xuXG4gICAgcmV0dXJuIHRleHR1cmVEYXRhO1xuICB9XG59XG4iLCJpbXBvcnQgeyBPYmplY3QzZCB9IGZyb20gJy4vT2JqZWN0M2QnO1xuXG5mdW5jdGlvbiBMb2FkU2hhZGVyKGZpbGVOYW1lLCBpbmRleCwgY2FsbGJhY2spIHtcbiAgalF1ZXJ5LmdldChmaWxlTmFtZSwgKGRhdGEpID0+IHtcbiAgICBjYWxsYmFjayhkYXRhLCBpbmRleCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTG9hZFNoYWRlcnMoZmlsZU5hbWVzLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICBsZXQgbG9hZGVkX2ZpbGVzID0gMDtcbiAgbGV0IHNoYWRlcl9maWxlcyA9IFtdO1xuICBmb3IgKGxldCBmaWxlX2luZGV4ID0gMDsgZmlsZV9pbmRleCA8IGZpbGVOYW1lcy5sZW5ndGg7IGZpbGVfaW5kZXgrKykge1xuICAgICAgTG9hZFNoYWRlcihmaWxlTmFtZXNbZmlsZV9pbmRleF0sIGZpbGVfaW5kZXgsIChkYXRhLCBzaGFkZXJfaW5kZXgpID0+IHtcbiAgICAgICAgc2hhZGVyX2ZpbGVzW3NoYWRlcl9pbmRleF0gPSBkYXRhO1xuXG4gICAgICAgIGxvYWRlZF9maWxlcysrO1xuICAgICAgICBpZiAobG9hZGVkX2ZpbGVzID09IGZpbGVOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICBsZXQgdG90YWxfc2hhZGVyX2RhdGEgPSAnJztcbiAgICAgICAgICBmb3IgKGxldCBzaGFkZXJfZGF0YSBvZiBzaGFkZXJfZmlsZXMpIHtcbiAgICAgICAgICAgIHRvdGFsX3NoYWRlcl9kYXRhICs9IHNoYWRlcl9kYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYWxsYmFjayh0b3RhbF9zaGFkZXJfZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gTG9hZE9iamVjdHMoZmlsZU5hbWVzLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIGxldCBsb2FkZWRfZmlsZXMgPSAwO1xuICAgIGxldCBvYmplY3RfZmlsZXMgPSBbXTtcbiAgICBmb3IgKGxldCBmaWxlX2luZGV4ID0gMDsgZmlsZV9pbmRleCA8IGZpbGVOYW1lcy5sZW5ndGg7IGZpbGVfaW5kZXgrKykge1xuICAgICAgICBMb2FkU2hhZGVyKGZpbGVOYW1lc1tmaWxlX2luZGV4XS5maWxlTmFtZSwgZmlsZV9pbmRleCwgKGRhdGEsIHNoYWRlcl9pbmRleCkgPT4ge1xuICAgICAgICAgIGxldCBvYmplY3QgPSBPYmplY3QzZC5Mb2FkT2JqKGRhdGEsIGZpbGVOYW1lc1tzaGFkZXJfaW5kZXhdLm1hdGVyaWFsKTtcbiAgICAgICAgICBvYmplY3RfZmlsZXNbc2hhZGVyX2luZGV4XSA9IG9iamVjdDtcbiAgICAgICAgICBsb2FkZWRfZmlsZXMrKztcbiAgICAgICAgICBpZiAobG9hZGVkX2ZpbGVzID09IGZpbGVOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG9iamVjdF9maWxlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTcGhlcmUge1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgcmFkaXVzLCBtYXRlcmlhbCkge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuX21hdGVyaWFsID0gbWF0ZXJpYWw7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKSB7IHJldHVybiB0aGlzLl9wb3NpdGlvbjsgfVxuICBnZXQgcmFkaXVzKCkgeyByZXR1cm4gdGhpcy5fcmFkaXVzOyB9XG4gIGdldCBtYXRlcmlhbCgpIHsgcmV0dXJuIHRoaXMuX21hdGVyaWFsOyB9XG59XG4iXX0=
