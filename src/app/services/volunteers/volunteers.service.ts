import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VolunteersService extends DataService{

  constructor(http: HttpClient) {
    super(http, '/app/Volunteers');
   }

}
