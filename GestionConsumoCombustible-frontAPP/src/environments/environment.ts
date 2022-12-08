// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rooturl: 'http://localhost:8086',
  URL_AUTH: 'http://localhost:8086/oauth/token',
  CREDENTIALS_APP_AUTH: btoa('gccapp'.concat(':').concat('12345')),

  URL_BASE: 'http://localhost:4200',

  ROL_COMPLETO: ['ROLE_ADMIN', 'ROLE_EMPRESA', 'ROLE_PARTICULAR', 'ROLE_CONDUCTOR'],
  ROL_NO_CONDUCTOR: ['ROLE_ADMIN', 'ROLE_EMPRESA', 'ROLE_PARTICULAR'],
  ROL_EMPRESA_PARTICULAR: ['ROLE_EMPRESA', 'ROLE_PARTICULAR'],
  ROL_CONDUCTOR: 'ROLE_CONDUCTOR',
  ROL_ADMIN: 'ROLE_ADMIN',


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
