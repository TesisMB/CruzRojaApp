
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { TypeEmergenciesDisasters } from './../../models/TypeEmergenciesDisasters';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { EmergenciesDisasters } from 'src/app/models';

@Component({
  selector: 'app-alertas',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.css']
})

export class AlertsPage implements OnInit {
  @ViewChild('slide') slide: IonSlides;

  alerts: EmergenciesDisasters[]

  alertstypes: TypeEmergenciesDisasters[]

  isControlled = false;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  estilo: string = "";

  handlerAlerts: any;
  handlerAlertsTypes: any;

  constructor(
    private service: AlertService,
  ) { }

  ngOnInit() {
    this.getAllAlerts();
  }

  getAllAlerts(){
    this.handlerAlerts = this.service.getAll().subscribe((x: EmergenciesDisasters[]) =>{
    console.log('ingreso Alertas');
    this.alerts = x;
   });
  }

  getColor(color: string){
    if(color ==='Moderado'){
      return "#e4e415dc";
    } else if (color ==='Extremo'){
      return "#c93636";
      }
    else if (color === 'Controlado'){
      return "#2d9e2d";
    }
  }
}
