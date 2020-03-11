import { TestBed } from '@angular/core/testing';

import { APiInterfaceService } from './api-interface.service';

describe('APiInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APiInterfaceService = TestBed.get(APiInterfaceService);
    expect(service).toBeTruthy();
  });
});
