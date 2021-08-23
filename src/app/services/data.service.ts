/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Inject, Injectable } from '@angular/core';
/* eslint-disable no-trailing-spaces */
import { AuthGuard } from './../guards/auth.guard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'any'
})

export class DataService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  private patch: string = '/app/Volunteers';
  constructor(
    public http: HttpClient,
    public authenticateService: AuthGuard
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
