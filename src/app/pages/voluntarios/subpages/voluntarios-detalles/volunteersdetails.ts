/* eslint-disable eqeqeq */

import { Component, Input, OnInit } from '@angular/core';
import { VolunteersService } from 'src/app/services/volunteers/volunteers.service';
import { Volunteer } from 'src/app/models/Volunteer';


@Component({
  selector: 'app-volunteersdetails',
  templateUrl: './volunteersdetails.page.html',
  styleUrls: ['./volunteersdetails.page.css'],
})
export class VoluntariosDetallesPage implements OnInit {
  @Input() volunteers: Volunteer[];
  handlerVoluntarios: any;
  idVolunteer: number = 1;
  constructor(
    public service: VolunteersService,
  ) { }

  ngOnInit() {
    this.getVolunteersByID();
  }

  getVolunteersByID(){
      this.handlerVoluntarios = this.service.getById(this.idVolunteer).subscribe((x: Volunteer[]) =>{
      console.log('ingreso volunteer detail');
      this.volunteers = x;
      console.log(this.volunteers);
    });
  }
}
