import { VolunteersPage } from './volunteers.page';
import { VoluntariosDetallesPage } from './subpages/voluntarios-detalles/volunteersdetails';
import { NgModule } from '@angular/core';

import { VoluntariosPageRoutingModule } from './volunteers-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LayoutComponent } from 'src/app/components/volunteerlayout/volunteerlayout.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    SharedModule,
    VoluntariosPageRoutingModule,
  ],
  declarations: [
    VolunteersPage,
    VoluntariosDetallesPage,
    LayoutComponent,
  ],
  providers: [
    Ng2SearchPipeModule
  ]
})
export class VolunteersPageModule {}
