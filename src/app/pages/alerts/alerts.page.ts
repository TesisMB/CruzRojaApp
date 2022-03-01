import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { TypeEmergenciesDisasters } from './../../models/TypeEmergenciesDisasters';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, IonList, IonSlides } from '@ionic/angular';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Router } from '@angular/router';
import { start } from 'repl';

@Component({
  selector: 'app-alertas',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.css']
})

export class AlertsPage implements OnInit {

  @ViewChild(IonItemSliding) slide: IonItemSliding;
  @ViewChild('list') lista:IonList;

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
    this.slide.open('end');
  }


  /* Funciones de navegación */

  volunteerButton(){
    this.router.navigate(['/voluntarios']);
    this.lista.closeSlidingItems();
  }

  deploymentButton(index){
    const alert = this.alerts[index];
    this.alertService.setAlert(alert);
    this.id = index;
    this.router.navigate(['/deployment']);
    this.lista.closeSlidingItems();
  }

  /* Función para usar el color  */

  getColor(color: string){
    if(color ==='Moderado'){
      return "#fadbd8";
    } else if (color ==='Extremo'){
      return "#fcf3cf";
      }
    else if (color === 'Controlado'){
      return "#d5f5e3";
    }
  }

}
