import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class VolunteersService extends DataService{
  public selectedVolunteer$: Observable<any> = new Observable<any>();
  private selectedVolunteerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(http: HttpClient) {
    super(http, '/employees');
    this.selectedVolunteer$ = this.selectedVolunteerSubject.asObservable();
  }


  getUser(id: number): Observable<any>{
  return  this.selectedVolunteer$ =  this.getById(id).pipe(map(x => {this.selectedVolunteerSubject.next(x);}));
  }
  }

