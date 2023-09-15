import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataEspecialidad, Iespecialidad, especialidad } from 'src/app/shared/models/especialidades';
import { routes } from 'src/app/shared/routes/routes';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-especialidad',
  templateUrl: './agregar-especialidad.component.html',
  styleUrls: ['./agregar-especialidad.component.scss']
})
export class AgregarEspecialidadComponent implements OnInit{

  Especialidad: especialidad = new especialidad();
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
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}

