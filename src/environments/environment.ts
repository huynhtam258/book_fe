// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiBaseUrl: 'https://appreviewbook-server.herokuapp.com/book',
  apiBaseUrl: 'http://localhost:3000/book',
  firebaseConfig:{
    apiKey: "AIzaSyA0yf6M7UW1T_5dWTPohf7o-ObD4SHGLys",
    authDomain: "baocao-f4350.firebaseapp.com",
    databaseURL: "https://baocao-f4350.firebaseio.com",
    projectId: "baocao-f4350",
    storageBucket: "baocao-f4350.appspot.com",
    messagingSenderId: "35455263198",
    appId: "1:35455263198:web:a4e6ad79b0e549cb"
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
