/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataEspecialidad, especialidad,especialidadResponse } from 'src/app/shared/models/especialidades';
import { routes } from 'src/app/shared/routes/routes';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-especialidad',
  templateUrl: './agregar-especialidad.component.html',
  styleUrls: ['./agregar-especialidad.component.scss']
})
export class AgregarEspecialidadComponent implements OnInit{

  Especialidad: especialidad = new especialidad();
  especialidadAgregada$: Subject<boolean> = new Subject<boolean>();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private especialidadService: EspecialidadesService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  soloLetras(event: KeyboardEvent): void {
    const regex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$");
    const teclasPermitidas = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    if (!regex.test(event.key) && !teclasPermitidas.includes(event.key)) {
      event.preventDefault();
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
    this.bsModalRef.hide()
    this.especialidadAgregada$.next(false);
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearEspecialidad() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Especialidad.nombre = this.form.get("nombre")?.value;
    this.Especialidad.descripcion = this.form.get("descripcion")?.value;
    console.log(this.Especialidad);
    this.especialidadService.crearEspecialidad(this.Especialidad).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.especialidadAgregada$.next(true);
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}

