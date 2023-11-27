import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Iproveedor } from 'src/app/shared/models/proveedor';
import { routes } from 'src/app/shared/routes/routes';
import { ProveedorService } from 'src/app/shared/services/proveedor.service';

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
  constructor(public bsModalRef: BsModalRef, private ProveedorService: ProveedorService, public fb: FormBuilder) {
    this.form = this.fb.group({
      ruc: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      contacto: ['', Validators.required],
      correo: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }
}
