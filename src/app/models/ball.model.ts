import { Time } from './time.model';

export class Ball {
    x: number; //x-coordinate
    y: number;//y-coordinate
    color: string;
    radius: number;
    vx: number; // x component of the velocity
    vy: number; //y component of the velocity
    time: Time;

    constructor(x: number,
        y: number,
        color: string,
        radius: number,
        vx: number,
        vy: number,
        time: Time
    ) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.time = time;
    }
}
