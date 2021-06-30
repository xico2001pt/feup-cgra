import { CGFobject } from '../../lib/CGF.js';
import { MAX_HEIGHT, MIN_HEIGHT } from '../MyScene.js';
import { MyFish } from '../sea_objects/MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';
import * as Utils from '../utils.js';
export { MOVING_FISH_SCALE };

const INF = 99999;
const MOVING_FISH_SCALE = 0.25;
const MAX_ROCK_DIST = 1.5;
const THROW_MAX_DISTANCE = 5;

/**
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFish extends MyMovingObject {
    constructor(scene) {
        super(scene, new MyFish(scene));
    }

    display() {
        // Draw fish current position and orientation
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation , 0, 1, 0);
        this.scene.scale(MOVING_FISH_SCALE, MOVING_FISH_SCALE, MOVING_FISH_SCALE);
        this.object.display();
        this.scene.popMatrix();

        // Draw rock position
        if (this.rock != null) {
            this.scene.pushMatrix();
            this.scene.translate(this.x, this.y, this.z);
            this.scene.rotate(this.orientation, 0, 1, 0);
            this.scene.translate(0, 0, MOVING_FISH_SCALE);

            // Rock transformations
            this.scene.rotate(this.rock.ang[0], 1, 0, 0);
            this.scene.rotate(this.rock.ang[1], 0, 1, 0);
            this.scene.rotate(this.rock.ang[2], 0, 0, 1);
            this.scene.scale(this.rock.scale[0], this.rock.scale[1], this.rock.scale[2]);

            this.rock.display();
            this.scene.popMatrix();
        }
    }

    update(t, speedFactor) {
        super.update(t, speedFactor);
        this.object.updateTailAngle(5 * Math.min(this.speed, 1) + 1);
        this.object.updateFinAngle(0.5);
    }

    reset() {
        super.reset();
        this.object.reset();
        this.y = MAX_HEIGHT / 2;
        if (this.rock != null) this.rock.captured = false;
        this.rock = null;
    }

    grabRock() {
        if (this.y != MIN_HEIGHT || this.rock != null) return;
        var rockSet = this.scene.rockSet;
        var dist, nearestRock = 0, nearestDist = INF;
        for (var i = 0; i < rockSet.numRocks; ++i) {
            if (rockSet.rocks[i].captured) continue;
            dist = Utils.distance(this.x, this.y, this.z, rockSet.rocks[i].x, rockSet.rocks[i].y, rockSet.rocks[i].z);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestRock = i;
            }
        }
        if (nearestDist >= MAX_ROCK_DIST) return;
        this.rock = rockSet.rocks[nearestRock];
        this.rock.captured = true;
    }

    dropRock() {
        if (this.y != MIN_HEIGHT || this.rock == null) return;
        var nest = this.scene.nest;
        if (Utils.distance(this.x, this.y, this.z, nest.x, nest.y, nest.z) > nest.radius) return;
        nest.addRock(this.rock);
        this.rock = null;
    }

    throwRock() {
        if (this.y != MAX_HEIGHT / 2 || this.rock == null) return;
        var nest = this.scene.nest;
        if (Utils.distance(this.x, 0, this.z, nest.x, 0, nest.z) > THROW_MAX_DISTANCE) return;
        this.scene.addRock(this.rock);
        this.rock = null;
    }
}