import { EmergenciesDisasters } from 'src/app/models/EmergenciesDisasters';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alerts/alert.service';

@Component({
  selector: 'app-volunteersdetails',
  templateUrl: './volunteersdetails.page.html',
  styleUrls: ['./volunteersdetails.page.css'],
})
export class VoluntariosDetallesPage implements OnInit {
  emergencies: EmergenciesDisasters;
  handlerVoluntarios: any;
  idVolunteer: number;

  constructor(
    public service: AlertService,
    private aRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idVolunteer = this.aRoute.snapshot.params['id'];
    this.getVolunteersByID();
  }

  getVolunteersByID() {
    this.handlerVoluntarios = this.service.getById(this.idVolunteer).subscribe((data) => {
      this.emergencies = data;
      console.log('ingreso volunteer detail');
      console.log(data);
    },error =>{
      console.log(error);
    });
  }
}
