import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

import { PlanesService } from 'src/app/shared/services/planes.servicie';
import { PlanesListData,PlanesRequest,PlanesResponse } from 'src/app/shared/models/planes';
@Component({
  selector: 'app-agregar-plan',
  templateUrl: './agregar-plan.component.html',
  styleUrls: ['./agregar-plan.component.scss']
})
export class AgregarPlanComponent implements OnInit{

  Plan: PlanesRequest = new PlanesRequest();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private service: PlanesService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
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
  /*
  crearMedida() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Plan.nombrePlan = this.form.get("descripcion")?.value;
    console.log(this.Plan);
    this.service.crearPlan(this.Plan).subscribe(
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
  }*/
}



