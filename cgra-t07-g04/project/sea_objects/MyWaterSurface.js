import { CGFobject, CGFscene, CGFtexture, CGFshader } from "../../lib/CGF.js";
import { MyPlane } from "../geometries/MyPlane.js";
import * as Utils from '../utils.js';

const NUM_DIVS = 1;
const MIN_S = 0;
const MAX_S = 1;
const MIN_T = 0;
const MAX_T = 1;

/**
 * MyWaterSurface
 * @constructor
 * @param scene - Reference to MyScene object
 * @param length - length of the floor
 * @param width - width of the floor
 * @param height - height of the floor
 */
export class MyWaterSurface extends CGFobject {
	constructor(scene, length, width, height) {
		super(scene);
        this.length = length;
        this.width = width;
        this.height = height;
        this.waterSurface = new MyPlane(scene, NUM_DIVS, MIN_S, MAX_S, MIN_T, MAX_T);
        this.initTextures();
	}

    initTextures() {
        this.waterTex = new CGFtexture(this.scene, "./images/pier.jpg");

        this.waterTexMap = new CGFtexture(this.scene, "./images/distortionmap.png");

        this.waterShader = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");
        this.waterShader.setUniformsValues({ time: 0, uSampler2: 1 });
    }

    update(t) {
        this.waterShader.setUniformsValues({ time: t / 100 % 1000 });
    }

    display() {
        this.scene.setActiveShader(this.waterShader);
        this.waterTex.bind(0);
        this.waterTexMap.bind(1);

        this.scene.pushMatrix();
        this.scene.translate(0, this.height, 0);
        this.scene.rotate(Utils.degToRad(90), 1, 0, 0);
        this.scene.scale(this.length, this.width, 1);
        this.waterSurface.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.waterTex.unbind();
        this.waterTexMap.unbind();
    }
}