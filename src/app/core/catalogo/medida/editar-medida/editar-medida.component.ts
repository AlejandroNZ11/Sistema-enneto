import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { Imedida } from 'src/app/shared/models/medida';
import { MedidaService } from 'src/app/shared/services/medida.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-editar-medida',
  templateUrl: './editar-medida.component.html',
  styleUrls: ['./editar-medida.component.scss']
})
export class EditarMedidaComponent implements OnInit{
  medidaEditada$: Subject<boolean> = new Subject<boolean>();
  medida!: Imedida;
  medidaSeleccionada ?:string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private medidaService: MedidaService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.medidaService.obtenerMedida(this.medidaSeleccionada!).subscribe(medida => {
      this.medida = medida;
      this.form.patchValue({
        nombre: this.medida.nombre,
        estado: this.medida.estado == '1' ? 'Activo' : 'Inactivo',
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
    this.medidaEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarMedida() {
    if (!this.medida || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const medidaActualizada: Imedida = {
      unidadMedidaId: this.medida.unidadMedidaId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.medidaService.actualizarMedida(medidaActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.medidaEditada$.next(true);
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