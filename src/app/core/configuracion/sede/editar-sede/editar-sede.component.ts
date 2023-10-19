import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Isede } from 'src/app/shared/models/sede';
import { routes } from 'src/app/shared/routes/routes';
import { SedeService } from 'src/app/shared/services/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-sede',
  templateUrl: './editar-sede.component.html',
  styleUrls: ['./editar-sede.component.scss']
})
export class EditarSedeComponent implements OnInit {
  sedeSeleccionada: Isede | null = null;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private sedeService: SedeService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    if (this.sedeSeleccionada) {
      this.form.patchValue({
        nombre: this.sedeSeleccionada.nombre,
        descripcion: this.sedeSeleccionada.descripcion,
        estado: this.sedeSeleccionada.estado,
      });
    }
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

  guardarSede() {
    if (!this.sedeSeleccionada || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
  
    const sedeActualizada: Isede = {
      sedeId: this.sedeSeleccionada.sedeId,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado,
    };
  
    this.sedeService.actualizarSede(sedeActualizada).subscribe(
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