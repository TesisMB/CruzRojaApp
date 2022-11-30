import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonList } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserChatRooms } from 'src/app/models';
import { ChatRooms } from 'src/app/models/ChatRooms';
import { ChatService } from 'src/app/services/chat/chat.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
  isLoading = true;
  id = null;
  textoBuscar = '';
  searchTerm: string;
  public searchedItem: any;
  memberlist: ChatRooms;
  volunteers: Observable<UserChatRooms[]>;
  user: UserChatRooms[];

  constructor(
    private route: ActivatedRoute,
    private service: ChatService,
    private ionLoader: LoaderService,

    ) {
    this.route.paramMap.subscribe( params => {
      this.id = params.get('id');
      console.log(this.id);
    });
  }

  async ngOnInit() {
    await this.ionLoader.showLoader();
    this.volunteer();
  }


  ionViewWillEnter() {
    this.volunteers = this.service.usersChatRooms$;
    // this.user = this.service.usersChatRooms$.value;
    console.log("voluntarios", this.volunteers);
  }
 

  solicitudeConfirmation(userId, chatroomid, status){
    this.service.
    postVolunteerConfirmation(userId, chatroomid, status).
    subscribe(
      res =>{
        console.log('Se ha podido enviar los datos');
        this.service.searchUser(userId);
      },
      error =>{
        console.log('No se han podido enviar los datos');
      }
    );
  }

  volunteer(){
    this.service.getVolunteers(this.id, false).subscribe( x => {
      this.memberlist = x;
      this.ionLoader.hideLoader();
      this.isLoading = false;
      console.log('Voluntarios' + this.memberlist);
      this.service.uploadUser(this.memberlist.usersChatRooms);
      // this.service.setUserChatRooms(this.memberlist.usersChatRooms);
    }, err =>{
      console.log('Error');
      this.ionLoader.hideLoader();
      this.isLoading = false;
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
