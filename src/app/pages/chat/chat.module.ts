import { GroupChatPage } from './groupchat/groupchat.page';
import { NgModule } from '@angular/core';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatlayoutComponent } from 'src/app/components/chatlayout/chatlayout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatPage } from './chat.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    SharedModule,
    ChatPageRoutingModule,
    ComponentsModule
  ],
  declarations:[
  ChatPage,
  GroupChatPage,
  ChatlayoutComponent
]
})
export class ChatPageModule {}

