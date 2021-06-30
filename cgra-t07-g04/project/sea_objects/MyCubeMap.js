import {CGFobject, CGFscene, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyQuad } from "../geometries/MyQuad.js";
import * as Utils from '../utils.js';

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 * @param landscapes - Reference to the names of the landscape folders
 */
export class MyCubeMap extends CGFobject {
	constructor(scene, landscapes) {
		super(scene);
        this.quad = new MyQuad(scene);
        this.initMaterial();
        this.initTextures(landscapes);
        this.updateTextures(0);
	}

    initMaterial() {
        // Material (no ambient, no diffuse, no specular, high emission)
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.material.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.material.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.material.setEmission(0.8, 0.8, 0.8, 1.0);
    }

    initTextures(landscapes) {
        this.textures = [];

        for (var i = 0; i < landscapes.length; ++i) {
            this.textures.push(new CGFtexture(this.scene, "./images/" + landscapes[i] + "/top.png"));
            this.textures.push(new CGFtexture(this.scene, "./images/" + landscapes[i] + "/bottom.png"));
            this.textures.push(new CGFtexture(this.scene, "./images/" + landscapes[i] + "/front.png"));
            this.textures.push(new CGFtexture(this.scene, "./images/" + landscapes[i] + "/back.png"));
            this.textures.push(new CGFtexture(this.scene, "./images/" + landscapes[i] + "/right.png"));
            this.textures.push(new CGFtexture(this.scene, "./images/" + landscapes[i] + "/left.png"));
        }
    }

    updateTextures(selectedTexture) {
        if (this.textures.length < 6) return;

        this.top = this.textures[6 * selectedTexture];
        this.bottom = this.textures[6 * selectedTexture + 1];
        this.front = this.textures[6 * selectedTexture + 2];
        this.back = this.textures[6 * selectedTexture + 3];
        this.right = this.textures[6 * selectedTexture + 4];
        this.left = this.textures[6 * selectedTexture + 5];
    }
	
    display(){
        this.material.apply();
        // Top
        this.top.bind();
        this.scene.pushMatrix();
        this.scene.rotate(Utils.degToRad(180), 0, 1, 0);
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Utils.degToRad(90), 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Bottom
        this.bottom.bind();
        this.scene.pushMatrix();
        this.scene.rotate(Utils.degToRad(180), 0, 1, 0);
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Utils.degToRad(-90), 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        // Front
        this.front.bind();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Utils.degToRad(180), 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Back
        this.back.bind();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        // Left
        this.left.bind();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Utils.degToRad(-90), 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Right
        this.right.bind();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Utils.degToRad(90), 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.right.unbind();
    }
}