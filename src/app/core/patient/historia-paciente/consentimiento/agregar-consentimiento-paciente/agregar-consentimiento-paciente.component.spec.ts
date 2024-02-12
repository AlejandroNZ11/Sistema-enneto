import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConsentimientoPacienteComponent } from './agregar-consentimiento-paciente.component';

describe('AgregarConsentimientoPacienteComponent', () => {
  let component: AgregarConsentimientoPacienteComponent;
  let fixture: ComponentFixture<AgregarConsentimientoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarConsentimientoPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarConsentimientoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
