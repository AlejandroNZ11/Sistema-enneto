import { Component } from '@angular/core';
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
export class EditarBancoComponent {
  bancoSeleccionada?: string;
  Banco!: Ibancos
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }
  constructor(public bsModalRef: BsModalRef, private bancosService: BancosService  ,public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
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
  guardarCategoria() {
    if (this.form.invalid) {
      this.mostrarErrores = true;
      //Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    this.bancosService.actualizarBanco(this.Banco).subscribe(
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
