import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  routes: Object[] = [{
    icon: 'dashboard',
    route: '.',
    title: 'Dashboard',
  }, {
    icon: 'library_books',
    route: '.',
    title: 'Documentation',
  }, {
    icon: 'build',
    route: '.',
    title: 'Console',
  },
  ];
  mgmtmenu: Object[] = [{
    icon: 'people',
    route: '.',
    title: 'Users',
    description: 'Item description',
  }, {
    icon: 'dns',
    route: '.',
    title: 'Systems',
    description: 'Item description',
  },
  ];
  monitormenu: Object[] = [{
    icon: 'verified_user',
    route: '.',
    title: 'Audit Logs',
    description: 'Item description',
  }, {
    icon: 'settings_system_daydream',
    route: '.',
    title: 'Monitored Systems',
    description: 'Item description',
  }];
  settingsmenu: Object[] = [{
    icon: 'lock',
    route: '.',
    title: 'Authentication',
    description: 'Item description',
  }, {
    icon: 'email',
    route: '.',
    title: 'SMTP Settings',
    description: 'Item description',
  },
  ];

  constructor() { }

  ngOnInit() {
  }

}
