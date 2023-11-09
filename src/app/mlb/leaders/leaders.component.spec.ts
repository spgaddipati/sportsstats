import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadersComponent } from './leaders.component';

describe('LeadersComponent', () => {
  let component: LeadersComponent;
  let fixture: ComponentFixture<LeadersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadersComponent]
    });
    fixture = TestBed.createComponent(LeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
