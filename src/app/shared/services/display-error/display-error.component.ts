import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'bl-app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.scss'],
})
export class BlDisplayErrorComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BlDisplayErrorComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}
