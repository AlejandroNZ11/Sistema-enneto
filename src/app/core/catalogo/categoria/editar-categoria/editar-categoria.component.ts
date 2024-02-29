import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Icategoria } from 'src/app/shared/models/categoria';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements OnInit {
  categoriaEditada$: Subject<boolean> = new Subject<boolean>();
  categoria!: Icategoria;
  categoriaSeleccionada ?:string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private categoriaService: CategoriaService, 
    public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.categoriaService.obtenerCategoria(this.categoriaSeleccionada!).subscribe(categoria => {
      this.categoria = categoria;
      this.form.patchValue({
        nombre: this.categoria.nombre,
        estado: this.categoria.estado == '1' ? 'Activo' : 'Inactivo',
      });
    })
  }

  soloLetras(event: KeyboardEvent): void {
    const regex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$");
    const teclasPermitidas = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    if (!regex.test(event.key) && !teclasPermitidas.includes(event.key)) {
      event.preventDefault();
    }
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
    this.categoriaEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarCategoria() {
    if (!this.categoria || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const categoriaActualizada: Icategoria = {
      categoriaId: this.categoria.categoriaId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.categoriaService.actualizarCategoria(categoriaActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.categoriaEditada$.next(true);
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