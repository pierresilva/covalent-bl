import { Component, OnInit } from '@angular/core';
import { TdMediaService } from "@covalent/core";

@Component({
  selector: 'app-layout-custom',
  templateUrl: './layout-custom.component.html',
  styleUrls: ['./layout-custom.component.scss']
})
export class LayoutCustomComponent implements OnInit {

  constructor(
    private media: TdMediaService,
  ) { }

  ngOnInit() {
    console.log('LayoutCustom loaded...');
  }

}
