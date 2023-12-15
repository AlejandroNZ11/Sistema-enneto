import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

import { MedidaService } from 'src/app/shared/services/medida.service';
import { DataMedida, Imedida, medida } from 'src/app/shared/models/medida';
@Component({
  selector: 'app-agregar-medida',
  templateUrl: './agregar-medida.component.html',
  styleUrls: ['./agregar-medida.component.scss']
})
export class AgregarMedidaComponent implements OnInit{

  Medida: medida = new medida();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private service: MedidaService,
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
  crearMedida() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Medida.nombre = this.form.get("nombre")?.value;
    console.log(this.Medida);
    this.service.crearMedida(this.Medida).subscribe(
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



