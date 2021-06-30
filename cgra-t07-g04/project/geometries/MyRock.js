import { CGFobject, CGFscene, CGFappearance } from "../../lib/CGF.js";
import * as Utils from '../utils.js';

/**
 * @method constructor
 * @param  scene - MyScene object
 * @param  slices - number of slices around Y axis
 * @param  stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
 * @param  x - x coordinate 
 * @param  y - y coordinate
 * @param  z - z coordinate
 * @param angY - rotation angle on Y axis
 * @param scaleX - X scale
 * @param scaleY - Y scale
 * @param scaleZ - Z scale
 */
export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, x, y, z, angY, scaleX, scaleY, scaleZ) {
        super(scene);
        this.latDivs = stacks * 2;
        this.longDivs = slices;

        this.x = x;
        this.y = y;
        this.z = z;
        this.ang = [0, angY, 0];
        this.scale = [scaleX, scaleY, scaleZ];
        this.captured = false;

        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the sphere buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var phiInc = Utils.degToRad(180) / this.latDivs;
        var thetaInc = Utils.degToRad(360) / this.longDivs;
        var latVertices = this.longDivs + 1;
        var u = 0;
        var v = 0;
        var uInc = 1 / this.longDivs;
        var vInc = 1 / this.latDivs;

        var randomNorm;
        var firstNorm;
        // build an all-around stack at a time, starting on "north pole" and proceeding "south"
        for (let latitude = 0; latitude <= this.latDivs; latitude++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            // in each stack, build all the slices around, starting on longitude 0
            theta = 0;
            u = 0;

            randomNorm = Utils.generateRandomNumber(0.7, 1.0);
            firstNorm = randomNorm;
            for (let longitude = 0; longitude <= this.longDivs; longitude++) {
                //--- Vertices coordinates
                if (longitude == this.longDivs) randomNorm = firstNorm;
                var x = randomNorm * Math.cos(theta) * sinPhi;
                var y = randomNorm * cosPhi;
                var z = randomNorm * Math.sin(-theta) * sinPhi;
                this.vertices.push(x, y, z);

                //--- Indices
                if (latitude < this.latDivs && longitude < this.longDivs) {
                var current = latitude * latVertices + longitude;
                var next = current + latVertices;
                // pushing two triangles using indices from this round (current, current+1)
                // and the ones directly south (next, next+1)
                // (i.e. one full round of slices ahead)
                
                this.indices.push( current + 1, current, next);
                this.indices.push( current + 1, next, next +1);
                }

                //--- Normals
                // at each vertex, the direction of the normal is equal to 
                // the vector from the center of the sphere to the vertex.
                // in a sphere of radius equal to one, the vector length is one.
                // therefore, the value of the normal is equal to the position vectro
                this.normals.push(x, y, z);
                theta += thetaInc;

                //--- Texture Coordinates
                this.texCoords.push(u, v);
                u += uInc;

                randomNorm = Utils.generateRandomNumber(0.7, 1.0);
            }
            phi += phiInc;
            v += vInc;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    displayTrans() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.ang[0], 1, 0, 0);
        this.scene.rotate(this.ang[1], 0, 1, 0);
        this.scene.rotate(this.ang[2], 0, 0, 1);
        this.scene.scale(this.scale[0], this.scale[1], this.scale[2]);
        super.display();
        this.scene.popMatrix();
    }

    display() {
        super.display();
    }
}