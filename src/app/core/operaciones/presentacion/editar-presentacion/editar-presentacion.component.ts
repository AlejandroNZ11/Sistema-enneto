import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Ipresentacion } from 'src/app/shared/models/presentacion';
import { routes } from 'src/app/shared/routes/routes';
import { PresentacionService } from 'src/app/shared/services/presentacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-presentacion',
  templateUrl: './editar-presentacion.component.html',
  styleUrls: ['./editar-presentacion.component.scss']
})
export class EditarPresentacionComponent implements OnInit {
  presentacion!: Ipresentacion;
  presentacionSeleccionada: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private presentacionService: PresentacionService, 
    public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit(): void { 
    this.presentacionService.obtenerPresentacion(this.presentacionSeleccionada!).subscribe(presentacion => {
    this.presentacion = presentacion;
    this.form.patchValue({
        nombre: this.presentacion.nombre,
        estado: this.presentacion.estado == '1' ? 'Activo' : 'Inactivo',
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

  guardarPresentacion() {
    if (!this.presentacion || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const presentacionActualizada: Ipresentacion = {
      presentacionId: this.presentacion.presentacionId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.presentacionService.actualizarPresentacion(presentacionActualizada ).subscribe(
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
