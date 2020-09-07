import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostularAItemComponent } from './postular-a-item.component';

describe('PostularAItemComponent', () => {
  let component: PostularAItemComponent;
  let fixture: ComponentFixture<PostularAItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostularAItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostularAItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
