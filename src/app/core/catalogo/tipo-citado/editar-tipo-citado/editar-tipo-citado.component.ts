import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ItipoCitado } from 'src/app/shared/models/tipoCitado';
import { routes } from 'src/app/shared/routes/routes';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-citado',
  templateUrl: './editar-tipo-citado.component.html',
  styleUrls: ['./editar-tipo-citado.component.scss']
})
export class EditarTipoCitadoComponent implements OnInit {
  citadoEditada$: Subject<boolean> = new Subject<boolean>();
  tipoCitado: ItipoCitado | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tipoCitadoSeleccionado: any;
  form: FormGroup;
  public routes = routes;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoCitadoService: TipoCitadoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      color: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.tipoCitadoService.obtenerTipoCitadoById(this.tipoCitadoSeleccionado!).subscribe(tipoCitado => {
      this.tipoCitado = tipoCitado;
      this.form.patchValue({
        nombre: this.tipoCitado.nombre,
        color: this.tipoCitado.color,
        estado: this.tipoCitado.estado == '1' ? 'Activo' : 'Inactivo',
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
    this.citadoEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarTipoCitado() {
    if (!this.tipoCitado || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const tipoCitadoActualizado: ItipoCitado = {
      tipoCitadoId: this.tipoCitado.tipoCitadoId,
      nombre: this.form.value.nombre,
      color: this.form.value.color,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.tipoCitadoService.actualizarTipoCitado(tipoCitadoActualizado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.citadoEditada$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}