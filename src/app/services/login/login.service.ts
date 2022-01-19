import { CurrentUser } from './../../models/CurrentUser';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json'),
                      params: new HttpParams() };
  authState = new BehaviorSubject(false);
  private currentUserSubject: BehaviorSubject<any>;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public currentUserObs: Observable<any>;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  apiURL = '/app/login';

  //El platform es usado para que podamos usar el localStorage
  constructor(
    private http: HttpClient,
    private router: Router) {
      this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUserObs = this.currentUserSubject.asObservable();
    }

  public get currentUserValue(): CurrentUser {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // eslint-disable-next-line eqeqeq
    if(user != this.currentUserSubject.value){
      this.currentUserSubject.next(user);
    }
    return this.currentUserSubject.value;
  }

  login(userDni: string, userPassword: string){
    //Se hace el post a los atributos
    return this.http.post(environment.apiURL + this.apiURL,{userDni, userPassword})
    .pipe(map((user: any)=>
      {
        if(user && user.token){
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user);
          this.currentUserSubject.next(user);
        }
          return user;
      })
    );
  }

  logout() {
    // Elimina el usuario del local Storage y lo declara null.
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/alertas']);
    }

    sendEmail(email: string){
      return this.http.post<string>(environment.apiURL+'Forgot-Password', email);
    }

    changePassword(token: string, userPassword: string){
      let parametros = new HttpParams().append('token', token);
      this.options.params = parametros;
      return this.http.post<any>(environment.apiURL+'reset-password/', {userPassword}, this.options);
  }
}
