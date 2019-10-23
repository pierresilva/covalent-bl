import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { TitleService } from '../../../../shared/services/title.service';

@Component({
  selector: 'app-developer-menu',
  templateUrl: './developer-menu.component.html',
  styleUrls: ['./developer-menu.component.scss']
})
export class DeveloperMenuComponent implements OnInit {

  constructor(
    public media: TdMediaService,
    public titleService: TitleService,
  ) { }

  ngOnInit(): void {
  }

}
