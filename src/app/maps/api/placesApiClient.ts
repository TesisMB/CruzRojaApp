import { environment } from './../../../environments/environment';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class PlacesApiClient extends HttpClient{

    public baseUrl = 'https://localhost:5001/api/locations';

    constructor(handler: HttpHandler){
        super(handler);
    }
}
