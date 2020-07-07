import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AniadirDatoRotuloComponent } from './aniadir-dato-rotulo.component';

describe('AniadirDatoRotuloComponent', () => {
  let component: AniadirDatoRotuloComponent;
  let fixture: ComponentFixture<AniadirDatoRotuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniadirDatoRotuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AniadirDatoRotuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
