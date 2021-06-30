#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 color;
varying vec4 vFinalColor;

void main() {
	if (coords.z >= 0.2)
		gl_FragColor =  color;    
	else
		gl_FragColor = texture2D(uSampler, vTextureCoord);
	
	gl_FragColor = gl_FragColor * vFinalColor;
}