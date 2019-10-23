import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { TitleService } from '../../shared/services/title.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  constructor(
    public media: TdMediaService,
    public titleService: TitleService,
  ) { }

  ngOnInit(): void {
  }

}
