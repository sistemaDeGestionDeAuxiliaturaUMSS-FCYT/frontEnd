import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoVitaeComponent } from './curriculo-vitae.component';

describe('CurriculoVitaeComponent', () => {
  let component: CurriculoVitaeComponent;
  let fixture: ComponentFixture<CurriculoVitaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculoVitaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculoVitaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
