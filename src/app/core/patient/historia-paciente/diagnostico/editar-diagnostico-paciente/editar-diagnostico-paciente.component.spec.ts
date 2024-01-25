import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDiagnosticoPacienteComponent } from './editar-diagnostico-paciente.component';

describe('EditarDiagnosticoPacienteComponent', () => {
  let component: EditarDiagnosticoPacienteComponent;
  let fixture: ComponentFixture<EditarDiagnosticoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDiagnosticoPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDiagnosticoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
