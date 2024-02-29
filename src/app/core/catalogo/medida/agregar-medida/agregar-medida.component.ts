import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { MedidaService } from 'src/app/shared/services/medida.service';
import { medida } from 'src/app/shared/models/medida';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-agregar-medida',
  templateUrl: './agregar-medida.component.html',
  styleUrls: ['./agregar-medida.component.scss']
})
export class AgregarMedidaComponent {
  medidaAgregada$: Subject<boolean> = new Subject<boolean>();
  Medida: medida = new medida();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;


  constructor(public bsModalRef: BsModalRef, private service: MedidaService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
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
    this.medidaAgregada$.next(false);
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
          this.medidaAgregada$.next(true);
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



