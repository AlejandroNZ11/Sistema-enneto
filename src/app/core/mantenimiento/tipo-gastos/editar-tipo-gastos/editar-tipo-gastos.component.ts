import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IConceptoGasto } from 'src/app/shared/models/tipogastos';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-gastos',
  templateUrl: './editar-tipo-gastos.component.html',
  styleUrls: ['./editar-tipo-gastos.component.scss']
})
export class EditarTipoGastosComponent implements OnInit {
  conceptoGasto!:IConceptoGasto;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conceptoGastoSeleccionado: any;
  form: FormGroup;
  public mostrarErrores = false;
  public routes = routes;
  constructor(public bsModalRef: BsModalRef, private tipoGastosService: TipoGastosService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.tipoGastosService.obtenerConceptoGasto(this.conceptoGastoSeleccionado!.conceptoGastoId).subscribe(conceptoGasto => {
      this.conceptoGasto = conceptoGasto;
      this.form.patchValue({
        nombre: this.conceptoGasto.nombre,
        estado: this.conceptoGasto.estado,
      });
    });
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

  guardarConceptoGasto() {
    if (!this.conceptoGastoSeleccionado || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const conceptoGastoActualizado: IConceptoGasto = {
      conceptoGastoId: this.conceptoGastoSeleccionado.conceptoGastoId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado,
    };

    this.tipoGastosService.actualizarConceptoGasto(conceptoGastoActualizado).subscribe(
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
