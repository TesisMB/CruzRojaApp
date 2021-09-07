import { DataService } from './../services/data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot) {
    // eslint-disable-next-line prefer-const
    let id = route.paramMap.get('volunteerID');
    return this.dataService.getAll();
  }
}
