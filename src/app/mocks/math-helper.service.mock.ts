import { Injectable } from '@angular/core';
import { Time } from '../models';

@Injectable()
export class MathHelperServiceMock {

    getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    getDt(time: Time) {
        time.dt = time.t1 - time.t0;
        return time;
    }

    getRandomColor() {
        return '#232323';
    }
}