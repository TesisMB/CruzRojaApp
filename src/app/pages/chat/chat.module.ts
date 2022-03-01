import { GroupChatPage } from './groupchat/groupchat.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';
import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatlayoutComponent } from 'src/app/components/chatlayout/chatlayout.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ChatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations:[
  GroupChatPage,
  ChatlayoutComponent
]
})
export class ChatPageModule {}

