import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/models';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {

  constructor(
  ) { }


  ngOnInit(): void {

  }
};
