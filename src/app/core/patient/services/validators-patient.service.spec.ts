import { TestBed } from '@angular/core/testing';

import { ValidatorsPatientService } from './validators-patient.service';

describe('ValidatorsPatientService', () => {
  let service: ValidatorsPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorsPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
