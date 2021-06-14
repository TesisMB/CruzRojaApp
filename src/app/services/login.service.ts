import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
                           
  apiURL = '/login';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http:HttpClient) { }
    
  obtainData(id){
    return this.http.get(environment.apiURL + this.apiURL);
  }

  login(UserDni:string,UserPassword:string){
    
    //Se hace el post a los atributos
    return this.http.post(environment.apiURL + this.apiURL,{UserDni,UserPassword})
    .pipe(map(user => {
      console.log(user);
      return user;
    }
   )
 );
}
  
}
