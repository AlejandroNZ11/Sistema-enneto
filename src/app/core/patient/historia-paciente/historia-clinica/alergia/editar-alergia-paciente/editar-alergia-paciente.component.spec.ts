import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlergiaPacienteComponent } from './editar-alergia-paciente.component';

describe('EditarAlergiaPacienteComponent', () => {
  let component: EditarAlergiaPacienteComponent;
  let fixture: ComponentFixture<EditarAlergiaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAlergiaPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAlergiaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
