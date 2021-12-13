import { TypeChatRooms } from './../../../models/TypeChatRooms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.css'],
})
export class GroupChatPage implements OnInit {

  messages = [
    {
      user: 'simon',
      createdAt: 1554090856000,
      msg: 'Hola, ¿como andas?'
    },
    {
      user: 'max',
      createdAt: 1554090856000,
      msg: 'Todo bien, ¿y vos?'
    },
    {
      user: 'simon',
      createdAt: 1554090856000,
      msg: 'Bien, por suerte'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
