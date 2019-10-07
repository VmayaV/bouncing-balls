import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isVisibleLoader: boolean = true;
  loaderText: string;
  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isVisibleLoader = false;
      this.loaderText = "Loading boucing ball component...";
    }, 1000);
  }
}
