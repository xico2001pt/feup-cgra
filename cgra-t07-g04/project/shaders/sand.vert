attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float offset;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    vTextureCoord = aTextureCoord;
    vec4 color = texture2D(uSampler2, vTextureCoord);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + aVertexNormal * (color.r + offset) * 3.0, 1.0);
}