import { CGFobject, CGFscene, CGFappearance } from "../../lib/CGF.js";
import { MyRock } from "../geometries/MyRock.js"
import * as Utils from '../utils.js';

const GRID_SIZE = 6;
const MAX_SCALE = 0.2;
const MIN_SCALE = 0.05;
const NUM_STACKS = 8;
const NUM_SLICES = 24;

export class MyRockSet extends CGFobject {
    /**
     * @method constructor
     * @param scene - MyScene object
     * @param numRocks - Number of rocks
     * @param height - floor offset
     */
    constructor(scene, numRocks, height) {
        super(scene);
        this.numRocks = numRocks;
        this.height = height;
        this.initMaterials();
        this.generateRocks();
    }

    generateRocks() {
        this.rocks = [];

        var x, z, ang, scaleX, scaleY, scaleZ;
        for (var i = 0; i < this.numRocks; ++i) {
            x = Utils.generateRandomNumber(-GRID_SIZE/2, GRID_SIZE/2);
            z = Utils.generateRandomNumber(-GRID_SIZE/2, GRID_SIZE/2);
            ang = Utils.generateRandomNumber(0, Utils.degToRad(360));
            scaleX = Utils.generateRandomNumber(MIN_SCALE, MAX_SCALE);
            scaleY = Utils.generateRandomNumber(MIN_SCALE, MAX_SCALE / 2);
            scaleZ = Utils.generateRandomNumber(MIN_SCALE, MAX_SCALE);
            this.rocks.push(new MyRock(this.scene, NUM_SLICES, NUM_STACKS, x, this.height, z, ang, scaleX, scaleY, scaleZ));
        }
    }

    initMaterials() {
        this.rockColor = new CGFappearance(this.scene);
        this.rockColor.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.rockColor.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.rockColor.setSpecular(0.6, 0.6, 0.6, 1.0);
        this.rockColor.setShininess(20.0);
    }

    display() {
        this.rockColor.apply();

        for (var i = 0; i < this.rocks.length; ++i) {
            if (!this.rocks[i].captured) this.rocks[i].displayTrans();
        }

        this.scene.defaultAppearance2.apply();
    }
}