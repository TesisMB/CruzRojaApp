import { FiltroPipe } from './filtro.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FiltroPipe],
  exports: [FiltroPipe]
})
export class PipesModule { }
