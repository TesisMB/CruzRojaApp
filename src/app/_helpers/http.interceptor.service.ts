/* eslint-disable no-trailing-spaces */
import { LoginService } from './../services/login/login.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor,HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

//Implementación de Catch-error global usando "HTTP Interceptor"

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(public router: Router, private loginService: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
      if ([401].indexOf(error.status) !== -1) {

      if (this.loginService.currentUserValue){
          console.log('No posee los permisos necesarios para efectuar esta acción');
          console.log('401 Error');
        }

      else
      {
      this.loginService.logout();

      }}

      if ([403].indexOf(error.status) !== -1) {
        // redirecciona a la ruta para el 403 error.
        this.router.navigate(['/']);
        console.log('403 Error');
    }
      if (error.status === 404) {
        // redirecciona a la ruta para el 404 error.
        this.router.navigate(['**']);
        console.log('404 Error');
    }
    if (error.status === 422) {
        console.log('422: El DNI ingresado ya se encuentra registrado.');
    }
        console.log('error is intercept');
        console.error(error);
        return throwError(error.message);
      })
    );
  }

}
