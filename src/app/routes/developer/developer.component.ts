import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { TitleService } from '../../shared/services/title.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
})
export class DeveloperComponent implements OnInit {

  constructor(
    public media: TdMediaService,
    public titleService: TitleService,
    private route: ActivatedRoute,
    public translate: TranslateService,
  ) {
  }

  ngOnInit(): void {}

}
