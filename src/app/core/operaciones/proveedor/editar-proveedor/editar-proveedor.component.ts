import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Iproveedor } from 'src/app/shared/models/proveedor';
import { routes } from 'src/app/shared/routes/routes';
import { ProveedorService } from 'src/app/shared/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.scss']
})
export class EditarProveedorComponent {
  proveedor!: Iproveedor;
  proveedorSeleccionado: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  constructor(public bsModalRef: BsModalRef, private ProveedorServicio: ProveedorService, public fb: FormBuilder) {
    this.form = this.fb.group({
      ruc: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      contacto: ['', Validators.required],
      correo: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.ProveedorServicio.obtenerProveedor(this.proveedorSeleccionado!).subscribe(proveedor => {
      this.proveedor = proveedor;
      this.form.patchValue({
        proveedorId: this.proveedor.proveedorId,
        ruc: this.proveedor.ruc,
        nombre:this.proveedor.nombre,
        direccion:this.proveedor.direccion,
        telefono:this.proveedor.telefono,
        contacto:this.proveedor.contacto,
        correo:this.proveedor.correo,
       
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
  guardarProveedor() {
    if (!this.proveedor|| this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const proveedorActualizado: Iproveedor = {
      proveedorId:this.proveedor.proveedorId,
      ruc: this.proveedor.ruc,
      nombre: this.form.value.nombre,
      direccion: this.form.value.direccion,
      telefono:this.form.value.telefono,
      contacto:this.form.value.contacto,
      correo:this.form.value.correo,
      
    };
    this.ProveedorServicio.actualizarProveedor(proveedorActualizado).subscribe(
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
