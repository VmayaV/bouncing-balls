import { NgModule } from '@angular/core';
import { BallPlaygroundComponent } from './ball-playground.component';

@NgModule({
  declarations: [
    BallPlaygroundComponent,
  ],
  exports:[BallPlaygroundComponent],
})
export class BallPlaygroundModule { }