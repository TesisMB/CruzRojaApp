/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-trailing-spaces */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class DataService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(
    public http: HttpClient,
    public patch: string
  ) { }

  getAll(){
    return this.http.get<any>(environment.apiURL+this.patch);
  }

  getById(id: number) {
    return this.http.get<any>(environment.apiURL+this.patch+'/'+id);
  }

  update(resource){
    return this.http.put(environment.apiURL+this.patch, JSON.stringify(resource), this.options);
  }
}
