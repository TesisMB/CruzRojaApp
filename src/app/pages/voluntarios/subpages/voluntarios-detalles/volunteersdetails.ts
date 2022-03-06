/* eslint-disable eqeqeq */

import { Component, Input, OnInit } from '@angular/core';
import { VolunteersService } from 'src/app/services/volunteers/volunteers.service';
import { Volunteer } from 'src/app/models/Volunteer';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-volunteersdetails',
  templateUrl: './volunteersdetails.page.html',
  styleUrls: ['./volunteersdetails.page.css'],
})
export class VoluntariosDetallesPage implements OnInit {
  volunteers: Volunteer;
  handlerVoluntarios: any;
  idVolunteer: number;

  constructor(
    public service: VolunteersService,
    private aRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idVolunteer = +this.aRoute.snapshot.params.id;
    this.getVolunteersByID();
  }

  getVolunteersByID() {
    this.handlerVoluntarios = this.service.getById(this.idVolunteer).subscribe((data) => {
      this.volunteers = data;
      console.log('ingreso volunteer detail');
      console.log(data);
    },error =>{
      console.log(error);
    });
  }
}
