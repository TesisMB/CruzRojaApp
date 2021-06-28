import { CurrentUser } from './../models/CurrentUser';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authState = new BehaviorSubject(false);
  private currentUserSubject: BehaviorSubject<any>;
  public currentUserObs: Observable<any>;
  apiURL = '/login';

  //El platform es usado para que podamos usar el localStorage
  constructor(
    private http:HttpClient, 
    private router: Router) {
      this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUserObs = this.currentUserSubject.asObservable();
    }

  public get currentUserValue(): CurrentUser {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if(user != this.currentUserSubject.value){
      this.currentUserSubject.next(user);
    }
    return this.currentUserSubject.value;
  }

  login(userDni:string, userPassword:string): Observable<any> {
    //Se hace el post a los atributos
    return this.http.post(environment.apiURL + this.apiURL,{ userDni, userPassword})
    .pipe(map((user: CurrentUser)=> 
      {
        if(user && user.token){
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user);
          this.currentUserSubject.next(user);
        }
          return user;
      })
    )
  }

  isAuthenticated() {
    return this.authState.value;
  }

  logout() {
    // Elimina el usuario del local Storage y lo declara null.
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/pages/login']);
    }

}
