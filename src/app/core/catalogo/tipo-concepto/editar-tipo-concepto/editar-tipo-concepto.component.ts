import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataTipoConcepto, ItipoConcepto, tipoConcepto } from 'src/app/shared/models/tipoConcepto';
import { routes } from 'src/app/shared/routes/routes';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-concepto',
  templateUrl: './editar-tipo-concepto.component.html',
  styleUrls: ['./editar-tipo-concepto.component.scss']
})
export class EditarTipoConceptoComponent implements OnInit{
  tipoConceptoSeleccionado ?: string;
  tipoConcepto: tipoConcepto = new tipoConcepto();
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }
  constructor(public bsModalRef: BsModalRef,private service: TipoConceptoService,
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
  guardarTipoConcepto() {
    if (this.form.invalid) {
      this.mostrarErrores = true;
      //Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    this.service.actualizarTipoConcepto(this.tipoConcepto).subscribe(
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


