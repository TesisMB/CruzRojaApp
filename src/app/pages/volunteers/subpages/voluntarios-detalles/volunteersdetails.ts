import { EmergenciesDisasters } from 'src/app/models/EmergenciesDisasters';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Subscription, Observable } from 'rxjs';
import { VolunteersService } from 'src/app/services/volunteers/volunteers.service';

@Component({
  selector: 'app-volunteersdetails',
  templateUrl: './volunteersdetails.page.html',
  styleUrls: ['./volunteersdetails.page.css'],
})
export class VoluntariosDetallesPage implements OnInit, OnDestroy {
  emergencies: any;
  volunteer: Observable<any>;
  idVolunteer: number;

  constructor(
    public service: VolunteersService,
    private aRoute: ActivatedRoute,
  ) { }

   ngOnInit() {
    this.idVolunteer = this.aRoute.snapshot.params.id;
    this.volunteer = this.service.getById(this.idVolunteer);
    // this.getVolunteersByID();
  }

  getVolunteersByID() {
   this.service.getById(this.idVolunteer).subscribe((data) => {
      this.emergencies = data;
      console.log('ingreso volunteer detail');
      console.log(data);
    },error =>{
      console.log(error);
    });
  }
  ngOnDestroy(): void {
      // this.handlerVoluntarios.unsubscribe();
  }
}
