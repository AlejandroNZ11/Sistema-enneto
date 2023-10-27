import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Ibancos } from 'src/app/shared/models/bancos';
import { routes } from 'src/app/shared/routes/routes';
import { BancosService } from 'src/app/shared/services/bancos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-banco',
  templateUrl: './editar-banco.component.html',
  styleUrls: ['./editar-banco.component.scss']
})
export class EditarBancoComponent implements OnInit {
  bancoSeleccionada: Ibancos | null = null;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private bancosService: BancosService  ,public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }
  ngOnInit() {
    if (this.bancoSeleccionada) {
      this.form.patchValue({
        descripcion: this.bancoSeleccionada.descripcion,
        estado: this.bancoSeleccionada.estado,
      });
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
    this.bsModalRef.hide()
  }
  guardarBanco() {
    if (!this.bancoSeleccionada || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const bancoActualizada: Ibancos = {
      bancoId: this.bancoSeleccionada.bancoId,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado,
    };

    this.bancosService.actualizarBanco(bancoActualizada).subscribe(
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
