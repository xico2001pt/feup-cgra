import {CGFobject, CGFscene, CGFappearance, CGFtexture} from '../lib/CGF.js';
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
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangle(scene);
        this.triangleSmall1 = new MyTriangleSmall(scene, 0.5, 0.5, 0.25, 0.75, 0.75, 0.75);
        this.triangleSmall2 = new MyTriangleSmall(scene, 0.25, 0.25, 0, 0, 0, 0.5);
        this.triangleBig1 = new MyTriangleBig(scene, 0.5, 0.5, 1, 0, 0, 0);
        this.triangleBig2 = new MyTriangleBig(scene, 0.5, 0.5, 1, 1, 1, 0);
        this.initMaterials();
	}
  
  initMaterials() {
    //------ Tangram Material
    this.tangramMaterial = new CGFappearance(this.scene);
    this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.tangramMaterial.setShininess(10.0);
    this.tangramMaterial.loadTexture('images/tangram.png');
    this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
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

    this.tangramMaterial.apply();

    this.scene.multMatrix(matriz_translate);
    this.scene.multMatrix(matriz_rotate);
    this.diamond.display();
    this.scene.popMatrix();

    // Display Parallelogram
    this.scene.pushMatrix();
    this.scene.translate(-0.7, 0, 0)
    this.scene.rotate(-135*Math.PI/180, 0, 0, 1);
    this.scene.scale(-1, 1, 1);
    this.parallelogram.display();
    this.scene.popMatrix();

    // Display Triangle
    this.scene.pushMatrix();
    this.scene.translate(-0.7, 1.41, 0);
    this.scene.rotate(45*Math.PI/180, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();

    // Display TriangleSmall1
    this.scene.pushMatrix();
    this.scene.translate(-2.1, 0.4, 0);
    this.scene.rotate(-90*Math.PI/180, 0, 0, 1);
    this.triangleSmall1.display();
    this.scene.popMatrix();

    // Display TriangleSmall2
    this.scene.pushMatrix();
    this.scene.translate(2.1, 0.4, 0);
    this.scene.rotate(90*Math.PI/180, 0, 0, 1);
    this.triangleSmall2.display();
    this.scene.popMatrix();

    // Display TriangleBig1
    this.scene.pushMatrix();
    this.scene.translate(-3.5, 0, 0);
    this.scene.rotate(-135*Math.PI/180, 0, 0, 1);
    this.triangleBig1.display();
    this.scene.popMatrix();

    // Display TriangleBig2
    this.scene.pushMatrix();
    this.scene.translate(3.5, 0, 0);
    this.scene.rotate(135*Math.PI/180, 0, 0, 1);
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