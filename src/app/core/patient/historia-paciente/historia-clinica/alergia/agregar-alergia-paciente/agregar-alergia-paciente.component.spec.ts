import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlergiaPacienteComponent } from './agregar-alergia-paciente.component';

describe('AgregarAlergiaPacienteComponent', () => {
  let component: AgregarAlergiaPacienteComponent;
  let fixture: ComponentFixture<AgregarAlergiaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAlergiaPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAlergiaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
