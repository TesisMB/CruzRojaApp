import { MenuPage } from './components/menu/menu.page';
import { AlertasPage } from './components/alertas/alertas.page';
import { LoginPage } from './components/login/login.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { LoginService} from './services/login.service' 
import { ChatPage } from './components/chat/chat.page';
import { HomePage } from './components/home/home.page';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  declarations: [AppComponent, LoginPage, AlertasPage, ChatPage, HomePage, MenuPage],
  entryComponents: [],
  //agregar IonicStorageModule.forRoot()
  imports: [
    HttpClientModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    NgbModule, 
    IonicStorageModule.forRoot(), 
    JwtModule.forRoot({
    
  })
],
  providers: [LoginService, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
