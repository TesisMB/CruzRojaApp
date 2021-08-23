/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Alert } from './../../models/Alert';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.css'],
})
export class AlertasPage implements OnInit {

  'emergency': [
    {
      'alertDegree': 'Amarillo';
    }
  ];

  alerts: Alert[] = [{id: 1, alertMessage: 'esto es rojo', alertDegree: 'rojo'}, {id: 2, alertMessage: 'esto es amarillo', alertDegree: 'amarillo'}];

  http: DataService;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  estilo: string = "";
  constructor(

  ) { }

  ngOnInit() {
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
