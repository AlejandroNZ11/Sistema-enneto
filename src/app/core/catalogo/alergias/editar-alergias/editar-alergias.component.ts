import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import { DataAlergias, Ialergias, alergias } from 'src/app/shared/models/alergia';
@Component({
  selector: 'app-editar-alergias',
  templateUrl: './editar-alergias.component.html',
  styleUrls: ['./editar-alergias.component.scss']
})
export class EditarAlergiasComponent  implements OnInit{
  alergiaSeleccionada ?: string;
  Alergia!: Ialergias;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }
  constructor(public bsModalRef: BsModalRef,private service: AlergiasService,
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
  guardarAlergia() {
    if (this.form.invalid) {
      this.mostrarErrores = true;
      //Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    this.service.actualizarAlergia(this.Alergia).subscribe(
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

