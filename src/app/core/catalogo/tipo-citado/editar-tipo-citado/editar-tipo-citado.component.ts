import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataTipoCitado, ItipoCitado, tipoCitado } from 'src/app/shared/models/tipoCitado';
import { routes } from 'src/app/shared/routes/routes';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-citado',
  templateUrl: './editar-tipo-citado.component.html',
  styleUrls: ['./editar-tipo-citado.component.scss']
})
export class EditarTipoCitadoComponent implements OnInit {
  tipoCitadoSeleccionado!: string;
  tipoCitado!: ItipoCitado;
  citadoEditada$: Subject<boolean> = new Subject<boolean>();
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  ngOnInit(): void { 
    this.service.obtenerTipoCitadoById(this.tipoCitadoSeleccionado).subscribe((data)=>{
      this.tipoCitado = data;
      this.form.patchValue(data);
    })
  }
  constructor(public bsModalRef: BsModalRef, private service: TipoCitadoService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      color: ['', Validators.required],
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
    this.citadoEditada$.next(false);
  }
  guardarTipoCitado() {
    if (this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    this.service.actualizarTipoCitado(this.tipoCitado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.citadoEditada$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}



