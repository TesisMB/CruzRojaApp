/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-trailing-spaces */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Messages } from '../models';

export class DataService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

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

  update(resource) {
    return this.http.patch(environment.apiURL + this.patch, JSON.stringify(resource), this.options);
  }

}
