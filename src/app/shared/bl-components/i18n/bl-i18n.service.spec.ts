import { DatePipe } from '@angular/common';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { filter } from 'rxjs/operators';
import en_US from './languages/en_US';
import es_ES from './languages/es_ES';
import { BlI18nModule } from './bl-i18n.module';
import { BlI18nService, BL_I18N_SERVICE_PROVIDER } from './bl-i18n.service';
import { BL_I18N } from './bl-i18n.token';

describe('bl-i18n.service', () => {
  let injector: Injector;
  let srv: BlI18nService;
  const DEFAULT_LAN = es_ES;

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [BlI18nModule]
    });

    srv = injector.get(BlI18nService);
  });

  describe('#setLocale', () => {
    // tslint:disable:no-string-literal
    it('should be auto default zh_CN', () => {
      expect(srv.getLocale().locale).toBe(DEFAULT_LAN.locale);
    });
    it('should trigger changed when set different lang', () => {
      spyOn(srv['_change'], 'next');
      expect(srv['_change'].next).not.toHaveBeenCalled();
      srv.setLocale(en_US);
      expect(srv['_change'].next).toHaveBeenCalled();
    });
    it('should not trigger change when set same lang', () => {
      spyOn(srv['_change'], 'next');
      expect(srv['_change'].next).not.toHaveBeenCalled();
      srv.setLocale(es_ES);
      expect(srv['_change'].next).not.toHaveBeenCalled();
    });
  });

});
