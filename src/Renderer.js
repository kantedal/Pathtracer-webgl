import { LoadShaders } from './ShaderLoader';

var gl = null;

export class Renderer {
  constructor() {
    this.canvas = null;
    this.buffer;
    this.vertex_shader;
    this.fragment_shader;
    //this.tracerProgram;
    this.renderProgram;
    this.vertex_position;
    this.timeLocation;
    this.resolutionLocation;
    this.parameters = { start_time: new Date().getTime(), time: 0, screenWidth : 0, screenHeight: 0, samples: 0 };

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

    this.animate = (time) => {
      //this.resizeCanvas();
      this.canvas.width = 512;
      this.canvas.height = 512;
      this.parameters.screenWidth = this.canvas.width;
    	this.parameters.screenHeight = this.canvas.height;
      gl.viewport( 0, 0, this.canvas.width, this.canvas.height );


      // render to texture
      gl.useProgram(this.tracerProgram);

      var location1 = gl.getUniformLocation(this.tracerProgram, "u_buffer_texture");
      var location2 = gl.getUniformLocation(this.tracerProgram, "u_triangle_texture");

      gl.uniform1i(location1, 0);
      gl.uniform1i(location2, 1);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.triangleTexture);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[1], 0);
      gl.vertexAttribPointer(this.tracerVertexAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      this.parameters.time = new Date().getTime() - this.parameters.start_time;
      this.parameters.samples += 1;

      gl.uniform1f( this.timeLocation, this.parameters.time / 1000 );
      gl.uniform1f( this.samplesLocation,  this.parameters.samples );
      gl.uniform2f( this.resolutionLocation, this.parameters.screenWidth, this.parameters.screenHeight );

      this.textures.reverse();

      if (this.parameters.samples % 50 == 0)
        console.log(this.parameters.samples);

      gl.useProgram(this.renderProgram);
      gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(this.renderVertexAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.uniform1f( this.renderSamplesLocation,  this.parameters.samples );

			requestAnimationFrame( this.animate );
    }
  }

  createRenderProgram() {
    console.log("Create render program");

    let vertices = [-1, -1, -1, 1, 1, -1, 1, 1];
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    //this.frameBuffer = gl.createFramebuffer();
    this.fb = gl.createFramebuffer();

    let type = gl.getExtension('OES_texture_float') ? gl.FLOAT : gl.UNSIGNED_BYTE;
    this.textures = [];
    for(var i = 0; i < 2; i++) {
      this.textures.push(gl.createTexture());
      gl.bindTexture(gl.TEXTURE_2D, this.textures[i]);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, type, null);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);

    // create render shader
    let render_vertex_shader = document.getElementById('vs_render').textContent;
    let render_fragment_shader = document.getElementById('fs_render').textContent;
    this.renderProgram = this.createProgram(render_vertex_shader, render_fragment_shader);
    this.renderVertexAttribute = gl.getAttribLocation(this.renderProgram, 'vertex');
    gl.enableVertexAttribArray(this.renderVertexAttribute);
  }

  allocateTexture() {
      this.triangleTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.triangleTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      //wtu.glErrorShouldBe(gl, gl.NO_ERROR, "texture parameter setup should succeed");
  }

  addSceneTextures(triangleArray) {
    console.log("Create triangle texture");

    this.allocateTexture();
    let width = 1024;
    let height = 1024;
    let format = gl.RGB;

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, format, gl.FLOAT, triangleArray);
  }

  init() {
    LoadShaders([
      './dist/kernels/header.glsl',
      './dist/kernels/Ray.glsl',
      './dist/kernels/Camera.glsl',
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
    		try { gl = this.canvas.getContext( 'experimental-webgl' ); } catch( error ) { }
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
        this.samplesLocation = gl.getUniformLocation( this.tracerProgram, 'samples' );
    		this.resolutionLocation = gl.getUniformLocation( this.tracerProgram, 'resolution' );
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
