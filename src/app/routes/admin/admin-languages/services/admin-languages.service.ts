import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILanguage } from '../models/language';
import { ApiService } from '../../../../shared/services/api.service';
import { IPaginationMeta } from '../../../../models/pagination-meta';
import { TdLoadingService } from '@covalent/core';
import { TranslateService } from '@ngx-translate/core';
import { ACLService } from '../../../../shared/bl-packages/acl';
import { AuthService } from '../../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminLanguagesService {

  adminLanguagesLanguages = new BehaviorSubject<ILanguage[]>([]);
  adminLanguagesLanguage = new BehaviorSubject<ILanguage>({
      id: null,
      key: null,
      group: null,
      text: {
        en: null,
        es: null,
      },
      created_at: null,
      deleted_at: null,
    },
  );

  objectKeys = Object.keys;

  paginationMeta: BehaviorSubject<IPaginationMeta> = new BehaviorSubject<IPaginationMeta>(<IPaginationMeta>{});
  sort: BehaviorSubject<string> = new BehaviorSubject<string>('id:desc');
  filter: BehaviorSubject<string> = new BehaviorSubject<string>('');
  perPage: BehaviorSubject<string> = new BehaviorSubject<string>('&perPage=10');

  perPages: number = 10;

  constructor(
    public api: ApiService,
    private _loadingService: TdLoadingService,
    private translate: TranslateService,
    public acl: ACLService,
    public authService: AuthService,
  ) {
  }

  /**
   * Get Items list
   *
   * @param page
   */
  getAdminLanguagesLanguages(page: number = 1) {
    this._loadingService.register('isLoading');
    this.api.get(
      'admin/languages?page=' +
      page +
      '&q[s]=' +
      this.sort.value +
      this.filter.value +
      '&perPage=' + this.perPages,
    )
      .subscribe(
        async (res: any) => {
          await this.adminLanguagesLanguages.next(res.body.response.data);
          await this.paginationMeta.next(res.body.response.meta);
          this._loadingService.resolve('isLoading');
        },
        (err: any) => {
          console.error(err);
          this._loadingService.resolve('isLoading');
        },
      );
  }

  /**
   * Create new item
   */
  createAdminLanguagesLanguage(value) {
    // this.adminLanguagesLanguage.next(<Language>{});
    this._loadingService.register('isLoading');
    this.api.post('admin/languages', value)
      .subscribe(
        async (res: any) => {
          // this.toast.show(res.message, 5000, 'green');
          this._loadingService.resolve('isLoading');
          this.getAdminLanguagesLanguages();
        },
        async (err: any) => {
          this._loadingService.resolve('isLoading');
        },
      );
  }

  /**
   * Update single item
   */
  updateAdminLanguagesLanguage(value) {
    this._loadingService.register('isLoading');
    this.api.put('gyms/third-parties-entrances', value)
      .subscribe(
        async (res: any) => {
          // this.toast.show(res.message, 5000, 'green');
          this._loadingService.resolve('isLoading');
          this.getAdminLanguagesLanguages();
        },
        async (err: any) => {
          this._loadingService.resolve('isLoading');
        });
  }

  /**
   * Edit single item
   * @param entrance
   */
  editAdminLanguagesLanguage(entrance) {
    this.adminLanguagesLanguage.next(entrance);
  }

  /**
   * Delete single item
   */
  deleteAdminLanguagesLanguage(entrance) {
    this._loadingService.register('isLoading');
    this.api.delete('admin/languages/' + entrance.id, {})
      .subscribe(
        async (res: any) => {
          // this.toast.show(res.message, 5000, 'green');
          this._loadingService.resolve('isLoading');
          this.getAdminLanguagesLanguages();
        },
        async (err: any) => {
          this._loadingService.resolve('isLoading');
        });
  }

  getAdminLanguagesLanguage(id = null) {
    this._loadingService.register('isLoading');
    this.api.get('admin/languages/' + id)
      .subscribe(
        async (res: any) => {
          await this.adminLanguagesLanguage.next(res.response.data);
          // this.toast.show(res.message);
        },
        async (err: any) => {
          this._loadingService.resolve('isLoading');
        },
      );
  }

  // UTILITIES

  /**
   * Toggle search inputs
   */
  searchToggle() {
    let x = document.getElementById('advanced-search-admin-languages');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  /**
   * Set search filters
   */
  setFilter() {
    const searchInputs: any = document.getElementsByClassName('search-input');
    let filter = '';
    for (let index = 0; index < searchInputs.length; index++) {
      const element = searchInputs[index];
      const value: any = element.value.trim();
      if (value) {
        filter += `&q[${element.dataset.field}]=${value}`;
      }
    }
    this.filter.next(filter);
    this.getAdminLanguagesLanguages();
  }

  /**
   * Reset search filters
   */
  resetFilter() {
    const searchInputs: any = document.getElementsByClassName('search-input');
    for (let index = 0; index < searchInputs.length; index++) {
      const element = searchInputs[index];
      element.value = '';
    }
    this.filter.next('');
    this.getAdminLanguagesLanguages();
  }

  /**
   * Set sort column and direction
   * @param event
   */
  setSort(event: any) {
    console.log(event);
    if (this.sort.value === event.target.dataset.field + ':asc') {
      this.sort.next(event.target.dataset.field + ':desc');
      this.getAdminLanguagesLanguages();
    } else if (this.sort.value === event.target.dataset.field + ':desc') {
      this.sort.next(event.target.dataset.field + ':asc');
      this.getAdminLanguagesLanguages();
    } else {
      this.sort.next(event.target.dataset.field + ':asc');
      this.getAdminLanguagesLanguages();
    }
  }

  /**
   * Set items per page
   * @param event
   */
  setPerPage(event) {
    this.perPage.next('&perPage=' + event.target.value);
    this.getAdminLanguagesLanguages();
  }
}
