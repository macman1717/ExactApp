import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentToolboxPageComponent } from './student-toolbox-page.component';

describe('StudentToolboxPageComponent', () => {
  let component: StudentToolboxPageComponent;
  let fixture: ComponentFixture<StudentToolboxPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentToolboxPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentToolboxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
