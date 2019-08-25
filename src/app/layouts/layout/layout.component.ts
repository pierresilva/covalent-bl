import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { name, patterns, layouts, routes, baseURL } from '../layout-default/data';
import { TdMediaService } from '@covalent/core/media';
import { tdRotateAnimation } from '@covalent/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    tdRotateAnimation,
  ],
})
export class LayoutComponent implements OnInit {

  baseURL: string;

  filteredUsers: Object = [{
    'displayName': 'John Smith',
    'email': 'john.smith@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }, {
    'displayName': 'William Jones',
    'email': 'william.jones@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }, {
    'displayName': 'Jane Johnson',
    'email': 'jane.johnson@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }, {
    'displayName': 'Sam Sampson',
    'email': 'sam.sampson@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }, {
    'displayName': 'Christopher Heart',
    'email': 'christopher.heart@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }];

  constructor(
    private _router: Router,
    public media: TdMediaService,
  ) {

    Object.assign(this, { name, patterns, layouts, routes, baseURL });
  }

  ngOnInit() {
    console.log('Layout loaded...');
  }

}
