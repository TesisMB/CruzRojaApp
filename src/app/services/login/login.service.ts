import { Photo } from '@capacitor/camera';
import { CurrentUser } from './../../models/CurrentUser';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { debounceTime, delay, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FcmService } from 'src/app/fcm.service';
import { Operation } from 'fast-json-patch';
import { App } from '@capacitor/app';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  public currentUserObs: Observable<any>;
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    params: new HttpParams()
  };
  private authState = new BehaviorSubject<any>(false);
  private currentUserSubject: BehaviorSubject<any>;
  private apiURL = '/app/login';

  //El platform es usado para que podamos usar el localStorage
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: FcmService) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserObs = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): CurrentUser {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user !== this.currentUserSubject.value) {
      this.currentUserSubject.next(user);
    }
    return this.currentUserSubject.value;
  }

  login(userDni: string, userPassword: string) {
    //Se hace el post a los atributos
    return this.http.post(environment.apiURL + this.apiURL, { userDni, userPassword })
      .pipe(
      map((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user);
          this.currentUserSubject.next(user);
          this.tokenService.sendToken()
          .subscribe(resp => console.log('Envio de token exitoso! => ',resp), err => console.log('Envio de token NO EXITOSO :( => ',err));
        }
        return user;
      }),

    );
  }

  logout() {
    // Elimina el usuario del local Storage y lo declara null.
    this.deleteToken();
    localStorage.clear();
    this.currentUserSubject.next(null);
     this.router.navigateByUrl('/login');
     App.exitApp();
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.apiURL}/files`);
 }

 getUser(id: number) {
  const path = '/Employees/Select/' + id;
  return this.http.get<any>(
    environment.apiURL + path,
    this.options
    );
}


  upload(file: Photo ){
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // const ImageFile: FormData = new FormData();
    // ImageFile.append('file', file);
  //  this._imgFile$.next(file);
   // resource.imageFile = ImageFile;
    const req = new HttpRequest('POST', `${environment.apiURL}/upload`, file, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }


  sendEmail(email: string) {
    return this.http.post<string>(environment.apiURL + '/forgot-password/', email);
  }

  changePassword(token: string, userPassword: string) {
    const parametros = new HttpParams().append('token', token);
    this.options.params = parametros;
    return this.http.post<any>(environment.apiURL + 'reset-password/', { userPassword }, this.options);
  }

  deleteToken(){
    const path = '/sendDevice';
    const deviceToken = null;
   this.http.put(environment.apiURL+path, {deviceToken})
    .subscribe(resp => console.log(resp), err => console.log(err));
  }

  updateUser(user: CurrentUser,  operations: Operation[]){
    const path = environment.apiURL + '/employees/'+user.userID;
    return this.http
    .patch(path, operations)
    .pipe(
      map((data: any) => {
        if(data){
          if(!data.token){
            data.token = user.token;
          }
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
    }
    console.log(user);
    return data;
  }
  ));

  }
}
