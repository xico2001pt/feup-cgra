import { CGFobject, CGFscene, CGFappearance, CGFtexture, CGFshader } from "../../lib/CGF.js";
import { MySphere } from '../geometries/MySphere.js';
import * as Utils from '../utils.js';

const NUM_SLICES = 50;
const NUM_STACKS = 30;
const NEST_HEIGHT = 0.25;
const MAX_NUM_POSITIONS = 5;
const MIN_NUM_POSITIONS = 2;

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - x coordinate
 * @param y - y coordinate
 * @param z - z coordinate
 * @param radius - nest radius
 */
export class MyNest extends CGFobject {
    constructor(scene, x, y, z, radius) {
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.shell = new MySphere(scene, NUM_SLICES, NUM_STACKS);
        this.rocks = [];
        this.positions = [];
        this.initMaterials();
        this.generatePositions();
    }

    generatePositions() {
        var numPositions = Utils.generateRandomNumber(MIN_NUM_POSITIONS, MAX_NUM_POSITIONS);
        for (var i = 0; i < numPositions; ++i) this.rocks.push([]);

        var x, z, limitZ;
        for (var i = 0; i < numPositions; ++i) {
            x = Utils.generateRandomNumber(-this.radius * 0.75, this.radius * 0.75);
            limitZ = Math.sqrt(Math.pow(this.radius * 0.75, 2) - Math.pow(x, 2));
            z = Utils.generateRandomNumber(-limitZ, limitZ);
            this.positions.push(x + this.x, z + this.z);
        }

        this.currentStack = Utils.generateRandomInteger(0, numPositions - 1);
    }

    initMaterials() {
        this.shellMat = new CGFappearance(this.scene);
        this.shellMat.setAmbient(0.7, 0.7, 0.7, 1.0);
        this.shellMat.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.shellMat.setSpecular(0.6, 0.6, 0.6, 1.0);
        this.shellMat.setEmission(0.2, 0.2, 0.2, 1.0);
        this.shellMat.setShininess(40.0);
        this.shellMat.loadTexture('./images/shell.png')
    }

    display() {
        this.shellMat.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.radius, NEST_HEIGHT, this.radius);
        this.shell.display();
        this.scene.popMatrix();

        this.scene.defaultAppearance2.apply();

        for (var i = 0; i < this.rocks.length; ++i) {
            for (var j = 0; j < this.rocks[i].length; j++) {
                this.rocks[i][j].displayTrans();
            }
        }
    }

    addRock(rock) {
        [rock.x, rock.y, rock.z] = this.getNextPosition(rock);
        this.rocks[this.currentStack].push(rock);

        this.currentStack = Utils.generateRandomInteger(0, this.rocks.length - 1);
    }

    getNextPosition(rock) {
        var previousY, previousHeight, stackSize = this.rocks[this.currentStack].length;
        if (stackSize == 0) {
            previousY = this.y;
            previousHeight = NEST_HEIGHT * 0.95;
        }
        else {
            previousY = this.rocks[this.currentStack][stackSize - 1].y;
            previousHeight = this.rocks[this.currentStack][stackSize - 1].scale[1];
        }

        return [this.positions[2 * this.currentStack], previousY + rock.scale[1] + previousHeight, this.positions[2 * this.currentStack + 1]];
    }
}