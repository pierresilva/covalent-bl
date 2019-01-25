import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'bl-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent implements OnInit {

  constructor(
    private theme: ThemeService,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Obtiene el tema activo
   */
  get activeTheme(): string {
    return this.theme.theme.value;
  }

}
