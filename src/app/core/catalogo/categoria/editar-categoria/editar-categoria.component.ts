import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataCategoria, Icategoria, categoria } from 'src/app/shared/models/categoria';
import { routes } from 'src/app/shared/routes/routes';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements OnInit {
  categoriaSeleccionada ?: string;
  Categoria!: Icategoria;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }
  constructor(public bsModalRef: BsModalRef,private categoriaService: CategoriaService,
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
    this.bsModalRef.hide()
  }
  guardarCategoria() {
    if (this.form.invalid) {
      this.mostrarErrores = true;
      //Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    this.Categoria.nombre = this.form.value.nombre;
    this.categoriaService.actualizarCategoria(this.Categoria).subscribe(
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
