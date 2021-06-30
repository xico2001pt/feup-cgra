import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { CGFcamera2 } from "../lib/CGFcamera2.js";
import { MyMovingFish, MOVING_FISH_SCALE } from "./controllable_objects/MyMovingFish.js";
import { MyCubeMap } from "./sea_objects/MyCubeMap.js";
import { MySeaFloor } from "./sea_objects/MySeaFloor.js";
import { MyNest } from "./sea_objects/MyNest.js";
import { MyWaterSurface } from "./sea_objects/MyWaterSurface.js";
import { MyRockSet } from "./sea_objects/MyRockSet.js";
import { MyPillar } from "./sea_objects/MyPillar.js";
import { MyWaterPlantsSet } from "./sea_objects/MyWaterPlantsSet.js";
import * as Utils from './utils.js';
export { MAX_HEIGHT, MIN_HEIGHT, LIFT_SPEED };

const PERIOD = 50;

const MAX_HEIGHT = 10;
const MIN_HEIGHT = 0.7;
const CUBE_MAP_SIZE = 50;

const ACCELERATION = 0.01;
const ROTATION_VELOCITY = 0.05;
const LIFT_SPEED = 0.05;

const GRAVITY = -0.0000017;
const ROCK_ROTATIONS = 2 * Utils.degToRad(360);
const DELTA_ERROR = 0.04;

const SEAFLOOR_DIVS = 30;
const SEAFLOOR_LENGTH = 50;
const SEAFLOOR_WIDTH = 50;
const SEAFLOOR_OFFSET = -0.45;

const NEST_X = -4;
const NEST_Y = 0.2;
const NEST_Z = 2;
const NEST_RADIUS = 1;

const WATERSURFACE_LENGTH = 50;
const WATERSURFACE_WIDTH = 50; 
const WATERSURFACE_HEIGHT = 10;

const NUM_ROCKS = 8;
const ROCKS_HEIGHT = 0.20;

const PILLAR_HEIGHT = 10;
const PILLAR_RADIUS = 0.5;
const PILLAR_X1 = 2.5;
const PILLAR_X2 = 24.5;
const PILLAR_Z1 = 0.0;
const PILLAR_Z2 = -3.5;

