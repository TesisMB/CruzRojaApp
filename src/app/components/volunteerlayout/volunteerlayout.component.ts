import { VoluntariosDetallesPage } from './../../pages/voluntarios/subpages/voluntarios-detalles/volunteersdetails';

import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventEmitter } from 'protractor';
import { Volunteer } from 'src/app/models/Volunteer';

@Component({
  selector: 'app-volunteerlayout',
  templateUrl: './volunteerlayout.component.html',
  styleUrls: ['./volunteerlayout.component.css'],
})

export class LayoutComponent implements OnInit {
  @Input() volunteers: Volunteer[];

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: VoluntariosDetallesPage,
    });
    return await modal.present();
  }

}
