import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataTipoConcepto, ItipoConcepto, tipoConcepto } from 'src/app/shared/models/tipoConcepto';
import { routes } from 'src/app/shared/routes/routes';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-concepto',
  templateUrl: './agregar-tipo-concepto.component.html',
  styleUrls: ['./agregar-tipo-concepto.component.scss']
})
export class AgregarTipoConceptoComponent implements OnInit{
  tipoConcepto: tipoConcepto = new tipoConcepto();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private service: TipoConceptoService,
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
  crearTipoConcepto() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.tipoConcepto.descripcion = this.form.get("descripcion")?.value;
    console.log(this.tipoConcepto);
    this.service.crearTipoConcepto(this.tipoConcepto).subscribe(
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




