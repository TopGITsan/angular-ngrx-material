import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookmarksComponent } from './create-bookmarks.component';

describe('CreateBookmarksComponent', () => {
  let component: CreateBookmarksComponent;
  let fixture: ComponentFixture<CreateBookmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBookmarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
