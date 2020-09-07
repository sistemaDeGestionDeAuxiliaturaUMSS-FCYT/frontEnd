import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarConvocatoriaComponent } from './configurar-convocatoria.component';

describe('ConfigurarConvocatoriaComponent', () => {
  let component: ConfigurarConvocatoriaComponent;
  let fixture: ComponentFixture<ConfigurarConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
