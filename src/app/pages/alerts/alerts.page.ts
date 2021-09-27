/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { EmergenciesDisasters } from 'src/app/models';

@Component({
  selector: 'app-alertas',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.css']
})

export class AlertsPage implements OnInit {
  @ViewChild('slide') slide: IonSlides;

  alerts: EmergenciesDisasters[];

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  estilo: string = "";

  slideOpts = {
    initialSlide: 0,
    speed: 500,
    slidesPerView: 1.5,
  }
  handlerAlerts: any;

  constructor(
    private router: Router,
    private service: AlertService
  ) { }

  ngOnInit() {
    this.getAllAlerts();
  }

  getAllAlerts(){
    this.handlerAlerts = this.service.getAll().subscribe((x: EmergenciesDisasters[]) =>{
    console.log('ingreso Alertas');
    this.alerts = x;
    console.log(this.alerts[0].typesEmergenciesDisasters.typeEmergencyDisasterName);

   });
  }

  async slideChanged(){
    const currentIndex = this.slide.getActiveIndex();
    console.log(currentIndex);
    if(await currentIndex === 1){
      this.router.navigateByUrl('/voluntarios', { replaceUrl: true });
    }
  }

  getColor(color: string){
    switch(color){
      case '2':
        return "#ff4538";
      case '3':
        return "#ffc409";
    }
  }
}
