import { Injectable } from '@angular/core';
import { Time } from '../models';

@Injectable()
export class MathHelperService {

    getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    getDt(time: Time) {
        let t1 = new Date().getTime() / 1000;
        time.dt = t1 - time.t0;
        time.t0 = t1;
        return time;
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}