
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ITipoTarjeta } from 'src/app/shared/models/tipotarjeta';
import { routes } from 'src/app/shared/routes/routes';
import { TipoTarjetaService } from 'src/app/shared/services/tipo-tarjeta.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-tarjeta',
  templateUrl: './editar-tarjeta.component.html',
  styleUrls: ['./editar-tarjeta.component.scss']
})
export class EditarTarjetaComponent implements OnInit {
  tipoTarjetaEditada$: Subject<boolean> = new Subject<boolean>();
  tipoTarjeta!: ITipoTarjeta;
  tipoTarjetaSeleccionada: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoTarjetaService: TipoTarjetaService, public fb: FormBuilder) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.tipoTarjetaService.obtenerTipoTarjeta(this.tipoTarjetaSeleccionada!).subscribe(tipoTarjeta => {
      this.tipoTarjeta = tipoTarjeta;
      this.form.patchValue({
        descripcion: this.tipoTarjeta.descripcion,
        estado: this.tipoTarjeta.estado == '1' ? 'Activo' : 'Inactivo',
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
    this.tipoTarjetaEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarTipoTarjeta() {
    if (!this.tipoTarjeta || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const tipoTarjetaActualizado: ITipoTarjeta = {
      tipoTarjetaId: this.tipoTarjeta.tipoTarjetaId,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.tipoTarjetaService.actualizarTipoTarjeta(tipoTarjetaActualizado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.tipoTarjetaEditada$.next(true);
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
