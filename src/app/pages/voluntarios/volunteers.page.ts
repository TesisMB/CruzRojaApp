/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
import { VolunteersService } from '../../services/volunteers/volunteers.service';
import { Router } from '@angular/router';
import { Volunteer } from '../../models/Volunteer';
import { Skills } from 'src/app/models/Skills';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.page.html',
  styleUrls: ['./volunteers.page.css'],
})

export class VolunteersPage implements OnInit {

  volunteers: Volunteer[] = [];
  skills: Skills[] = [];
  handlerVoluntarios: any;
  textoBuscar = '';
  searchTerm: string;
  public searchedItem: any;
  public list: Array<Volunteer> = [];

  constructor(
    public router: Router,
    public service: VolunteersService
  ) {
    /* this.searchedItem = this.volunteers; */
  }

  ngOnInit() {
    this.getAllVolunteers();
  }

   getAllVolunteers(){
      this.handlerVoluntarios = this.service.getAll().subscribe((x: any) =>{
      this.volunteers = x;
      console.log(this.volunteers);
     });
  }
}
