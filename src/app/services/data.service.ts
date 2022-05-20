import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Messages } from '../models';
import { Operation } from 'fast-json-patch';

export class DataService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  baseURL = environment.apiURL + 'profile/';
  constructor(
    public http: HttpClient,
    public patch: string
  ) { }

  getAll() {
    return this.http.get<any>(environment.apiURL + this.patch);
  }

  getById(id: number) {
    return this.http.get<any>(environment.apiURL + this.patch + '/' + id);
  }

  post(message: Messages): Observable<any> {
    return this.http.post(environment.apiURL + this.patch, message);
  }

  patchUser(id: number, operations: Operation[]){
    const url = this.baseURL + id;
    return this.http.patch(url, operations);
  }

  update(resource) {
    return this.http.patch(environment.apiURL + this.patch, JSON.stringify(resource), this.options);
  }

}
