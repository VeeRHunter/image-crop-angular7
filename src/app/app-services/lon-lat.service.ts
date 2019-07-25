import { Injectable } from '@angular/core';
import { DataService } from './../app-services/data.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LonLatService extends DataService {

  constructor(http: HttpClient) {
    super('https://maps.googleapis.com/maps/api/geocode/json?address=719A Adetokunbo Ademola street Victoria island lagos', http);
  }

}




