import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataTipomateriales, Itipomateriales, tipomateriales } from 'src/app/shared/models/tipo-materiales';
import { routes } from 'src/app/shared/routes/routes';
import { TipomaterialesService } from 'src/app/shared/services/tipo-materiales.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-agregar-tipo-materiales',
  templateUrl: './agregar-tipo-materiales.component.html',
  styleUrls: ['./agregar-tipo-materiales.component.scss']
})
export class AgregarTipoMaterialesComponent implements OnInit{
  tipomaterialAgregada$: Subject<boolean> = new Subject<boolean>();
  Tipomateriales: tipomateriales = new tipomateriales();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private tipomaterialesService: TipomaterialesService,
    public fb: FormBuilder,) {
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
    this.tipomaterialAgregada$.next(false);
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearTipomateriales() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Tipomateriales.nombre = this.form.get("nombre")?.value;
    this.Tipomateriales.descripcion = this.form.get("descripcion")?.value;
    console.log(this.Tipomateriales);
    this.tipomaterialesService.crearTipomateriales(this.Tipomateriales).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.tipomaterialAgregada$.next(true);
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

