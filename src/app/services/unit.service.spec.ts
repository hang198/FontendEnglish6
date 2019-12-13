import { TestBed } from '@angular/core/testing';

import { UnitService } from './unit.service';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitService = TestBed.get(UnitService);
    expect(service).toBeTruthy();
  });
});
