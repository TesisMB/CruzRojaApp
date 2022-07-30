import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';

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
    PipesModule,
    ScrollingModule
  ],
  exports: [
    // MenuPage,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    ScrollingModule
  ]
})
export class SharedModule { }
