import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Itipomateriales } from 'src/app/shared/models/tipo-materiales';
import { routes } from 'src/app/shared/routes/routes';
import { TipomaterialesService } from 'src/app/shared/services/tipo-materiales.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-editar-tipo-materiales',
  templateUrl: './editar-tipo-materiales.component.html',
  styleUrls: ['./editar-tipo-materiales.component.scss']
})
export class EditarTipoMaterialesComponent implements OnInit {
  tipomaterialEditada$: Subject<boolean> = new Subject<boolean>();
  tipomaterial!: Itipomateriales;
  TipomaterialesSeleccionada ?:string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipomaterialService: TipomaterialesService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.tipomaterialService.obtenerTipomateriale(this.TipomaterialesSeleccionada!).subscribe(tipomaterial => {
      this.tipomaterial = tipomaterial;
      this.form.patchValue({
        nombre: this.tipomaterial.nombre,
        descripcion: this.tipomaterial.descripcion,
        estado: this.tipomaterial.estado == '1' ? 'Activo' : 'Inactivo',
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
    this.tipomaterialEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarTipoMaterial() {
    if (!this.tipomaterial || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const tipomaterialActualizada: Itipomateriales = {
      tipoMaterialId: this.tipomaterial.tipoMaterialId,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.tipomaterialService.actualizarTipomateriales(tipomaterialActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.tipomaterialEditada$.next(true);
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