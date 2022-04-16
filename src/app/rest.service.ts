// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class RestService {

//   constructor(private http: HttpClient) { }

// private handleError(error: HttpErrorResponse): any {
//   if (error.error instanceof ErrorEvent) {
//     console.error('An error occurred:', error.error.message);
//   } else {
//     console.error(
//       `Backend returned code ${error.status}, ` +
//       `body was: ${error.error}`);
//   }
//   return (
//     'Something bad happened; please try again later.');
// }

// private extractData(res: Response): any {
//   const body = res;
//   return body || { };
// }

// getProducts(): Observable<any> {
//   return this.http.get(endpoint + 'products').pipe(
//     map(this.extractData),
//     catchError(this.handleError)
//   );
// }
// }