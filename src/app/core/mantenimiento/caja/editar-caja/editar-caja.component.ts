import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Icaja } from 'src/app/shared/models/caja';
import { routes } from 'src/app/shared/routes/routes';
import { CajaService } from 'src/app/shared/services/caja.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-caja',
  templateUrl: './editar-caja.component.html',
  styleUrls: ['./editar-caja.component.scss']
})
export class EditarCajaComponent implements OnInit  {
  cajaEditada$: Subject<boolean> = new Subject<boolean>();
  caja!: Icaja;
  cajaSeleccionada: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private cajaService: CajaService, 
    public fb: FormBuilder
    ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.cajaService.obtenerCaja(this.cajaSeleccionada!).subscribe(caja => {
      this.caja = caja;
      this.form.patchValue({  
        nombre: this.caja.nombre,
        estado: this.caja.estado == '1' ? 'Activo' : 'Inactivo',
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
    this.cajaEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarCaja() {
    if (!this.caja || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const cajaActualizada: Icaja = {
      cajaId: this.caja.cajaId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.cajaService.actualizarCaja(cajaActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.cajaEditada$.next(true);
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