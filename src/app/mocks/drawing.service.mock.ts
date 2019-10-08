import { Injectable } from '@angular/core';
import { Ball } from '../models';
import { Config } from './../configs/config';
import { DrawingService } from '../shared';

@Injectable()
export class DrawingServiceMock extends DrawingService {

    drawBall(ctx: CanvasRenderingContext2D, ball: Ball) {
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Config.twoPi);
        ctx.fill();
        ctx.closePath();
        return ctx;
    }
    setCanvasDimensions(ctx: CanvasRenderingContext2D) {
        ctx.canvas.width = window.innerWidth - 30;
        ctx.canvas.height = window.innerHeight - 160;
        return {
            canvasWidth: ctx.canvas.width,
            canvasHeight: ctx.canvas.height
        }
    }
}