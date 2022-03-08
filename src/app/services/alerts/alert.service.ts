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
  public _currentAlert: Observable<EmergenciesDisasters>;

  constructor(http: HttpClient) {
    super(http, '/emergenciesdisasters/WithoutFilter');
    this.currentAlertSubject = new BehaviorSubject<EmergenciesDisasters>(null);
    this._currentAlert = this.currentAlertSubject.asObservable();
  }

  setAlert(alert: EmergenciesDisasters){
    const alertObject = alert;
    this.currentAlertSubject.next(alertObject);
  }

}
