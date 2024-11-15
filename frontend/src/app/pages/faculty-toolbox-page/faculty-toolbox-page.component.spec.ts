import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyToolboxPageComponent } from './faculty-toolbox-page.component';

describe('FacultyToolboxPageComponent', () => {
  let component: FacultyToolboxPageComponent;
  let fixture: ComponentFixture<FacultyToolboxPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyToolboxPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyToolboxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
