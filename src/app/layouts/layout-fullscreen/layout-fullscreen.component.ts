import {Component, OnInit, AfterViewInit} from '@angular/core';
import {tdRotateAnimation} from '@covalent/core/common';

@Component({
  selector: 'app-layout-fullscreen',
  templateUrl: './layout-fullscreen.component.html',
  styleUrls: ['./layout-fullscreen.component.scss'],
  animations: [
    tdRotateAnimation,
  ],
})
export class LayoutFullscreenComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
