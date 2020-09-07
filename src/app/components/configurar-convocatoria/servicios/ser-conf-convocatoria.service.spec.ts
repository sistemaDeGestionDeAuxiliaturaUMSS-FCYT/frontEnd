import { TestBed } from '@angular/core/testing';

import { SerConfConvocatoriaService } from './ser-conf-convocatoria.service';

describe('SerConfConvocatoriaService', () => {
  let service: SerConfConvocatoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerConfConvocatoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
