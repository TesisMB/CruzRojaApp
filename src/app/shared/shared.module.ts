import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MenuPage } from '../pages/menu/menu.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    // MenuPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    // MenuPage,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule
  ]
})
export class SharedModule { }
