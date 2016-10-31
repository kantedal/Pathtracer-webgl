import { LoadShaders } from './ShaderLoader';

function throwOnGLError(err, funcName, args) {
  throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
};

var gl = null;

export class Renderer {
  constructor(camera) {
    this.camera = camera;

    this.canvas = null;
    this.buffer;
    this.vertex_shader;
    this.fragment_shader;
    this.renderProgram;
    this.vertex_position;
    this.timeLocation;
    this.resolutionLocation;
    this.parameters = { start_time: new Date().getTime(), time: 0, screenWidth : 0, screenHeight: 0, samples: 0 };

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

    this.animate = (time) => {
      if (this.rendererReady) {
        //this.resizeCanvas();
        this.canvas.width = 512;
        this.canvas.height = 512;
        this.parameters.screenWidth = this.canvas.width;
      	this.parameters.screenHeight = this.canvas.height;
        gl.viewport( 0, 0, this.canvas.width, this.canvas.height );

        // render to texture
        gl.useProgram(this.tracerProgram);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);

        // Set camera position
        this.setCameraPosition();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[1], 0);
        gl.vertexAttribPointer(this.tracerVertexAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        this.parameters.time = new Date().getTime() - this.parameters.start_time;
        this.parameters.samples += 1;

        gl.uniform1f( this.timeLocation, this.parameters.time / 100000 );
        gl.uniform2f( this.resolutionLocation, this.parameters.screenWidth, this.parameters.screenHeight );

        this.textures.reverse();

        gl.useProgram(this.renderProgram);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(this.renderVertexAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.uniform1f( this.renderSamplesLocation,  this.parameters.samples );
      }

      this.calculateSPS();
      document.getElementById('total-samples').innerHTML = this.parameters.samples;
			requestAnimationFrame( this.animate );
      //setTimeout(this.animate, 1000/120);
    }
  }

  setCameraPosition() {
    if (this.camera != null) {
      gl.uniform3f(gl.getUniformLocation( this.tracerProgram, 'camera_right'), this.camera.camera_right[0], this.camera.camera_right[1], this.camera.camera_right[2] );
      gl.uniform3f(gl.getUniformLocation( this.tracerProgram, 'camera_up'), this.camera.camera_up[0], this.camera.camera_up[1], this.camera.camera_up[2] );
      gl.uniform3f(gl.getUniformLocation( this.tracerProgram, 'camera_position'), this.camera.position[0], this.camera.position[1], this.camera.position[2] );
      gl.uniform3f(gl.getUniformLocation( this.tracerProgram, 'camera_direction'), this.camera.direction[0], this.camera.direction[1], this.camera.direction[2] );

      if (this.camera.hasChanged) {
        this.resetBufferTextures();
        this.parameters.samples = 0;
        this.camera.hasChanged = false;
      }
    }
  }

  // Calcuate samples per second
  calculateSPS() {
    let now = new Date().getTime();
    this.frameCount++;
    this.elapsedTime += (now - this.lastTime);
    this.lastTime = now;

    if(this.elapsedTime >= 1000) {
      let fps = this.frameCount;
      this.frameCount = 0;
      this.elapsedTime -= 1000;
      document.getElementById('fps-count').innerHTML = fps;
    }
  }

  resetBufferTextures() {
    this.textures = [];
    for(var i = 0; i < 2; i++) {
      this.textures.push(gl.createTexture());
      gl.bindTexture(gl.TEXTURE_2D, this.textures[i]);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, gl.FLOAT, null);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  createRenderProgram() {
    let vertices = [-1, -1, -1, 1, 1, -1, 1, 1];
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    this.frameBuffer = gl.createFramebuffer();
    this.resetBufferTextures();

    // create render shader
    let render_vertex_shader = document.getElementById('vs_render').textContent;
    let render_fragment_shader = document.getElementById('fs_render').textContent;
    this.renderProgram = this.createProgram(render_vertex_shader, render_fragment_shader);
    this.renderVertexAttribute = gl.getAttribLocation(this.renderProgram, 'vertex');
    gl.enableVertexAttribArray(this.renderVertexAttribute);
  }

  addSceneTextures(textureData) {
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

    gl.uniform1i(gl.getUniformLocation( this.tracerProgram, 'triangle_count'), textureData.triangle_count );
    gl.uniform1i(gl.getUniformLocation( this.tracerProgram, 'sphere_count'), textureData.sphere_count );

    this.rendererReady = true;
  }

  init() {
    LoadShaders([
      './dist/kernels/header.glsl',
      './dist/kernels/Ray.glsl',
      './dist/kernels/Collision.glsl',
      './dist/kernels/Material.glsl',
      './dist/kernels/Triangle.glsl',
      './dist/kernels/Sphere.glsl',
      './dist/kernels/Scene.glsl',
      './dist/kernels/RayTracer.glsl',
      './dist/kernels/main.glsl',
    ], (kernelData) => {
        this.fragment_shader = kernelData;
        this.vertex_shader = document.getElementById('vs').textContent;
    		this.canvas = document.querySelector('canvas');

    		// Initialise WebGL
    		try {
           gl = this.canvas.getContext( 'webgl' );
           //gl = WebGLDebugUtils.makeDebugContext(gl, throwOnGLError);
         } catch( error ) { }
    		if ( !gl ) throw "cannot create webgl context";

        // BROWSER MUST SUPPORT THIS!!!
        gl.getExtension("OES_texture_float");

        this.createRenderProgram();

    		// Create Vertex buffer (2 triangles)
    		this.buffer = gl.createBuffer();
    		gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer );
    		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [ -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0 ] ), gl.STATIC_DRAW );

    		// Create Program
    		this.tracerProgram = this.createProgram( this.vertex_shader, this.fragment_shader );
        this.tracerVertexAttribute = gl.getAttribLocation(this.tracerProgram, 'vertex');
        gl.enableVertexAttribArray(this.tracerVertexAttribute);

        this.timeLocation = gl.getUniformLocation( this.tracerProgram, 'time' );
        this.resolutionLocation = gl.getUniformLocation( this.tracerProgram, 'resolution' );

        this.accumulated_buffer_location = gl.getUniformLocation(this.tracerProgram, "u_buffer_texture");
        this.triangle_location = gl.getUniformLocation(this.tracerProgram, "u_triangle_texture");
        this.light_location = gl.getUniformLocation(this.tracerProgram, "u_light_texture");
        this.sphere_location = gl.getUniformLocation(this.tracerProgram, "u_sphere_texture");
        this.material_location = gl.getUniformLocation(this.tracerProgram, "u_material_texture");

        this.renderSamplesLocation = gl.getUniformLocation( this.renderProgram, 'samples' );

        this.animate();
    },
    () => {});
  }

  createProgram(vertex, fragment) {
    let program = gl.createProgram();

		let vs = this.createShader( vertex, gl.VERTEX_SHADER );
		let fs = this.createShader( fragment, gl.FRAGMENT_SHADER );

		gl.attachShader( program, vs );
		gl.attachShader( program, fs );

		gl.deleteShader( vs );
		gl.deleteShader( fs );

		gl.linkProgram( program );

		if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
			return null;
		}

		return program;
  }

  createShader(src, type) {
    let shader = gl.createShader( type );

		gl.shaderSource( shader, src );
		gl.compileShader( shader );

		if (!gl.getShaderParameter( shader, gl.COMPILE_STATUS)) {
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
