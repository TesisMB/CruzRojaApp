import { LoginService } from '../services/login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(public loginService: LoginService, private router: Router,) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.loginService.currentUserValue;
    if (currentUser) {
        // chequea que las rutas estan restringidas por roles
        if ( route.data.roles && route.data.roles.indexOf(currentUser.roleName) === -1) {
          //Si el rol no esta autorizado redirecciona al Home Page
          this.router.navigate(['/']);
          return false;
        }
        //Si esta autorizado retorna true.
        return true;
    }
     else {
        // si no esta loggeado, redirecciona a login con el return url.
        this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url }});
        return false;
     }
}
}
