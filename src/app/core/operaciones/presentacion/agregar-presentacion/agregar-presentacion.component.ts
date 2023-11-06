import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { presentacion } from 'src/app/shared/models/presentacion';
import { routes } from 'src/app/shared/routes/routes';
import { PresentacionService } from 'src/app/shared/services/presentacion.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-agregar-presentacion',
  templateUrl: './agregar-presentacion.component.html',
  styleUrls: ['./agregar-presentacion.component.scss']
})
 

export class AgregarPresentacionComponent implements OnInit {
  Presentacion: presentacion = new presentacion();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private presentacionService: PresentacionService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
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
  crearPresentacion() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Presentacion.nombre = this.form.get("nombre")?.value;
    console.log(this.Presentacion);
    this.presentacionService.crearPresentacion(this.Presentacion).subscribe(
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
