import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { especialidad } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-especialidad',
  templateUrl: './editar-especialidad.component.html',
  styleUrls: ['./editar-especialidad.component.scss']
})
export class EditarEspecialidadComponent implements OnInit{
  especialidadSeleccionada ?: string;
  Especialidad: especialidad = new especialidad();
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }
  constructor(public bsModalRef: BsModalRef,private especialidadService: EspecialidadesService,
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
  guardarCategoria() {
    if (this.form.invalid) {
      this.mostrarErrores = true;
      //Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    this.Especialidad.nombre = this.form.value.nombre;
    this.especialidadService.actualizarEspecialidad(this.Especialidad).subscribe(
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
