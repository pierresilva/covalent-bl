import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'bl-layout-custom',
  templateUrl: './layout-custom.component.html',
  styleUrls: ['./layout-custom.component.scss'],
})
export class LayoutCustomComponent implements OnInit {

  constructor(
    private media: TdMediaService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    console.log('LayoutCustom loaded...');
  }

}
