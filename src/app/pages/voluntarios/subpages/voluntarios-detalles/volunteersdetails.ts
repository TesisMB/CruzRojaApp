/* eslint-disable eqeqeq */

import { Component, Input, OnInit } from '@angular/core';
import { Volunteer } from 'src/app/models/Volunteer';

@Component({
  selector: 'app-volunteersdetails',
  templateUrl: './volunteersdetails.page.html',
  styleUrls: ['./volunteersdetails.page.css'],
})
export class VoluntariosDetallesPage implements OnInit {
  @Input()
  textoHijo: Volunteer[];
  constructor() { }

  ngOnInit() {

  }

}
