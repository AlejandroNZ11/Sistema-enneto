import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHallazgo2Component } from './agregar-hallazgo2.component';

describe('AgregarHallazgo2Component', () => {
  let component: AgregarHallazgo2Component;
  let fixture: ComponentFixture<AgregarHallazgo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHallazgo2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHallazgo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
