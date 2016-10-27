var gl = null;

export class Renderer {
  constructor() {
    this.canvas = null;
    this.buffer;
    this.vertex_shader;
    this.fragment_shader;
    this.currentProgram;
    this.vertex_position;
    this.timeLocation;
    this.resolutionLocation;
    this.parameters = { start_time: new Date().getTime(), time: 0, screenWidth : 0, screenHeight: 0 };
    this.time = 0.0;

    this.vertexBuffer = null;
    this.frameBuffer = null;

    //Framebuffers
    this.rttFramebuffer = null;
    this.rttTexture = null;

    this.init();

    // OBS OBS Browser must support OES texture float extension!!
    if (gl.getExtension("OES_texture_float")) {

    }

    this.animate = (time) => {
      //console.log(time);
      //this.resizeCanvas();
      this.canvas.width = 512;
      this.canvas.height = 512;
      this.parameters.screenWidth = this.canvas.width;
    	this.parameters.screenHeight = this.canvas.height;
      gl.viewport( 0, 0, this.canvas.width, this.canvas.height );

			this.render();
			requestAnimationFrame( this.animate );
    }

    setTimeout(() => {
      this.animate();
    }, 2000);

  }

  allocateTexture() {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      //wtu.glErrorShouldBe(gl, gl.NO_ERROR, "texture parameter setup should succeed");
      return texture;
  }

  addSceneTextures(triangleArray) {
    let texture = this.allocateTexture();
    let width = 2048;
    let height = 2048;
    let format = gl.RGB;

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, format, gl.FLOAT, triangleArray);
  }

  init() {
    this.vertex_shader = document.getElementById('vs').textContent;
		this.fragment_shader = document.getElementById('fs').textContent;
		this.canvas = document.querySelector('canvas');

		// Initialise WebGL
		try { gl = this.canvas.getContext( 'experimental-webgl' ); } catch( error ) { }
		if ( !gl ) throw "cannot create webgl context";

		// Create Vertex buffer (2 triangles)
		this.buffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [ -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0 ] ), gl.STATIC_DRAW );


		// Create Program
		this.currentProgram = this.createProgram( this.vertex_shader, this.fragment_shader );
		this.timeLocation = gl.getUniformLocation( this.currentProgram, 'time' );
		this.resolutionLocation = gl.getUniformLocation( this.currentProgram, 'resolution' );
  }

  createProgram(vertex, fragment) {
    let program = gl.createProgram();

		let vs = this.createShader( vertex, gl.VERTEX_SHADER );
		let fs = this.createShader( '#ifdef GL_ES\nprecision highp float;\n#endif\n\n' + fragment, gl.FRAGMENT_SHADER );

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

  initFramebuffer() {
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

  render() {
    if (!this.currentProgram) return;

		this.parameters.time = new Date().getTime() - this.parameters.start_time;

		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

		// Load program into GPU
		gl.useProgram( this.currentProgram );

		// Set values to program variables
		gl.uniform1f( this.timeLocation, this.parameters.time / 1000 );
		gl.uniform2f( this.resolutionLocation, this.parameters.screenWidth, this.parameters.screenHeight );

		// Render geometry
		gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer );
		gl.vertexAttribPointer( this.vertex_position, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( this.vertex_position );
		gl.drawArrays( gl.TRIANGLES, 0, 6 );
		gl.disableVertexAttribArray( this.vertex_position );
  }
}
