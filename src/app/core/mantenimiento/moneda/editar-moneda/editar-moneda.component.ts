import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MonedaService } from 'src/app/shared/services/moneda.service';
import Swal from 'sweetalert2';
import { ITipoMoneda } from 'src/app/shared/models/moneda';

@Component({
  selector: 'app-editar-moneda',
  templateUrl: './editar-moneda.component.html',
  styleUrls: ['./editar-moneda.component.scss']
})
export class EditarMonedaComponent implements OnInit {
  moneda!: ITipoMoneda;
  monedaSeleccionada: any;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private monedaService: MonedaService, public fb: FormBuilder) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.monedaService.obtenerMoneda(this.monedaSeleccionada!).subscribe(moneda => {
      this.moneda = moneda;
      this.form.patchValue({
        descripcion: this.moneda.descripcion,
        estado: this.moneda.estado == 'Activo' ? 'Activo' : 'Inactivo',
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

  guardarMoneda() {
    if (!this.moneda || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const monedaActualizada: ITipoMoneda = {
      tipoMonedaId: this.moneda.tipoMonedaId,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.monedaService.actualizarMoneda(monedaActualizada).subscribe(
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
