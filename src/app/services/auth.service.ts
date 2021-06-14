import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) { 
    this.loadStoredToken();

  }
  
  loadStoredToken(){
    //Convierte la promesa en un observable
    let platformObs = from(this.plt.ready())
    this.user = platformObs.pipe(
      //switchMap es para subscribirse al Observable
      switchMap(()=>{
        return from(this.storage.getItem(TOKEN_KEY))
      }),
    map(token =>{
        console.log('Token from storage', token);
        if (token){
          let decoded = helper.decodeToken(token);
          console.log('decoded: ', decoded);
        }else{
          return null;
        }
    })
    );
  }
  login(credentials: {UserDni:string,UserPassword:string}): Observable<any>{
    return this.http.get()

  }
}
