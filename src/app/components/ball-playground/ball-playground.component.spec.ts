import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BallPlaygroundComponent } from './ball-playground.component';
import { MathHelperService } from 'src/app/shared';
import { MathHelperServiceMock } from 'src/app/mocks/math-helper.service.mock';

describe('BallPlaygroundComponent', () => {
  let component: BallPlaygroundComponent;
  let fixture: ComponentFixture<BallPlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BallPlaygroundComponent],
      providers: [{ provide: MathHelperService, useClass: MathHelperServiceMock }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
