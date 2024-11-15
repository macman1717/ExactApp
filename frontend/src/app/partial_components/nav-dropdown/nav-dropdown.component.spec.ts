import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDropdownComponent } from './nav-dropdown.component';

describe('NavDropdownComponent', () => {
  let component: NavDropdownComponent;
  let fixture: ComponentFixture<NavDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
