import { Injectable } from '@angular/core';
import { Time, Ball, Physics } from '../models';

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

    moveBall(ball: Ball, canvasWidth: number, canvasHeight: number, dt: number) {
        if (ball.x > canvasWidth - ball.radius) {
            ball.vx = -ball.vx * Physics.friction //friction
            ball.x = canvasWidth - ball.radius;
        }
        if (ball.x < ball.radius) {
            ball.vx = -ball.vx * Physics.friction //friction
            ball.x = ball.radius;
        }
        if (ball.y > canvasHeight - ball.radius) {

            ball.vy = - ball.vy * Physics.energy_loss;
            ball.y = canvasHeight - ball.radius;
        }
        if (ball.y <= ball.radius) {
            ball.vy = - ball.vy * Physics.energy_loss;
            ball.y = ball.radius;
        }

        ball.vy += (Physics.gravity * dt)
        ball.x = (ball.x + ball.vx * dt) > 0 ? (ball.x + ball.vx * dt) : ball.radius;
        ball.y = (ball.y + ball.vy * dt) > 0 ? (ball.y + ball.vy * dt) : ball.radius;
        return ball;
    }
}