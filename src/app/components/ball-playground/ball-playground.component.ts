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
  time: Time;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  userSetup: UserSetup;

  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef;

  constructor(private mathHelperService: MathHelperService) { }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.userSetup = new UserSetup(-100, -100, 1000, 1000, 1, 30);
  }

  ngAfterViewInit() {
    this.setCanvasDimensions(this.ctx);
  }

  onMouseClicked(event) {
    const rect = this.ctx.canvas.getBoundingClientRect();
    this.initialSetup(event.clientX - rect.left, event.clientY - rect.top);
    this.bounce(event.clientX - rect.left, event.clientY - rect.top);
    this.initialSetup(event.clientX - rect.left, event.clientY - rect.top);
    this.bounce(event.clientX - rect.left, event.clientY - rect.top);
  }

  private initialSetup(x: number, y: number) {
    let current_time = new Date().getTime() / 1000;
    this.time = new Time(current_time, current_time);
    let vx = this.mathHelperService.getRandomArbitrary(this.userSetup.minVx, this.userSetup.maxVx);
    let vy = this.mathHelperService.getRandomArbitrary(this.userSetup.minVy, this.userSetup.maxVy);
    let color = this.mathHelperService.getRandomColor();
    let radius = this.mathHelperService.getRandomArbitrary(this.userSetup.minRadius, this.userSetup.maxRadius);
    this.ball = new Ball(x, y, color, radius, 0, vx, vy);
  }

  bounce(x, y) {
    setInterval(() => {
      if (+this.ball._vx.toFixed() !== 0) {
        this.drawBall(this.ctx, this.ball);
        this.bounceBall();
      }
    })
  }

  bounceBall() {
    let dt = this.mathHelperService.getDt(this.time).dt;
    if (this.ball._x > this.canvasWidth - this.ball._radius) {
      this.ball._vx = -this.ball._vx * Physics.friction //friction
      this.ball._x = this.canvasWidth - this.ball._radius;
    }
    if (this.ball._x < this.ball._radius) {
      this.ball._vx = -this.ball._vx * Physics.friction //friction
      this.ball._x = this.ball._radius;
    }
    if (this.ball._y > this.canvasHeight - this.ball._radius) {

      this.ball._vy = - this.ball._vy * Physics.energy_loss;
      this.ball._y = this.canvasHeight - this.ball._radius;
    }
    if (this.ball._y <= this.ball._radius) {
      this.ball._vy = - this.ball._vy * Physics.energy_loss;
      this.ball._y = this.ball._radius;
    }
    this.ball._vy += (Physics.gravity * dt)
    this.ball._x += this.ball._vx * dt;
    this.ball._y += this.ball._vy * dt;
  }

  setCanvasDimensions(ctx) {
    ctx.canvas.width = window.innerWidth - 16;
    ctx.canvas.height = window.innerHeight - 118;
    this.canvasWidth = this.ctx.canvas.width;
    this.canvasHeight = this.ctx.canvas.height;
  }

  drawBall(ctx, ball: Ball) {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    ctx.fillStyle = ball._color;
    ctx.beginPath();
    ctx.arc(ball._x, ball._y, ball._radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
