import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlbComponent } from './mlb.component';

describe('MlbComponent', () => {
  let component: MlbComponent;
  let fixture: ComponentFixture<MlbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MlbComponent]
    });
    fixture = TestBed.createComponent(MlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
