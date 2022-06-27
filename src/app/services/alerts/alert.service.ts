import { environment } from 'src/environments/environment';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from './../../models/Alert';
import { DataService } from './../data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AlertService extends DataService {
  private currentAlertSubject: BehaviorSubject<EmergenciesDisasters>;
  private currentAlert$: Observable<EmergenciesDisasters>;

  constructor(http: HttpClient) {
    super(http, '/emergenciesdisasters/WithoutFilter');
    this.currentAlertSubject = new BehaviorSubject<EmergenciesDisasters>(null);
    this.currentAlert$ = this.currentAlertSubject.asObservable();
  }
get currentAlert(){return this.currentAlert$;}

  setAlert(alert: EmergenciesDisasters){
    const alertObject = alert;
    this.currentAlertSubject.next(alertObject);
  }

  getByIdWithoutFilter(id: number): Observable<any> {
    return this.http.get<any>(environment.apiURL + this.patch + '/' + id);
  }

}
