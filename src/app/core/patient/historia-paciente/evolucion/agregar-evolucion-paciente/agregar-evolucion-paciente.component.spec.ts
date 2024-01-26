import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEvolucionPacienteComponent } from './agregar-evolucion-paciente.component';

describe('AgregarEvolucionPacienteComponent', () => {
  let component: AgregarEvolucionPacienteComponent;
  let fixture: ComponentFixture<AgregarEvolucionPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEvolucionPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEvolucionPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
