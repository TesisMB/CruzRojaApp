import { VolunteercredentialsPage } from './volunteercredentials/volunteercredentials.page';
import { VolunteerskillsPage } from './volunteerskills/volunteerskills.page';
import { PasswordPage } from './password/password.page';
import { PersonalinfoPage } from './personalinfo/personalinfo.page';

import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountPage } from './account.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AccountlayoutComponent } from 'src/app/components/accountlayout/accountlayout.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule,
    ComponentsModule
  ],
  declarations:[
  AccountPage,
  PersonalinfoPage,
  PasswordPage,
  VolunteerskillsPage,
  VolunteercredentialsPage,
  AccountlayoutComponent,
]
})
export class AccountModule {}

