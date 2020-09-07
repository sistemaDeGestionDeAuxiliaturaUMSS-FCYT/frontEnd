import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientosComponent } from './requerimientos.component';

describe('RequerimientosComponent', () => {
  let component: RequerimientosComponent;
  let fixture: ComponentFixture<RequerimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequerimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
