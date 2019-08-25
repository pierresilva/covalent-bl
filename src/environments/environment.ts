// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useHash: false,
  app_title: 'Angular Baseline',
  app_url: 'http://lapp-baseline.localhost/',
  api_prefix: 'api/',
  app_prefix: 'bl_',
  theme: 'theme-light',
  langs: [
    {
      name: 'Español',
      code: 'es',
      flag: 'es',
    },
    {
      name: 'English',
      code: 'en',
      flag: 'gb',
    },
  ],
  def_lang: 'es',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
