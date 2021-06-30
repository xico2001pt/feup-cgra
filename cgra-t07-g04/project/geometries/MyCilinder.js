import { CGFobject } from '../../lib/CGF.js';
import * as Utils from '../utils.js';

/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyCilinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = Utils.degToRad(360) / this.slices;
        var x, z;

        for (var i = 0; i <= this.slices; ++i) {
            // Calculate vertex position
            x = Math.cos(ang);
            z = Math.sin(ang);

            // Push vertex position
            this.vertices.push(x, 0, z);
            this.vertices.push(x, 1, z);

            // Push vertex normal
            this.normals.push(x, 0, z);
            this.normals.push(x, 0, z);

            // Push texture coordinates
            this.texCoords.push(i / this.slices, 1);
            this.texCoords.push(i / this.slices, 0);

            ang += alphaAng;
        }

        for (var i = 0; i < this.slices; ++i) {
            this.indices.push(2 * i, 2 * i + 1, 2 * i + 2);
            this.indices.push(2 * i + 1, 2 * i + 3, 2 * i + 2);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
