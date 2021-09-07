/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Alert } from './../../models/Alert';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.css'],
})
export class AlertasPage implements OnInit {
  @ViewChild('slide') slide: IonSlides;

  'emergency': [
    {
      'alertDegree': 'Amarillo';
    }
  ];

  alerts: Alert[] = [{id: 1, alertMessage: 'esto es rojo', alertDegree: 'rojo'}, {id: 2, alertMessage: 'esto es amarillo', alertDegree: 'amarillo'}];



  http: DataService;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  estilo: string = "";

  slideOpts = {
    initialSlide: 0,
    speed: 500,
    slidesPerView: 1.5,
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  async slideChanged(){
    const currentIndex = this.slide.getPreviousIndex();
    console.log(currentIndex);
    if(await currentIndex === 0){
      this.router.navigateByUrl('/voluntarios', { replaceUrl: true });
    }
  }

  getColor(color: string){
    switch(color){
      case 'rojo':
        return "#ff4538";
      case 'amarillo':
        return "#ffc409";
    }
  }
}
