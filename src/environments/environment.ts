// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiBaseUrl: 'https://appreviewbook-server.herokuapp.com/book',
  apiBaseUrl: 'http://localhost:3000/book',
  firebaseConfig: {
    apiKey: "AIzaSyDF0yjAY-Pq4xkK6vrtveLMiFo_0FTYFdA",
    authDomain: "doan-b49e0.firebaseapp.com",
    projectId: "doan-b49e0",
    storageBucket: "doan-b49e0.appspot.com",
    messagingSenderId: "1050481996676",
    appId: "1:1050481996676:web:c35d7d9b5dda58f28ce3d1",
    measurementId: "G-WJPGJY62VS"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
