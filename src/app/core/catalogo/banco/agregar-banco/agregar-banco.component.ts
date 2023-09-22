import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { DataBancos, Ibancos,banco } from 'src/app/shared/models/bancos';
import { BancosService } from 'src/app/shared/services/bancos.service';

@Component({
  selector: 'app-agregar-banco',
  templateUrl: './agregar-banco.component.html',
  styleUrls: ['./agregar-banco.component.scss']
})
export class AgregarBancoComponent implements OnInit {
  Banco: banco = new banco();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }
  constructor(public bsModalRef: BsModalRef, private bancosService: BancosService,public fb: FormBuilder,){
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
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearBanco() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    this.Banco.estado = this.form.get("estado")?.value;
    this.Banco.descripcion = this.form.get("descripcion")?.value;
    console.log(this.Banco);
    this.bancosService.crearBanco(this.Banco).subscribe(
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
