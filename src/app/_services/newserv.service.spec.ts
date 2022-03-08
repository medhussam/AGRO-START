import { TestBed } from '@angular/core/testing';

import { NewservService } from './newserv.service';

describe('NewservService', () => {
  let service: NewservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
