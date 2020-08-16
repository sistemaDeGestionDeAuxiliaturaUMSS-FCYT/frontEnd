import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotuloItemConvocatoriaComponent } from './rotulo-item-convocatoria.component';

describe('RotuloItemConvocatoriaComponent', () => {
  let component: RotuloItemConvocatoriaComponent;
  let fixture: ComponentFixture<RotuloItemConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotuloItemConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotuloItemConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
