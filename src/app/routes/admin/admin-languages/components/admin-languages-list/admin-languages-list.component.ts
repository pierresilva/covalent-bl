import { Component, OnInit } from '@angular/core';
import { TdMediaService, TdDigitsPipe } from '@covalent/core';
import { AdminLanguagesService } from '../../services/admin-languages.service';

export enum OrderBy {
  ASC = <any>'asc',
  DESC = <any>'desc',
}

@Component({
  selector: 'app-admin-languages-list',
  templateUrl: './admin-languages-list.component.html',
  styleUrls: ['./admin-languages-list.component.scss'],
})
export class AdminLanguagesListComponent implements OnInit {
  name = 'Manage List';

  data: Object[] = [
    {
      'created_at': '2015-11-04T19:00:31Z',
      'name': 'Change data capture for sales DB',
      'owner': 'Kyle',
      'updated_at': '2016-11-08T19:00:31Z',
    }, {
      'created_at': '2015-11-08T19:00:31Z',
      'name': 'Change data capture for MF DB',
      'owner': 'Richa',
      'updated_at': '2016-11-09T19:00:31Z',
    }, {
      'created_at': '2015-12-11T19:00:31Z',
      'name': 'Our Data Lake',
      'owner': 'Ed',
      'updated_at': '2016-12-07T19:00:31Z',
    }, {
      'created_at': '2015-11-05T19:00:31Z',
      'name': 'Nightly batched analytics',
      'owner': 'Ilsun',
      'updated_at': '2016-11-07T19:00:31Z',
    }, {
      'created_at': '2015-12-12T19:00:31Z',
      'name': 'Long term data storage',
      'owner': 'Jeremy',
      'updated_at': '2016-12-08T19:00:31Z',
    }, {
      'created_at': '2015-12-15T19:00:31Z',
      'name': 'On the fly analytics',
      'owner': 'Jenn',
      'updated_at': '2016-12-09T19:00:31Z',
    },
  ];

  columnOptions: any[] = [
    {
      name: 'Updated',
      value: 'updated_at',
    }, {
      name: 'Created',
      value: 'created_at',
    },
  ];
  sortKey: string = this.columnOptions[0].value;
  headers: any = {};
  pageSize: number = 5;
  example1: boolean = true;

  single: any[];
  multi: any[];

  routes: Object[] = [
    {
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
  mgmtmenu: Object[] = [
    {
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
  monitormenu: Object[] = [
    {
      icon: 'verified_user',
      route: '.',
      title: 'Audit Logs',
      description: 'Item description',
    }, {
      icon: 'settings_system_daydream',
      route: '.',
      title: 'Monitored Systems',
      description: 'Item description',
    },
  ];
  settingsmenu: Object[] = [
    {
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
  constructor(
    public media: TdMediaService,
    public adminLanguagesService: AdminLanguagesService,
  ) {
    let single;
    let multi;
    Object.assign(this, {single, multi});
  }

  isASC(sortKey: string): boolean {
    return this.headers[sortKey] === OrderBy.ASC;
  }

  sortBy(sortKey: string): void {
    if (this.headers[sortKey] === OrderBy.ASC) {
      this.headers[sortKey] = OrderBy.DESC;
    } else {
      this.headers[sortKey] = OrderBy.ASC;
    }
    this.data = this.data.sort((rowA: Object, rowB: Object) => {
      let cellA: string = rowA[sortKey];
      let cellB: string = rowB[sortKey];
      let sort: number = 0;
      if (cellA < cellB) {
        sort = -1;
      } else if (cellA > cellB) {
        sort = 1;
      }
      return sort * (this.headers[sortKey] === OrderBy.DESC ? -1 : 1);
    });
  }

  search(event): void {
    // dummy func
  }

  ngOnInit(): void {
    this.adminLanguagesService.getAdminLanguagesLanguages();
    this.columnOptions.forEach((option: any) => {
      this.headers[option.value] = OrderBy.ASC;
    });
  }

}
