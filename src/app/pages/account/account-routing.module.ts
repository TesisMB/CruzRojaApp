import { AccountlayoutComponent } from './../../components/accountlayout/accountlayout.component';
import { ChatlayoutComponent } from '../../components/chatlayout/chatlayout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPage } from './account.page';
import { PersonalinfoPage } from './personalinfo/personalinfo.page';
import { PasswordPage } from './password/password.page';
import { VolunteerskillsPage } from './volunteerskills/volunteerskills.page';
import { VolunteercredentialsPage } from './volunteercredentials/volunteercredentials.page';

const routes: Routes = [
  {
    path: '',
    component: AccountlayoutComponent,
    children: [
      {
        path: '',
        component: AccountPage
      },
      {
        path: 'personalinfo',
        component: PersonalinfoPage
      },
      {
        path: 'password',
        component: PasswordPage
      },
      {
        path: 'volunteerskills',
        component: VolunteerskillsPage
      },
      {
        path: 'volunteercredentials',
        component: VolunteercredentialsPage
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
