export function distance(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}

export function degToRad(ang) {
    return ang * Math.PI / 180;
}

export function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

export function generateRandomInteger(min, max) {  // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }