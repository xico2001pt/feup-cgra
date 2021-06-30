import {CGFobject, CGFscene, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene, custom) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangle(scene);
        this.triangleSmall1 = new MyTriangleSmall(scene);
        this.triangleSmall2 = new MyTriangleSmall(scene);
        this.triangleBig1 = new MyTriangleBig(scene);
        this.triangleBig2 = new MyTriangleBig(scene);
        this.initMaterials(custom);
	}
  
  initMaterials(custom) {
    // Custom material
    this.custom = custom;
    
    // Purple (no ambient, high specular)
    this.purple = new CGFappearance(this.scene);
    this.purple.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.purple.setDiffuse(0.666666666, 0.3098039, 0.7607843137, 1.0);
    this.purple.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.purple.setShininess(10.0);

    // Blue (no ambient, high specular)
    this.blue = new CGFappearance(this.scene);
    this.blue.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.blue.setDiffuse(0, 0,61176470588, 1.0, 1.0);
    this.blue.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.blue.setShininess(10.0);

    // Orange (no ambient, high specular)
    this.orange = new CGFappearance(this.scene);
    this.orange.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.orange.setDiffuse(1.0, 0.61176470588, 0.0, 1.0);
    this.orange.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.orange.setShininess(10.0);

    // Yellow (no ambient, high specular)
    this.yellow = new CGFappearance(this.scene);
    this.yellow.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.yellow.setDiffuse(1.0, 1.0, 0.0, 1.0);
    this.yellow.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.yellow.setShininess(10.0);

    // Pink (no ambient, high specular)
    this.pink = new CGFappearance(this.scene);
    this.pink.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.pink.setDiffuse(1.0, 0.6117647, 0.8235294, 1.0);
    this.pink.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.pink.setShininess(10.0);

    // Red (no ambient, high specular)
    this.red = new CGFappearance(this.scene);
    this.red.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.red.setDiffuse(1.0, 0.078431, 0.078431, 1.0);
    this.red.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.red.setShininess(10.0);

    // Green (no ambient, high specular)
    this.green = new CGFappearance(this.scene);
    this.green.setAmbient(0.0, 0.0, 0.0, 1.0);
    this.green.setDiffuse(0.0, 1.0, 0.0, 1.0);
    this.green.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.green.setShininess(10.0);
  }
	
    display(){
    
    // Display Diamond
    this.scene.pushMatrix();
    var angle = 45*Math.PI/180;

    var matriz_rotate = [
      Math.cos(angle), Math.sin(angle), 0, 0,
      -Math.sin(angle), Math.cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1              
    ];

    var matriz_translate = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, -0.7, 0, 1
    ];

    this.scene.multMatrix(matriz_translate);
    this.scene.multMatrix(matriz_rotate);
    //this.green.apply();
    this.custom.apply();
    this.diamond.display();
    this.scene.popMatrix();

    // Display Parallelogram
    this.scene.pushMatrix();
    this.scene.translate(-0.7, 0, 0)
    this.scene.rotate(-135*Math.PI/180, 0, 0, 1);
    this.scene.scale(-1, 1, 1);
    this.yellow.apply();
    this.parallelogram.display();
    this.scene.popMatrix();

    // Display Triangle
    this.scene.pushMatrix();
    this.scene.translate(-0.7, 1.41, 0);
    this.scene.rotate(45*Math.PI/180, 0, 0, 1);
    this.pink.apply();
    this.triangle.display();
    this.scene.popMatrix();

    // Display TriangleSmall1
    this.scene.pushMatrix();
    this.scene.translate(-2.1, 0.4, 0);
    this.scene.rotate(-90*Math.PI/180, 0, 0, 1);
    this.red.apply();
    this.triangleSmall1.display();
    this.scene.popMatrix();

    // Display TriangleSmall2
    this.scene.pushMatrix();
    this.scene.translate(2.1, 0.4, 0);
    this.scene.rotate(90*Math.PI/180, 0, 0, 1);
    this.purple.apply();
    this.triangleSmall2.display();
    this.scene.popMatrix();

    // Display TriangleBig1
    this.scene.pushMatrix();
    this.scene.translate(-3.5, 0, 0);
    this.scene.rotate(-135*Math.PI/180, 0, 0, 1);
    this.blue.apply();
    this.triangleBig1.display();
    this.scene.popMatrix();

    // Display TriangleBig2
    this.scene.pushMatrix();
    this.scene.translate(3.5, 0, 0);
    this.scene.rotate(135*Math.PI/180, 0, 0, 1);
    this.orange.apply();
    this.triangleBig2.display();
    this.scene.popMatrix();
    }

    enableNormalViz(){
      this.diamond.enableNormalViz();
      this.triangle.enableNormalViz();
      this.parallelogram.enableNormalViz();
      this.triangleBig1.enableNormalViz();
      this.triangleBig2.enableNormalViz();
      this.triangleSmall1.enableNormalViz();
      this.triangleSmall2.enableNormalViz();
    }

    disableNormalViz(){
      this.diamond.disableNormalViz();
      this.triangle.disableNormalViz();
      this.parallelogram.disableNormalViz();
      this.triangleBig1.disableNormalViz();
      this.triangleBig2.disableNormalViz();
      this.triangleSmall1.disableNormalViz();
      this.triangleSmall2.disableNormalViz();
    }

    updateBuffers(complexity){
      this.initBuffers();
      this.initNormalVizBuffers();
  }
}