import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboartComponent } from './dashboart.component';

describe('DashboartComponent', () => {
  let component: DashboartComponent;
  let fixture: ComponentFixture<DashboartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
