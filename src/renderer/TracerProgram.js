
export class TracerProgram {

  constructor() {
    this.textures = [];
    this.tracerProgram = null;

    this.triangleTexture = null;
    this.materialTexture = null;
    this.sphereTexture = null;
  }

  render() {
    gl.useProgram(this.tracerProgram);

    var accumulated_buffer_location = gl.getUniformLocation(this.tracerProgram, "u_buffer_texture");
    var triangle_location = gl.getUniformLocation(this.tracerProgram, "u_triangle_texture");
    var sphere_location = gl.getUniformLocation(this.tracerProgram, "u_sphere_texture");
    var material_location = gl.getUniformLocation(this.tracerProgram, "u_material_texture");

    gl.uniform1i(accumulated_buffer_location, 0);
    gl.uniform1i(triangle_location, 1);
    gl.uniform1i(sphere_location, 2);
    gl.uniform1i(material_location, 3);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.triangleTexture);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.sphereTexture);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, this.materialTexture);

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
  }

  init(callback) {
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

        callback();
    },
    () => {});
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
  }
}
