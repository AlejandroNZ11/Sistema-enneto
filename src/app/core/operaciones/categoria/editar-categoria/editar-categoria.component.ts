import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { CategoriaOpService } from 'src/app/shared/services/categoria-op.service';
import { IcategoriaM } from 'src/app/shared/models/categoria-op';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent  implements OnInit{
  categoria!: IcategoriaM;
  categoriaSeleccionada ?:string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private categoriaService: CategoriaOpService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.categoriaService.obtenerCategoria(this.categoriaSeleccionada!).subscribe(categoria => {
      this.categoria = categoria;
      this.form.patchValue({
        nombre: this.categoria.nombre,
        descripcion: this.categoria.descripcion,
        estado: this.categoria.estado == '1' ? 'Activo' : 'Inactivo',
      });
    })
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
    this.bsModalRef.hide();
  }

  guardarCategoria() {
    if (!this.categoria || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const categoriaActualizada: IcategoriaM = {
      categoriaMaterialesId: this.categoria.categoriaMaterialesId,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.categoriaService.actualizarCategoria(categoriaActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
} 