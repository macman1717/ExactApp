import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationPageComponent } from './student-application-page.component';

describe('StudentApplicationPageComponent', () => {
  let component: StudentApplicationPageComponent;
  let fixture: ComponentFixture<StudentApplicationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentApplicationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentApplicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
