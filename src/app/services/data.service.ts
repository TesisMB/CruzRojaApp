import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Messages } from '../models';
import { Operation } from 'fast-json-patch';
import { LoginService } from './login/login.service';

export class DataService {
  protected options = { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: new HttpParams() };
  constructor(
    public http: HttpClient,
    public patch: string,
  ) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + this.patch);
  }

  getById(id: number) {
    return this.http.get<any>(environment.apiURL + this.patch + '/' + id);
  }

  post(message: any): Observable<any> {
    return this.http.post(environment.apiURL + this.patch, message);
  }
  update(resource) {
    return this.http.patch(environment.apiURL + this.patch, JSON.stringify(resource), this.options);
  }
}
