import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { DataMedida, Imedida, medida } from 'src/app/shared/models/medida';
import { MedidaService } from 'src/app/shared/services/medida.service';

@Component({
  selector: 'app-editar-medida',
  templateUrl: './editar-medida.component.html',
  styleUrls: ['./editar-medida.component.scss']
})
export class EditarMedidaComponent implements OnInit{
  medidaSeleccionada ?: string;
  Medida!: Imedida;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }
  constructor(public bsModalRef: BsModalRef,private service: MedidaService,
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
  guardarMedida() {
    if (this.form.invalid) {
      this.mostrarErrores = true;
      //Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    this.service.actualizarMedida(this.Medida).subscribe(
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


