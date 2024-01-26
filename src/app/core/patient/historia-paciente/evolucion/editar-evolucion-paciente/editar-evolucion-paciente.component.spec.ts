import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEvolucionPacienteComponent } from './editar-evolucion-paciente.component';

describe('EditarEvolucionPacienteComponent', () => {
  let component: EditarEvolucionPacienteComponent;
  let fixture: ComponentFixture<EditarEvolucionPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEvolucionPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEvolucionPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
