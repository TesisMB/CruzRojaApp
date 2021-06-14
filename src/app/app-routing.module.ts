import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { LoginPage } from './components/login/login.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { HomePage } from './components/home/home.page';
import { ChatPage } from './components/chat/chat.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginPage
  },
 
  {
    path: 'home',
    component: HomePage
  },
  
  {
    path: 'alertas',
    loadChildren: () => import('./components/alertas/alertas.module').then( m => m.AlertasPageModule)
  },

  {
    path: 'voluntarios',
    loadChildren: () => import('./components/voluntarios/voluntarios.module').then( m => m.VoluntariosPageModule)
  },

  {
    path: 'chat',
    component: ChatPage
  },


  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

