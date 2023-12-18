import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Idiagnostico } from 'src/app/shared/models/diagnostico';
import { routes } from 'src/app/shared/routes/routes';
import { DiagnosticoService } from 'src/app/shared/services/diagnostico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-diagnostico',
  templateUrl: './editar-diagnostico.component.html',
  styleUrls: ['./editar-diagnostico.component.scss']
})
export class EditarDiagnosticoComponent {
  diagnostico!: Idiagnostico;
  diagnosticoSeleccionado: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private DiagnosticoService: DiagnosticoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      codigoEnfermedad:['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }
  ngOnInit() {
    this.DiagnosticoService.obtenerDiagnostico(this.diagnosticoSeleccionado!).subscribe(diagnostico => {
      this.diagnostico = diagnostico;
      this.form.patchValue({
        codigoEnfermedad: this.diagnostico.codigoEnfermedad01,
        estado: this.diagnostico.estado == '1' ? 'Activo' : 'Inactivo',

      });
    })
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }

  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }

  Cancelar() {
    this.bsModalRef.hide();
  }

  guardarDiagnostico() {
    if (!this.diagnostico || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const diagnosticoActualizado: Idiagnostico = {
      pacienteDiagnosticoId: this.diagnostico.pacienteDiagnosticoId,
      pacienteId:this.diagnostico.pacienteId,
      fecha: this.form.value.fecha,
      codigoEnfermedad01: this.form.value.codigoEnfermedad,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',

    };

    this.DiagnosticoService.actualizarDiagnostico(diagnosticoActualizado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
} 