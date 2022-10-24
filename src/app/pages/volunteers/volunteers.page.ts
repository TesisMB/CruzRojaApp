import { GroupchatService } from 'src/app/services/groupchat/groupchat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Router } from '@angular/router';
import { Component, OnInit, } from '@angular/core';
import { EmergenciesDisasters } from 'src/app/models/EmergenciesDisasters';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserChatRooms } from 'src/app/models';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.page.html',
  styleUrls: ['./volunteers.page.css'],
})

export class VolunteersPage implements OnInit{
  emergencies: EmergenciesDisasters;
  members: Observable<UserChatRooms[]>;
  handlerVoluntarios: any;
  textoBuscar = '';
  searchTerm: string;
  public searchedItem: any;
  chatId: number;
  handlerEmergency: any;
  volunteers: any = [];

  constructor(
    public router: Router,
    private aRoute: ActivatedRoute,
    public service: GroupchatService
  ) {
    /* this.searchedItem = this.volunteers; */
  }



  ngOnInit() {
    this.chatId = this.aRoute.snapshot.params.id;
    this.members = this.service.currentUserChat$;
  }
  // ionViewWillEnter() {
  //   this.chatId = this.aRoute.snapshot.params.id;
  //  this.members = this.service.currentUserChat$;
  // }

  /* Función de busqueda */

  search(event){
    this.textoBuscar = event.detail.value;
    //console.log(event);
  }

  // getEmergenciesByID() {
  //   this.handlerEmergency = this.service.getByIdWithoutFilter(this.chatId).subscribe((data) => {
  //     this.emergencies = data;

  //     this.emergencies.chatRooms.usersChatRooms.forEach(element =>{
  //       const user = {
  //         userID: element.userID,
  //         name: element.name,
  //         dni: element.userDni,
  //         role: element.roleName
  //       };

  //       this.volunteers.push(user);

  //       this.volunteers = this.volunteers.filter(roleName => roleName.role === 'Voluntario');

  //     });

  //     console.log('Voluntarios involucrados', this.volunteers);
  //     console.log('ingreso emergency');
  //     console.log(data);
  //   },error =>{
  //     console.log(error);
  //   });
  // }
}
