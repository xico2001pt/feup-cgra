import { CGFobject, CGFscene, CGFappearance } from "../../lib/CGF.js";
import { MyPyramid } from "../geometries/MyPyramid.js";
import * as Utils from '../utils.js';

const NUM_SLICES = 12;
const GRID_SIZE = 0.4;
const SCALE_VARIATION = 0.3;
const PROPORTION = 22;

export class MyWaterPlants extends CGFobject {
    /**
     * @method constructor
     * @param scene - MyScene object
     * @param x - x coordinate
     * @param y - y coordinate
     * @param z - z coordinate
     * @param color - plants color
     * @param scale - plants scale
     * @param numPlants - number of plants
     */
    constructor(scene, x, y, z, color, scale, numPlants) {
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.scale = scale;
        this.numPlants = numPlants;
        this.pyramid = new MyPyramid(this.scene, NUM_SLICES);
        this.initMaterials();
        this.generateWaterPlants();
    }

    generateWaterPlants() {
        this.positions = [];
        this.scales = [];

        var x, z, scale;
        for (var i = 0; i < this.numPlants; ++i) {
            x = Utils.generateRandomNumber(-GRID_SIZE/2, GRID_SIZE/2);
            z = Utils.generateRandomNumber(-GRID_SIZE/2, GRID_SIZE/2);
            scale = Utils.generateRandomNumber(this.scale - SCALE_VARIATION, this.scale + SCALE_VARIATION);
            this.positions.push(x, z);
            this.scales.push(scale);
        }
    }
    
    initMaterials() {
        this.plantMat = new CGFappearance(this.scene);
        this.plantMat.setAmbient(this.color[0], this.color[1], this.color[2], this.color[3]);
        this.plantMat.setDiffuse(this.color[0], this.color[1], this.color[2], this.color[3]);
        this.plantMat.setSpecular(0.6, 0.6, 0.6, 1.0);
        this.plantMat.setShininess(20.0);
    }

    display() {
        this.plantMat.apply();
        for (var i = 0; i < this.numPlants; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.positions[2*i] + this.x ,this.y, this.positions[2*i + 1] + this.z);
            this.scene.scale(this.scales[i] * this.scale / PROPORTION, this.scales[i] * this.scale, this.scales[i] * this.scale / PROPORTION);
            this.pyramid.display();
            this.scene.popMatrix();
        }
        this.scene.defaultAppearance2.apply();
    }
}