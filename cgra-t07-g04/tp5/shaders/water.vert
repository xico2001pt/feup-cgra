attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec2 offset = vec2(1.0,2.0) * 0.01 * timeFactor;
    vTextureCoord = aTextureCoord + offset;

    vec4 color = texture2D(uSampler2, vTextureCoord);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + aVertexNormal * color.r * 0.05, 1.0);
}