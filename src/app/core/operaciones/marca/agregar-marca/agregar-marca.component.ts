import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {   marca} from 'src/app/shared/models/marca';
import { routes } from 'src/app/shared/routes/routes';
import { MarcaService } from 'src/app/shared/services/marca.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-marca',
  templateUrl: './agregar-marca.component.html',
  styleUrls: ['./agregar-marca.component.scss']
})


export class AgregarMarcaComponent implements OnInit {
  marcaAgregada$: Subject<boolean> = new Subject<boolean>();
  Marca: marca = new marca();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private marcaService: MarcaService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
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
    this.marcaAgregada$.next(false);
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearMarca() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    
    this.Marca.nombre = this.form.get("nombre")?.value;
    console.log(this.Marca);
    this.marcaService.crearMarca(this.Marca).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.marcaAgregada$.next(true);
          this.bsModalRef.hide();
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      }
    );
  }
}

