import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { unidad } from 'src/app/shared/models/unidades';
import { routes } from 'src/app/shared/routes/routes';
import { UnidadesService } from 'src/app/shared/services/unidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-unidades',
  templateUrl: './agregar-unidades.component.html',
  styleUrls: ['./agregar-unidades.component.scss']
})
export class AgregarUnidadesComponent implements OnInit{

  Unidad: unidad = new unidad();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private unidadService: UnidadesService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      siglas: ['', Validators.required],
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
  crearUnidad() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Unidad.nombre = this.form.get("nombre")?.value;this.bsModalRef
    this.Unidad.descripcion = this.form.get("descripcion")?.value;this.bsModalRef
    this.Unidad.siglas = this.form.get("siglas")?.value;this.bsModalRef
    console.log(this.Unidad);
    this.unidadService.crearUnidad(this.Unidad).subscribe(
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
