import { ChatlayoutComponent } from './../../components/chatlayout/chatlayout.component';
import { GroupChatPage } from './groupchat/groupchat.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';
import { PrivatechatPage } from './privatechat/privatechat.page';
import { VolunteersPage } from '../volunteers/volunteers.page';
import { VoluntariosDetallesPage } from '../volunteers/subpages/voluntarios-detalles/volunteersdetails';
import { InfoPage } from './info/info.page';

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
        path: 'groupChat/:id',
        component: GroupChatPage,
      },
      {
      path: 'members/:id',
      component: VolunteersPage,
    },
      {
        path: 'info/:id',
        component: InfoPage
      },
      {
        path: 'members/details/:id',
        component: VoluntariosDetallesPage
      },
      {
        path: 'privatechat/:id',
        component: PrivatechatPage
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule { }
