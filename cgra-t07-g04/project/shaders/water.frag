#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float time;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec2 offset = vec2(1.0, 1.0) * 0.001 * time;

	vec4 distortion = texture2D(uSampler2, vTextureCoord + offset);
	vec4 color = texture2D(uSampler, vTextureCoord + vec2(distortion.r - 0.5, distortion.g - 0.5) * 0.6);

	gl_FragColor = color;
}