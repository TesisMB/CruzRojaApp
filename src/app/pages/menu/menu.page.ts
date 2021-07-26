import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.css'],
})
export class MenuPage implements OnInit {
  router: Router;
  public routerLinkVariable = "/profile";
  http: HttpClient;

  constructor(
    
  ) {
    
   }

  ngOnInit() {
    
  }

}
