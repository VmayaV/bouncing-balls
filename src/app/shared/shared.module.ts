import { NgModule } from '@angular/core';

// import { SharedComponent } from './shared.component';
import { MathHelperService } from './math-helper.service';
import { DrawingService } from './drawing.service';

@NgModule({
    imports: [],
    exports: [],
    // declarations: [SharedComponent],
    providers: [MathHelperService, DrawingService],
})
export class SharedModule { }
