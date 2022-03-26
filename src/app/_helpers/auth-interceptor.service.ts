/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor,HttpRequest, HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: LoginService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Agrega al header la autentificacion con el jwt si el usuario fue loggeado y la api lo requiere.
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.apiURL);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });

        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({
              setHeaders: {
                'content-type': 'application/json'
              }
            });
          }

          request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
          });

          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
              }
              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              console.error(error);
              return throwError(error);
            }));
    }

}


