import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHallazgo7Component } from './agregar-hallazgo7.component';

describe('AgregarHallazgo7Component', () => {
  let component: AgregarHallazgo7Component;
  let fixture: ComponentFixture<AgregarHallazgo7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHallazgo7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHallazgo7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
