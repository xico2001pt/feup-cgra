import {CGFobject, CGFscene} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, top = null, front = null, right = null, back = null, left = null, bottom = null) {
		super(scene);
        this.quad = new MyQuad(scene);
        this.topTex = top;
        this.frontTex = front;
        this.rightTex = right;
        this.backTex = back;
        this.leftTex = left;
        this.bottomTex = bottom;
	}
	
    display(){
        // Up
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-90*Math.PI/180, 1, 0, 0);
        if (this.topTex != null) {
            this.topTex.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        }
        this.quad.display();
        if (this.topTex != null) {
            this.topTex.unbind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        this.scene.popMatrix();

        // Down
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90*Math.PI/180, 1, 0, 0);
        if (this.bottomTex != null){
            this.bottomTex.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        if (this.bottomTex != null) {
            this.bottomTex.unbind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        this.scene.popMatrix();

        // Front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        if (this.frontTex != null){
            this.frontTex.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        if (this.frontTex != null) {
            this.frontTex.unbind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(180*Math.PI/180, 0, 1, 0);
        if (this.backTex != null){
            this.backTex.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        if (this.backTex != null) {
            this.backTex.unbind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        this.scene.popMatrix();

        // Right
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(90*Math.PI/180, 0, 1, 0);
        if (this.rightTex != null){
            this.rightTex.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        if (this.rightTex != null) {
            this.rightTex.unbind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        this.scene.popMatrix();

        // Left
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-90*Math.PI/180, 0, 1, 0);
        if (this.leftTex != null){
            this.leftTex.bind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        } 
        this.quad.display();
        if (this.leftTex != null) {
            this.leftTex.unbind();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        this.scene.popMatrix();
    }
}