import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { alergias } from 'src/app/shared/models/alergia';
import { routes } from 'src/app/shared/routes/routes';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-agregar-alergias',
  templateUrl: './agregar-alergias.component.html',
  styleUrls: ['./agregar-alergias.component.scss']
})
export class AgregarAlergiasComponent {
  alergiaAgregada$: Subject<boolean> = new Subject<boolean>();
  Alergia: alergias = new alergias();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private service: AlergiasService,
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
    this.alergiaAgregada$.next(false);
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  
  crearAlergia() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Alergia.nombre = this.form.get("nombre")?.value;
    console.log(this.Alergia);
    this.service.crearAlergia(this.Alergia).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.alergiaAgregada$.next(true);
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


