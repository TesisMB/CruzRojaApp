import { ChatlayoutComponent } from './../../components/chatlayout/chatlayout.component';
import { GroupChatPage } from './groupchat/groupchat.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: ChatlayoutComponent,
    children: [
      {
        path: '',
        component: ChatPage
      },
      {
        path: 'groupChat',
        component: GroupChatPage
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
