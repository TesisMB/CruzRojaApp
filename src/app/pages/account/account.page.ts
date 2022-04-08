import { Platform } from '@ionic/angular';
import { CurrentUser } from '../../models/CurrentUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { Filesystem, Directory } from '@capacitor/filesystem';

const IMAGE_DIR = 'stored-images'

interface LocalFile {
  name: string;
  path: string;
  data: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.css'],
})
export class AccountPage implements OnInit {
  currentUser: CurrentUser;
  fg: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private platform: Platform
  ) { this.platform = platform; }

  initForm(): FormGroup{
    return this.formBuilder.group({

      Password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      NewPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      RepeatPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      Email: ['',[Validators.required, Validators.email]],
      Phone: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      Address: ['',[Validators.required, Validators.pattern, Validators.maxLength(25)]],
      Status: ['',[Validators.required]]
    })
  }

  ngOnInit() {
    this.fg = this.initForm();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage', this.currentUser);
    this.fg.patchValue({
      'Email':this.currentUser.persons.email,
      'Phone':this.currentUser.persons.phone,
      'Address':this.currentUser.persons.address,
      'Status': this.currentUser.userAvailability
    })
  }

  async selectImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    console.log(image);
    if (image){
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo){
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data
    });
    console.log('saved', savedFile);
  }

  async readAsBase64(photo: Photo){
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  //Función de Helper para convertirlo a Base64

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) =>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = ()=>{
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}


