import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Ialmacen } from 'src/app/shared/models/almacen';
import { routes } from 'src/app/shared/routes/routes';
import { AlmacenService } from 'src/app/shared/services/almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-almacen',
  templateUrl: './editar-almacen.component.html',
  styleUrls: ['./editar-almacen.component.scss']
})
export class EditarAlmacenComponent implements OnInit {
  almacen!: Ialmacen;
  AlmacenSeleccionada: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private almacenService: AlmacenService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombreAlmacen: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.almacenService.obtenerAlmacen(this.AlmacenSeleccionada!).subscribe(almacen => {
      this.almacen = almacen;
      this.form.patchValue({
        descripcion: this.almacen.nombreAlmacen,
        estado: this.almacen.estado == '1' ? '1' : '0',
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

  guardarAlmacen() {
    if (!this.almacen || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const AlmacenActualizado: Ialmacen = {
      almacenId: this.almacen.almacenId,
      nombreAlmacen: this.almacen.almacenId,
      sedeId: 1,
      estado: this.form.value.estado == '1' ? '1' : '0',
    };

    this.almacenService.actualizarAlmacen(AlmacenActualizado).subscribe(
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
