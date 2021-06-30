import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			// Up
			0.5, 0.5, 0.5,		// 0
			0.5, 0.5, -0.5,		// 1
			-0.5, 0.5, -0.5,	// 2
			-0.5, 0.5, 0.5,		// 3

			// Down
			0.5, -0.5, 0.5,		// 4
			0.5, -0.5, -0.5,	// 5
			-0.5, -0.5, -0.5,	// 6
			-0.5, -0.5, 0.5,	// 7

			// Front
			0.5, 0.5, 0.5,		// 8
			-0.5, 0.5, 0.5,		// 9
			-0.5, -0.5, 0.5,	// 10
			0.5, -0.5, 0.5,		// 11

			// Back
			0.5, 0.5, -0.5,		// 12
			-0.5, 0.5, -0.5,	// 13
			-0.5, -0.5, -0.5,	// 14
			0.5, -0.5, -0.5,	// 15

			// Right
			0.5, 0.5, 0.5,		// 16
			0.5, -0.5, 0.5,		// 17
			0.5, -0.5, -0.5,	// 18
			0.5, 0.5, -0.5,		// 19

			// Left
			-0.5, 0.5, 0.5,		// 20
			-0.5, -0.5, 0.5,	// 21
			-0.5, -0.5, -0.5,	// 22
			-0.5, 0.5, -0.5	// 23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			// Up
			0, 1, 2,
			2, 3, 0,

			// Down
			6, 5, 4,
			4, 7, 6,

			// Front
			8, 9, 10,
			10, 11, 8,

			// Back
			14, 13, 12,
			12, 15, 14,

			// Right
			16, 17, 18,
			18, 19, 16,

			// Left
			22, 21, 20,
			20, 23, 22
        ];

		this.normals = [
			// Up
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			// Down
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,

			// Front
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			// Back
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,

			// Right
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			// Left
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}