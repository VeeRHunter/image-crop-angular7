import { Injectable } from '@angular/core';

@Injectable()
export class DataservicesService {

  constructor() { }
  public data: any;
  add(data) {
    this.data = data;
  }

}
