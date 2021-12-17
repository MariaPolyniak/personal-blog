import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTagsListComponent } from './popular-tags-list.component';

describe('TagsListComponent', () => {
  let component: PopularTagsListComponent;
  let fixture: ComponentFixture<PopularTagsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularTagsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularTagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
