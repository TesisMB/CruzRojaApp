/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Platform, LoadingController } from '@ionic/angular';
import { CurrentUser } from '../../../models/CurrentUser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compare } from 'fast-json-patch';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.page.html',
  styleUrls: ['./personalinfo.page.css'],
})
export class PersonalinfoPage implements OnInit {

  currentUser: CurrentUser;
  users: User;
  model: CurrentUser;
  originalUser: CurrentUser;
  handlerProfile: any;
  fg: FormGroup;
  service: ProfileService;

  constructor(
    private formBuilder: FormBuilder,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
  ) { this.platform = platform; }

  ngOnInit() {
    this.fg = this.initForm();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage', this.currentUser);
    this.fg.patchValue(this.currentUser);
    this.model = _.cloneDeep(this.currentUser);
  }

  initForm(): FormGroup{
    return this.formBuilder.group({
        email: ['',[Validators.required, Validators.email]],
        phone: ['',[Validators.required,Validators.pattern('^((\\+51-?)|0)?[0-9]{10}$')]],
        address: ['',[Validators.required,  Validators.maxLength(25)]],
        status: ['',[Validators.required]],
      estates: this.formBuilder.group({
        locationCityName: ['',[Validators.required,  Validators.maxLength(25)]],
      })
    });
  }

  onSubmit(){
    if(this.fg.valid){
      const patch = compare(this.model, this.fg.value);
    }
  }
}
