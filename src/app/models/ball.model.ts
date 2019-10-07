import { Time } from './time.model';

export class Ball {
    _x: number; //x-coordinate
    _y: number;//y-coordinate
    _color: string;
    _radius: number;
    _angle: number;
    _vx: number; // x component of the velocity
    _vy: number; //y component of the velocity
    _time: Time;

    constructor(x: number,
        y: number,
        color: string,
        radius: number,
        angle: number,
        vx: number,
        vy: number,
        time: Time
    ) {
        this._x = x;
        this._y = y;
        this._color = color;
        this._radius = radius;
        this._angle = angle;
        this._vx = vx;
        this._vy = vy;
        this._time = time;
    }
}
