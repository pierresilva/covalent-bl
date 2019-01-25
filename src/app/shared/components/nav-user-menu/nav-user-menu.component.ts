import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'bl-nav-user-menu',
  templateUrl: './nav-user-menu.component.html',
  styleUrls: ['./nav-user-menu.component.scss']
})
export class NavUserMenuComponent implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

}
