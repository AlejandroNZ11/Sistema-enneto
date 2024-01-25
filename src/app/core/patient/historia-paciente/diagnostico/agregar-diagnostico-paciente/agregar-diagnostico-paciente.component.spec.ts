import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDiagnosticoPacienteComponent } from './agregar-diagnostico-paciente.component';

describe('AgregarDiagnosticoPacienteComponent', () => {
  let component: AgregarDiagnosticoPacienteComponent;
  let fixture: ComponentFixture<AgregarDiagnosticoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDiagnosticoPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDiagnosticoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
