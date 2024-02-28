import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ConceptoGasto } from 'src/app/shared/models/tipogastos';
import { routes } from 'src/app/shared/routes/routes';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-gastos',
  templateUrl: './agregar-tipo-gastos.component.html',
  styleUrls: ['./agregar-tipo-gastos.component.scss']
})

export class AgregarTipoGastosComponent {
  tipoConceptoAgregado$: Subject<boolean> = new Subject<boolean>();//////
  conceptoGasto: ConceptoGasto = new ConceptoGasto();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private tipoGastosService: TipoGastosService,
    public fb: FormBuilder,private renderer: Renderer2) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  }
  validarInput(event: any) {
    const inputValue = event.target.value;

    if (isNaN(inputValue)) {
      const newValue = inputValue.slice(0, -1);
      this.renderer.setProperty(event.target, 'value', newValue);
    }
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
    this.tipoConceptoAgregado$.next(false);
    this.bsModalRef.hide();
  }//////

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }


  crearConceptoGasto() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }

    this.conceptoGasto.nombre = this.form.get("nombre")?.value;
    console.log(this.conceptoGasto);
    this.tipoGastosService.crearConceptoGasto(this.conceptoGasto).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.tipoConceptoAgregado$.next(true);
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
