import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosAPresentarComponent } from './documentos-a-presentar.component';

describe('DocumentosAPresentarComponent', () => {
  let component: DocumentosAPresentarComponent;
  let fixture: ComponentFixture<DocumentosAPresentarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosAPresentarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosAPresentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
