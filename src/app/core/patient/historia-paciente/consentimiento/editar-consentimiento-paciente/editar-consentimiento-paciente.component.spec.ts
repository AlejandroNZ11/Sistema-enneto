import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConsentimientoPacienteComponent } from './editar-consentimiento-paciente.component';

describe('EditarConsentimientoPacienteComponent', () => {
  let component: EditarConsentimientoPacienteComponent;
  let fixture: ComponentFixture<EditarConsentimientoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarConsentimientoPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarConsentimientoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
