import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, sA, tA, sB, tB, sC, tC) {
		super(scene);
		this.initBuffers(sA, tA, sB, tB, sC, tC);
	}
	
	initBuffers(sA, tA, sB, tB, sC, tC) {
		this.vertices = [
            -1, 0, 0,	//0
            1, 0, 0,	//1
            0, 1, 0 	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			sA, tA,
			sB, tB,
			sC, tC
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

