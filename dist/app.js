(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var Person = require("./model/Person").Person;

var Renderer = require("./model/Renderer").Renderer;

global.app = function () {
    var christoph = new Person("Christoph", "Burgdorf");
    var renderer = new Renderer();
    console.log(christoph.fullName);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxsZXMtZGF0b3IvRGVza3RvcC9HaXRodWIvcGFydGljbGUtc3lzdGVtLXdlYmdsL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQVEsTUFBTSxXQUFPLGdCQUFnQixFQUE3QixNQUFNOztJQUNOLFFBQVEsV0FBTyxrQkFBa0IsRUFBakMsUUFBUTs7QUFFaEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxZQUFZO0FBQ3JCLFFBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNwRCxRQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQzlCLFdBQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ25DLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGVyc29ufSBmcm9tICcuL21vZGVsL1BlcnNvbic7XG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tICcuL21vZGVsL1JlbmRlcmVyJ1xuXG5nbG9iYWwuYXBwID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaHJpc3RvcGggPSBuZXcgUGVyc29uKCdDaHJpc3RvcGgnLCAnQnVyZ2RvcmYnKTtcbiAgICBsZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcbiAgICBjb25zb2xlLmxvZyhjaHJpc3RvcGguZnVsbE5hbWUpO1xufTtcbiJdfQ==
},{"./model/Person":2,"./model/Renderer":3}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Person = (function () {
    function Person(firstName, lastName) {
        _classCallCheck(this, Person);

        this.firstName = firstName;
        this.lastName = lastName;
    }

    _createClass(Person, {
        fullName: {
            get: function () {
                return "" + this.firstName + " " + this.lastName;
            }
        }
    });

    return Person;
})();

exports.Person = Person;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
		value: true
});

