import { Component } from '@angular/core';
import {routes } from 'src/app/shared/routes/routes';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperacionesService } from 'src/app/shared/services/operaciones.service';
import { producto } from 'src/app/shared/models/producto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.scss']
})
export class AgregarProductosComponent {
  constructor(public bsModalRef: BsModalRef,public fb: FormBuilder,public ProductosService  :OperacionesService) { 
    this.form = this.fb.group({
      productoId: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }
  Producto: producto = new producto();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;

  Cancelar() {
    this.bsModalRef.hide();
  }
  
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearProducto() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Producto.productoId = this.form.get("productoId")?.value;
    this.Producto.nombre = this.form.get("nombre")?.value;
    this.Producto.descripcion = this.form.get("descripcion")?.value;
    this.Producto.fecha = this.form.get("fecha")?.value;
    this.Producto.stock = this.form.get("stock")?.value;
    

    console.log(this.Producto);
    this.ProductosService.crearProducto(this.Producto).subscribe(
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