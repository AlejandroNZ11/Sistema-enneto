import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHallazgo6Component } from './agregar-hallazgo6.component';

describe('AgregarHallazgo6Component', () => {
  let component: AgregarHallazgo6Component;
  let fixture: ComponentFixture<AgregarHallazgo6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHallazgo6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHallazgo6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
