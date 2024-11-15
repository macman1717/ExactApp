import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentStoriesPageComponent } from './recent-stories-page.component';

describe('RecentStoriesPageComponent', () => {
  let component: RecentStoriesPageComponent;
  let fixture: ComponentFixture<RecentStoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentStoriesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentStoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
