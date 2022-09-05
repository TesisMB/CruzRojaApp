import { environment } from 'src/environments/environment';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Alert } from './../../models/Alert';
import { DataService } from './../data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AlertService extends DataService {
  public alerts$: Observable<EmergenciesDisasters[]>;
  public currentAlert$: Observable<EmergenciesDisasters>;
  private alertsSubject: BehaviorSubject<EmergenciesDisasters[]>;
  private currentAlertSubject: BehaviorSubject<EmergenciesDisasters>;

  constructor(http: HttpClient) {
    super(http, '/emergenciesdisasters/WithoutFilter');
    this.alertsSubject = new BehaviorSubject<EmergenciesDisasters[]>(JSON.parse(localStorage.getItem('alertas')));
    this.currentAlertSubject = new BehaviorSubject<EmergenciesDisasters>(JSON.parse(localStorage.getItem('alerta')));
    this.currentAlert$ = this.currentAlertSubject.asObservable();
    this.alerts$ = this.alertsSubject.asObservable();
  }
get currentAlert(){return this.currentAlert$;}

  setAlerts(alerts: EmergenciesDisasters[]){
    localStorage.setItem('alertas', JSON.stringify(alerts));
   return this.alertsSubject.next(alerts);
  }

  setNewAlert(alert: EmergenciesDisasters){
    localStorage.setItem('alerta', JSON.stringify(alert));
   return this.currentAlertSubject.next(alert);
  }

  getByIdWithoutFilter(id: number): Observable<any> {
    return this.http.get<any>(environment.apiURL + this.patch + '/' + id);
  }

}
