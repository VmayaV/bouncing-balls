import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BallPlaygroundComponent } from './ball-playground.component';
import { MathHelperService, DrawingService } from 'src/app/shared';
import { MathHelperServiceMock, DrawingServiceMock } from './../../mocks';
import { ElementRef } from '@angular/core';
import { ball1Mock, ball2Mock } from 'src/app/mocks/ball.mock';

describe('BallPlaygroundComponent', () => {
  let component: BallPlaygroundComponent;
  let fixture: ComponentFixture<BallPlaygroundComponent>;
  let ctx: ElementRef;
  let canvas: CanvasRenderingContext2D;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BallPlaygroundComponent],
      providers: [{ provide: MathHelperService, useClass: MathHelperServiceMock },
      { provide: DrawingService, useClass: DrawingServiceMock }]

    })
      .compileComponents();
    fixture = TestBed.createComponent(BallPlaygroundComponent);
    component = fixture.debugElement.componentInstance;
    ctx = component.canvasRef;
    canvas = ctx.nativeElement.getContext("2d");
    fixture.detectChanges();
    var newCanvas = document.createElement('canvas');
    newCanvas.width = 500;
    newCanvas.height = 500;
    return newCanvas.getContext("2d");
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test click ', () => {
    spyOn(component, 'onMouseClicked');
    let el = ctx.nativeElement;
    el.click();
    expect(component.onMouseClicked).toHaveBeenCalled();
  });

  it('should fill list of balls with balls on (x,y) position', () => {
    spyOn(component, 'fillGenerateBalls').and.returnValue([ball1Mock]);
    let listOfBalls = component.fillGenerateBalls(ball1Mock.x, ball1Mock.y, 2);
    expect(listOfBalls[0].x).toBe(ball1Mock.x);
    expect(listOfBalls[0].y).toBe(ball1Mock.y);
  });

  it('should fill list of balls generated with click on the screen', () => {
    spyOn(component, 'fillGenerateBalls').and.returnValue([ball1Mock, ball2Mock]);
    expect(component.fillGenerateBalls(4, 5, 2).length).toBe(2);
  });

  var s = new DrawingService();
  it('should set dimensions of the canvas', () => {
    spyOn(s, 'setCanvasDimensions').and.returnValue({
      canvasWidth: window.innerWidth - 30,
      canvasHeight: window.innerHeight - 160
    });
    const { canvasWidth, canvasHeight } = s.setCanvasDimensions(canvas);
    expect(s.setCanvasDimensions(canvas)).toEqual({ canvasWidth, canvasHeight });
  });
});
