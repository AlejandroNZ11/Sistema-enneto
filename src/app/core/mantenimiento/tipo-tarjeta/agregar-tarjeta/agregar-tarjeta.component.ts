import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { tipoTarjeta } from 'src/app/shared/models/tipotarjeta';
import { routes } from 'src/app/shared/routes/routes';
import { TipoTarjetaService } from 'src/app/shared/services/tipo-tarjeta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.scss']
})
export class AgregarTarjetaComponent implements OnInit {

  TipoTarjeta: tipoTarjeta = new tipoTarjeta();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  TipoTarjetaService: any;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private tipoTarjetaService: TipoTarjetaService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({

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
 
}
