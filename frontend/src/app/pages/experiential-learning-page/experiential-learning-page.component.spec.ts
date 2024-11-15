import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperientialLearningPageComponent } from './experiential-learning-page.component';

describe('ExperientialLearningPageComponent', () => {
  let component: ExperientialLearningPageComponent;
  let fixture: ComponentFixture<ExperientialLearningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperientialLearningPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperientialLearningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
