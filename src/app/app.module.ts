import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BallPlaygroundModule } from './components/ball-playground';
import { LoaderModule } from './components/loader';
import { MathHelperService, DrawingService, SharedModule } from './shared';
import { HeaderModule } from './components/header';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BallPlaygroundModule,
    LoaderModule,
    CommonModule,
    SharedModule,
    HeaderModule
  ],
  providers: [MathHelperService, DrawingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
