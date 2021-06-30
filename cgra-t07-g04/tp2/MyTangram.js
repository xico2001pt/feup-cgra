import {CGFobject, CGFscene} from '../lib/CGF.js';
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
        this.triangleSmall1 = new MyTriangleSmall(scene);
        this.triangleSmall2 = new MyTriangleSmall(scene);
        this.triangleBig1 = new MyTriangleBig(scene);
        this.triangleBig2 = new MyTriangleBig(scene);
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
}