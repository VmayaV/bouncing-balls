import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input("isVisible") isVisible: boolean;
  @Input("loaderText") loaderText: string;
  constructor() { }
}
