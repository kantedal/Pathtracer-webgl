  export class Renderer {
    constructor() {
      this.canvas = null;
      this.gl = null;
      this.buffer,
      this.vertex_shader,
      this.fragment_shader,
      this.currentProgram,
      this.vertex_position,
      this.timeLocation,
      this.resolutionLocation,
      this.parameters = {start_time: new Date().getTime(), time: 0, screenWidth : 0, screenHeight: 0};

      //Framebuffers
      this.rttFramebuffer = null;
      this.rttTexture = null;

      this.init();

      this.animate = (time) => {
        this.resizeCanvas();
  			this.render();
  			requestAnimationFrame( this.animate );
      }

      this.animate();
    }

    init() {
      this.vertex_shader = document.getElementById('vs').textContent;
			this.fragment_shader = document.getElementById('fs').textContent;
			this.canvas = document.querySelector( 'canvas' );

			// Initialise WebGL
			try {
				this.gl = this.canvas.getContext( 'experimental-webgl' );
			} catch( error ) { }

			if ( !this.gl ) {
				throw "cannot create webgl context";
			}

			// Create Vertex buffer (2 triangles)
			this.buffer = this.gl.createBuffer();
			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.buffer );
			this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( [ - 1.0, - 1.0, 1.0, - 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0 ] ), this.gl.STATIC_DRAW );

			// Create Program
			this.currentProgram = this.createProgram( this.vertex_shader, this.fragment_shader );
			this.timeLocation = this.gl.getUniformLocation( this.currentProgram, 'time' );
			this.resolutionLocation = this.gl.getUniformLocation( this.currentProgram, 'resolution' );
    }

    createProgram(vertex, fragment) {
      let program = this.gl.createProgram();

			let vs = this.createShader( vertex, this.gl.VERTEX_SHADER );
			let fs = this.createShader( '#ifdef GL_ES\nprecision highp float;\n#endif\n\n' + fragment, this.gl.FRAGMENT_SHADER );

			//if ( vs == null || fs == null ) return null;

			this.gl.attachShader( program, vs );
			this.gl.attachShader( program, fs );

			this.gl.deleteShader( vs );
			this.gl.deleteShader( fs );

			this.gl.linkProgram( program );

			if ( !this.gl.getProgramParameter( program, this.gl.LINK_STATUS ) ) {
				return null;
			}

			return program;
    }

    createShader(src, type) {
      let shader = this.gl.createShader( type );

			this.gl.shaderSource( shader, src );
			this.gl.compileShader( shader );

			if (!this.gl.getShaderParameter( shader, this.gl.COMPILE_STATUS)) {
				return null;
			}
			return shader;
    }

    resizeCanvas(event) {
      if(this.canvas.width != this.canvas.clientWidth || this.canvas.height != this.canvas.clientHeight) {
				this.canvas.width = this.canvas.clientWidth;
				this.canvas.height = this.canvas.clientHeight;

				this.parameters.screenWidth = this.canvas.width;
				this.parameters.screenHeight = this.canvas.height;

				this.gl.viewport( 0, 0, this.canvas.width, this.canvas.height );
			}
    }

    initFramebuffer() {
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

    render() {
      if (!this.currentProgram) return;

			this.parameters.time = new Date().getTime() - this.parameters.start_time;

			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

			// Load program into GPU
			this.gl.useProgram( this.currentProgram );

			// Set values to program variables
			this.gl.uniform1f( this.timeLocation, this.parameters.time / 1000 );
			this.gl.uniform2f( this.resolutionLocation, this.parameters.screenWidth, this.parameters.screenHeight );

			// Render geometry
			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.buffer );
			this.gl.vertexAttribPointer( this.vertex_position, 2, this.gl.FLOAT, false, 0, 0 );
			this.gl.enableVertexAttribArray( this.vertex_position );
			this.gl.drawArrays( this.gl.TRIANGLES, 0, 6 );
			this.gl.disableVertexAttribArray( this.vertex_position );
    }
  }
