import { GroupChatPage } from './groupchat/groupchat.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';
import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatlayoutComponent } from 'src/app/components/chatlayout/chatlayout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations:[
  GroupChatPage,
  ChatlayoutComponent
]
})
export class ChatPageModule {}

