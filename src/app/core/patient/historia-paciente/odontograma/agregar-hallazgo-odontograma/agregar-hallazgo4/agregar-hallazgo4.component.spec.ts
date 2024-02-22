import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHallazgo4Component } from './agregar-hallazgo4.component';

describe('AgregarHallazgo4Component', () => {
  let component: AgregarHallazgo4Component;
  let fixture: ComponentFixture<AgregarHallazgo4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHallazgo4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHallazgo4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
