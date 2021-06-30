import { CGFobject, CGFscene, CGFappearance } from "../../lib/CGF.js";
import { MyWaterPlants } from "../sea_objects/MyWaterPlants.js"
import * as Utils from '../utils.js';

const GRID_SIZE = 15;
const MAX_HEIGHT = 1.0;
const MIN_HEIGHT = 0.6;
const MAX_NUM_PLANTS = 5;
const MIN_NUM_PLANTS = 3;

export class MyWaterPlantsSet extends CGFobject {
    /**
     * @method constructor
     * @param scene - MyScene object
     * @param numWaterPlants - Number of WaterPlants
     * @param height - floor offset
     */
    constructor(scene, numWaterPlants, height) {
        super(scene);
        this.numWaterPlants = numWaterPlants;
        this.height = height;
        this.generateWaterPlants();
    }

    generateWaterPlants() {
        this.waterPlants = [];

        var x, z, color, scale, numPlants;
        for (var i = 0; i < this.numWaterPlants; ++i) {
            x = Utils.generateRandomNumber(-GRID_SIZE/2, GRID_SIZE/2);
            z = Utils.generateRandomNumber(-GRID_SIZE/2, GRID_SIZE/2);
            this.color = [Utils.generateRandomNumber(0, 1), Utils.generateRandomNumber(0, 1), Utils.generateRandomNumber(0, 1), 1.0]
            scale = Utils.generateRandomNumber(MIN_HEIGHT, MAX_HEIGHT);
            numPlants = Utils.generateRandomNumber(MIN_NUM_PLANTS, MAX_NUM_PLANTS);
            this.waterPlants.push(new MyWaterPlants(this.scene, x, this.height, z, this.color, scale, numPlants));
        }
    }

    display() {
        for (var i = 0; i < this.waterPlants.length; ++i) {
            this.waterPlants[i].display();
        }
    }
}