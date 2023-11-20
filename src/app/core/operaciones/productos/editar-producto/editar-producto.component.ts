import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Iproducto } from 'src/app/shared/models/producto';
import { routes } from 'src/app/shared/routes/routes';
import { OperacionesService } from 'src/app/shared/services/operaciones.service';
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent {

  producto!: Iproducto;
  productoSeleccionado: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  constructor(public bsModalRef: BsModalRef, private OperacionesService: OperacionesService, public fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      stock: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }
  ngOnInit() {
    this.OperacionesService.obtenerProducto(this.productoSeleccionado!).subscribe(producto => {
      this.producto = producto;
      this.form.patchValue({
        id: this.producto.id,
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        fecha:this.producto.fecha,
        stock:this.producto.stock,
        estado: this.producto.estado == '1' ? 'Activo' : 'Inactivo',
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
  guardarPorducto() {
    if (!this.producto|| this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const productoActualizado: Iproducto = {
      id: this.producto.id,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      fecha:this.form.value.fecha,
      stock:this.form.value.stock,
      estado:this.form.value.estado,
    };
  }
}
