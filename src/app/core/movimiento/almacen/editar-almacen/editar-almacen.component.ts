import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Ialmacen } from 'src/app/shared/models/almacen';
import { Isede } from 'src/app/shared/models/sede';
import { routes } from 'src/app/shared/routes/routes';
import { AlmacenService } from 'src/app/shared/services/almacen.service';
import { SedeService } from 'src/app/shared/services/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-almacen',
  templateUrl: './editar-almacen.component.html',
  styleUrls: ['./editar-almacen.component.scss']
})
export class EditarAlmacenComponent implements OnInit {
  almacen!: Ialmacen;
  AlmacenSeleccionada?: string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  sede_LISTA: Array<Isede> = [];
  public sedes!: string[];
  isFormSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private almacenService: AlmacenService, 
    public formBuilder: FormBuilder, 
    public sedeService: SedeService) 
    {
    this.form = this.formBuilder.group({
      nombreAlmacen: ['', Validators.required],
      sede: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  } 

  ngOnInit() {
    this.almacenService.obtenerAlmacen(this.AlmacenSeleccionada!).subscribe(almacen => {
      this.almacen = almacen;
      this.form.patchValue({
        sedes: this.almacen.sedeId, 
        nombreAlmacen: this.almacen.nombreAlmacen,
        estado: this.almacen.estado = '1' ? 'Activo' : 'Inactivo',
      });
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
    this.bsModalRef.hide();
  }

  guardarAlmacen() {
    if (!this.almacen || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const AlmacenActualizada: Ialmacen = {
      almacenId: this.almacen.almacenId,
      nombreAlmacen: this.almacen.nombreAlmacen,
      sedeId:this.almacen.sedeId,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.almacenService.actualizarAlmacen(AlmacenActualizada).subscribe(
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
