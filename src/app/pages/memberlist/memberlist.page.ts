import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonList } from '@ionic/angular';
import { ChatRooms } from 'src/app/models/ChatRooms';
import { ChatService } from 'src/app/services/chat/chat.service';

interface VolunteerList {
  firstName: string;
  dni: string;
  image: string;
}

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.page.html',
  styleUrls: ['./memberlist.page.css'],
})

export class MemberlistPage implements OnInit {

  @ViewChild('lista') lista: IonList;

  id = null;
  textoBuscar = '';
  searchTerm: string;
  public searchedItem: any;
  memberlist: ChatRooms;

  constructor(
    private route: ActivatedRoute,
    private service: ChatService
    ) {
    this.route.paramMap.subscribe( params => {
      this.id = params.get('id');
      console.log(this.id);
    });
  }

  ngOnInit() {
    this.volunteer();
  }

  solicitudeConfirmation(userId, chatroomid, status){
    this.service.
    postVolunteerConfirmation(userId, chatroomid, status).
    subscribe(
      res =>{
        console.log('Se ha podido enviar los datos');
      },
      error =>{
        console.log('No se han podido enviar los datos');
      }
    );
  }

  volunteer(){
    this.service.getVolunteers(this.id, false).subscribe( x => {
      this.memberlist = x;
      console.log('Voluntarios' + this.memberlist);
    });
  }

  search(event){
    this.textoBuscar = event.detail.value;
    //console.log(event);
  }

  //Funciones aplicables solo para el ion-item-sliding
/*
  aceptado(){
    console.log('Se ha aceptado la solicitud');
    this.lista.closeSlidingItems();
  }

  rechazado(){
    console.log('Se ha rechazado la solicitud');
    this.lista.closeSlidingItems();
  } */
}
