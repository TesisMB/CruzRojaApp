import { LoginService } from './../login/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from 'src/environments/environment';
import { Operation } from 'fast-json-patch';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends DataService{
   baseURL = environment.apiURL + 'profile/';
  constructor(
      http: HttpClient,
    )
    {
      super(http, '/Profile');
    }
    patchUser(id: number, operations: Operation[]){
      const url = this.baseURL + id;
      return this.http.patch(url, operations);
    }
}
