/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Platform, LoadingController } from '@ionic/angular';
import { CurrentUser } from '../../models/CurrentUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { finalize } from 'rxjs/operators';
import { compare } from 'fast-json-patch';
import * as _ from 'lodash';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.css'],
})
export class AccountPage implements OnInit {
  currentUser: CurrentUser;
  model: CurrentUser;
  originalUser: CurrentUser;
  fg: FormGroup;
  images: LocalFile[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
  ) { this.platform = platform; }

  initForm(): FormGroup{
    return this.formBuilder.group({
      Password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      NewPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      RepeatPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      volunteerAvatar: [''],
        persons: this.formBuilder.group({
          email: ['',[Validators.required, Validators.email]],
          phone: ['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
          address: ['',[Validators.required, Validators.pattern, Validators.maxLength(25)]],
          status: ['',[Validators.required]]
        })
    });
  }

  ngOnInit() {
    this.fg = this.initForm();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage', this.currentUser);
    this.fg.patchValue(this.currentUser);
    this.model = _.cloneDeep(this.currentUser);

    /*this.fg.patchValue({
      'Email':this.currentUser.persons.email,
      'Phone':this.currentUser.persons.phone,
      'Address':this.currentUser.persons.address,
      'Status': this.currentUser.userAvailability
    });*/
  }

  onSubmit(){
    if(this.fg.valid){
      const patch = compare(this.model, this.fg.value);
    }
  }

  /* CAMARA - GALERIA */

    // Carga de la imagen

  async loadFiles(){
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Cargando imagen...',
    });

    await loading.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR
    }).then(result =>{
      console.log('HERE', result);
    },
    async err =>{
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMAGE_DIR
      });
    }).then(() =>{
      loading.dismiss();
    });
  }

  async loadFileData(fileNames: string[]){
    for (const f of fileNames){
      const filePath = `${IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      });

      console.log('READ', readFile);

    }
  }

    // Seleccionar imagen que esta dentro de la computadora

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

    // Guardar imagen

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
    this.loadFiles();
  }

  /* Preparación del upload */

  async startUpload(file: LocalFile){
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    this.uploadData(formData);
  }

  /* Subir la imagen */

  async uploadData(formData: FormData){
    const url = 'https://localhost:5001/StaticFiles/Images/Resources/';

    this.http.post(url, formData).pipe(
      finalize(() =>{
        this.loadingCtrl.dismiss();
      })
    ).subscribe(res =>{
      console.log(res);
    });
  }

    // Borrar imagen

  async deleteImage(file: LocalFile){
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
    this.loadFiles();
  }

  /* Base64 Converter - Ayuda a convertir la imagen en Base64 */

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
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = ()=>{
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}


