import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataTarifario, tarifario, Itarifario } from 'src/app/shared/models/tarifario';
import { routes } from 'src/app/shared/routes/routes';
import { TarifarioService } from 'src/app/shared/services/tarifario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tarifario',
  templateUrl: './agregar-tarifario.component.html',
  styleUrls: ['./agregar-tarifario.component.scss']
})
export class AgregarTarifarioComponent {
  Tarifario: tarifario = new tarifario();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;

  
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private tarifarioService: TarifarioService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
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
  crearTarifario() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Tarifario.descripcion = this.form.get("descripcion")?.value;
    console.log(this.Tarifario);
    this.tarifarioService.crearTarifario(this.Tarifario).subscribe(
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




