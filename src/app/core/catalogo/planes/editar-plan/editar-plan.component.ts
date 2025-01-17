import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IPlanes } from 'src/app/shared/models/planes';
import { routes } from 'src/app/shared/routes/routes';
import { PlanesService } from 'src/app/shared/services/planes.servicie';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-editar-plan',
  templateUrl: './editar-plan.component.html',
  styleUrls: ['./editar-plan.component.scss']
})
export class EditarPlanComponent implements OnInit {
  planEditada$: Subject<boolean> = new Subject<boolean>();
  Plan!: IPlanes;
  planSeleccionado?: string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(
    private renderer: Renderer2,
    public bsModalRef: BsModalRef,
    private planService: PlanesService, 
    public fb: FormBuilder) {
    this.form = this.fb.group({
      nombrePlan: ['', Validators.required],
      costoPlan: ['', Validators.required],
      usuMax: ['', Validators.required],
      maxPlan: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinContrato: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

ngOnInit() {
  this.planService.obtenerPlan(this.planSeleccionado!).subscribe(Plan => {
    this.Plan = Plan;
    this.form.patchValue({
      nombrePlan: this.Plan.nombrePlan,
      costoPlan: this.Plan.costoPlan,
      usuMax: this.Plan.usuMax,
      maxPlan: this.Plan.maxPlan,
      fechaInicio: this.Plan.fechaInicio,
      fechaFinContrato: this.Plan.fechaFinContrato,
      estado: this.Plan.estado == '1' ? 'Activo' : 'Inactivo',
    });
  })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validarInput(event: any, maxLength: number) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
  
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
  
    this.renderer.setProperty(event.target, 'value', inputValue);
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
    this.planEditada$.next(false);
    this.bsModalRef.hide()
  }
  actualizarPlan() {
    if (!this.Plan || this.form.invalid) {
      this.mostrarErrores = true;
      //Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    const PlanActualizado: IPlanes = {
      planId: this.Plan.planId,
      nombrePlan: this.form.value.nombrePlan,
      costoPlan: this.form.value.costoPlan,
      usuMax: this.form.value.usuMax,
      maxPlan: this.form.value.maxPlan,
      fechaInicio: this.form.value.fechaInicio,
      fechaFinContrato: this.form.value.fechaFinContrato,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };
    this.planService.actualizarPlan(PlanActualizado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.planEditada$.next(true);
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