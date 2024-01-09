import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { categoriaM } from 'src/app/shared/models/categoria-op';
import { routes } from 'src/app/shared/routes/routes';
import { CategoriaOpService } from 'src/app/shared/services/categoria-op.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.scss']
})
export class AgregarCategoriaComponent implements OnInit{
  categoriaAgregada$: Subject<boolean> = new Subject<boolean>();
  CategoriaM: categoriaM = new categoriaM();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private categoriaService: CategoriaOpService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
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
    this.categoriaAgregada$.next(false);
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearCategoria() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.CategoriaM.nombre = this.form.get("nombre")?.value;
    this.CategoriaM.descripcion = this.form.get("descripcion")?.value;
    console.log(this.CategoriaM);
    this.categoriaService.crearCategoria(this.CategoriaM).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.categoriaAgregada$.next(true);
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


