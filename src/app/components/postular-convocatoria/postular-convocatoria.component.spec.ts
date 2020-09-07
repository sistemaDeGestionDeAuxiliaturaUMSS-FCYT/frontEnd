import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostularConvocatoriaComponent } from './postular-convocatoria.component';

describe('PostularConvocatoriaComponent', () => {
  let component: PostularConvocatoriaComponent;
  let fixture: ComponentFixture<PostularConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostularConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostularConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
