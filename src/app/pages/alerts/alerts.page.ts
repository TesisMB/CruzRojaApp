import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { TypeEmergenciesDisasters } from './../../models/TypeEmergenciesDisasters';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, IonSlides } from '@ionic/angular';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alertas',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.css']
})

export class AlertsPage implements OnInit {
  /* @ViewChild(IonSlides) slides: IonSlides; */
  @ViewChild(IonItemSliding) slides: IonItemSliding;

  alerts: EmergenciesDisasters[]
  alertstypes: TypeEmergenciesDisasters[]
  isControlled = false;
  estilo: string = "";
  handlerAlerts: any;
  handlerAlertsTypes: any;
  id= null;

  constructor(
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllAlerts();
  }

  getAllAlerts(){
    this.handlerAlerts = this.alertService.getAll().subscribe((x: EmergenciesDisasters[]) =>{
    console.log('ingreso Alertas');
    this.alerts = x;
   });
  }

  /* Función para cuando se active el boton, se abre el slide para la derecha */

  openSlide(){

  }

  /* Funciones de navegación */

  volunteerButton(ev){
    this.router.navigate(['/voluntarios']);
  }

  deploymentButton(index){
    const alert = this.alerts[index];
    this.alertService.setAlert(alert);
    this.id = index;
    this.router.navigate(['/deployment']);
  }

  /* Función para usar el color  */

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
