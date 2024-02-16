import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHallazgo3Component } from './agregar-hallazgo3.component';

describe('AgregarHallazgo3Component', () => {
  let component: AgregarHallazgo3Component;
  let fixture: ComponentFixture<AgregarHallazgo3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHallazgo3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHallazgo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
