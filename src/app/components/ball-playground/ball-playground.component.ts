import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Ball, Physics, Time } from 'src/app/models';
import { MathHelperService, DrawingService } from '../../shared'
import { Config } from './../../configs/config'

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
  randomNumberOfBalls: number;
  list_of_balls: Ball[] = [];

  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef;

  constructor(private mathHelperService: MathHelperService, private drawingService: DrawingService) { }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
  }

  ngAfterViewInit() {
    const { canvasWidth, canvasHeight } = this.drawingService.setCanvasDimensions(this.ctx);
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  onMouseClicked(event: MouseEvent) {
    const rect = this.ctx.canvas.getBoundingClientRect();
    this.randomNumberOfBalls = this.mathHelperService.getRandomArbitrary(Config.minNumberOfBalls, Config.maxNumberOfBalls);
    this.list_of_balls = this.fillGenerateBalls(event.clientX - rect.left, event.clientY - rect.top, this.randomNumberOfBalls);
    this.bounce();
  }

  fillGenerateBalls(x: number, y: number, random_number_of_balls: number): Ball[] {
    let list_of_balls: Ball[] = [];
    for (let i = 0; i < random_number_of_balls; i++) {
      let ball = this.initialSetup(x, y);
      list_of_balls.push(ball);
    }
    return list_of_balls;
  }

  initialSetup(x: number, y: number) {
    let { color, radius, vx, vy, time } = this.setInitialValuesForBall();
    return new Ball(x, y, color, radius, vx, vy, time);
  }


  bounce() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.bounceAll();
    })
  }
  
  private bounceAll() {
    this.list_of_balls.forEach(ball => {
      let dt = this.mathHelperService.getDt(ball.time).dt;
      let movedBall = this.mathHelperService.moveBall(ball, this.canvasWidth, this.canvasHeight, dt);
      this.drawingService.drawBall(this.ctx, movedBall);
    });
  }

  private setInitialValuesForBall() {
    let current_time = new Date().getTime() / Config.second;
    let time = new Time(current_time, current_time);
    let vx = this.mathHelperService.getRandomArbitrary(Config.minVx, Config.maxVx);
    let vy = this.mathHelperService.getRandomArbitrary(Config.minVy, Config.maxVy);
    let color = this.mathHelperService.getRandomColor();
    let radius = this.mathHelperService.getRandomArbitrary(Config.minRadius, Config.maxRadius);
    return { color, radius, vx, vy, time };
  }
}