const NUM_WATER_PLANTS = 20;
const WATER_PLANTS_Y_OFFSET = 0.1;

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(PERIOD);
        
        this.enableTextures(true);

        this.landscapes = ['underwater_cubemap' ,'demo_cubemap', 'mountains_cubemap'];
        this.landscapeIds = {'Underwater': 0,'Demo': 1, 'Mountains': 2};

        this.initObjects();
        this.initAppearances();
        this.initInterface();
    }

    initObjects(){
        this.axis = new CGFaxis(this);
        this.movingFish = new MyMovingFish(this);
        this.cubeMap = new MyCubeMap(this, this.landscapes);
        this.seaFloor = new MySeaFloor(this, SEAFLOOR_DIVS, SEAFLOOR_LENGTH, SEAFLOOR_WIDTH, SEAFLOOR_OFFSET);
        this.nest = new MyNest(this, NEST_X, NEST_Y, NEST_Z, NEST_RADIUS);
        this.waterSurface = new MyWaterSurface(this, WATERSURFACE_LENGTH, WATERSURFACE_WIDTH, WATERSURFACE_HEIGHT);
        this.rockSet = new MyRockSet(this, NUM_ROCKS, ROCKS_HEIGHT);
        this.pillar1 = new MyPillar(this, PILLAR_X1, PILLAR_Z1, PILLAR_HEIGHT, PILLAR_RADIUS);
        this.pillar2 = new MyPillar(this, PILLAR_X1, PILLAR_Z2, PILLAR_HEIGHT, PILLAR_RADIUS);
        this.pillar3 = new MyPillar(this, PILLAR_X2, PILLAR_Z1, PILLAR_HEIGHT, PILLAR_RADIUS);
        this.pillar4 = new MyPillar(this, PILLAR_X2, PILLAR_Z2, PILLAR_HEIGHT, PILLAR_RADIUS);
        this.plantsSet = new MyWaterPlantsSet(this, NUM_WATER_PLANTS, WATER_PLANTS_Y_OFFSET);
        this.throwRock = null;
        this.time = 0;
        this.rockInitialPosition = [0, 0, 0];
        this.throwTime = 0;
        this.rockRotationFrequency = 0;
    }

    initAppearances(){
        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

        this.defaultAppearance2 = new CGFappearance(this);
		this.defaultAppearance2.setAmbient(0.3, 0.3, 0.3, 1);
		this.defaultAppearance2.setDiffuse(0.7, 0.7, 0.7, 1);
		this.defaultAppearance2.setSpecular(0.0, 0.0, 0.0, 1);
		this.defaultAppearance2.setShininess(120);
    }

    initInterface(){
        this.displayAxis = true;
        this.displayMovingFish = true;
        this.selectedLandscape = 0;
        this.scaleFactor = 1;
        this.speedFactor = 1;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera2(1.75, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
        this.cameraInitPos = [this.camera.position[0], this.camera.position[1], this.camera.position[2]];
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    addRock(rock) {
        this.rock = rock;
        this.time = 0;
        this.rockInitialPosition = [this.movingFish.x + Math.sin(this.movingFish.orientation) * MOVING_FISH_SCALE, this.movingFish.y, this.movingFish.z + Math.cos(this.movingFish.orientation) * MOVING_FISH_SCALE];
        this.throwTime = Math.sqrt((2 * (this.nest.getNextPosition(this.rock)[1] - MAX_HEIGHT / 2)) / GRAVITY);
        this.rockRotationFrequency = ROCK_ROTATIONS * PERIOD / this.throwTime;
    }

    getRockPosition(time) {
        var x = this.rockInitialPosition[0] + (this.nest.getNextPosition(this.rock)[0] - this.rockInitialPosition[0]) * time / this.throwTime;
        var y = this.rockInitialPosition[1] + GRAVITY * Math.pow(time, 2) / 2;
        var z = this.rockInitialPosition[2] + (this.nest.getNextPosition(this.rock)[2] - this.rockInitialPosition[2]) * time / this.throwTime;
        return [x, y, z];
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();
        this.movingFish.update(t, this.speedFactor);
        this.waterSurface.update(t);
        if (this.rock != null) {  // If animation reached the end
            this.time += PERIOD;
            if (this.time >= this.throwTime) {
                this.nest.addRock(this.rock);
                this.rock.ang[0] = 0;
                this.rock.ang[2] = 0;
                this.rock = null;
            }
            else {
                [this.rock.x, this.rock.y, this.rock.z] = this.getRockPosition(this.time);
                this.rock.ang[0] += this.rockRotationFrequency;
                this.rock.ang[1] += this.rockRotationFrequency;
                this.rock.ang[2] += this.rockRotationFrequency;
            }
        }
    }

    updateLandscape() {
        this.cubeMap.updateTextures(this.selectedLandscape);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        this.defaultAppearance2.apply();

        this.displayCubeMap();

        this.seaFloor.display();
        this.nest.display();
        this.waterSurface.display();
        this.rockSet.display();

        if (this.displayMovingFish) this.displayMyMovingFish();

        this.displayPillars();
        
        this.plantsSet.display();

        if (this.rock != null) this.rock.displayTrans();

        // ---- END Primitive drawing section
    }

    displayMyMovingFish() {
        this.pushMatrix();
        this.translate(this.movingFish.x, this.movingFish.y, this.movingFish.z);
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.translate(-this.movingFish.x, -this.movingFish.y, -this.movingFish.z);
        this.movingFish.display();
        this.popMatrix();
    }

    displayCubeMap() {
        this.pushMatrix();
        this.translate(this.cameraInitPos[0], this.cameraInitPos[1], this.cameraInitPos[2]);
        this.scale(CUBE_MAP_SIZE, CUBE_MAP_SIZE, CUBE_MAP_SIZE);
        this.cubeMap.display();
        this.popMatrix();
    }

    displayPillars() {
        this.pillar1.display();
        this.pillar2.display();
        this.pillar3.display();
        this.pillar4.display();
    }
    
    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.movingFish.accelerate(ACCELERATION);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.movingFish.accelerate(-ACCELERATION);
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.movingFish.turn(ROTATION_VELOCITY);
            this.movingFish.object.updateLeftTurn(1);
        }
        else if (Math.abs(this.movingFish.object.finAng) < DELTA_ERROR) {
            this.movingFish.object.updateLeftTurn(0);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.movingFish.turn(-ROTATION_VELOCITY);
            this.movingFish.object.updateRightTurn(1);
        }
        else if (Math.abs(this.movingFish.object.finAng) < DELTA_ERROR) {
            this.movingFish.object.updateRightTurn(0);
        }
        
        if (this.gui.isKeyPressed("KeyR")){
            this.movingFish.reset();
        }

        if (this.gui.isKeyPressed("KeyP")){
            this.movingFish.lift(LIFT_SPEED);
        }

        if (this.gui.isKeyPressed("KeyL")){
            this.movingFish.lift(-LIFT_SPEED);
        }

        if (this.gui.isKeyPressed("KeyC")){
            this.movingFish.dropRock();
            this.movingFish.grabRock();
            this.movingFish.throwRock();
        }
    }
}