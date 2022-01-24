import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/models';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {

  msj: Messages[] = [];

  constructor(
    private chatService: ChatService
  ) { }


  ngOnInit(): void {
    this.chatService.messageReceived.subscribe((data) => {
      this.msj.push(data);
    });
    this.cargaInicial();
  }

  cargaInicial() {
    this.msj = [
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { id: 1, message: 'Hola' },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { id: 2, message: 'Como estas?' }
    ];
  }
};
