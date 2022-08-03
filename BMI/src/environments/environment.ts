// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const lastUpdatedOn = 'Aug 03, 2022 - 12:00 PM IST';
const version = 'v0.0.1';

export const environment = {
  production: false,
  lastUpdatedOn,
  version,
  // for firebase hosting
  firebase: {
    projectId: 'bmi-cal-culator',
    appId: '1:997487488385:web:f26749002640e532244c80',
    storageBucket: 'bmi-cal-culator.appspot.com',
    apiKey: 'AIzaSyCmZaFaBEMyOkHHLkKoEsGS9php8u8tCtU',
    authDomain: 'bmi-cal-culator.firebaseapp.com',
    messagingSenderId: '997487488385',
    measurementId: 'G-DHSYJL5PHP',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
