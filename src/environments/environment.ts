// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import 'zone.js/dist/zone-error';
export const environment = {
  production: false,
  domain: 'http://localhost:4200',
  storage: {
    name: 'starter',
    place: 'session'
  },
  cipher: {
    secretKey: 'starter'
  },
  email: {
    url: 'https://cors-anywhere.herokuapp.com/https://api.mailgun.net/v3/sub.alarinna.com/messages',
    authorization: 'Basic YXBpOmtleS04NDM5YjZmYWRhN2Y3ZGRlMDY1MmQ1NTY0Y2ZmMGZkZQ==',
    from: 'Admin<admin@carriercolony.com>',
  },
  emailVerify: {
    expiry: '1d'
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
