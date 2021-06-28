import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(public loginService: LoginService) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
        return this.loginService.isAuthenticated();
    }
 
}
