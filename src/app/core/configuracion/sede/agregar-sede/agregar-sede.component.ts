import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { sede } from 'src/app/shared/models/sede';
import { routes } from 'src/app/shared/routes/routes';
import { SedeService } from 'src/app/shared/services/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-sede',
  templateUrl: './agregar-sede.component.html',
  styleUrls: ['./agregar-sede.component.scss']
})
export class AgregarSedeComponent implements OnInit{

  Sede: sede = new sede();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private sedeService: SedeService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      Direccion: ['', Validators.required],
      Ubigeo: ['', Validators.required],
      
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
  crearSede() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Sede.nombre = this.form.get("nombre")?.value;
    this.Sede.codigo = this.form.get("codigo")?.value;
    this.Sede.direccion = this.form.get("Direccion")?.value;
    this.Sede.ubigeo = this.form.get("Ubigeo")?.value;
    

    console.log(this.Sede);
    this.sedeService.crearSede(this.Sede).subscribe(
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

