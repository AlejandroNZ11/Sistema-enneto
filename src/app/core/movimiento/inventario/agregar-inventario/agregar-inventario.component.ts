import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataInventario, IInventario, inventario } from 'src/app/shared/models/inventario';
import { routes } from 'src/app/shared/routes/routes';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-inventario',
  templateUrl: './agregar-inventario.component.html',
  styleUrls: ['./agregar-inventario.component.scss']
})
export class AgregarInventarioComponent implements OnInit {

  Inventario: inventario = new inventario();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private service: InventarioService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      unidad: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      codigoBarra: ['', Validators.required],
      precioSalida: ['', Validators.required],
      nombreAlmacen: ['', Validators.required],
      fecha: ['', Validators.required],
      estado: ['Activo'],

      
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
  crearInventario() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    this.Inventario.NombreProducto = this.form.get("nombreProducto")?.value;
    this.Inventario.Unidad = this.form.get("unidad")?.value;
    this.Inventario.PrecioEntrada = this.form.get("precio")?.value;
    this.Inventario.Stock = this.form.get("stock")?.value;
    this.Inventario.CodigoBarra = this.form.get("codigoBarra")?.value;
    this.Inventario.PrecioSalida = this.form.get("precioSalida")?.value;
    this.Inventario.NombreAlmacen = this.form.get("nombreAlmacen")?.value;
    this.Inventario.FechaRegistro = this.form.get("fecha")?.value;
    this.Inventario.Estado = this.form.get("estado")?.value;
    console.log(this.Inventario);
    this.service.crearInventario(this.Inventario).subscribe(
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
