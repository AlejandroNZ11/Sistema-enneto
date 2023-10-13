import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { proveedor } from 'src/app/shared/models/proveedor';
import { routes } from 'src/app/shared/routes/routes';
import { ProveedorService } from 'src/app/shared/services/proveedor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.scss']
})
export class AgregarProveedorComponent {
  Proveedor: proveedor = new proveedor();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  constructor(public bsModalRef: BsModalRef, private proveedorService: ProveedorService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      ruc: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      contacto: ['', Validators.required],
      correo: ['', Validators.required],
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
  crearProveedor() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Proveedor.ruc = this.form.get("ruc")?.value;
    this.Proveedor.nombre = this.form.get("nombre")?.value;
    this.Proveedor.direccion = this.form.get("direccion")?.value;
    this.Proveedor.telefono = this.form.get("telefono")?.value;
    this.Proveedor.contacto = this.form.get("contacto")?.value;
    this.Proveedor.correo = this.form.get("correo")?.value;
    console.log(this.Proveedor);
    this.proveedorService.crearProveedor(this.Proveedor).subscribe(
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
