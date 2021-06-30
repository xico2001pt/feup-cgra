import { CGFobject, CGFscene, CGFtexture, CGFshader } from "../../lib/CGF.js";
import { MyPlane } from "../geometries/MyPlane.js";
import * as Utils from '../utils.js';

/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param length - length of the floor
 * @param width - width of the floor
 * @param offset - height offset of the floor
 */
export class MySeaFloor extends CGFobject {
	constructor(scene, nrDivs, length, width, offset) {
		super(scene);
		this.nrDivs = nrDivs;
        this.length = length;
        this.width = width;
        this.offset = offset;
        this.seaFloor = new MyPlane(scene, nrDivs, 0, length/10, 0, width/10);
        this.initTextures();
	}

    initTextures() {
        this.sand = new CGFtexture(this.scene, "./images/sand.png");
        this.sandMap = new CGFtexture(this.scene, "./images/sandMap.png");

        this.sandShader = new CGFshader(this.scene.gl, "shaders/sand.vert", "shaders/sand.frag");
        this.sandShader.setUniformsValues({offset : this.offset, uSampler2: 1 });
    }

    display() {
        this.scene.setActiveShader(this.sandShader);
        this.sand.bind(0);
        this.sandMap.bind(1);

        this.scene.pushMatrix();
        this.scene.rotate(Utils.degToRad(-90), 1, 0, 0);
        this.scene.scale(this.length, this.width, 1);
        this.seaFloor.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.sand.unbind();
        this.sandMap.unbind();
    }
}