export class UserSetup {
    minVx: number;
    minVy: number;
    maxVx: number;
    maxVy: number;
    minRadius: number;
    maxRadius: number;
    constructor(minVx: number = 0,
        minVy: number = 0,
        maxVx: number = 100,
        maxVy: number = 100,
        minRadius: number = 5,
        maxRadius: number = 10) {
        this.minVx = minVx;
        this.minVy = minVy;
        this.maxVx = maxVx;
        this.maxVy = maxVy;
        this.minRadius = minRadius;
        this.maxRadius = maxRadius;
    }
}