import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Ibancos } from 'src/app/shared/models/bancos';
import { routes } from 'src/app/shared/routes/routes';
import { BancosService } from 'src/app/shared/services/bancos.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-banco',
  templateUrl: './editar-banco.component.html',
  styleUrls: ['./editar-banco.component.scss']
})
export class EditarBancoComponent implements OnInit {
  bancoEditada$: Subject<boolean> = new Subject<boolean>();
  banco!: Ibancos;
  bancoSeleccionada: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private bancoService: BancosService, public fb: FormBuilder) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.bancoService.obtenerBanco(this.bancoSeleccionada!).subscribe(banco => {
      this.banco = banco;
      this.form.patchValue({  
        descripcion: this.banco.descripcion,
        estado: this.banco.estado == '1' ? 'Activo' : 'Inactivo',
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
    this.bancoEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarBanco() {
    if (!this.banco || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const bancoActualizada: Ibancos = {
      bancoId: this.banco.bancoId,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.bancoService.actualizarBanco(bancoActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bancoEditada$.next(true);
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