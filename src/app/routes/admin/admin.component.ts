import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  data: Object[] = [{
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
  } ];

  columnOptions: any[] = [{
    name: 'Updated',
    value: 'updated_at',
  }, {
    name: 'Created',
    value: 'created_at',
  }];
  sortKey: string = this.columnOptions[0].value;
  headers: any = {};
  pageSize: number = 5;

  constructor (
    public media: TdMediaService,
  ) { }

  ngOnInit(): void {
    this.columnOptions.forEach((option: any) => {
      // this.headers[option.value] = OrderBy.ASC;
    });
  }

  search(): void {
    // dummy func
  }

}