var Renderer = exports.Renderer = (function () {
		function Renderer() {
				var _this = this;

				_classCallCheck(this, Renderer);

				this.canvas = null;
				this.gl = null;
				this.buffer, this.vertex_shader, this.fragment_shader, this.currentProgram, this.vertex_position, this.timeLocation, this.resolutionLocation, this.parameters = { start_time: new Date().getTime(), time: 0, screenWidth: 0, screenHeight: 0 };

				//Framebuffers
				this.rttFramebuffer = null;
				this.rttTexture = null;

				this.init();

				this.animate = function (time) {
						_this.resizeCanvas();
						_this.render();
						requestAnimationFrame(_this.animate);
				};

				this.animate();
		}

		_createClass(Renderer, {
				init: {
						value: function init() {
								this.vertex_shader = document.getElementById("vs").textContent;
								this.fragment_shader = document.getElementById("fs").textContent;
								this.canvas = document.querySelector("canvas");

								// Initialise WebGL
								try {
										this.gl = this.canvas.getContext("experimental-webgl");
								} catch (error) {}

								if (!this.gl) {
										throw "cannot create webgl context";
								}

								// Create Vertex buffer (2 triangles)
								this.buffer = this.gl.createBuffer();
								this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
								this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]), this.gl.STATIC_DRAW);

								// Create Program
								this.currentProgram = this.createProgram(this.vertex_shader, this.fragment_shader);
								this.timeLocation = this.gl.getUniformLocation(this.currentProgram, "time");
								this.resolutionLocation = this.gl.getUniformLocation(this.currentProgram, "resolution");
						}
				},
				createProgram: {
						value: function createProgram(vertex, fragment) {
								var program = this.gl.createProgram();

								var vs = this.createShader(vertex, this.gl.VERTEX_SHADER);
								var fs = this.createShader("#ifdef GL_ES\nprecision highp float;\n#endif\n\n" + fragment, this.gl.FRAGMENT_SHADER);

								//if ( vs == null || fs == null ) return null;

								this.gl.attachShader(program, vs);
								this.gl.attachShader(program, fs);

								this.gl.deleteShader(vs);
								this.gl.deleteShader(fs);

								this.gl.linkProgram(program);

								if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
										return null;
								}

								return program;
						}
				},
				createShader: {
						value: function createShader(src, type) {
								var shader = this.gl.createShader(type);

								this.gl.shaderSource(shader, src);
								this.gl.compileShader(shader);

								if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
										return null;
								}
								return shader;
						}
				},
				resizeCanvas: {
						value: function resizeCanvas(event) {
								if (this.canvas.width != this.canvas.clientWidth || this.canvas.height != this.canvas.clientHeight) {
										this.canvas.width = this.canvas.clientWidth;
										this.canvas.height = this.canvas.clientHeight;

										this.parameters.screenWidth = this.canvas.width;
										this.parameters.screenHeight = this.canvas.height;

										this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
								}
						}
				},
				initFramebuffer: {
						value: function initFramebuffer() {
								this.rttFramebuffer = this.gl.createFramebuffer();
								this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.rttFramebuffer);
								this.rttFramebuffer.width = 1024;
								this.rttFramebuffer.height = 1024;

								this.rttTexture = this.gl.createTexture();
								this.gl.bindTexture(this.gl.TEXTURE_2D, this.rttTexture);
								this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
								this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
								this.gl.generateMipmap(this.gl.TEXTURE_2D);
						}
				},
				render: {
						value: function render() {
								if (!this.currentProgram) {
										return;
								}this.parameters.time = new Date().getTime() - this.parameters.start_time;

								this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

								// Load program into GPU
								this.gl.useProgram(this.currentProgram);

								// Set values to program variables
								this.gl.uniform1f(this.timeLocation, this.parameters.time / 1000);
								this.gl.uniform2f(this.resolutionLocation, this.parameters.screenWidth, this.parameters.screenHeight);

								// Render geometry
								this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
								this.gl.vertexAttribPointer(this.vertex_position, 2, this.gl.FLOAT, false, 0, 0);
								this.gl.enableVertexAttribArray(this.vertex_position);
								this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
								this.gl.disableVertexAttribArray(this.vertex_position);
						}
				}
		});

		return Renderer;
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwiL1VzZXJzL2ZpbGxlcy1kYXRvci9EZXNrdG9wL0dpdGh1Yi9wYXJ0aWNsZS1zeXN0ZW0td2ViZ2wvc3JjL21vZGVsL1BlcnNvbi5qcyIsIi9Vc2Vycy9maWxsZXMtZGF0b3IvRGVza3RvcC9HaXRodWIvcGFydGljbGUtc3lzdGVtLXdlYmdsL3NyYy9tb2RlbC9SZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0lDZE0sTUFBTTtBQUNHLGFBRFQsTUFBTSxDQUNJLFNBQVMsRUFBRSxRQUFRLEVBQUU7OEJBRC9CLE1BQU07O0FBRUosWUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDM0IsWUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDNUI7O2lCQUpDLE1BQU07QUFNSixnQkFBUTtpQkFBQSxZQUFHO0FBQ1gsNEJBQVUsSUFBSSxDQUFDLFNBQVMsU0FBSSxJQUFJLENBQUMsUUFBUSxDQUFHO2FBQy9DOzs7O1dBUkMsTUFBTTs7O1FBVUosTUFBTSxHQUFOLE1BQU07Ozs7Ozs7Ozs7Ozs7SUNWQyxRQUFRLFdBQVIsUUFBUTtBQUNSLFdBREEsUUFBUSxHQUNMOzs7MEJBREgsUUFBUTs7QUFFakIsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsUUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDZixRQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxlQUFlLEVBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxlQUFlLEVBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxrQkFB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RUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBRSxDQUFDOzs7QUFHeEcsWUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDO0FBQ3hELFlBQUksQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztBQUNuRixZQUFJLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFFLElBQUksQ0FBQyxlQUFlLENBQUUsQ0FBQztBQUN4RCxZQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7QUFDOUMsWUFBSSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBRSxJQUFJLENBQUMsZUFBZSxDQUFFLENBQUM7T0FDdkQ7Ozs7U0FySVUsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFBlcnNvbiA9IHJlcXVpcmUoXCIuL21vZGVsL1BlcnNvblwiKS5QZXJzb247XG5cbnZhciBSZW5kZXJlciA9IHJlcXVpcmUoXCIuL21vZGVsL1JlbmRlcmVyXCIpLlJlbmRlcmVyO1xuXG5nbG9iYWwuYXBwID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaHJpc3RvcGggPSBuZXcgUGVyc29uKFwiQ2hyaXN0b3BoXCIsIFwiQnVyZ2RvcmZcIik7XG4gICAgdmFyIHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKCk7XG4gICAgY29uc29sZS5sb2coY2hyaXN0b3BoLmZ1bGxOYW1lKTtcbn07XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTltYVd4c1pYTXRaR0YwYjNJdlJHVnphM1J2Y0M5SGFYUm9kV0l2Y0dGeWRHbGpiR1V0YzNsemRHVnRMWGRsWW1kc0wzTnlZeTloY0hBdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdPMGxCUVZFc1RVRkJUU3hYUVVGUExHZENRVUZuUWl4RlFVRTNRaXhOUVVGTk96dEpRVU5PTEZGQlFWRXNWMEZCVHl4clFrRkJhMElzUlVGQmFrTXNVVUZCVVRzN1FVRkZhRUlzVFVGQlRTeERRVUZETEVkQlFVY3NSMEZCUnl4WlFVRlpPMEZCUTNKQ0xGRkJRVWtzVTBGQlV5eEhRVUZITEVsQlFVa3NUVUZCVFN4RFFVRkRMRmRCUVZjc1JVRkJSU3hWUVVGVkxFTkJRVU1zUTBGQlF6dEJRVU53UkN4UlFVRkpMRkZCUVZFc1IwRkJSeXhKUVVGSkxGRkJRVkVzUlVGQlJTeERRVUZETzBGQlF6bENMRmRCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPME5CUTI1RExFTkJRVU1pTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN1VHVnljMjl1ZlNCbWNtOXRJQ2N1TDIxdlpHVnNMMUJsY25OdmJpYzdYRzVwYlhCdmNuUWdlMUpsYm1SbGNtVnlmU0JtY205dElDY3VMMjF2WkdWc0wxSmxibVJsY21WeUoxeHVYRzVuYkc5aVlXd3VZWEJ3SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lIWmhjaUJqYUhKcGMzUnZjR2dnUFNCdVpYY2dVR1Z5YzI5dUtDZERhSEpwYzNSdmNHZ25MQ0FuUW5WeVoyUnZjbVluS1R0Y2JpQWdJQ0JzWlhRZ2NtVnVaR1Z5WlhJZ1BTQnVaWGNnVW1WdVpHVnlaWElvS1R0Y2JpQWdJQ0JqYjI1emIyeGxMbXh2WnloamFISnBjM1J2Y0dndVpuVnNiRTVoYldVcE8xeHVmVHRjYmlKZGZRPT0iLCJjbGFzcyBQZXJzb24ge1xuICAgIGNvbnN0cnVjdG9yKGZpcnN0TmFtZSwgbGFzdE5hbWUpIHtcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcbiAgICB9XG5cbiAgICBnZXQgZnVsbE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmZpcnN0TmFtZX0gJHt0aGlzLmxhc3ROYW1lfWA7XG4gICAgfVxufVxuZXhwb3J0IHtQZXJzb259XG4iLCIgIGV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgICB0aGlzLmdsID0gbnVsbDtcbiAgICAgIHRoaXMuYnVmZmVyLFxuICAgICAgdGhpcy52ZXJ0ZXhfc2hhZGVyLFxuICAgICAgdGhpcy5mcmFnbWVudF9zaGFkZXIsXG4gICAgICB0aGlzLmN1cnJlbnRQcm9ncmFtLFxuICAgICAgdGhpcy52ZXJ0ZXhfcG9zaXRpb24sXG4gICAgICB0aGlzLnRpbWVMb2NhdGlvbixcbiAgICAgIHRoaXMucmVzb2x1dGlvbkxvY2F0aW9uLFxuICAgICAgdGhpcy5wYXJhbWV0ZXJzID0ge3N0YXJ0X3RpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLCB0aW1lOiAwLCBzY3JlZW5XaWR0aCA6IDAsIHNjcmVlbkhlaWdodDogMH07XG5cbiAgICAgIC8vRnJhbWVidWZmZXJzXG4gICAgICB0aGlzLnJ0dEZyYW1lYnVmZmVyID0gbnVsbDtcbiAgICAgIHRoaXMucnR0VGV4dHVyZSA9IG51bGw7XG5cbiAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICB0aGlzLmFuaW1hdGUgPSAodGltZSkgPT4ge1xuICAgICAgICB0aGlzLnJlc2l6ZUNhbnZhcygpO1xuICBcdFx0XHR0aGlzLnJlbmRlcigpO1xuICBcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMuYW5pbWF0ZSApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFuaW1hdGUoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgdGhpcy52ZXJ0ZXhfc2hhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZzJykudGV4dENvbnRlbnQ7XG5cdFx0XHR0aGlzLmZyYWdtZW50X3NoYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcycpLnRleHRDb250ZW50O1xuXHRcdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnY2FudmFzJyApO1xuXG5cdFx0XHQvLyBJbml0aWFsaXNlIFdlYkdMXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzLmdsID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCggJ2V4cGVyaW1lbnRhbC13ZWJnbCcgKTtcblx0XHRcdH0gY2F0Y2goIGVycm9yICkgeyB9XG5cblx0XHRcdGlmICggIXRoaXMuZ2wgKSB7XG5cdFx0XHRcdHRocm93IFwiY2Fubm90IGNyZWF0ZSB3ZWJnbCBjb250ZXh0XCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENyZWF0ZSBWZXJ0ZXggYnVmZmVyICgyIHRyaWFuZ2xlcylcblx0XHRcdHRoaXMuYnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcblx0XHRcdHRoaXMuZ2wuYmluZEJ1ZmZlciggdGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMuYnVmZmVyICk7XG5cdFx0XHR0aGlzLmdsLmJ1ZmZlckRhdGEoIHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KCBbIC0gMS4wLCAtIDEuMCwgMS4wLCAtIDEuMCwgLSAxLjAsIDEuMCwgMS4wLCAtIDEuMCwgMS4wLCAxLjAsIC0gMS4wLCAxLjAgXSApLCB0aGlzLmdsLlNUQVRJQ19EUkFXICk7XG5cblx0XHRcdC8vIENyZWF0ZSBQcm9ncmFtXG5cdFx0XHR0aGlzLmN1cnJlbnRQcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKCB0aGlzLnZlcnRleF9zaGFkZXIsIHRoaXMuZnJhZ21lbnRfc2hhZGVyICk7XG5cdFx0XHR0aGlzLnRpbWVMb2NhdGlvbiA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLmN1cnJlbnRQcm9ncmFtLCAndGltZScgKTtcblx0XHRcdHRoaXMucmVzb2x1dGlvbkxvY2F0aW9uID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMuY3VycmVudFByb2dyYW0sICdyZXNvbHV0aW9uJyApO1xuICAgIH1cblxuICAgIGNyZWF0ZVByb2dyYW0odmVydGV4LCBmcmFnbWVudCkge1xuICAgICAgbGV0IHByb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKTtcblxuXHRcdFx0bGV0IHZzID0gdGhpcy5jcmVhdGVTaGFkZXIoIHZlcnRleCwgdGhpcy5nbC5WRVJURVhfU0hBREVSICk7XG5cdFx0XHRsZXQgZnMgPSB0aGlzLmNyZWF0ZVNoYWRlciggJyNpZmRlZiBHTF9FU1xcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG4jZW5kaWZcXG5cXG4nICsgZnJhZ21lbnQsIHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSICk7XG5cblx0XHRcdC8vaWYgKCB2cyA9PSBudWxsIHx8IGZzID09IG51bGwgKSByZXR1cm4gbnVsbDtcblxuXHRcdFx0dGhpcy5nbC5hdHRhY2hTaGFkZXIoIHByb2dyYW0sIHZzICk7XG5cdFx0XHR0aGlzLmdsLmF0dGFjaFNoYWRlciggcHJvZ3JhbSwgZnMgKTtcblxuXHRcdFx0dGhpcy5nbC5kZWxldGVTaGFkZXIoIHZzICk7XG5cdFx0XHR0aGlzLmdsLmRlbGV0ZVNoYWRlciggZnMgKTtcblxuXHRcdFx0dGhpcy5nbC5saW5rUHJvZ3JhbSggcHJvZ3JhbSApO1xuXG5cdFx0XHRpZiAoICF0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHByb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMgKSApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBwcm9ncmFtO1xuICAgIH1cblxuICAgIGNyZWF0ZVNoYWRlcihzcmMsIHR5cGUpIHtcbiAgICAgIGxldCBzaGFkZXIgPSB0aGlzLmdsLmNyZWF0ZVNoYWRlciggdHlwZSApO1xuXG5cdFx0XHR0aGlzLmdsLnNoYWRlclNvdXJjZSggc2hhZGVyLCBzcmMgKTtcblx0XHRcdHRoaXMuZ2wuY29tcGlsZVNoYWRlciggc2hhZGVyICk7XG5cblx0XHRcdGlmICghdGhpcy5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoIHNoYWRlciwgdGhpcy5nbC5DT01QSUxFX1NUQVRVUykpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2hhZGVyO1xuICAgIH1cblxuICAgIHJlc2l6ZUNhbnZhcyhldmVudCkge1xuICAgICAgaWYodGhpcy5jYW52YXMud2lkdGggIT0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGggfHwgdGhpcy5jYW52YXMuaGVpZ2h0ICE9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCkge1xuXHRcdFx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xuXHRcdFx0XHR0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG5cblx0XHRcdFx0dGhpcy5wYXJhbWV0ZXJzLnNjcmVlbldpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XG5cdFx0XHRcdHRoaXMucGFyYW1ldGVycy5zY3JlZW5IZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG5cblx0XHRcdFx0dGhpcy5nbC52aWV3cG9ydCggMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCApO1xuXHRcdFx0fVxuICAgIH1cblxuICAgIGluaXRGcmFtZWJ1ZmZlcigpIHtcbiAgICAgIHRoaXMucnR0RnJhbWVidWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG4gICAgICB0aGlzLmdsLmJpbmRGcmFtZWJ1ZmZlcih0aGlzLmdsLkZSQU1FQlVGRkVSLCB0aGlzLnJ0dEZyYW1lYnVmZmVyKTtcbiAgICAgIHRoaXMucnR0RnJhbWVidWZmZXIud2lkdGggPSAxMDI0O1xuICAgICAgdGhpcy5ydHRGcmFtZWJ1ZmZlci5oZWlnaHQgPSAxMDI0O1xuXG4gICAgICB0aGlzLnJ0dFRleHR1cmUgPSB0aGlzLmdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCB0aGlzLnJ0dFRleHR1cmUpO1xuICAgICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuZ2wuTElORUFSKTtcbiAgICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLmdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCk7XG4gICAgICB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRQcm9ncmFtKSByZXR1cm47XG5cblx0XHRcdHRoaXMucGFyYW1ldGVycy50aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnBhcmFtZXRlcnMuc3RhcnRfdGltZTtcblxuXHRcdFx0dGhpcy5nbC5jbGVhciggdGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUIHwgdGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUICk7XG5cblx0XHRcdC8vIExvYWQgcHJvZ3JhbSBpbnRvIEdQVVxuXHRcdFx0dGhpcy5nbC51c2VQcm9ncmFtKCB0aGlzLmN1cnJlbnRQcm9ncmFtICk7XG5cblx0XHRcdC8vIFNldCB2YWx1ZXMgdG8gcHJvZ3JhbSB2YXJpYWJsZXNcblx0XHRcdHRoaXMuZ2wudW5pZm9ybTFmKCB0aGlzLnRpbWVMb2NhdGlvbiwgdGhpcy5wYXJhbWV0ZXJzLnRpbWUgLyAxMDAwICk7XG5cdFx0XHR0aGlzLmdsLnVuaWZvcm0yZiggdGhpcy5yZXNvbHV0aW9uTG9jYXRpb24sIHRoaXMucGFyYW1ldGVycy5zY3JlZW5XaWR0aCwgdGhpcy5wYXJhbWV0ZXJzLnNjcmVlbkhlaWdodCApO1xuXG5cdFx0XHQvLyBSZW5kZXIgZ2VvbWV0cnlcblx0XHRcdHRoaXMuZ2wuYmluZEJ1ZmZlciggdGhpcy5nbC5BUlJBWV9CVUZGRVIsIHRoaXMuYnVmZmVyICk7XG5cdFx0XHR0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIHRoaXMudmVydGV4X3Bvc2l0aW9uLCAyLCB0aGlzLmdsLkZMT0FULCBmYWxzZSwgMCwgMCApO1xuXHRcdFx0dGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggdGhpcy52ZXJ0ZXhfcG9zaXRpb24gKTtcblx0XHRcdHRoaXMuZ2wuZHJhd0FycmF5cyggdGhpcy5nbC5UUklBTkdMRVMsIDAsIDYgKTtcblx0XHRcdHRoaXMuZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KCB0aGlzLnZlcnRleF9wb3NpdGlvbiApO1xuICAgIH1cbiAgfVxuIl19
