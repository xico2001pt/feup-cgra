#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	
	gl_FragColor = color;
}