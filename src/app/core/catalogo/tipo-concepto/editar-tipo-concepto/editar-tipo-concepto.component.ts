import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ItipoConcepto } from 'src/app/shared/models/tipoConcepto';
import { routes } from 'src/app/shared/routes/routes';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-editar-tipo-concepto',
  templateUrl: './editar-tipo-concepto.component.html',
  styleUrls: ['./editar-tipo-concepto.component.scss']
})
export class EditarTipoConceptoComponent implements OnInit{
  tipoConceptoEditada$: Subject<boolean> = new Subject<boolean>();
  tipoConceptoSeleccionada ?: string;
  tipoConcepto!: ItipoConcepto;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef,private TipoConceptoService: TipoConceptoService, 
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }


  ngOnInit() {
    this.TipoConceptoService.obtenerTipoConcepto(this.tipoConceptoSeleccionada!).subscribe(tipoConcepto => {
      this.tipoConcepto = tipoConcepto;
      this.form.patchValue({
        nombre: this.tipoConcepto.nombre,
        estado: this.tipoConcepto.estado == '1' ? 'Activo' : 'Inactivo',
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
    this.tipoConceptoEditada$.next(false);
    this.bsModalRef.hide();
  }
  guardarTipoConcepto() {
    if (!this.tipoConcepto || this.form.invalid) {
      this.mostrarErrores = true;
      //Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    const TipoConceptoActualizada: ItipoConcepto = {
      tipoConceptoId: this.tipoConcepto.tipoConceptoId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    }
    this.TipoConceptoService.actualizarTipoConcepto(TipoConceptoActualizada).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.tipoConceptoEditada$.next(true);
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


