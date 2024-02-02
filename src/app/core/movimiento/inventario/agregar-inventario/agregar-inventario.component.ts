import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataInventario, IInventario, inventario } from 'src/app/shared/models/inventario';
import { routes } from 'src/app/shared/routes/routes';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-inventario',
  templateUrl: './agregar-inventario.component.html',
  styleUrls: ['./agregar-inventario.component.scss']
})
export class AgregarInventarioComponent implements OnInit {
  inventarioAgregada$: Subject<boolean> = new Subject<boolean>();
  Inventario: inventario = new inventario();
  public routes = routes;
  form!: FormGroup;
  fecha: Date = new Date();
  public mostrarErrores = false;
  

  ngOnInit(): void { }

  constructor(
    public bsModalRef: BsModalRef, 
    private renderer: Renderer2,
    private service: InventarioService,
    public fb: FormBuilder,
    ) {
    this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      unidad: ['', Validators.required],
      stock: ['', Validators.required],
      codigoBarra: ['', Validators.required],
      precioSalida: ['', Validators.required],
      precioEntrada: ['', Validators.required],
      nombreAlmacen: ['', Validators.required],
      fecha: ['', [Validators.required]],
    });
  }

  
  validarInput(event: any) {
    const inputValue = event.target.value;

    if (isNaN(inputValue)) {
      const newValue = inputValue.slice(0, -1);
      this.renderer.setProperty(event.target, 'value', newValue);
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
    this.inventarioAgregada$.next(false);
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
    this.Inventario.nombreProducto = this.form.get("nombreProducto")?.value;
    this.Inventario.unidad = this.form.get("unidad")?.value;
    this.Inventario.precioEntrada = parseFloat(this.form.get("precioEntrada")?.value);
    this.Inventario.stock = parseInt(this.form.get("stock")?.value);
    this.Inventario.codigoBarra = this.form.get("codigoBarra")?.value;
    this.Inventario.precioSalida = parseFloat(this.form.get("precioSalida")?.value);
    this.Inventario.nombreAlmacen = this.form.get("nombreAlmacen")?.value;
    this.Inventario.fechaRegistro = this.form.get("fecha")?.value;
    this.Inventario.estado = 1
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
