import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosRotuloComponent } from './datos-rotulo.component';

describe('DatosRotuloComponent', () => {
  let component: DatosRotuloComponent;
  let fixture: ComponentFixture<DatosRotuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosRotuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosRotuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
