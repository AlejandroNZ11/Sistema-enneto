import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHallazgo5Component } from './agregar-hallazgo5.component';

describe('AgregarHallazgo5Component', () => {
  let component: AgregarHallazgo5Component;
  let fixture: ComponentFixture<AgregarHallazgo5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHallazgo5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHallazgo5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
