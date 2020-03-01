import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss'],
})
export class LayoutMainComponent implements OnInit, AfterViewInit {

  constructor(
    public media: TdMediaService,
    public auth: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
  }

}
