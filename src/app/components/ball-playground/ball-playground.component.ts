import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Ball, Physics, Time } from 'src/app/models';
import { MathHelperService } from '../../shared'
import { UserSetup } from 'src/app/models/user-setup.model';

@Component({
  selector: 'ball-playground',
  templateUrl: './ball-playground.component.html',
  styleUrls: ['./ball-playground.component.scss']
})
export class BallPlaygroundComponent implements OnInit {
  @Input("ball") ball: Ball;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  userSetup: UserSetup;
  random_number_of_balls: number;
  list_of_balls: Ball[] = [];

  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef;

  constructor(private mathHelperService: MathHelperService) { }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.userSetup = new UserSetup(-100, -100, 1000, 1000, 1, 30);
    this.random_number_of_balls = this.mathHelperService.getRandomArbitrary(1, 30);
  }

  ngAfterViewInit() {
    this.setCanvasDimensions(this.ctx);
  }

  onMouseClicked(event) {
    const rect = this.ctx.canvas.getBoundingClientRect();
    for (let i = 0; i < this.random_number_of_balls; i++) {
      let ball = this.initialSetup(event.clientX - rect.left, event.clientY - rect.top);
      this.list_of_balls.push(ball);
    }
    this.bounce(event.clientX - rect.left, event.clientY - rect.top);
  }

  private initialSetup(x: number, y: number) {
    let current_time = new Date().getTime() / 1000;
    let time = new Time(current_time, current_time);
    let vx = this.mathHelperService.getRandomArbitrary(this.userSetup.minVx, this.userSetup.maxVx);
    let vy = this.mathHelperService.getRandomArbitrary(this.userSetup.minVy, this.userSetup.maxVy);
    let color = this.mathHelperService.getRandomColor();
    let radius = this.mathHelperService.getRandomArbitrary(this.userSetup.minRadius, this.userSetup.maxRadius);
    return new Ball(x, y, color, radius, 0, vx, vy, time);
  }

  bounce(x, y) {
    debugger
    setInterval(() => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.list_of_balls.forEach(ball => {
        let movedBall = this.bounceBall(ball);
        this.drawBall(this.ctx, movedBall);
      });
    })
  }

  bounceBall(ball) {
    let dt = this.mathHelperService.getDt(ball._time).dt;
    if (ball._x > this.canvasWidth - ball._radius) {
      ball._vx = -ball._vx * Physics.friction //friction
      ball._x = this.canvasWidth - ball._radius;
    }
    if (ball._x < ball._radius) {
      ball._vx = -ball._vx * Physics.friction //friction
      ball._x = ball._radius;
    }
    if (ball._y > this.canvasHeight - ball._radius) {

      ball._vy = - ball._vy * Physics.energy_loss;
      ball._y = this.canvasHeight - ball._radius;
    }
    if (ball._y <= ball._radius) {
      ball._vy = - ball._vy * Physics.energy_loss;
      ball._y = ball._radius;
    }
    ball._vy += (Physics.gravity * dt)
    ball._x += ball._vx * dt;
    ball._y += ball._vy * dt;
    return ball;
  }

  setCanvasDimensions(ctx) {
    ctx.canvas.width = window.innerWidth - 16;
    ctx.canvas.height = window.innerHeight - 118;
    this.canvasWidth = this.ctx.canvas.width;
    this.canvasHeight = this.ctx.canvas.height;
  }

  drawBall(ctx, ball: Ball) {
    ctx.fillStyle = ball._color;
    ctx.beginPath();
    ctx.arc(ball._x, ball._y, ball._radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
