import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { categoria } from 'src/app/shared/models/categoria';
import { routes } from 'src/app/shared/routes/routes';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.scss']
})
export class AgregarCategoriaComponent implements OnInit {
  categoriaAgregada$: Subject<boolean> = new Subject<boolean>();
  Categoria: categoria = new categoria();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(
    public bsModalRef: BsModalRef, 
    private categoriaService: CategoriaService,
    public fb: FormBuilder,
    ) {
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
    this.Categoria.nombre = this.form.get("nombre")?.value;
    console.log(this.Categoria);
    this.categoriaService.crearCategoria(this.Categoria).subscribe(
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
