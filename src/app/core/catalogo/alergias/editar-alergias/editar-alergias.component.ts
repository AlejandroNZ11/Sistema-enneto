import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import {Ialergias } from 'src/app/shared/models/alergia';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-editar-alergias',
  templateUrl: './editar-alergias.component.html',
  styleUrls: ['./editar-alergias.component.scss']
})
export class EditarAlergiasComponent  implements OnInit{
  alergiaEditada$: Subject<boolean> = new Subject<boolean>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alergiaSeleccionada: any;
  Alergia!: Ialergias;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  ngOnInit(): void { 
    this.AlergiasService.obtenerAlergia(this.alergiaSeleccionada!).subscribe(alergia => {
    this.Alergia = alergia;
    this.form.patchValue({
        nombre: this.Alergia.nombre,
        estado: this.Alergia.estado == '1' ? 'Activo' : 'Inactivo',
      });
    })
  } 

  constructor(public bsModalRef: BsModalRef,private AlergiasService: AlergiasService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
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
    this.alergiaEditada$.next(false);
    this.bsModalRef.hide()
  }
  guardarAlergia() {
    if (!this.Alergia ||this.form.invalid) {
      this.mostrarErrores = true;
      //Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    const alergiaActualizada: Ialergias = {
      alergiaId: this.Alergia.alergiaId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };
    this.AlergiasService.actualizarAlergia(alergiaActualizada).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.alergiaEditada$.next(true);
          this.bsModalRef.hide();
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}

