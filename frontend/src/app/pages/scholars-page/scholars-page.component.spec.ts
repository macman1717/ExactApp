import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarsPageComponent } from './scholars-page.component';

describe('ScholarsPageComponent', () => {
  let component: ScholarsPageComponent;
  let fixture: ComponentFixture<ScholarsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
