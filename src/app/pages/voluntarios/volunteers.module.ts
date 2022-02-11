import { VoluntariosDetallesPage } from './subpages/voluntarios-detalles/volunteersdetails';
import { PipesModule } from '../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteersPage } from './volunteers.page';
import { VoluntariosPageRoutingModule } from './volunteers-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LayoutComponent } from 'src/app/components/volunteerlayout/volunteerlayout.component';
import { AppModule } from 'src/app/app.module';
@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VoluntariosPageRoutingModule
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
