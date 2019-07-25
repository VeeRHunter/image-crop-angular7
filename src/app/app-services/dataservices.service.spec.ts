import { TestBed, inject } from '@angular/core/testing';

import { DataservicesService } from './dataservices.service';

describe('DataservicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataservicesService]
    });
  });

  it('should be created', inject([DataservicesService], (service: DataservicesService) => {
    expect(service).toBeTruthy();
  }));
});
