import { CGFobject } from '../../lib/CGF.js';
import { MAX_HEIGHT, MIN_HEIGHT, LIFT_SPEED } from '../MyScene.js';
import * as Utils from '../utils.js';

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 * @param object - object to be moved
 */
export class MyMovingObject extends CGFobject {
    constructor(scene, object) {
        super(scene);
        this.object = object;
        this.reset();
    }

    display() {
        this.scene.pushMatrix();
        // Draw current position and orientation
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation , 0, 1, 0);

        // Initial Setup
        this.scene.translate(0, 0, -1);
        this.scene.scale(1, 1, 2);
        this.scene.rotate(Utils.degToRad(90) , 1, 0, 0);

        this.object.display();
        
        this.scene.popMatrix();
    }

    update(t, speedFactor) {
        this.x += Math.sin(this.orientation) * this.speed * speedFactor;  // Update x coordinate
        this.z += Math.cos(this.orientation) * this.speed * speedFactor;  // Update z coordinate
        this.y += this.liftSpeed;
        if (this.y > MAX_HEIGHT / 2) this.y = MAX_HEIGHT / 2;
        else if (this.y < MIN_HEIGHT) this.y = MIN_HEIGHT;
    }

    lift(speed) {
        this.liftSpeed += speed;
        if (this.liftSpeed > LIFT_SPEED) this.liftSpeed = LIFT_SPEED;
        else if (this.liftSpeed < -LIFT_SPEED) this.liftSpeed = -LIFT_SPEED;
    }

    turn(orientation) {
        this.orientation += orientation;
    }

    accelerate(speed) {
        this.speed += speed;
        if (this.speed < 0)
            this.speed = 0;
    }

    reset() {
        this.orientation = 0;
        this.speed = 0;
        this.liftSpeed = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}
