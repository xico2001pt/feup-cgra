import { CGFobject, CGFscene, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCilinder } from '../geometries/MyCilinder.js';

const NUM_SLICES = 20;

/**
 * MyPillar
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - x coordinate
 * @param z - z coordinate
 * @param height - pillar height
 * @param radius - pillar radius
 */
export class MyPillar extends CGFobject {
    constructor(scene, x, z, height, radius) {
        super(scene);
        this.x = x;
        this.z = z;
        this.height = height;
        this.radius = radius;
        
        this.pillar = new MyCilinder(scene, NUM_SLICES);
        this.initMaterials();
    }

    initMaterials() {
        this.pillarMaterial = new CGFappearance(this.scene);
		this.pillarMaterial.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.pillarMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.pillarMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.pillarMaterial.setEmission(0, 0, 0, 1);
		this.pillarMaterial.setShininess(120);
        this.pillarMaterial.loadTexture('./images/tree.jpg')
    }

    display() {
        this.pillarMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z);
        this.scene.scale(this.radius, this.height, this.radius);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.defaultAppearance2.apply();
    }
}