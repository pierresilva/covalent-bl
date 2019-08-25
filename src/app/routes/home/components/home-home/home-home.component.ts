import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { name, patterns, layouts, routes, baseURL } from '../../../../../assets/data';

@Component({
  selector: 'app-home-home',
  templateUrl: './home-home.component.html',
  styleUrls: ['./home-home.component.scss']
})
export class HomeHomeComponent implements OnInit {

  layouts: any[] = [];

  constructor(
    public media: TdMediaService,
  ) {
    Object.assign(this, { name, patterns, layouts, routes, baseURL });
  }

  ngOnInit() {
  }

}
