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

    public  get<T>(url: string,
        options: {params?: HttpParams | {
        [param: string]: string | string[];
    };
    })
    {

        url = this.baseUrl + url;

        return super.get<T>(url, {
            params: {
                country: 'ar',
                limit: '2',
                language: 'es',
                /* types: 'place,neighborhood', */
                // eslint-disable-next-line @typescript-eslint/naming-convention
                access_token:  environment.key,
                ...options.params
            }
        });
    }
}
