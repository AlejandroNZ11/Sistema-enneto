import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlmacenService } from 'src/app/shared/services/almacen.service';
import { almacen } from 'src/app/shared/models/almacen';
import Swal from 'sweetalert2';
import { routes } from 'src/app/shared/routes/routes';


@Component({
  selector: 'app-agregar-almacen',
  templateUrl: './agregar-almacen.component.html',
  styleUrls: ['./agregar-almacen.component.scss']
})
export class AgregarAlmacenComponent {
  Almacen: almacen = new almacen();
  public routes = routes;

  public form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private almacenService: AlmacenService,
    public fb: FormBuilder) {
    this.form = this.fb.group({
      nombreAlmacen: ['', Validators.required],
      descripcion: ['', Validators.required],
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

  crearAlmacen() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    this.Almacen.descripcion = this.form.get("descripcion")?.value;
    this.Almacen.nombreAlmacen = this.form.get("nombreAlmacen")?.value;
    console.log(this.Almacen);
    this.almacenService.crearAlmacen(this.Almacen).subscribe(
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
      }
    );
  }
}