import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { PlanesService } from 'src/app/shared/services/planes.servicie';
import Swal from 'sweetalert2';
import { DataPlanes, Planes, IPlanes } from 'src/app/shared/models/planes';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-agregar-plan',
  templateUrl: './agregar-plan.component.html',
  styleUrls: ['./agregar-plan.component.scss']
})
export class AgregarPlanComponent {
  planAgregada$: Subject<boolean> = new Subject<boolean>();
  Plan:Planes = new Planes();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;


  constructor(
    private renderer: Renderer2,
    public bsModalRef: BsModalRef, 
    private service: PlanesService, 
    public fb: FormBuilder) {
    this.form = this.fb.group({
      nombrePlan: ['', Validators.required],
      costoPlan: ['', Validators.required],
      usuMax: ['', Validators.required],
      maxPlan: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinContrato: ['', Validators.required],
    });
  }

  validarInput(event: any) {
    const inputValue = event.target.value;

    if (isNaN(inputValue)) {
      const newValue = inputValue.slice(0, -1);
      this.renderer.setProperty(event.target, 'value', newValue);
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
    this.planAgregada$.next(false);
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearPlan() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    this.Plan.fechaInicio = this.form.get("fechaInicio")?.value;
    this.Plan.fechaFinContrato = this.form.get("fechaFinContrato")?.value;
    this.Plan.costoPlan = this.form.get("costoPlan")?.value;
    this.Plan.maxPlan = this.form.get("maxPlan")?.value;
    this.Plan.usuMax = this.form.get("usuMax")?.value;
    this.Plan.nombrePlan = this.form.get("nombrePlan")?.value;
    this.Plan.estado = 1
    console.log(this.Plan);
    this.service.crearPlan(this.Plan).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.planAgregada$.next(true);
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



