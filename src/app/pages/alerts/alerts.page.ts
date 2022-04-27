import { RoleName } from './../../models/RoleName';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { TypeEmergenciesDisasters } from './../../models/TypeEmergenciesDisasters';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, IonList, IonSlides } from '@ionic/angular';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.css']
})

export class AlertsPage implements OnInit {

  alerts: EmergenciesDisasters[];
  alertstypes: TypeEmergenciesDisasters[];
  role: RoleName;
  isControlled = false;
  estilo = '';
  handlerAlerts: any;
  handlerAlertsTypes: any;
  currentUser: any;
  id= null;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private ionLoader: LoaderService
  ) { }

  ngOnInit() {
    this.getAllAlerts();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getAllAlerts(){
    this.handlerAlerts = this.alertService.getAll().subscribe((x: EmergenciesDisasters[]) =>{
    console.log('ingreso Alertas');
    this.alerts = x;
   });
  }

  /* Función para cuando se active el boton, se abre el slide para la derecha */

  showLoader() {
    this.ionLoader.showLoader();
    setTimeout(() => {
      this.hideLoader();
    }, 2000);
  }

  hideLoader() {
    this.ionLoader.hideLoader();
  }

  deploymentButton(index){
    this.showLoader();
    const alert = this.alerts[index];
    this.alertService.setAlert(alert);
    this.id = index;
    this.router.navigate(['/deployment']);
  }

  /* Función para usar el color  */

  getColor(color: string){
    if(color ==='Moderado'){
      return '#d8db2f';
    } else if (color ==='Urgente'){
      return '#d83a35';
      }
    else if (color === 'Controlado'){
      return '#4cd137';
    }
  }
}
