import { CGFobject, CGFscene, CGFappearance, CGFtexture, CGFshader } from "../../lib/CGF.js";
import { MyFishBody } from '../geometries/MyFishBody.js';
import { MyTriangle } from '../geometries/MyTriangle.js';
import { MySphere } from '../geometries/MySphere.js';
import * as Utils from '../utils.js';

const NUM_SLICES = 50;
const NUM_STACKS = 30;
const COLOR = [0.25, 0.41, 0.88, 1.0];
const MAX_ANGLE = Utils.degToRad(35);
const BODY_SCALE = [0.6, 0.75, 1.0];
const TAIL_SCALE = [0.45, 0.45, 0.45];
const DORSAL_TAIL_SCALE = [0.3, 0.3, 0.3];
const FIN_SCALE = [0.225, 0.225, 0.225];
const EYE_SCALE = [0.15, 0.15, 0.15];

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initObjects();
        this.initMaterials();
        this.reset();
    }

    initObjects() {
        this.body = new MyFishBody(this.scene, NUM_SLICES, NUM_STACKS); 
        this.eye = new MySphere(this.scene, NUM_SLICES, NUM_STACKS); 
        this.fin = new MyTriangle(this.scene);
    }

    initMaterials() {
        this.fishBodyShader = new CGFshader(this.scene.gl, "shaders/fishBody.vert", "shaders/fishBody.frag");
        this.fishBodyShader.setUniformsValues({color : COLOR});

        this.fishColor = new CGFappearance(this.scene);
        this.fishColor.setAmbient(COLOR[0], COLOR[1], COLOR[2], COLOR[3]);
        this.fishColor.setDiffuse(COLOR[0], COLOR[1], COLOR[2], COLOR[3]);
        this.fishColor.setSpecular(0.6, 0.6, 0.6, 1.0);
        this.fishColor.setShininess(20.0);

        this.eyeballColor = new CGFappearance(this.scene);
        this.eyeballColor.setEmission(0.7, 0.7, 0.7, 1.0);

        this.eyeball = new CGFtexture(this.scene, "./images/eyes.png");
        this.fishTexture = new CGFtexture(this.scene, "./images/fishBody.jpg");

    }

    updateTailAngle(angVel) {
        this.tailAnim += angVel
        this.tailAng = MAX_ANGLE * Math.sin(this.tailAnim * 0.25);
    }

    updateFinAngle(angVel) {
        this.finAnim += angVel
        this.finAng = MAX_ANGLE * Math.sin(this.finAnim * 0.25);
    }

    updateLeftTurn(bool) {
        this.leftTurn = bool;
    }

    updateRightTurn(bool) {
        this.rightTurn = bool;
    }

    display() {
        this.displayEyes();
        this.displayBody();
        this.displayFins();
        this.displayTail();
    }

    displayBody() {
        this.fishTexture.bind();

        this.scene.pushMatrix();
        this.scene.setActiveShader(this.fishBodyShader);
        this.scene.scale(BODY_SCALE[0], BODY_SCALE[1], BODY_SCALE[2]);
        this.body.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        this.fishTexture.unbind();
    }

    displayTail() {
        this.fishColor.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.scene.rotate(this.tailAng, 0, 1, 0);
        this.scene.scale(TAIL_SCALE[0], TAIL_SCALE[1], TAIL_SCALE[2]);
        this.scene.translate(0, 0, -Math.sqrt(2));
        this.scene.rotate(Utils.degToRad(90), 0, 1, 0);
        this.scene.rotate(Utils.degToRad(-45), 0, 0, 1);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.defaultAppearance2.apply();
    }

    displayFins() {
        this.fishColor.apply();

        // Dorsal Tail
        this.scene.pushMatrix();
        this.scene.translate(0.0, 1.2, -0.3);
        this.scene.rotate(Utils.degToRad(-90), 0, 1, 0);
        this.scene.scale(DORSAL_TAIL_SCALE[0], DORSAL_TAIL_SCALE[1], DORSAL_TAIL_SCALE[2]);
        this.scene.translate(1, -1, 0);
        this.fin.display();
        this.scene.popMatrix();

        // Left Fin
        this.scene.pushMatrix();
        this.scene.translate(0.58, -0.15, 0.15);
        this.scene.rotate(Utils.degToRad(30), 0, 0, 1);
        this.scene.rotate((this.leftTurn == 0 ? this.finAng : 0), 0, 0, 1);
        this.scene.rotate(Utils.degToRad(90), 0, 1, 0);
        this.scene.scale(FIN_SCALE[0], FIN_SCALE[1], FIN_SCALE[2]);
        this.scene.translate(1, -1, 0);
        this.fin.display();
        this.scene.popMatrix();

        // Right Fin
        this.scene.pushMatrix();
        this.scene.translate(-0.58, -0.15, 0.15);
        this.scene.rotate(Utils.degToRad(-30), 0, 0, 1);
        this.scene.rotate((this.rightTurn == 0 ? -this.finAng : 0), 0, 0, 1);
        this.scene.rotate(Utils.degToRad(90), 0, 1, 0);
        this.scene.scale(FIN_SCALE[0], FIN_SCALE[1], FIN_SCALE[2]);
        this.scene.translate(1, -1, 0);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.defaultAppearance2.apply();
    }

    displayEyes() {
        this.eyeballColor.apply();
        this.eyeball.bind();
        
        // Left Eye
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.1, 0.4);
        this.scene.rotate(Utils.degToRad(-20), 0, 1, 0);
        this.scene.rotate(Utils.degToRad(-90), 0, 0, 1);
        this.scene.scale(EYE_SCALE[0], EYE_SCALE[1], EYE_SCALE[2]);
        this.eye.display();
        this.scene.popMatrix();

        // Right Eye
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.1, 0.4);
        this.scene.rotate(Utils.degToRad(20), 0, 1, 0);
        this.scene.rotate(Utils.degToRad(90), 0, 0, 1);
        this.scene.scale(EYE_SCALE[0], EYE_SCALE[1], EYE_SCALE[2]);
        this.eye.display();
        this.scene.popMatrix();

        this.eyeball.unbind();
        this.scene.defaultAppearance2.apply();
    }
    
    reset() {
        this.tailAng = 0;
        this.finAng = 0;
        this.leftTurn = 0;
        this.rightTurn = 0;
        this.tailAnim = 0;
        this.finAnim = 0;
    }
}