import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallPlaygroundComponent } from './ball-playground.component';

describe('BallPlaygroundComponent', () => {
  let component: BallPlaygroundComponent;
  let fixture: ComponentFixture<BallPlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallPlaygroundComponent ]
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
