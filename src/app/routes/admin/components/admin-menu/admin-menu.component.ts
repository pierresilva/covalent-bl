import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent implements OnInit {

  navmenu: Object[] = [
    {
      icon: 'language',
      route: '/admin/languages',
      title: 'app.admin.languages.title',
      description: 'app.admin.languages.description',
      children: [],
    },
    {
      icon: 'looks_one',
      // tslint:disable-next-line:no-null-keyword
      route: '#',
      title: 'First item',
      description: 'Item description',
      children: [
        {
          icon: 'looks_one',
          route: '.',
          title: 'First item',
          description: 'Item description',
        },
        {
          icon: 'looks_two',
          route: '.',
          title: 'Second item',
          description: 'Item description',
        },
      ],
    },
    {
      icon: 'looks_two',
      route: '#',
      title: 'Second item',
      description: 'Item description',
      children: [],
    },
    {
      icon: 'looks_3',
      route: '#',
      title: 'Third item',
      description: 'Item description',
      children: [],
    },
    {
      icon: 'looks_4',
      route: '#',
      title: 'Fourth item',
      description: 'Item description',
      children: [],
    },
    {
      icon: 'looks_5',
      route: '#',
      title: 'Fifth item',
      description: 'Item description',
      children: [],
    },
  ];

  // tslint:disable
  constructor() { }

  // tslint:disable
  ngOnInit() {
  }

}
