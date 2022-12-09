import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSuccesComponent } from './check-succes.component';

describe('CheckSuccesComponent', () => {
  let component: CheckSuccesComponent;
  let fixture: ComponentFixture<CheckSuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckSuccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
