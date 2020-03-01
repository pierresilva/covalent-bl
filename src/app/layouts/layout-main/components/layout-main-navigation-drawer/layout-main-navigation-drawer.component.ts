import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'app-layout-main-navigation-drawer',
  templateUrl: './layout-main-navigation-drawer.component.html',
  styleUrls: ['./layout-main-navigation-drawer.component.scss'],
})
export class LayoutMainNavigationDrawerComponent implements OnInit {

  name = 'UI Platform';
  usermenu = [
    {
      title: 'Profile',
      route: '/',
      icon: 'account_box',
    }, {
      title: 'Settings',
      route: '/',
      icon: 'settings',
    },
  ];

  routes = [
    {
      title: 'Dashboards',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Reports',
      route: '/',
      icon: 'insert_chart',
    }, {
      title: 'Sales',
      route: '/',
      icon: 'account_balance',
    }, {
      title: 'Marketplace',
      route: '/',
      icon: 'store',
    },
  ];

  constructor(
    public media: TdMediaService,
  ) {
  }

  ngOnInit() {
  }

}
